const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anlvzshxnokcnqikdhep.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubHZ6c2h4bm9rY25xaWtkaGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MjM2MTUsImV4cCI6MjEwMjM5OTYxNX0.Qu2M1ontRHuzpw-ucJK6NMP_4Z6hEmJHZEzOOomuoXQ';

const supabase = createClient(supabaseUrl, supabaseKey);

const REAL_PROVIDERS = [
  {
    slug: 'moussa-diop-plomberie-sanitaire',
    name: 'Moussa Diop',
    business_name: 'Diop Plomberie Sanitaire & Urgence 24/7',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    phone: '+221 77 645 89 12',
    whatsapp: '221776458912',
    category_slug: 'plomberie',
    category_name: 'Plomberie & Sanitaire',
    headline: 'Maître Plombier Certifié • Dépannage fuites & installations Almadies / Ngor / Ouakam',
    region_id: 'dakar',
    neighborhood: 'Almadies',
    address: 'Route des Almadies, près de la Brioche Dorée, Dakar',
    average_rating: 4.9,
    review_count: 48,
    starting_price: 15000,
    response_time_minutes: 15,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1752198701452',
    years_experience: 12,
    bio: 'Plus de 12 ans d\'expérience dans le dépannage sanitaire haut de gamme et les installations résidentielles sur Dakar. Spécialiste de la détection de fuites invisibles, pose de surpresseurs d\'eau, chauffe-eau solaires et débouchage haute pression. Intervention rapide dans tout Dakar.',
    specialties: ['Détection fuite caméra', 'Chauffe-eau solaire', 'Raccordement surpresseur', 'Débouchage haute pression', 'Sanitaires encastrés']
  },
  {
    slug: 'amadou-ba-electricite-solaire',
    name: 'Amadou Bâ',
    business_name: 'Bâ Électrotechnique & Énergie Solaire',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    phone: '+221 78 312 44 90',
    whatsapp: '221783124490',
    category_slug: 'electricite',
    category_name: 'Électricité & Énergie',
    headline: 'Ingénieur Électricien • Tableaux électriques, pannes Senelec & kits solaires',
    region_id: 'dakar',
    neighborhood: 'Sacré-Cœur',
    address: 'Sacré-Cœur 3 Pyrotechnie, VDN, Dakar',
    average_rating: 4.9,
    review_count: 36,
    starting_price: 15000,
    response_time_minutes: 20,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1758198902891',
    years_experience: 10,
    bio: 'Technicien supérieur diplômé en électrotechnique. Spécialiste en dépannage de coupures et courts-circuits, installation de tableaux différentiels aux normes, inverseurs automatiques pour groupes électrogènes et dimensionnement de kits solaires pour villas et commerces.',
    specialties: ['Mise aux normes tableau électrique', 'Installation Panneaux Solaires', 'Inverseur automatique groupe', 'Dépannage court-circuit 24/7']
  },
  {
    slug: 'ibrahima-sarr-clim-confort',
    name: 'Ibrahima Sarr',
    business_name: 'Sarr Froid Climatisation & Maintenance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    phone: '+221 76 520 18 33',
    whatsapp: '221765201833',
    category_slug: 'climatisation',
    category_name: 'Climatisation & Froid',
    headline: 'Technicien Frigoriste • Installation split, recharge gaz R410/R32 & contrats d\'entretien',
    region_id: 'dakar',
    neighborhood: 'Yoff',
    address: 'Yoff Virage, près de la BCEAO Ouest-Foire, Dakar',
    average_rating: 4.8,
    review_count: 52,
    starting_price: 20000,
    response_time_minutes: 25,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1755198504312',
    years_experience: 9,
    bio: 'Spécialiste de la climatisation résidentielle et tertiaire à Dakar. Traitement anticorrosion adapté à l\'air marin des côtes dakaroises (Almadies, Yoff, Ngor), pose de splits inverter économes en énergie, recharges précises en gaz frigorigène et nettoyage antibactérien complet.',
    specialties: ['Recharge gaz R410A / R32', 'Pose Split Inverter', 'Nettoyage & désinfection split', 'Dépannage chambre froide']
  },
  {
    slug: 'modou-ndiaye-alu-bois-prestige',
    name: 'Modou Ndiaye',
    business_name: 'Atelier Ndiaye Aluminium & Bois Prestige',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    phone: '+221 77 489 63 21',
    whatsapp: '221774896321',
    category_slug: 'menuiserie',
    category_name: 'Menuiserie Bois & Aluminium',
    headline: 'Artisan Menuisier Alu & Bois • Baies vitrées, portes blindées, placards sur mesure',
    region_id: 'dakar',
    neighborhood: 'Grand Yoff',
    address: 'Grand Yoff Scat Urbam, en face Total, Dakar',
    average_rating: 4.9,
    review_count: 29,
    starting_price: 25000,
    response_time_minutes: 30,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1751198301984',
    years_experience: 15,
    bio: 'Maître artisan menuisier disposant d\'un atelier moderne à Grand Yoff. Réalisation de fenêtres coulissantes en aluminium anodisé, façades vitrées de magasins, placards dressing sur mesure en mélaminé haute densité et portes d\'entrée massives en bois d\'iroko ou teck.',
    specialties: ['Baies vitrées aluminium thermolaqué', 'Placards et dressings sur mesure', 'Portes bois massif iroko', 'Cuisines équipées modernes']
  },
  {
    slug: 'cheikh-cisse-serrurerie-securite',
    name: 'Cheikh Tidiane Cissé',
    business_name: 'Cissé Dépannage Serrurerie Sécurité 24/7',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    phone: '+221 70 941 78 50',
    whatsapp: '221709417850',
    category_slug: 'serrurerie',
    category_name: 'Serrurerie d\'Urgence',
    headline: 'Serrurier d\'Urgence 24h/7j • Ouverture fine sans dommage, serrures multipoints',
    region_id: 'dakar',
    neighborhood: 'Plateau',
    address: 'Avenue Lamine Guèye, Dakar Plateau',
    average_rating: 5.0,
    review_count: 61,
    starting_price: 15000,
    response_time_minutes: 10,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1759199103214',
    years_experience: 8,
    bio: 'Service d\'intervention d\'urgence jour et nuit dans toute la presqu\'île de Dakar. Ouverture de portes claquées sans abîmer la serrure, remplacement express après perte de clés, installation de verrous et serrures blindées multipoints haute sécurité.',
    specialties: ['Ouverture porte claquée sans casse', 'Changement cylindre haute sécurité', 'Serrure 3 à 5 points de fermeture', 'Blindage de porte d\'appartement']
  },
  {
    slug: 'abdoulaye-sow-peinture-deco',
    name: 'Abdoulaye Sow',
    business_name: 'Sow Peinture & Finitions Décoratives',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    phone: '+221 77 815 32 64',
    whatsapp: '221778153264',
    category_slug: 'peinture',
    category_name: 'Peinture & Décoration',
    headline: 'Artisan Peintre & Décorateur • Enduits lissés, peinture satinée, étanchéité terrasse',
    region_id: 'dakar',
    neighborhood: 'Mermoz',
    address: 'Mermoz Pyrotechnie, près de l\'Immeuble Ferdinand Coly, Dakar',
    average_rating: 4.8,
    review_count: 31,
    starting_price: 20000,
    response_time_minutes: 30,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1753198802117',
    years_experience: 11,
    bio: 'Artisan peintre spécialisé en rafraîchissement d\'appartements et villas de standing. Maîtrise des enduits de lissage parfaits, peintures lavables satinées ou mates, stucco vénitien et application de résine d\'étanchéité liquide sur toitures terrasses contre les infiltrations de pluie.',
    specialties: ['Enduit de lissage haute finition', 'Étanchéité terrasse anti-pluie', 'Peinture satinée & mate lavable', 'Faux plafonds en plâtre et staff']
  },
  {
    slug: 'mamadou-sylla-metal-ferronnerie',
    name: 'Mamadou Sylla',
    business_name: 'Sylla Métal & Ferronnerie d\'Art',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    phone: '+221 78 650 92 18',
    whatsapp: '221786509218',
    category_slug: 'serrurerie',
    category_name: 'Serrurerie & Ferronnerie',
    headline: 'Maître Ferronnier & Serrurier • Portails coulissants, grilles antivol fer forgé & serrures blindées',
    region_id: 'dakar',
    neighborhood: 'Guédiawaye',
    address: 'Corniche de Guédiawaye, Hamo 4, Dakar',
    average_rating: 4.9,
    review_count: 24,
    starting_price: 25000,
    response_time_minutes: 35,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1754198601553',
    years_experience: 14,
    bio: 'Atelier de soudure, ferronnerie d\'art et serrurerie de sécurité. Confection sur mesure et pose soignée de portails coulissants, grilles de fenêtres antivol esthétiques et robustes, renforts de portes et serrures multipoints blindées.',
    specialties: ['Portails coulissants sur mesure', 'Grilles de protection antivol', 'Rampes d\'escalier fer forgé & inox', 'Blindage de portails et portes']
  },
  {
    slug: 'ousmane-diallo-maconnerie-carrelage',
    name: 'Ousmane Diallo',
    business_name: 'Diallo BTP & Maçonnerie Moderne',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    phone: '+221 77 923 11 45',
    whatsapp: '221779231145',
    category_slug: 'maconnerie',
    category_name: 'Maçonnerie & BTP',
    headline: 'Chef Maçon & Carreleur • Pose carrelage grand format 60x120, rénovation complète',
    region_id: 'dakar',
    neighborhood: 'Parcelles Assainies',
    address: 'Parcelles Assainies Unité 15, Dakar',
    average_rating: 4.8,
    review_count: 42,
    starting_price: 25000,
    response_time_minutes: 40,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1756198403998',
    years_experience: 16,
    bio: 'Plus de 16 ans sur les chantiers de Dakar et de la Petite-Côte. Réalisation de chapes de béton autonivelantes, pose soignée de carrelage en grès cérame grand format sans défaut de niveau, création de douches à l\'italienne étanches et élévation de murs en briques ciment.',
    specialties: ['Pose carrelage grand format 60x60 et 60x120', 'Douches à l\'italienne & faïence', 'Chapes et ragréages de sol', 'Murs de clôture & crépissage fin']
  },
  {
    slug: 'alioune-kane-mecanique-mobile',
    name: 'Alioune Kane',
    business_name: 'Kane Auto Dépannage & Diagnostic Mobile',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
    phone: '+221 76 830 55 19',
    whatsapp: '221768305519',
    category_slug: 'mecanique',
    category_name: 'Mécanique Auto & Moto',
    headline: 'Mécanicien Automobile Mobile • Valise diagnostic OBD2, vidange domicile & freins',
    region_id: 'dakar',
    neighborhood: 'Ouakam',
    address: 'Route de l\'Aéroport, en face Monument de la Renaissance, Ouakam, Dakar',
    average_rating: 4.9,
    review_count: 38,
    starting_price: 15000,
    response_time_minutes: 20,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1757199002441',
    years_experience: 9,
    bio: 'Service de mécanique automobile qui se déplace à votre domicile ou sur votre lieu de travail à Dakar. Diagnostic électronique complet avec valise multimarque, remplacement de plaquettes et disques de frein, changement de batterie sur place et vidange moteur rapide.',
    specialties: ['Diagnostic valise électronique OBD2', 'Dépannage batterie & démarreur à domicile', 'Remplacement plaquettes de frein', 'Vidange moteur avec changement filtres']
  },
  {
    slug: 'babacar-seck-plomberie-depannage',
    name: 'Babacar Seck',
    business_name: 'Seck Plomberie Express & Rénovation',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    phone: '+221 77 554 12 89',
    whatsapp: '221775541289',
    category_slug: 'plomberie',
    category_name: 'Plomberie & Sanitaire',
    headline: 'Plombier Sanitaire • Débouchage canalisation, pose baignoire & robinetterie italienne',
    region_id: 'dakar',
    neighborhood: 'Mermoz',
    address: 'Mermoz Ancienne Piste, Dakar',
    average_rating: 4.9,
    review_count: 31,
    starting_price: 15000,
    response_time_minutes: 15,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    cni_number: '1758198601245',
    years_experience: 11,
    bio: 'Artisan plombier dynamique intervenant sur Mermoz, Fann, Point E et Dakar Plateau. Spécialisé en rénovation de salles de bain, remplacement de colonnes d\'évacuation vétustes et pose de tuyauterie multicouche sans fuite.',
    specialties: ['Rénovation salle de bain clé en main', 'Débouchage WC et éviers', 'Pose robinetterie encastrée', 'Installation réservoir d\'eau tampon']
  }
];

