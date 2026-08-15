import { Category, Neighborhood, Provider, SubscriptionPlan, AdminMetrics, Region } from './types';

export const SENEGAL_REGIONS: Region[] = [
  {
    id: 'dakar',
    name: 'Dakar',
    districts: [
      { id: 'almadies', name: 'Almadies' },
      { id: 'ngor', name: 'Ngor & Virage' },
      { id: 'ouakam', name: 'Ouakam & Mamelles' },
      { id: 'mermoz', name: 'Mermoz & Sacré-Cœur' },
      { id: 'point-e', name: 'Point E & Fann' },
      { id: 'plateau', name: 'Dakar Plateau & Centre-Ville' },
      { id: 'medina', name: 'Médina, Fass & Gueule Tapée' },
      { id: 'liberte', name: 'Liberté 1 à 6, Sicap & Dieuppeul' },
      { id: 'yoff', name: 'Yoff, Ouest-Foire & Nord-Foire' },
      { id: 'maristes', name: 'Hann Maristes & Bel-Air' },
      { id: 'parcelles', name: 'Parcelles Assainies & Grand Médine' },
      { id: 'grand-yoff', name: 'Grand Yoff & Khar Yalla' },
      { id: 'guediawaye', name: 'Guédiawaye (Golf, Hamo, Wakhinane)' },
      { id: 'pikine', name: 'Pikine, Thiaroye & Guinaw Rails' },
      { id: 'keur-massar', name: 'Keur Massar & Malika' },
      { id: 'rufisque', name: 'Rufisque (Centre, Arafat, Bargny)' },
      { id: 'diamniadio', name: 'Diamniadio & Sébikotane' },
    ]
  },
  {
    id: 'thies',
    name: 'Thiès',
    districts: [
      { id: 'thies-centre', name: 'Thiès Centre & Randoulène' },
      { id: 'thies-dixieme', name: 'Dixième & Cité Lamy' },
      { id: 'mbour', name: 'Mbour Ville' },
      { id: 'saly', name: 'Saly Portudal & Saly Niakhniakhal' },
      { id: 'somone', name: 'Somone & Ngaparou' },
      { id: 'popenguine', name: 'Popenguine, Toubab Dialaw & Ndayane' },
      { id: 'tivaouane', name: 'Tivaouane' },
      { id: 'joal', name: 'Joal-Fadiouth' },
      { id: 'pout', name: 'Pout' },
      { id: 'kayar', name: 'Kayar' },
      { id: 'khombole', name: 'Khombole' },
    ]
  },
  {
    id: 'saint-louis',
    name: 'Saint-Louis',
    districts: [
      { id: 'st-louis-centre', name: 'Saint-Louis Île (Centre Historique)' },
      { id: 'sor', name: 'Sor & Ndioloffène' },
      { id: 'gokhou-mbacc', name: 'Gokhou Mbacc & Hydrobase' },
      { id: 'pikine-sl', name: 'Pikine (Saint-Louis) & Balacoss' },
      { id: 'richard-toll', name: 'Richard-Toll' },
      { id: 'dagana', name: 'Dagana' },
      { id: 'podor', name: 'Podor' },
      { id: 'ross-bethio', name: 'Ross Béthio' },
    ]
  },
  {
    id: 'diourbel',
    name: 'Diourbel',
    districts: [
      { id: 'diourbel-ville', name: 'Diourbel Ville' },
      { id: 'touba-mosquee', name: 'Touba Grande Mosquée & Guédé' },
      { id: 'touba-darou', name: 'Touba Darou Marnane & Khayra' },
      { id: 'mbacke', name: 'Mbacké' },
      { id: 'bambey', name: 'Bambey' },
      { id: 'ndindy', name: 'Ndindy' },
    ]
  },
  {
    id: 'kaolack',
    name: 'Kaolack',
    districts: [
      { id: 'kaolack-centre', name: 'Kaolack Centre & Léona' },
      { id: 'medina-baye', name: 'Médina Baye & Sam' },
      { id: 'kahone', name: 'Kahone' },
      { id: 'ndoffane', name: 'Ndoffane' },
      { id: 'guinguineo', name: 'Guinguinéo' },
      { id: 'nioro', name: 'Nioro du Rip' },
    ]
  },
  {
    id: 'fatick',
    name: 'Fatick',
    districts: [
      { id: 'fatick-ville', name: 'Fatick Ville & Peulga' },
      { id: 'foundiougne', name: 'Foundiougne' },
      { id: 'sokone', name: 'Sokone' },
      { id: 'gossas', name: 'Gossas' },
      { id: 'passy', name: 'Passy' },
      { id: 'ndangane', name: 'Ndangane, Djiffer & Mar Lodj' },
    ]
  },
  {
    id: 'ziguinchor',
    name: 'Ziguinchor',
    districts: [
      { id: 'ziguinchor-centre', name: 'Ziguinchor Centre & Boucotte' },
      { id: 'ziguinchor-kande', name: 'Kandé & Lyndiane' },
      { id: 'cap-skirring', name: 'Cap Skirring & Kabrousse' },
      { id: 'oussouye', name: 'Oussouye' },
      { id: 'bignona', name: 'Bignona' },
      { id: 'kafountine', name: 'Kafountine & Abéné' },
    ]
  },
  {
    id: 'louga',
    name: 'Louga',
    districts: [
      { id: 'louga-ville', name: 'Louga Ville & Santhiaba' },
      { id: 'linguere', name: 'Linguère' },
      { id: 'dahra', name: 'Dahra Djoloff' },
      { id: 'kebemer', name: 'Kébémer' },
      { id: 'potou', name: 'Potou' },
    ]
  },
  {
    id: 'tambacounda',
    name: 'Tambacounda',
    districts: [
      { id: 'tamba-centre', name: 'Tambacounda Centre & Abattoirs' },
      { id: 'bakel', name: 'Bakel' },
      { id: 'goudiry', name: 'Goudiry' },
      { id: 'koumpentoum', name: 'Koumpentoum' },
    ]
  },
  {
    id: 'kolda',
    name: 'Kolda',
    districts: [
      { id: 'kolda-ville', name: 'Kolda Ville & Sikilo' },
      { id: 'velingara', name: 'Vélingara' },
      { id: 'medina-yoro', name: 'Médina Yoro Foulah' },
      { id: 'dabo', name: 'Dabo' },
    ]
  },
  {
    id: 'matam',
    name: 'Matam',
    districts: [
      { id: 'matam-ville', name: 'Matam Ville' },
      { id: 'ourossogui', name: 'Ourossogui' },
      { id: 'kanel', name: 'Kanel' },
      { id: 'ranerou', name: 'Ranérou' },
      { id: 'thilogne', name: 'Thilogne' },
    ]
  },
  {
    id: 'kaffrine',
    name: 'Kaffrine',
    districts: [
      { id: 'kaffrine-ville', name: 'Kaffrine Ville' },
      { id: 'birkelane', name: 'Birkelane' },
      { id: 'koungheul', name: 'Koungheul' },
      { id: 'malem-hodar', name: 'Malem-Hodar' },
    ]
  },
  {
    id: 'kedougou',
    name: 'Kédougou',
    districts: [
      { id: 'kedougou-ville', name: 'Kédougou Ville' },
      { id: 'saraya', name: 'Saraya' },
      { id: 'salemata', name: 'Salémata' },
      { id: 'dindefelo', name: 'Dindéfélo & Bandafassi' },
    ]
  },
  {
    id: 'sedhiou',
    name: 'Sédhiou',
    districts: [
      { id: 'sedhiou-ville', name: 'Sédhiou Ville' },
      { id: 'bounkiling', name: 'Bounkiling' },
      { id: 'goudomp', name: 'Goudomp' },
      { id: 'marsassoum', name: 'Marsassoum' },
    ]
  }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  { id: 'almadies', name: 'Almadies', city: 'Dakar', latitude: 14.7456, longitude: -17.5186, popularServices: ['Plomberie', 'Climatisation', 'Électricité'] },
  { id: 'ngor', name: 'Ngor', city: 'Dakar', latitude: 14.7533, longitude: -17.5144, popularServices: ['Serrurerie', 'Menuiserie', 'Peinture'] },
  { id: 'ouakam', name: 'Ouakam', city: 'Dakar', latitude: 14.7234, longitude: -17.4891, popularServices: ['Maçonnerie', 'Électricité', 'Plomberie'] },
  { id: 'mermoz', name: 'Mermoz', city: 'Dakar', latitude: 14.7088, longitude: -17.4764, popularServices: ['Climatisation', 'Nettoyage', 'Peinture'] },
  { id: 'sacre-coeur', name: 'Sacré-Cœur 1, 2, 3 & VDN', city: 'Dakar', latitude: 14.7156, longitude: -17.4642, popularServices: ['Électricité', 'Plomberie', 'Déménagement'] },
  { id: 'liberte', name: 'Liberté 1 à 6 / Sicap', city: 'Dakar', latitude: 14.7121, longitude: -17.4520, popularServices: ['Menuiserie', 'Soudure', 'Mécanique'] },
  { id: 'point-e', name: 'Point E & Fann', city: 'Dakar', latitude: 14.6932, longitude: -17.4678, popularServices: ['Climatisation', 'Plomberie', 'Serrurerie'] },
  { id: 'plateau', name: 'Dakar Plateau / Centre-ville', city: 'Dakar', latitude: 14.6712, longitude: -17.4332, popularServices: ['Électricité', 'Serrurerie d\'urgence', 'Vitrerie'] },
  { id: 'yoff', name: 'Yoff / Ouest-Foire / Nord-Foire', city: 'Dakar', latitude: 14.7578, longitude: -17.4678, popularServices: ['Plomberie', 'Maçonnerie', 'Soudure'] },
  { id: 'maristes', name: 'Hann Maristes', city: 'Dakar', latitude: 14.7302, longitude: -17.4321, popularServices: ['Peinture', 'Climatisation', 'Nettoyage'] },
  { id: 'guediawaye', name: 'Guédiawaye & Parcelles Assainies', city: 'Dakar', latitude: 14.7734, longitude: -17.3987, popularServices: ['Maçonnerie', 'Menuiserie Alu', 'Mécanique'] },
  { id: 'keur-massar', name: 'Keur Massar', city: 'Dakar', latitude: 14.7865, longitude: -17.3123, popularServices: ['Carrelage', 'Plomberie', 'Soudure'] },
  { id: 'rufisque', name: 'Rufisque & Diamniadio', city: 'Dakar', latitude: 14.7167, longitude: -17.2667, popularServices: ['Maçonnerie', 'Électricité', 'Ferronnerie'] },
];

