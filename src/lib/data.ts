import { 
  Organization, 
  Property, 
  BTPProject, 
  Client, 
  Owner, 
  Tenant, 
  Contract, 
  Payment, 
  DocumentItem, 
  Publication, 
  ServiceProvider,
  SaaSPlan,
  ConstructionLog,
  NotificationItem,
  Category,
  Neighborhood,
  Provider
} from './types';

// Helper for price formatting
export function formatFcfa(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

// Backward-compatible data arrays
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Plomberie & Sanitaire', slug: 'plomberie', iconName: 'Wrench', description: 'Urgences et installations', shortDesc: 'Dépannage 24/7', providerCount: 12, popularKeywords: ['fuite', 'robinet'], bannerImage: '', averageStartingPrice: 15000 },
  { id: '2', name: 'Électricité & Énergie', slug: 'electricite', iconName: 'Zap', description: 'Pannes et installations', shortDesc: 'Dépannage 24/7', providerCount: 15, popularKeywords: ['panne', 'disjoncteur'], bannerImage: '', averageStartingPrice: 20000 },
  { id: '3', name: 'Climatisation & Froid', slug: 'climatisation', iconName: 'Wind', description: 'Entretien et recharge gaz', shortDesc: 'Clim Inverter', providerCount: 8, popularKeywords: ['split', 'gaz R410'], bannerImage: '', averageStartingPrice: 20000 },
  { id: '4', name: 'Menuiserie Alu & Bois', slug: 'menuiserie', iconName: 'Hammer', description: 'Portes, fenêtres, baies', shortDesc: 'Aluminium & Bois', providerCount: 10, popularKeywords: ['baie vitrée', 'porte'], bannerImage: '', averageStartingPrice: 25000 },
  { id: '5', name: 'Peinture & Étanchéité', slug: 'peinture', iconName: 'Paintbrush', description: 'Peinture bâtiment et façades', shortDesc: 'Intérieur & Extérieur', providerCount: 14, popularKeywords: ['enduit', 'étanchéité'], bannerImage: '', averageStartingPrice: 18000 }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  { id: '1', name: 'Almadies', city: 'Dakar', latitude: 14.7452, longitude: -17.5186, popularServices: ['Plomberie', 'Climatisation'] },
  { id: '2', name: 'Mermoz', city: 'Dakar', latitude: 14.7081, longitude: -17.4719, popularServices: ['Électricité', 'Peinture'] },
  { id: '3', name: 'Ngor', city: 'Dakar', latitude: 14.7500, longitude: -17.5167, popularServices: ['Serrurerie'] },
  { id: '4', name: 'Point E', city: 'Dakar', latitude: 14.6942, longitude: -17.4647, popularServices: ['Menuiserie'] }
];

export const SENEGAL_REGIONS = [
  { id: 'dakar', name: 'Dakar', districts: [{ id: 'dakar-centre', name: 'Dakar Ville' }] }
];

export const PROVIDERS: Provider[] = [
  {
    id: 'prov-01',
    slug: 'moussa-diop-plomberie-express',
    name: 'Moussa Diop',
    businessName: 'Diop Plomberie Express',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    headline: 'Maître artisan plombier certifié — Urgences 24/7 Dakar',
    bio: 'Plus de 12 ans d expérience dans le dépannage rapide et la plomberie sanitaire.',
    categorySlug: 'plomberie',
    categoryName: 'Plomberie & Sanitaire',
    specialties: ['Recherche de fuite', 'Installation sanitaire'],
    city: 'Dakar',
    neighborhood: 'Almadies',
    phone: '+221 77 123 45 67',
    whatsapp: '221771234567',
    averageRating: 4.9,
    reviewCount: 48,
    startingPrice: 15000,
    isAvailable: true,
    experienceYears: 12
  }
];