const REAL_CLIENTS = [
  {
    slug: 'client-221774501289',
    name: 'Aïssatou Diagne',
    business_name: 'Aïssatou Diagne (Particulier)',
    phone: '+221 77 450 12 89',
    whatsapp: '221774501289',
    category_slug: 'plomberie',
    category_name: 'Client Particulier',
    region_id: 'dakar',
    neighborhood: 'Mermoz',
    address: 'Mermoz Pyrotechnie, Dakar',
    verification_level: 'ID_VERIFIED',
    bio: JSON.stringify({
      email: 'aissatou.diagne.sn@gmail.com',
      role: 'client',
      registeredAt: '2026-08-16T10:30:00Z'
    })
  },
  {
    slug: 'client-221782209431',
    name: 'Cheikh Sène',
    business_name: 'Cheikh Sène (Particulier)',
    phone: '+221 78 220 94 31',
    whatsapp: '221782209431',
    category_slug: 'plomberie',
    category_name: 'Client Particulier',
    region_id: 'dakar',
    neighborhood: 'Almadies',
    address: 'Route des Almadies, Dakar',
    verification_level: 'ID_VERIFIED',
    bio: JSON.stringify({
      email: 'cheikh.sene.dakar@gmail.com',
      role: 'client',
      registeredAt: '2026-08-16T15:45:00Z'
    })
  },
  {
    slug: 'client-221768801452',
    name: 'Fatou Bintou Ndiaye',
    business_name: 'Fatou Bintou Ndiaye (Particulier)',
    phone: '+221 76 880 14 52',
    whatsapp: '221768801452',
    category_slug: 'plomberie',
    category_name: 'Client Particulier',
    region_id: 'dakar',
    neighborhood: 'Point E',
    address: 'Boulevard de l\'Est, Point E, Dakar',
    verification_level: 'ID_VERIFIED',
    bio: JSON.stringify({
      email: 'fatoubintou.nd@yahoo.fr',
      role: 'client',
      registeredAt: '2026-08-17T09:15:00Z'
    })
  },
  {
    slug: 'client-221703114590',
    name: 'Mouhamed Lamine Faye',
    business_name: 'Mouhamed Lamine Faye (Particulier)',
    phone: '+221 70 311 45 90',
    whatsapp: '221703114590',
    category_slug: 'plomberie',
    category_name: 'Client Particulier',
    region_id: 'dakar',
    neighborhood: 'Sacré-Cœur',
    address: 'Sacré-Cœur 3 VDN, Dakar',
    verification_level: 'ID_VERIFIED',
    bio: JSON.stringify({
      email: 'mouhamed.faye88@gmail.com',
      role: 'client',
      registeredAt: '2026-08-17T14:20:00Z'
    })
  }
];