export const CATEGORIES: Category[] = [
  {
    id: 'plomberie',
    name: 'Plomberie & Sanitaire',
    slug: 'plomberie',
    iconName: 'Wrench',
    description: 'Dépannage d\'urgence fuites d\'eau, débouchage canalisation, chauffe-eau, installation robinetterie et sanitaires.',
    shortDesc: 'Fuites, tuyauterie, chauffe-eau & sanitaires',
    providerCount: 42,
    popularKeywords: ['fuite eau', 'évier bouché', 'chauffe-eau solaire', 'robinet', 'fosse septique'],
    bannerImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 10000,
  },
  {
    id: 'electricite',
    name: 'Électricité & Énergie',
    slug: 'electricite',
    iconName: 'Zap',
    description: 'Court-circuit, installation tableau électrique, pose luminaires, prises, disjoncteurs, groupes électrogènes et solaire.',
    shortDesc: 'Pannes, tableau électrique, luminaires & solaire',
    providerCount: 38,
    popularKeywords: ['court circuit', 'disjoncteur', 'panneau solaire', 'groupe électrogène', 'prise'],
    bannerImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'climatisation',
    name: 'Climatisation & Froid',
    slug: 'climatisation',
    iconName: 'Wind',
    description: 'Installation split, recharge gaz frigorifique, entretien antibactérien, nettoyage filtres et réparation frigo.',
    shortDesc: 'Recharge gaz, pose split & entretien frigo',
    providerCount: 29,
    popularKeywords: ['recharge gaz r410', 'split 1.5cv', 'entretien clim', 'chambre froide'],
    bannerImage: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'menuiserie',
    name: 'Menuiserie Bois & Aluminium',
    slug: 'menuiserie',
    iconName: 'Hammer',
    description: 'Portes, fenêtres baie vitrée alu, placards sur mesure, meubles de cuisine, dressings et réparation volets.',
    shortDesc: 'Baies vitrées alu, portes bois, placards & cuisines',
    providerCount: 31,
    popularKeywords: ['baie vitrée alu', 'placard sur mesure', 'porte blindée bois', 'meuble cuisine'],
    bannerImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 25000,
  },
  {
    id: 'peinture',
    name: 'Peinture & Décoration',
    slug: 'peinture',
    iconName: 'Paintbrush',
    description: 'Peinture intérieure & extérieure, enduit lissé, étanchéité terrasse, papier peint, stucco et faux plafonds.',
    shortDesc: 'Peinture murs, étanchéité terrasse & faux plafond',
    providerCount: 27,
    popularKeywords: ['peinture mate', 'étanchéité toit', 'stucco', 'enduit façade', 'placo staff'],
    bannerImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 20000,
  },
  {
    id: 'serrurerie',
    name: 'Serrurerie d\'Urgence',
    slug: 'serrurerie',
    iconName: 'Key',
    description: 'Ouverture de porte claquée 24/7, remplacement serrure multipoints, blindage de porte et duplication de clés.',
    shortDesc: 'Ouverture porte bloquée 24/7 & changement serrure',
    providerCount: 19,
    popularKeywords: ['porte claquée', 'serrure 3 points', 'clé perdue', 'cylindre haute sécurité'],
    bannerImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'soudure',
    name: 'Soudure & Ferronnerie',
    slug: 'soudure',
    iconName: 'Flame',
    description: 'Grilles de protection antivol, portails coulissants en fer forgé, garde-corps balcon et charpente métallique.',
    shortDesc: 'Portails fer forgé, grilles antivol & rampes',
    providerCount: 22,
    popularKeywords: ['grille antivol', 'portail coulissant fer', 'garde corps inox', 'soudure arc'],
    bannerImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 30000,
  },
  {
    id: 'maconnerie',
    name: 'Maçonnerie & Carrelage',
    slug: 'maconnerie',
    iconName: 'Layers',
    description: 'Pose de carrelage grand format, rénovation salle de bain, clôture, crépissage, dallage et petite maçonnerie.',
    shortDesc: 'Pose carrelage, rénovation salle de bain & dalles',
    providerCount: 25,
    popularKeywords: ['pose carrelage 60x60', 'chape béton', 'faïence murale', 'mur clôture'],
    bannerImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 25000,
  },
  {
    id: 'mecanique',
    name: 'Mécanique Auto & Dépannage',
    slug: 'mecanique',
    iconName: 'Car',
    description: 'Diagnostic valise électronique, vidange express à domicile, freins, batterie à plat et remorquage rapide.',
    shortDesc: 'Diagnostic électronique, vidange domicile & freins',
    providerCount: 18,
    popularKeywords: ['diagnostic valise obd', 'batterie à plat', 'vidange 5w30', 'plaquettes frein'],
    bannerImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 15000,
  },
  {
    id: 'nettoyage',
    name: 'Nettoyage & Désinfection',
    slug: 'nettoyage',
    iconName: 'Sparkles',
    description: 'Nettoyage fin de chantier, pressing canapés & matelas à domicile, désinsectisation et grand ménage.',
    shortDesc: 'Fin de chantier, canapés à domicile & désinsectisation',
    providerCount: 16,
    popularKeywords: ['lavage canapé vapeur', 'ménage fin de chantier', 'désinsectisation cafards'],
    bannerImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 20000,
  },
  {
    id: 'demenagement',
    name: 'Déménagement & Transport',
    slug: 'demenagement',
    iconName: 'Truck',
    description: 'Transport de meubles, camion avec manutentionnaires, emballage soigné et transport de marchandises.',
    shortDesc: 'Camions avec porteurs, emballage & transport sécurisé',
    providerCount: 14,
    popularKeywords: ['camionnette déménagement', 'porteurs dakar', 'cartons déménagement'],
    bannerImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    averageStartingPrice: 40000,
  },
];