// ==========================================================
// ORGANISATIONS DÉMO
// ==========================================================
export const DEMO_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-ecs-btp',
    name: 'ECS BTP & Immobilier',
    slug: 'ecs-btp',
    logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=300&q=80',
    activityType: 'Entreprise BTP',
    phone: '+221 33 824 10 10',
    email: 'contact@ecs-btp.sn',
    website: 'https://ecs-btp.sn',
    address: 'Vdn Extension 3, Sacré-Cœur 3',
    city: 'Dakar',
    region: 'Dakar',
    whatsappNumber: '221778000000',
    taxId: 'SN-NINEA-009876543',
    bio: 'Chef de file des travaux publics, génie civil, promotion et construction immobilière haut de gamme à Dakar et sur l ensemble du Sénégal.',
    plan: 'BUSINESS',
    status: 'ACTIVE',
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 'org-noune-immo',
    name: 'Noune Immobilier SARL',
    slug: 'noune-immo',
    logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80',
    activityType: 'Agence immobilière',
    phone: '+221 33 860 20 20',
    email: 'contact@noune-immo.sn',
    website: 'https://noune-immo.sn',
    address: 'Route des Almadies, Immeuble Prestige',
    city: 'Dakar',
    region: 'Dakar',
    whatsappNumber: '221776543210',
    taxId: 'SN-NINEA-001234567',
    bio: 'Agence spécialisée dans la transaction, la location et la gestion locative d immeubles de standing aux Almadies, Ngor, Mermoz et Point E.',
    plan: 'PRO',
    status: 'ACTIVE',
    createdAt: '2025-02-01T09:00:00Z'
  },
  {
    id: 'org-sama-construction',
    name: 'Sama Construction & Design',
    slug: 'sama-construction',
    logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&q=80',
    activityType: 'Architecture',
    phone: '+221 78 123 45 67',
    email: 'info@samaconstruction.sn',
    website: 'https://samaconstruction.sn',
    address: 'Avenue Cheikh Anta Diop, Fann',
    city: 'Dakar',
    region: 'Dakar',
    whatsappNumber: '221781234567',
    bio: 'Cabinet d architecture et entreprise générale de bâtiment. Conception plans 3D, suivi de chantiers et finitions de luxe.',
    plan: 'STARTER',
    status: 'ACTIVE',
    createdAt: '2025-03-10T11:30:00Z'
  }
];

