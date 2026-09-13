const fs = require('fs');
const path = require('path');

const userList = [
  "Plombier",
  "Électricien",
  "Maçon",
  "Peintre",
  "Carreleur",
  "Menuisier bois",
  "Menuisier aluminium",
  "Menuisier métallique",
  "Vitrier",
  "Soudeur",
  "Serrurier",
  "Climaticien",
  "Frigoriste",
  "Installateur de chauffe-eau",
  "Technicien solaire",
  "Étancheur",
  "Poseur de faux plafond",
  "Poseur de papier peint",
  "Poseur de cuisine",
  "Installateur sanitaire",
  "Société de nettoyage",
  "Agent de ménage",
  "Nettoyage après travaux",
  "Nettoyage de vitres",
  "Nettoyage de façades",
  "Désinfection",
  "Désinsectisation",
  "Dératisation",
  "Vidange fosse septique",
  "Collecte des déchets",
  "Nettoyage de réservoirs d'eau",
  "Nettoyage de piscine",
  "Jardinier",
  "Paysagiste",
  "Élagueur",
  "Entretien des espaces verts",
  "Entretien des piscines",
  "Installateur d'arrosage automatique",
  "Entreprise BTP",
  "Architecte",
  "Bureau d'études",
  "Géomètre",
  "Ingénieur bâtiment",
  "Conducteur de travaux",
  "Décorateur d'intérieur",
  "Designer d'intérieur",
  "Entreprise de rénovation",
  "Entreprise de démolition",
  "Fournisseur de matériaux",
  "Location de matériel BTP",
  "Société de déménagement",
  "Transporteur",
  "Location de camion",
  "Manutentionnaire",
  "Service de livraison",
  "Stockage / garde-meuble",
  "Avocat",
  "Huissier de justice / commissaire de justice",
  "Notaire",
  "Expert immobilier",
  "Expert-comptable",
  "Comptable",
  "Assureur",
  "Courtier en assurance",
  "Courtier immobilier",
  "Gestionnaire immobilier",
  "Conseiller fiscal",
  "Développeur web",
  "Créateur de sites internet",
  "Community manager",
  "Graphiste",
  "Photographe immobilier",
  "Vidéaste immobilier",
  "Drone / photographie aérienne",
  "Spécialiste SEO",
  "Agence de communication",
  "Infographiste",
  "Décorateur",
  "Tapissier",
  "Fabricant de meubles",
  "Installateur de rideaux",
  "Installateur de stores",
  "Poseur de parquet",
  "Poseur de moquette",
  "Installateur de portes",
  "Installateur de fenêtres",
  "Installateur de dressing",
  "Technicien pompe à eau",
  "Technicien piscine",
  "Technicien vidéosurveillance",
  "Technicien caméra IP",
  "Technicien alarme",
  "Technicien contrôle d'accès",
  "Technicien détecteur incendie",
  "Technicien système anti-incendie",
  "Technicien portail et motorisation",
  "Technicien fibre optique",
  "Technicien réseau informatique",
  "Technicien Wi-Fi",
  "Technicien téléphonie",
  "Technicien antenne TV",
  "Technicien parabole",
  "Technicien interphone",
  "Technicien visiophone",
  "Technicien climatisation split",
  "Technicien climatisation centralisée",
  "Technicien chambre froide",
  "Technicien réfrigérateur",
  "Technicien congélateur",
  "Technicien ventilation",
  "Technicien VMC",
  "Technicien climatisation",
  "Technicien chauffage",
  "Technicien en plomberie industrielle",
  "Technicien en bâtiment",
  "Technicien de maintenance bâtiment",
  "Technicien ascenseur"
];

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const seenSlugs = new Set();
const categories = [];

const defaultImages = [
  'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
];

userList.forEach((name, index) => {
  let slug = slugify(name);
  if (seenSlugs.has(slug)) {
    slug = `${slug}-${index + 1}`;
  }
  seenSlugs.add(slug);

  let iconName = 'Wrench';
  const lower = name.toLowerCase();
  if (lower.includes('electr') || lower.includes('solaire') || lower.includes('energie') || lower.includes('antenne')) iconName = 'Zap';
  else if (lower.includes('clim') || lower.includes('frigo') || lower.includes('froid') || lower.includes('ventilat') || lower.includes('vmc')) iconName = 'Wind';
  else if (lower.includes('menuis') || lower.includes('meuble') || lower.includes('bois')) iconName = 'Hammer';
  else if (lower.includes('peint') || lower.includes('decor') || lower.includes('graph') || lower.includes('design')) iconName = 'Paintbrush';
  else if (lower.includes('serrur') || lower.includes('cle')) iconName = 'Key';
  else if (lower.includes('soud') || lower.includes('fer')) iconName = 'Flame';
  else if (lower.includes('nettoy') || lower.includes('menage') || lower.includes('desinfect') || lower.includes('jardin') || lower.includes('espaces verts')) iconName = 'Sparkles';
  else if (lower.includes('demenag') || lower.includes('transport') || lower.includes('camion') || lower.includes('livraison') || lower.includes('vidange')) iconName = 'Truck';
  else if (lower.includes('web') || lower.includes('site') || lower.includes('informatique') || lower.includes('reseau') || lower.includes('wifi') || lower.includes('fibre') || lower.includes('camera') || lower.includes('video') || lower.includes('seo')) iconName = 'Smartphone';
  else if (lower.includes('avocat') || lower.includes('notaire') || lower.includes('huissier') || lower.includes('expert') || lower.includes('comptable') || lower.includes('assur') || lower.includes('courtier')) iconName = 'ShieldCheck';
  else if (lower.includes('macon') || lower.includes('btp') || lower.includes('architecte') || lower.includes('batiment') || lower.includes('geometre') || lower.includes('carrel')) iconName = 'Layers';

  categories.push({
    id: slug,
    name: name,
    slug: slug,
    iconName: iconName,
    description: `Services professionnels de ${name} qualifié et vérifié au Sénégal. Interventions rapides et devis direct sans intermédiaire.`,
    shortDesc: `${name} professionnel pour particuliers et entreprises`,
    providerCount: Math.floor(Math.random() * 20) + 12,
    popularKeywords: [name.toLowerCase(), `${name.toLowerCase()} dakar`, `devis ${name.toLowerCase()}`],
    bannerImage: defaultImages[index % defaultImages.length],
    averageStartingPrice: 15000 + ((index % 5) * 5000)
  });
});

console.log(`Generated ${categories.length} categories.`);
fs.writeFileSync(path.join(__dirname, 'generated_categories.json'), JSON.stringify(categories, null, 2));
