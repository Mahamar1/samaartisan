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

export const PROVIDERS: Provider[] = [];

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