// ==========================================================
// BIENS IMMOBILIERS DÉMO
// ==========================================================
export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'prop-alm-01',
    organizationId: 'org-noune-immo',
    organizationName: 'Noune Immobilier SARL',
    title: 'Superbe Appartement F4 avec Vue Panoramique sur Mer',
    reference: 'REF-ALM-04',
    slug: 'appartement-f4-vue-mer-almadies',
    propertyType: 'Appartement',
    transactionType: 'Location',
    price: 1250000,
    currency: 'FCFA',
    surface: 185,
    rooms: 3,
    bathrooms: 3,
    floors: 6,
    floorNumber: 4,
    address: 'Route des Almadies, vers La Pointe',
    neighborhood: 'Almadies',
    city: 'Dakar',
    region: 'Dakar',
    latitude: 14.7452,
    longitude: -17.5186,
    description: 'Magnifique appartement F4 moderne situé au 4ème étage d un immeuble récent aux Almadies. Grand séjour lumineux ouvrant sur un balcon avec vue dégagée sur l ocean. Suite parentale avec dressing et salle de bain privative. Cuisine entièrement équipée. Résidence sécurisée avec piscine, salle de sport, groupe électrogène et ascenseur.',
    features: ['Vue sur mer', 'Piscine commune', 'Salle de sport', 'Groupe électrogène', 'Réservoir d eau', 'Sécurité 24h/24', 'Parking sous-sol'],
    amenities: ['Climatisation intégrée', 'Cuisine équipée', 'Ascenseur', 'Fibre optique', 'Interphone'],
    ownerName: 'Ousmane Diagne',
    agentName: 'Aïssatou Sow',
    agentPhone: '+221 77 654 32 10',
    agentWhatsapp: '221776543210',
    status: 'Disponible',
    viewsCount: 342,
    whatsappClicks: 58,
    inquiriesCount: 14,
    images: [
      {
        id: 'img-1',
        propertyId: 'prop-alm-01',
        organizationId: 'org-noune-immo',
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        isPrimary: true,
        displayOrder: 1
      },
      {
        id: 'img-2',
        propertyId: 'prop-alm-01',
        organizationId: 'org-noune-immo',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        isPrimary: false,
        displayOrder: 2
      },
      {
        id: 'img-3',
        propertyId: 'prop-alm-01',
        organizationId: 'org-noune-immo',
        imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
        isPrimary: false,
        displayOrder: 3
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2025-08-01T10:00:00Z'
  },
  {
    id: 'prop-mer-02',
    organizationId: 'org-noune-immo',
    organizationName: 'Noune Immobilier SARL',
    title: 'Villa d Exception R+2 avec Jardin & Piscine Privée',
    reference: 'REF-MER-02',
    slug: 'villa-exception-r2-piscine-mermoz',
    propertyType: 'Villa',
    transactionType: 'Vente',
    price: 360000000,
    currency: 'FCFA',
    surface: 450,
    rooms: 5,
    bathrooms: 5,
    floors: 3,
    floorNumber: 0,
    address: 'Mermoz Pyrotechnie',
    neighborhood: 'Mermoz',
    city: 'Dakar',
    region: 'Dakar',
    latitude: 14.7081,
    longitude: -17.4719,
    description: 'Spacieuse villa d architecte neuve construite avec des matériaux nobles. Double salon traversant, 5 grandes chambres climatisées, dépendance domestique, grande piscine privée et garage fermé pour 3 véhicules. Titre Foncier individuel.',
    features: ['Piscine privée', 'Grand jardin paysager', 'Garage 3 voitures', 'Titre Foncier', 'Groupe électrogène', 'Dépendance domestique'],
    amenities: ['Climatisation', 'Caméras de surveillance', 'Portail automatique', 'Cuisine américaine'],
    ownerName: 'Mamadou Kane',
    agentName: 'Mamadou Ndiaye',
    agentPhone: '+221 77 123 45 67',
    agentWhatsapp: '221771234567',
    status: 'Disponible',
    viewsCount: 520,
    whatsappClicks: 89,
    inquiriesCount: 22,
    images: [
      {
        id: 'img-4',
        propertyId: 'prop-mer-02',
        organizationId: 'org-noune-immo',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        isPrimary: true,
        displayOrder: 1
      },
      {
        id: 'img-5',
        propertyId: 'prop-mer-02',
        organizationId: 'org-noune-immo',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        isPrimary: false,
        displayOrder: 2
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2025-07-20T14:30:00Z'
  },
  {
    id: 'prop-ruf-03',
    organizationId: 'org-ecs-btp',
    organizationName: 'ECS BTP & Immobilier',
    title: 'Parcelle de Terrain Viabilisée de 500m² avec Titre Foncier',
    reference: 'REF-RUF-10',
    slug: 'terrain-viabilise-500m2-rufisque',
    propertyType: 'Terrain',
    transactionType: 'Vente',
    price: 28000000,
    currency: 'FCFA',
    surface: 500,
    rooms: 0,
    bathrooms: 0,
    address: 'Cité de la Paix, Proche Autoroute à Péage',
    neighborhood: 'Rufisque Nord',
    city: 'Rufisque',
    region: 'Dakar',
    latitude: 14.7167,
    longitude: -17.2667,
    description: 'Belle parcelle d angle plate de 500m² viabilisée (eau SDE et électricité Senelec). Idéal pour projet de villa individuelle ou petit immeuble locatif R+3. Document juridique : Titre Foncier individuel muté.',
    features: ['Titre Foncier', 'Viabilisé SDE/Senelec', 'Angle de rue', 'Accès direct autoroute'],
    amenities: ['Bornage effectué', 'Cadastre à jour'],
    ownerName: 'Moustapha Fall',
    agentName: 'Cheikh Tidiane Sy',
    agentPhone: '+221 77 800 00 00',
    agentWhatsapp: '221778000000',
    status: 'Disponible',
    viewsCount: 289,
    whatsappClicks: 41,
    inquiriesCount: 9,
    images: [
      {
        id: 'img-6',
        propertyId: 'prop-ruf-03',
        organizationId: 'org-ecs-btp',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        isPrimary: true,
        displayOrder: 1
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2025-08-10T16:00:00Z'
  },
  {
    id: 'prop-plt-04',
    organizationId: 'org-ecs-btp',
    organizationName: 'ECS BTP & Immobilier',
    title: 'Plateau de Bureaux Modernes de 220m² au Cœur de Dakar',
    reference: 'REF-PLT-88',
    slug: 'bureaux-modernes-220m2-dakar-plateau',
    propertyType: 'Bureau',
    transactionType: 'Location',
    price: 1800000,
    currency: 'FCFA',
    surface: 220,
    rooms: 6,
    bathrooms: 2,
    floors: 10,
    floorNumber: 5,
    address: 'Avenue Roume, Plateau',
    neighborhood: 'Plateau',
    city: 'Dakar',
    region: 'Dakar',
    description: 'Espace professionnel aménagé comprenant un accueil, une salle de réunion, 4 bureaux fermés et une kitchenette. Idéal pour siege social d entreprise, banque ou cabinet d avocats.',
    features: ['Ascenseur double flux', 'Fibre pro dédiée', 'Gardiennage 24/7', 'Parking réservé'],
    amenities: ['Climatisation centrale', 'Câblage réseau RJ45'],
    ownerName: 'Société Immobilière du Sénégal',
    agentName: 'Cheikh Tidiane Sy',
    agentPhone: '+221 77 800 00 00',
    agentWhatsapp: '221778000000',
    status: 'Disponible',
    viewsCount: 195,
    whatsappClicks: 32,
    inquiriesCount: 8,
    images: [
      {
        id: 'img-7',
        propertyId: 'prop-plt-04',
        organizationId: 'org-ecs-btp',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        isPrimary: true,
        displayOrder: 1
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2025-08-15T11:00:00Z'
  }
];

// ==========================================================
// PROJETS BTP DÉMO
// ==========================================================
export const DEMO_PROJECTS: BTPProject[] = [
  {
    id: 'proj-pte-01',
    organizationId: 'org-ecs-btp',
    name: 'Construction Résidence Résidentielle R+5 Point E',
    reference: 'PRJ-2026-PTE',
    slug: 'construction-residence-r5-point-e',
    clientName: 'Groupe RealEstate West Africa',
    companyName: 'ECS BTP & Immobilier',
    architectName: 'Cabinet Architecture Ndoye & Co',
    engineerName: 'Ing. Babacar Tall',
    address: 'Rue de Diourbel x Rue de Ziguinchor, Point E',
    city: 'Dakar',
    description: 'Projet de construction d un immeuble résidentiel haut de standing R+5 comportant 10 appartements F4 et 2 penthouses avec terrasse panoramique.',
    budget: 480000000,
    actualExpenses: 310000000,
    startDate: '2025-02-01',
    expectedEndDate: '2026-11-30',
    progress: 68,
    status: 'En cours',
    primaryImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2025-01-20T10:00:00Z',
    stages: [
      { id: 'stg-1', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 1, name: 'Étude & Permis de construire', progress: 100, budget: 15000000, expenses: 14500000, status: 'Terminé' },
      { id: 'stg-2', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 2, name: 'Terrassement & Fouille', progress: 100, budget: 25000000, expenses: 24800000, status: 'Terminé' },
      { id: 'stg-3', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 3, name: 'Fondations & Radier', progress: 100, budget: 65000000, expenses: 62000000, status: 'Terminé' },
      { id: 'stg-4', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 4, name: 'Élévation Poteaux / Poutres R+1 à R+5', progress: 100, budget: 120000000, expenses: 118000000, status: 'Terminé' },
      { id: 'stg-5', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 5, name: 'Dalle & Planchers', progress: 100, budget: 70000000, expenses: 69000000, status: 'Terminé' },
      { id: 'stg-6', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 6, name: 'Étanchéité Toiture & Maçonnerie', progress: 85, budget: 45000000, expenses: 40000000, status: 'En cours' },
      { id: 'stg-7', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 7, name: 'Électricité & Encastrement', progress: 60, budget: 35000000, expenses: 20000000, status: 'En cours' },
      { id: 'stg-8', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 8, name: 'Plomberie & Réseaux', progress: 50, budget: 30000000, expenses: 15000000, status: 'En cours' },
      { id: 'stg-9', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 9, name: 'Carrelage & Revêtement', progress: 30, budget: 40000000, expenses: 12000000, status: 'En cours' },
      { id: 'stg-10', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 10, name: 'Peinture & Enduits', progress: 0, budget: 20000000, expenses: 0, status: 'En attente' },
      { id: 'stg-11', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 11, name: 'Finitions & Menuiserie Alu', progress: 0, budget: 10000000, expenses: 0, status: 'En attente' },
      { id: 'stg-12', projectId: 'proj-pte-01', organizationId: 'org-ecs-btp', stageNumber: 12, name: 'Livraison & Réception', progress: 0, budget: 5000000, expenses: 0, status: 'En attente' }
    ]
  },
  {
    id: 'proj-plt-02',
    organizationId: 'org-ecs-btp',
    name: 'Projet Immeuble Commercial R+11 Dakar Plateau',
    reference: 'PRJ-2026-PLT',
    slug: 'immeuble-commercial-r11-plateau',
    clientName: 'Sénégal Invest Holding',
    companyName: 'ECS BTP & Immobilier',
    architectName: 'Atelier BTP & Design',
    engineerName: 'Ing. Seydou Sarr',
    address: 'Avenue Léopold Sédar Senghor, Plateau',
    city: 'Dakar',
    description: 'Chantier en cours pour un tour de bureaux et commerces de 11 étages avec 2 niveaux de sous-sol de parking.',
    budget: 1350000000,
    actualExpenses: 420000000,
    startDate: '2025-05-10',
    expectedEndDate: '2027-06-30',
    progress: 32,
    status: 'En cours',
    primaryImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    createdAt: '2025-04-15T08:00:00Z',
    stages: []
  }
];

// ==========================================================
// JOURNAL DE CHANTIER DÉMO
// ==========================================================
export const DEMO_CONSTRUCTION_LOGS: ConstructionLog[] = [
  {
    id: 'log-01',
    projectId: 'proj-pte-01',
    projectName: 'Construction Résidence R+5 Point E',
    organizationId: 'org-ecs-btp',
    logDate: '2026-09-04',
    authorName: 'Ing. Babacar Tall',
    weather: 'Ensoleillé, 31°C',
    workDone: 'Poulage de la dalle du 4ème étage effectué avec succès. Pose des conduits électriques encastrés au 3ème étage.',
    workersCount: 24,
    equipmentUsed: 'Toupie à béton Lafarge, Grue à tour, 2 Vibreurs à béton',
    materialsUsed: '45m³ de béton C30/37, 3.2 tonnes de fer à béton Ø12 et Ø14',
    incidents: 'Aucun incident à déplorer.',
    observations: 'Prévoir réapprovisionnement en ciment SOCOCIM pour lundi matin.',
    images: ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80'],
    createdAt: '2026-09-04T18:00:00Z'
  }
];

// ==========================================================
// CLIENTS, PROPRIÉTAIRES, LOCATAIRES
// ==========================================================
export const DEMO_CLIENTS: Client[] = [
  {
    id: 'cli-01',
    organizationId: 'org-noune-immo',
    firstName: 'Amadou',
    lastName: 'Ba',
    phone: '+221 77 555 11 22',
    email: 'amadou.ba@gmail.com',
    address: 'Point E, Dakar',
    clientType: 'Locataire',
    notes: 'Recherche appartement F4 aux Almadies ou Ngor.',
    source: 'Site Web',
    createdAt: '2025-07-01T10:00:00Z'
  },
  {
    id: 'cli-02',
    organizationId: 'org-noune-immo',
    firstName: 'Fatou',
    lastName: 'Ndiaye',
    phone: '+221 78 333 44 55',
    email: 'fatou.ndiaye@yahoo.fr',
    address: 'Mermoz, Dakar',
    clientType: 'Acheteur',
    notes: 'Budget 300 millions FCFA pour villa avec jardin.',
    source: 'Recommandation',
    createdAt: '2025-06-15T14:20:00Z'
  }
];

export const DEMO_OWNERS: Owner[] = [
  {
    id: 'own-01',
    organizationId: 'org-noune-immo',
    name: 'Ousmane Diagne',
    phone: '+221 77 222 33 44',
    email: 'o.diagne@immo.sn',
    address: 'Almadies, Dakar',
    propertiesCount: 3,
    createdAt: '2025-01-10T09:00:00Z'
  }
];

export const DEMO_TENANTS: Tenant[] = [
  {
    id: 'ten-01',
    organizationId: 'org-noune-immo',
    name: 'Amadou Ba',
    phone: '+221 77 555 11 22',
    email: 'amadou.ba@gmail.com',
    address: 'Almadies, Dakar',
    propertyId: 'prop-alm-01',
    propertyTitle: 'Superbe Appartement F4 Vue Mer',
    entryDate: '2025-09-01',
    leaseEndDate: '2026-08-31',
    monthlyRent: 1250000,
    depositAmount: 2500000,
    status: 'Actif',
    createdAt: '2025-08-25T11:00:00Z'
  }
];

// ==========================================================
// CONTRATS & PAIEMENTS
// ==========================================================
export const DEMO_CONTRACTS: Contract[] = [
  {
    id: 'cnt-01',
    organizationId: 'org-noune-immo',
    contractNumber: 'CTR-2025-ALM01',
    contractType: 'Bail',
    clientName: 'Amadou Ba',
    ownerName: 'Ousmane Diagne',
    propertyTitle: 'Appartement F4 Vue Mer aux Almadies',
    startDate: '2025-09-01',
    endDate: '2026-08-31',
    amount: 1250000,
    terms: 'Bail à usage d habitation d un an renouvelable. Caution de 2 mois de loyer. Règlement le 5 de chaque mois par Wave ou Virement.',
    status: 'Actif',
    createdAt: '2025-08-25T12:00:00Z'
  }
];

export const DEMO_PAYMENTS: Payment[] = [
  {
    id: 'pay-01',
    organizationId: 'org-noune-immo',
    amount: 1250000,
    paymentType: 'Loyer',
    clientName: 'Amadou Ba',
    propertyTitle: 'Appartement F4 Vue Mer aux Almadies',
    paymentDate: '2026-09-01',
    paymentMethod: 'Wave',
    reference: 'WAVE-TX-98712365',
    status: 'Payé',
    createdAt: '2026-09-01T09:15:00Z'
  },
  {
    id: 'pay-02',
    organizationId: 'org-ecs-btp',
    amount: 45000000,
    paymentType: 'Jalon BTP',
    clientName: 'Groupe RealEstate West Africa',
    propertyTitle: 'Projet Résidence Point E',
    paymentDate: '2026-08-20',
    paymentMethod: 'Virement',
    reference: 'VIR-CBI-20260820-001',
    status: 'Payé',
    createdAt: '2026-08-20T16:00:00Z'
  }
];

// ==========================================================
// DOCUMENTS DÉMO
// ==========================================================
export const DEMO_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-01',
    organizationId: 'org-noune-immo',
    name: 'Contrat de Bail Signé — Amadou Ba.pdf',
    category: 'Contrats',
    fileUrl: '#',
    fileSize: 2450,
    fileType: 'pdf',
    uploadedBy: 'Aïssatou Sow',
    createdAt: '2025-08-25T12:30:00Z'
  },
  {
    id: 'doc-02',
    organizationId: 'org-ecs-btp',
    name: 'Plan d Architecture Approuvé R+5 Point E.pdf',
    category: 'Plans',
    fileUrl: '#',
    fileSize: 18400,
    fileType: 'pdf',
    uploadedBy: 'Ing. Babacar Tall',
    createdAt: '2025-01-22T10:00:00Z'
  }
];

// ==========================================================
// PUBLICATIONS CMS DÉMO
// ==========================================================
export const DEMO_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-01',
    organizationId: 'org-noune-immo',
    organizationName: 'Noune Immobilier SARL',
    title: 'Comment bien investir dans l immobilier neuf à Dakar en 2026',
    slug: 'comment-bien-investir-immobilier-neuf-dakar-2026',
    content: 'Le marché immobilier sénégalais connaît une croissance soutenue portée par les projets d infrastructure et l urbanisation rapide de la région de Dakar et de Diamniadio. Découvrez nos conseils pour sécuriser votre investissement avec Titre Foncier.',
    category: 'Conseil immobilier',
    primaryImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    author: 'Equipe Noune Immo',
    status: 'Publié',
    publishDate: '2026-08-15T10:00:00Z',
    keywords: ['Immobilier Dakar', 'Investissement Sénégal', 'Titre Foncier', 'Almadies'],
    viewsCount: 1420,
    createdAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'pub-02',
    organizationId: 'org-ecs-btp',
    organizationName: 'ECS BTP & Immobilier',
    title: 'Avancement du Chantier Résidence Point E R+5',
    slug: 'avancement-chantier-residence-point-e-r5',
    content: 'Les travaux de gros œuvre touchent à leur fin pour notre projet phare à Point E. Le coulage de la dalle supérieure a été achevé cette semaine dans le respect des normes HQE.',
    category: 'Chantier',
    primaryImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    author: 'Equipe ECS BTP',
    status: 'Publié',
    publishDate: '2026-09-02T14:00:00Z',
    keywords: ['BTP Sénégal', 'Chantier Dakar', 'Point E', 'ECS BTP'],
    viewsCount: 890,
    createdAt: '2026-09-02T14:00:00Z'
  }
];

// ==========================================================
// PRESTATAIRES & ARTISANS DÉMO
// ==========================================================
export const DEMO_SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: 'prov-01',
    slug: 'moussa-diop-plomberie-express',
    name: 'Moussa Diop',
    businessName: 'Diop Plomberie Express',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    headline: 'Maître artisan plombier certifié — Urgences 24/7 Dakar',
    bio: 'Plus de 12 ans d expérience dans le dépannage rapide, la recherche de fuite et la plomberie sanitaire haut de gamme à Dakar.',
    categoryName: 'Plomberie & Sanitaire',
    specialties: ['Recherche de fuite', 'Installation sanitaire', 'Débouchage haute pression', 'Chauffe-eau solaire'],
    city: 'Dakar',
    region: 'Dakar',
    neighborhood: 'Almadies',
    phone: '+221 77 123 45 67',
    whatsapp: '221771234567',
    rating: 4.9,
    reviewsCount: 48,
    startingPrice: 15000,
    isAvailable: true,
    yearsExperience: 12
  },
  {
    id: 'prov-02',
    slug: 'ibrahima-fall-clim-pro',
    name: 'Ibrahima Fall',
    businessName: 'Fall Climatisation Pro',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    headline: 'Technicien frigoriste agréé — Split & Chambres froides',
    bio: 'Spécialiste de la maintenance préventive, installation de climatiseurs inverter et recharge de gaz R410 à Dakar.',
    categoryName: 'Climatisation & Froid',
    specialties: ['Installation Split', 'Recharge de gaz', 'Nettoyage antibactérien', 'Maintenance d immeuble'],
    city: 'Dakar',
    region: 'Dakar',
    neighborhood: 'Ngor',
    phone: '+221 78 456 78 90',
    whatsapp: '221784567890',
    rating: 4.8,
    reviewsCount: 36,
    startingPrice: 20000,
    isAvailable: true,
    yearsExperience: 8
  }
];