export const PROVIDERS: Provider[] = [
  {
    id: 'prov-1',
    slug: 'moussa-diop-plomberie-express',
    name: 'Moussa Diop',
    businessName: 'Diop Plomberie Sanitaire & Urgence 24/7',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80',
    headline: 'Maître Plombier Certifié • Dépannage fuites & installations Almadies / Ngor / Ouakam',
    bio: 'Plus de 11 ans d\'expérience dans le dépannage sanitaire haut de gamme et les installations résidentielles sur Dakar. Spécialiste de la détection de fuites invisibles, chauffe-eau solaires et surpresseurs. Intervention en moins de 45 minutes.',
    categorySlug: 'plomberie',
    categoryName: 'Plomberie & Sanitaire',
    specialties: ['Détection fuite caméra', 'Chauffe-eau solaire', 'Raccordement surpresseur', 'Débouchage haute pression', 'Sanitaires suspendus'],
    city: 'Dakar',
    neighborhood: 'Almadies',
    latitude: 14.7450,
    longitude: -17.5180,
    interventionRadiusKm: 20,
    phone: '+221 77 645 89 12',
    whatsapp: '221776458912',
    experienceYears: 11,
    verificationLevel: 'RECOMMENDED',
    subscriptionTier: 'PREMIUM',
    isAvailable: true,
    averageRating: 4.95,
    reviewCount: 47,
    completedJobsCount: 184,
    responseTimeMinutes: 12,
    isSponsored: true,
    startingPrice: 10000,
    joinedDate: '2023-04-10',
    documentsVerified: {
      cni: true,
      businessRegister: true,
      diploma: true,
    },
    services: [
      { id: 's1', name: 'Diagnostic & Déplacement d\'Urgence', indicativePrice: 10000, unit: 'forfait' },
      { id: 's2', name: 'Réparation de Fuite d\'Eau & Raccords', indicativePrice: 15000, unit: 'forfait' },
      { id: 's3', name: 'Débouchage WC / Canalisation complète', indicativePrice: 25000, unit: 'forfait' },
      { id: 's4', name: 'Installation / Remplacement Chauffe-eau', indicativePrice: 35000, unit: 'main d\'œuvre' },
      { id: 's5', name: 'Pose complète de Salle de Bain de luxe', indicativePrice: 120000, unit: 'chantier' },
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', title: 'Installation robinetterie encastrée Villa Almadies', description: 'Pose mitigeur thermostatique noir mat et douche italienne.' },
      { id: 'p2', imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80', title: 'Rénovation tuyauterie cuivre et PER Mermoz', description: 'Remplacement réseau vétuste sans casse apparente.' },
      { id: 'p3', imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80', title: 'Pose surpresseur 1.5CV avec filtre anticalcaire', description: 'Alimentation autonome continue pour villa R+2.' },
    ],
    reviews: [
      {
        id: 'r1',
        providerId: 'prov-1',
        customerName: 'Aïssatou Sow',
        customerCity: 'Almadies',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 5,
        priceRating: 5,
        comment: 'Moussa est intervenu un dimanche matin à 8h pour une fuite d\'eau sous notre évier qui inondait la cuisine. Travail hyper propre, ponctuel, poli et prix très correct. Je le recommande les yeux fermés !',
        providerReply: 'Merci beaucoup Mme Sow ! C\'était un plaisir de vous dépanner rapidement.',
        date: 'Il y a 3 jours',
        isVerifiedService: true,
      },
      {
        id: 'r2',
        providerId: 'prov-1',
        customerName: 'Cheikh Tidiane Ndiaye',
        customerCity: 'Mermoz',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 5,
        priceRating: 4,
        comment: 'Installation complète de notre surpresseur et réfection de la tuyauterie. Moussa maîtrise parfaitement son métier et utilise des raccords de très haute qualité.',
        date: 'Il y a 2 semaines',
        isVerifiedService: true,
      }
    ]
  },
  {
    id: 'prov-2',
    slug: 'amadou-ba-electricite-solaire',
    name: 'Amadou Ba',
    businessName: 'Ba Électrotechnique & Énergie Solaire',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    headline: 'Ingénieur Électricien • Tableaux électriques, pannes Senelec & kits solaires',
    bio: 'Diplômé en électrotechnique avec 8 ans d\'expérience. Diagnostic précis de disjonctions, mise aux normes des tableaux électriques, installation de parafoudres, onduleurs et kits solaires autonomes.',
    categorySlug: 'electricite',
    categoryName: 'Électricité & Énergie',
    specialties: ['Mise aux normes tableau', 'Installation Panneaux Solaires', 'Inverseur groupe automatique', 'Éclairage LED architectural'],
    city: 'Dakar',
    neighborhood: 'Sacré-Cœur',
    latitude: 14.7150,
    longitude: -17.4640,
    interventionRadiusKm: 25,
    phone: '+221 78 312 44 90',
    whatsapp: '221783124490',
    experienceYears: 8,
    verificationLevel: 'CERTIFIED_PRO',
    subscriptionTier: 'PRO',
    isAvailable: true,
    averageRating: 4.88,
    reviewCount: 32,
    completedJobsCount: 140,
    responseTimeMinutes: 18,
    startingPrice: 15000,
    joinedDate: '2023-06-15',
    documentsVerified: {
      cni: true,
      businessRegister: true,
      diploma: true,
    },
    services: [
      { id: 'se1', name: 'Recherche de Panne / Court-Circuit', indicativePrice: 15000, unit: 'forfait' },
      { id: 'se2', name: 'Rénovation Complète Tableau Électrique', indicativePrice: 45000, unit: 'tableau' },
      { id: 'se3', name: 'Pose Inverseur Automatique Groupe', indicativePrice: 35000, unit: 'forfait' },
      { id: 'se4', name: 'Étude & Installation Solaire Hybride', indicativePrice: 200000, unit: 'sur devis' },
    ],
    portfolio: [
      { id: 'pe1', imageUrl: 'https://images.unsplash.com/photo-1558441719-f5971a80c98f?auto=format&fit=crop&w=800&q=80', title: 'Tableau électrique triphasé pour immeuble Sacré-Cœur', description: 'Câblage structuré avec disjoncteurs différentiels 30mA.' },
      { id: 'pe2', imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80', title: 'Installation 12 panneaux solaires 550W à Ouakam', description: 'Autonomie 100% en journée avec onduleur hybride 5kW.' },
    ],
    reviews: [
      {
        id: 're1',
        providerId: 'prov-2',
        customerName: 'Fatou Bintou Fall',
        customerCity: 'Sacré-Cœur 3',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 5,
        priceRating: 5,
        comment: 'Très impressionnée par le professionnalisme d\'Amadou. Il a trouvé en 20 minutes l\'origine d\'une panne qui durait depuis 3 semaines chez nous. Très transparent sur ses tarifs.',
        date: 'Il y a 1 semaine',
        isVerifiedService: true,
      }
    ]
  },
  {
    id: 'prov-3',
    slug: 'ibrahima-sarr-clim-confort',
    name: 'Ibrahima Sarr',
    businessName: 'Sarr Clim & Froid Service Dakar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=1200&q=80',
    headline: 'Spécialiste Climatisation • Pose, Nettoyage antibactérien & Recharge Gaz R410/R32',
    bio: 'Technicien frigoriste agréé avec 9 ans d\'activité. Nous assurons la pose de climatiseurs split inverter toutes marques (Carrier, LG, Samsung, Gree), l\'entretien saisonnier et les dépannages d\'urgence sur tout Dakar.',
    categorySlug: 'climatisation',
    categoryName: 'Climatisation & Froid',
    specialties: ['Pose split inverter', 'Nettoyage haute pression & désinfection', 'Détection fuite de gaz', 'Dépannage chambre froide'],
    city: 'Dakar',
    neighborhood: 'Ouakam',
    latitude: 14.7230,
    longitude: -17.4890,
    interventionRadiusKm: 25,
    phone: '+221 77 520 81 33',
    whatsapp: '221775208133',
    experienceYears: 9,
    verificationLevel: 'ID_VERIFIED',
    subscriptionTier: 'PRO',
    isAvailable: true,
    averageRating: 4.90,
    reviewCount: 39,
    completedJobsCount: 165,
    responseTimeMinutes: 15,
    startingPrice: 15000,
    joinedDate: '2023-05-20',
    documentsVerified: {
      cni: true,
      businessRegister: true,
      diploma: false,
    },
    services: [
      { id: 'sc1', name: 'Entretien & Nettoyage Complet Split (Filtres + Bactéricide)', indicativePrice: 15000, unit: 'appareil' },
      { id: 'sc2', name: 'Recharge Complète Gaz R410A / R32', indicativePrice: 25000, unit: 'appareil' },
      { id: 'sc3', name: 'Installation / Pose Split 9000 à 18000 BTU', indicativePrice: 30000, unit: 'unité' },
      { id: 'sc4', name: 'Démontage & Repose Déménagement', indicativePrice: 40000, unit: 'appareil' },
    ],
    portfolio: [
      { id: 'pc1', imageUrl: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=800&q=80', title: 'Pose 4 splits inverter villa Mamelles', description: 'Passage de goulottes invisibles et raccordement électrique dédié.' },
    ],
    reviews: [
      {
        id: 'rc1',
        providerId: 'prov-3',
        customerName: 'Ousmane Cissé',
        customerCity: 'Ouakam',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 4,
        priceRating: 5,
        comment: 'Nettoyage impeccable de 3 climatiseurs chez nous. Ils ont utilisé une bâche spéciale pour ne pas salir les murs. Clims comme neuves !',
        date: 'Il y a 4 jours',
        isVerifiedService: true,
      }
    ]
  },
  {
    id: 'prov-4',
    slug: 'alioune-diallo-menuiserie-alu',
    name: 'Alioune Diallo',
    businessName: 'Atelier Diallo Alu & Bois Design',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    headline: 'Menuisier Aluminium & Ébéniste • Baies vitrées, cuisines sur mesure & dressings',
    bio: 'Artisan passionné depuis 14 ans avec atelier basé à Yoff. Nous concevons et posons vos menuiseries aluminium anti-corrosion (profilés thermo-laqués) et concevons vos placards et meubles modernes sur mesure.',
    categorySlug: 'menuiserie',
    categoryName: 'Menuiserie Bois & Aluminium',
    specialties: ['Baies vitrées double vitrage', 'Dressing sur mesure', 'Cuisines modernes mélaminé / MDF', 'Moustiquaires plissées'],
    city: 'Dakar',
    neighborhood: 'Yoff',
    latitude: 14.7570,
    longitude: -17.4670,
    interventionRadiusKm: 30,
    phone: '+221 77 890 12 45',
    whatsapp: '221778901245',
    experienceYears: 14,
    verificationLevel: 'RECOMMENDED',
    subscriptionTier: 'PREMIUM',
    isAvailable: true,
    averageRating: 4.92,
    reviewCount: 28,
    completedJobsCount: 110,
    responseTimeMinutes: 20,
    isSponsored: true,
    startingPrice: 30000,
    joinedDate: '2023-03-01',
    documentsVerified: {
      cni: true,
      businessRegister: true,
      diploma: true,
    },
    services: [
      { id: 'sm1', name: 'Prise de Cotes & Devis 3D Sur Mesure', indicativePrice: 10000, unit: 'déductible du devis' },
      { id: 'sm2', name: 'Baie Vitrée Coulissante Aluminium (2 vantaux)', indicativePrice: 95000, unit: 'm²' },
      { id: 'sm3', name: 'Fabrication & Pose Placard / Dressing', indicativePrice: 180000, unit: 'm linéaire' },
      { id: 'sm4', name: 'Remplacement Roulettes / Réglage Baie Vitrée', indicativePrice: 25000, unit: 'intervention' },
    ],
    portfolio: [
      { id: 'pm1', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', title: 'Cuisine équipée moderne mélaminé chêne clair VDN', description: 'Plans de travail hydrofuges et charnières à fermeture douce.' },
      { id: 'pm2', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', title: 'Baies vitrées aluminium gris anthracite Almadies', description: 'Profilés robustes résistants à l\'air marin.' }
    ],
    reviews: [
      {
        id: 'rm1',
        providerId: 'prov-4',
        customerName: 'Dr. Mamadou Ndir',
        customerCity: 'Ngor Virage',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 5,
        priceRating: 4,
        comment: 'Très belle finition pour notre dressing sur mesure. Délais de livraison respectés à la lettre. Équipe sérieuse.',
        date: 'Il y a 3 semaines',
        isVerifiedService: true,
      }
    ]
  },
  {
    id: 'prov-5',
    slug: 'babacar-seck-serrurier-express',
    name: 'Babacar Seck',
    businessName: 'Seck Urgence Serrurerie Dakar 24/7',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    headline: 'Serrurier d\'Urgence • Ouverture de porte claquée sans dégât & Serrures blindées',
    bio: 'Artisan serrurier disponible jour et nuit. Équipé d\'outils de pointe pour l\'ouverture rapide de portes claquées ou fermées à clé, blindage de portes et changement de cylindres sécurisés sur Dakar et banlieue.',
    categorySlug: 'serrurerie',
    categoryName: 'Serrurerie d\'Urgence',
    specialties: ['Ouverture fine sans casse', 'Serrures multipoints 3 à 5 points', 'Blindage porte d\'entrée', 'Cadenas de sécurité portail'],
    city: 'Dakar',
    neighborhood: 'Plateau',
    latitude: 14.6710,
    longitude: -17.4330,
    interventionRadiusKm: 25,
    phone: '+221 76 450 99 11',
    whatsapp: '221764509911',
    experienceYears: 10,
    verificationLevel: 'ID_VERIFIED',
    subscriptionTier: 'PRO',
    isAvailable: true,
    averageRating: 4.97,
    reviewCount: 54,
    completedJobsCount: 220,
    responseTimeMinutes: 10,
    startingPrice: 15000,
    joinedDate: '2023-01-18',
    documentsVerified: {
      cni: true,
      businessRegister: true,
      diploma: false,
    },
    services: [
      { id: 'ss1', name: 'Ouverture de Porte Claquée (Jour)', indicativePrice: 15000, unit: 'forfait' },
      { id: 'ss2', name: 'Ouverture Porte Fermée à Clé / Nuit', indicativePrice: 25000, unit: 'forfait' },
      { id: 'ss3', name: 'Remplacement Canon / Cylindre Européen Standard', indicativePrice: 20000, unit: 'pose + cylindre' },
      { id: 'ss4', name: 'Pose Serrure de Sécurité 3 Points', indicativePrice: 45000, unit: 'main d\'œuvre' },
    ],
    portfolio: [
      { id: 'ps1', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80', title: 'Pose serrure blindée multipoints Plateau', description: 'Installation cylindre anti-crochetage et poignée blindée.' },
    ],
    reviews: [
      {
        id: 'rs1',
        providerId: 'prov-5',
        customerName: 'Salimata Gueye',
        customerCity: 'Fann Résidence',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 5,
        priceRating: 5,
        comment: 'Arrivé en 20 minutes montre en main à 23h alors que j\'avais oublié mes clés à l\'intérieur. Porte ouverte en 3 minutes sans abîmer la serrure ! Un vrai pro.',
        date: 'Il y a 5 jours',
        isVerifiedService: true,
      }
    ]
  },
  {
    id: 'prov-6',
    slug: 'modou-fall-peinture-deco',
    name: 'Modou Fall',
    businessName: 'Fall Peinture Pro & Revêtements',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    headline: 'Peintre Bâtiment & Décorateur • Enduit lissé, étanchéité terrasse & stucco',
    bio: 'Artisan peintre avec 12 ans d\'expérience. Rénovation d\'appartements, villas et bureaux. Maîtrise parfaite des enduits fins lissés, des peintures satinées lavables et des traitements d\'étanchéité bitumineuse pour toitures terrasses.',
    categorySlug: 'peinture',
    categoryName: 'Peinture & Décoration',
    specialties: ['Enduit lissé parfait', 'Étanchéité résine terrasse', 'Peinture veloutée sans trace', 'Stucco vénitien'],
    city: 'Dakar',
    neighborhood: 'Mermoz',
    latitude: 14.7090,
    longitude: -17.4760,
    interventionRadiusKm: 25,
    phone: '+221 77 410 77 66',
    whatsapp: '221774107766',
    experienceYears: 12,
    verificationLevel: 'CERTIFIED_PRO',
    subscriptionTier: 'PRO',
    isAvailable: true,
    averageRating: 4.85,
    reviewCount: 23,
    completedJobsCount: 95,
    responseTimeMinutes: 25,
    startingPrice: 20000,
    joinedDate: '2023-07-02',
    documentsVerified: {
      cni: true,
      businessRegister: true,
      diploma: true,
    },
    services: [
      { id: 'sp1', name: 'Peinture Intérieure 2 Couches (Murs & Plafonds)', indicativePrice: 1500, unit: 'm² main d\'œuvre' },
      { id: 'sp2', name: 'Enduisage & Ponçage Fin', indicativePrice: 1200, unit: 'm²' },
      { id: 'sp3', name: 'Traitement Étanchéité Toiture Terrasse', indicativePrice: 4500, unit: 'm²' },
      { id: 'sp4', name: 'Peinture Façade Extérieure Résistante aux Intempéries', indicativePrice: 2000, unit: 'm²' },
    ],
    portfolio: [
      { id: 'pp1', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80', title: 'Peinture salon et chambres villa Mermoz', description: 'Enduit 3 passes et peinture acrylique satinée haut de gamme.' },
    ],
    reviews: [
      {
        id: 'rp1',
        providerId: 'prov-6',
        customerName: 'Khady Diagne',
        customerCity: 'Mermoz',
        rating: 5,
        qualityRating: 5,
        punctualityRating: 5,
        communicationRating: 5,
        priceRating: 4,
        comment: 'Modou et son équipe ont repeint tout notre duplex en 5 jours. Chantier nettoyé chaque soir, résultat impeccable sans aucune bavure.',
        date: 'Il y a 1 mois',
        isVerifiedService: true,
      }
    ]
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'artisan-gratuit',
    name: 'Artisan Partenaire (100% Gratuit)',
    tier: 'FREE',
    priceMonthlyFcfa: 0,
    priceAnnualFcfa: 0,
    priceMonthlyEur: 0,
    badge: 'Offre Gratuite & Illimitée',
    isPopular: true,
    description: 'Accès complet et 100% gratuit pour tous les artisans du Sénégal pendant la phase de lancement.',
    features: [
      'Contacts et demandes de devis ILLIMITÉS',
      'Bouton WhatsApp direct avec message pré-rempli',
      'Galerie photos illimitée pour vos réalisations',
      'Badge officiel "Artisan CNI Vérifiée" après validation',
      'Tableau de bord CRM complet avec suivi des demandes',
      'Zéro commission et Zéro frais d\'inscription',
      'Support WhatsApp & Téléphone dédié',
    ],
    maxPhotos: 50,
    contactsLimit: 'UNLIMITED',
    prioritySupport: true,
    boostedRanking: true,
  }
];

export const MOCK_ADMIN_METRICS: AdminMetrics = {
  mrrFcfa: 0,
  activeSubscribers: 215,
  totalProviders: 215,
  pendingVerifications: 9,
  totalServiceRequests: 1280,
  totalReviews: 460,
  satisfactionRate: 98.2,
  churnRatePercent: 0,
};

// Utility functions
export function formatFcfa(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount) + ' FCFA';
}

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
}

export function getProviderBySlug(slug: string): Provider | undefined {
  return PROVIDERS.find((p) => p.slug === slug || p.id === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug || c.id === slug);
}
