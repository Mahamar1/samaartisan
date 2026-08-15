# Guide de Déploiement - SamaSolution

## Déploiement sur Vercel & Supabase

### 1. Variables d'Environnement
Créez un fichier `.env.local` avec les variables suivantes :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
NEXT_PUBLIC_SITE_URL=https://samasolution.sn
```

### 2. Commandes de Build
```bash
# Compilation de production
npm run build

# Démarrage du serveur
npm run start
```