// ==========================================================
// PLANS DE SOUSCRIPTION SAAS
// ==========================================================
export const DEMO_SAAS_PLANS: SaaSPlan[] = [
  {
    id: 'plan-starter',
    name: 'STARTER',
    priceMonthly: 25000,
    priceYearly: 240000,
    maxProperties: 15,
    maxProjects: 3,
    maxUsers: 2,
    features: [
      'Jusqu à 15 biens immobiliers',
      '3 projets BTP actifs',
      '2 utilisateurs inclus',
      'Galerie photos standard',
      'Export fiches & contrats PDF',
      'Support par email'
    ]
  },
  {
    id: 'plan-pro',
    name: 'PRO',
    priceMonthly: 65000,
    priceYearly: 650000,
    maxProperties: 100,
    maxProjects: 15,
    maxUsers: 10,
    features: [
      'Jusqu à 100 biens immobiliers',
      '15 projets BTP avec journal de chantier',
      '10 utilisateurs avec rôles & RLS',
      'Bouton WhatsApp pré-rempli',
      'CRM Clients & Locataires complet',
      'Gestion des paiements (Wave / OM)',
      'Statistiques avancées',
      'Support prioritaire 7j/7'
    ]
  },
  {
    id: 'plan-business',
    name: 'BUSINESS',
    priceMonthly: 150000,
    priceYearly: 1500000,
    maxProperties: 9999,
    maxProjects: 9999,
    maxUsers: 9999,
    features: [
      'Biens immobiliers illimités',
      'Projets BTP illimités',
      'Nombre d utilisateurs illimité',
      'Multi-agences & filiales',
      'Nom de domaine personnalisé',
      'Intégration API & Export comptable',
      'Gestionnaire de compte dédié'
    ]
  }
];

// ==========================================================
// NOTIFICATIONS DÉMO
// ==========================================================
export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    organizationId: 'org-noune-immo',
    title: 'Nouveau paiement reçu',
    message: 'Le loyer de 1 250 000 FCFA pour l appartement Almadies a été réglé par Wave par Amadou Ba.',
    type: 'paiement',
    isRead: false,
    createdAt: '2026-09-01T09:16:00Z'
  },
  {
    id: 'notif-02',
    organizationId: 'org-ecs-btp',
    title: 'Nouvelle entrée au journal de chantier',
    message: 'Ing. Babacar Tall a publié la mise à jour pour le projet Résidence Point E.',
    type: 'projet',
    isRead: true,
    createdAt: '2026-09-04T18:05:00Z'
  }
];