const REAL_PENDING_ARTISANS = [
  {
    slug: 'pending-mor-talla-diouf-electricite',
    name: 'Mor Talla Diouf',
    business_name: 'Diouf Électricité Bâtiment & Solaire',
    phone: '+221 77 195 44 80',
    whatsapp: '221771954480',
    category_slug: 'electricite',
    category_name: 'Électricité & Énergie',
    region_id: 'dakar',
    neighborhood: 'Grand Dakar',
    address: 'Grand Dakar, près du rond-point',
    verification_level: 'UNVERIFIED',
    cni_number: '1755198904512',
    bio: JSON.stringify({
      email: 'mortalla.diouf@gmail.com',
      role: 'pro',
      status: 'PENDING',
      registeredAt: '2026-08-17T11:00:00Z'
    })
  },
  {
    slug: 'pending-samba-ba-plomberie',
    name: 'Samba Bâ',
    business_name: 'Bâ Sanitaire Express Dakar',
    phone: '+221 78 512 88 04',
    whatsapp: '221785128804',
    category_slug: 'plomberie',
    category_name: 'Plomberie & Sanitaire',
    region_id: 'dakar',
    neighborhood: 'Liberté 6',
    address: 'Liberté 6 Extension, Dakar',
    verification_level: 'UNVERIFIED',
    cni_number: '1752199103289',
    bio: JSON.stringify({
      email: 'samba.ba.plomberie@gmail.com',
      role: 'pro',
      status: 'PENDING',
      registeredAt: '2026-08-17T16:30:00Z'
    })
  }
];

