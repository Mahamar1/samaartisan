/**
 * GitHub Direct Publisher via REST API
 * Publie l'intégralité du projet sur GitHub sans nécessiter git.exe ni Docker.
 */
const fs = require('fs');
const path = require('path');

const GITHUB_TOKEN = process.argv[2] || process.env.GITHUB_TOKEN;
const REPO_NAME = process.argv[3] || 'sama-artisan';
const IS_PRIVATE = process.argv[4] === 'true';

if (!GITHUB_TOKEN) {
  console.error('Usage: node scripts/github-publisher.js <GITHUB_TOKEN> [REPO_NAME] [IS_PRIVATE]');
  process.exit(1);
}

const IGNORED_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  '.gemini',
  'out',
  'build',
  'coverage',
  '.vscode',
  'scripts'
]);

const IGNORED_FILES = new Set([
  '.env.local',
  '.env.production.local',
  '.env',
  '.DS_Store'
]);

// Helper to list all project files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!IGNORED_DIRS.has(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (!IGNORED_FILES.has(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function githubRequest(endpoint, method = 'GET', body = null) {
  const url = `https://api.github.com${endpoint}`;
  const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'User-Agent': 'Sama-Artisan-Deployer',
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`GitHub API Error (${response.status}): ${data.message || JSON.stringify(data)}`);
  }
  return data;
}

async function main() {
  try {
    console.log('1. Vérification de l\'utilisateur GitHub...');
    const user = await githubRequest('/user');
    console.log(`Connecté avec succès en tant que : ${user.login} (${user.name || user.login})`);

    console.log(`2. Création ou vérification du dépôt : "${REPO_NAME}"...`);
    let repo;
    try {
      repo = await githubRequest(`/repos/${user.login}/${REPO_NAME}`);
      console.log(`ℹ️ Dépôt existant trouvé : ${repo.html_url}`);
    } catch (err) {
      console.log(`Création du nouveau dépôt "${REPO_NAME}"...`);
      repo = await githubRequest(`/user/repos`, 'POST', {
        name: REPO_NAME,
        description: 'Sama Artisan - Plateforme de mise en relation d\'artisans et prestataires de services au Sénégal',
        private: IS_PRIVATE,
        auto_init: false
      });
      console.log(`✅ Dépôt créé avec succès : ${repo.html_url}`);
    }

    // Check if repo is empty and initialize if needed
    try {
      await githubRequest(`/repos/${user.login}/${REPO_NAME}/branches/main`);
    } catch {
      try {
        console.log('Initialisation du dépôt vide avec README.md...');
        await githubRequest(`/repos/${user.login}/${REPO_NAME}/contents/README.md`, 'PUT', {
          message: 'Initial commit',
          content: Buffer.from('# Sama Artisan\nPlateforme SaaS de mise en relation d\'artisans au Sénégal').toString('base64')
        });
        console.log('✅ Dépôt initialisé avec succès.');
      } catch (errInit) {
        console.log('Info init:', errInit.message);
      }
    }

    const rootDir = path.resolve(__dirname, '..');
    const files = getAllFiles(rootDir);
    console.log(`3. Préparation de ${files.length} fichiers du projet...`);

    // Create Blobs for each file
    const treeItems = [];
    let count = 0;
    for (const filePath of files) {
      count++;
      const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
      const content = fs.readFileSync(filePath);
      const isBinary = content.includes(0);

      const blobData = await githubRequest(`/repos/${user.login}/${REPO_NAME}/git/blobs`, 'POST', {
        content: isBinary ? content.toString('base64') : content.toString('utf8'),
        encoding: isBinary ? 'base64' : 'utf-8'
      });

      treeItems.push({
        path: relativePath,
        mode: '100644',
        type: 'blob',
        sha: blobData.sha
      });

      if (count % 10 === 0 || count === files.length) {
        process.stdout.write(`Progression : ${count}/${files.length} fichiers traités\r`);
      }
    }
    console.log(`\n✅ Tous les blobs ont été uploadés.`);

    // Create Git Tree
    console.log('4. Création de l\'arborescence Git (Tree)...');
    const tree = await githubRequest(`/repos/${user.login}/${REPO_NAME}/git/trees`, 'POST', {
      tree: treeItems
    });

    // Create Commit
    console.log('5. Création du commit initial...');
    let parentSha = null;
    try {
      const defaultBranchRef = await githubRequest(`/repos/${user.login}/${REPO_NAME}/git/ref/heads/main`);
      parentSha = defaultBranchRef.object.sha;
    } catch {}

    const commit = await githubRequest(`/repos/${user.login}/${REPO_NAME}/git/commits`, 'POST', {
      message: '🚀 Initialisation complète de Sama Artisan (Full-Stack Supabase)',
      tree: tree.sha,
      parents: parentSha ? [parentSha] : []
    });

    // Update / Create main branch ref
    console.log('6. Finalisation de la branche main...');
    try {
      await githubRequest(`/repos/${user.login}/${REPO_NAME}/git/refs`, 'POST', {
        ref: 'refs/heads/main',
        sha: commit.sha
      });
    } catch {
      await githubRequest(`/repos/${user.login}/${REPO_NAME}/git/refs/heads/main`, 'PATCH', {
        sha: commit.sha,
        force: true
      });
    }

    console.log('\n=========================================');
    console.log(`🎉 SUCCÈS TOTAL !`);
    console.log(`Votre projet Sama Artisan est disponible en ligne sur :`);
    console.log(`🔗 ${repo.html_url}`);
    console.log('=========================================');

  } catch (err) {
    console.error('❌ Erreur lors de la publication :', err.message);
    process.exit(1);
  }
}

main();