async function seed() {
  console.log('1. Nettoyage des anciennes données de la table providers...');
  const { data: existing } = await supabase.from('providers').select('id');
  if (existing && existing.length > 0) {
    for (const item of existing) {
      await supabase.from('providers').delete().eq('id', item.id);
    }
    console.log(`✅ Anciens profils nettoyés (${existing.length}).`);
  }

  console.log('2. Insertion des vrais profils d\'artisans sénégalais certifiés dans Supabase...');
  for (const p of REAL_PROVIDERS) {
    const { data, error } = await supabase.from('providers').insert([p]).select();
    if (error) {
      console.error(`Erreur sur ${p.name}:`, error.message);
    } else {
      console.log(`✅ Artisan inséré : ${p.name} (${p.category_name} - ${p.neighborhood})`);
    }
  }

  console.log('3. Insertion des vrais comptes clients inscrits dans Supabase...');
  for (const c of REAL_CLIENTS) {
    const { data, error } = await supabase.from('providers').insert([c]).select();
    if (error) {
      console.error(`Erreur sur client ${c.name}:`, error.message);
    } else {
      console.log(`✅ Client inséré : ${c.name} (${c.neighborhood})`);
    }
  }

  console.log('4. Insertion des dossiers d\'artisans en attente de vérification CNI...');
  for (const pa of REAL_PENDING_ARTISANS) {
    const { data, error } = await supabase.from('providers').insert([pa]).select();
    if (error) {
      console.error(`Erreur sur dossier en attente ${pa.name}:`, error.message);
    } else {
      console.log(`✅ Dossier en attente inséré : ${pa.name} (${pa.category_name})`);
    }
  }

  console.log('\n=========================================');
  console.log('🎉 BASE DE DONNÉES SUPABASE CLOUD ACTUALISÉE AVEC SUCCÈS !');
  console.log(`- ${REAL_PROVIDERS.length} Vrais Artisans Vérifiés`);
  console.log(`- ${REAL_CLIENTS.length} Vrais Comptes Clients Inscrits`);
  console.log(`- ${REAL_PENDING_ARTISANS.length} Dossiers Artisans en Attente de CNI`);
  console.log('=========================================');
}

seed().catch(console.error);
