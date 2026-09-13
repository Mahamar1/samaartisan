// ==========================================================
// TYPES DE DONNÉES SAMA BTP IMMO & ARTISANS SÉNÉGAL
// ==========================================================

export type UserRole = 
  | 'super_admin' 
  | 'owner' 
  | 'admin' 
  | 'manager' 
  | 'agent' 
  | 'editor' 
  | 'accountant' 
  | 'viewer'
  | 'CUSTOMER'
  | 'PROVIDER';

export type OrganizationActivity = 
  | 'Agence immobilière'
  | 'Entreprise BTP'
  | 'Promoteur immobilier'
  | 'Gestion immobilière'
  | 'Architecture'
  | "Bureau d'études"
  | 'Artisan'
  | 'Autre';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string;
  activityType: OrganizationActivity;
  phone: string;
  email: string;
  website?: string;
  address?: string;
  city: string;
  region: string;
  whatsappNumber: string;
  taxId?: string;
  bio?: string;
  plan: 'STARTER' | 'PRO' | 'BUSINESS';
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  isSuperAdmin: boolean;
  organizationId?: string;
  organizationName?: string;
  role?: UserRole;
}

// ----------------------------------------------------------
// COMPATIBILITÉ ARTISANS & ANCIENS PRESTATAIRES
// ----------------------------------------------------------

export type VerificationLevel = 
  | 'UNVERIFIED' 
  | 'PHONE_VERIFIED' 
  | 'ID_VERIFIED' 
  | 'CERTIFIED_PRO' 
  | 'RECOMMENDED';

export type SubscriptionTier = 'FREE' | 'PRO' | 'PREMIUM';

export type UrgencyLevel = 'IMMEDIATE' | 'TODAY' | 'THIS_WEEK' | 'FLEXIBLE';

export type RequestStatus = 
  | 'PENDING' 
  | 'CONTACTED_WHATSAPP' 
  | 'ACCEPTED' 
  | 'DECLINED' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface ServiceItem {
  id: string;
  name: string;
  indicativePrice: number;
  unit: string;
}

export interface Review {
  id: string;
  providerId: string;
  customerName: string;
  customerAvatar?: string;
  customerCity?: string;
  rating: number;
  qualityRating?: number;
  punctualityRating?: number;
  communicationRating?: number;
  priceRating?: number;
  comment: string;
  providerReply?: string;
  date: string;
  isVerifiedService: boolean;
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  date?: string;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  businessName: string;
  avatar: string;
  coverImage?: string;
  headline?: string;
  bio?: string;
  categorySlug?: string;
  categoryName?: string;
  specialties?: string[];
  city?: string;
  region?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  interventionRadiusKm?: number;
  phone: string;
  whatsapp?: string;
  experienceYears?: number;
  verificationLevel?: VerificationLevel;
  subscriptionTier?: SubscriptionTier;
  isAvailable?: boolean;
  averageRating?: number;
  reviewCount?: number;
  completedJobsCount?: number;
  responseTimeMinutes?: number;
  services?: ServiceItem[];
  portfolio?: PortfolioItem[];
  reviews?: Review[];
  startingPrice?: number;
  joinedDate?: string;
  isSponsored?: boolean;
  documentsVerified?: {
    cni: boolean;
    businessRegister: boolean;
    diploma: boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  shortDesc: string;
  providerCount: number;
  popularKeywords: string[];
  bannerImage: string;
  averageStartingPrice: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  latitude: number;
  longitude: number;
  popularServices: string[];
}

export interface ServiceRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  providerId: string;
  providerName: string;
  serviceCategory: string;
  description: string;
  neighborhood: string;
  urgency: UrgencyLevel;
  preferredDate?: string;
  budgetIndicative?: number;
  photos?: string[];
  status: RequestStatus;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier?: SubscriptionTier;
  priceMonthlyFcfa?: number;
  priceAnnualFcfa?: number;
  priceMonthlyEur?: number;
  badge?: string;
  description?: string;
  features?: string[];
  isPopular?: boolean;
  maxPhotos?: number;
  contactsLimit?: 'LIMITED' | 'UNLIMITED';
  prioritySupport?: boolean;
  boostedRanking?: boolean;
}

// ----------------------------------------------------------
// MODULE IMMOBILIER
// ----------------------------------------------------------

export type PropertyType = 
  | 'Appartement'
  | 'Villa'
  | 'Maison'
  | 'Terrain'
  | 'Bureau'
  | 'Magasin'
  | 'Immeuble'
  | 'Studio'
  | 'Chambre'
  | 'Entrepôt'
  | 'Local commercial'
  | 'Résidence'
  | 'Hôtel'
  | 'Terrain agricole';

export type TransactionType = 
  | 'Vente'
  | 'Location'
  | 'Location courte durée'
  | 'Location longue durée';

export type PropertyStatus = 
  | 'Brouillon'
  | 'Disponible'
  | 'Réservé'
  | 'Loué'
  | 'Vendu'
  | 'Masqué';

export interface PropertyImage {
  id: string;
  propertyId: string;
  organizationId: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface Property {
  id: string;
  organizationId: string;
  organizationName?: string;
  title: string;
  reference: string;
  slug: string;
  propertyType: PropertyType;
  transactionType: TransactionType;
  price: number; // in FCFA
  currency: string;
  surface: number; // in m²
  rooms: number;
  bathrooms: number;
  floors?: number;
  floorNumber?: number;
  address: string;
  neighborhood: string;
  commune?: string;
  city: string;
  region: string;
  latitude?: number;
  longitude?: number;
  description: string;
  features: string[];
  amenities: string[];
  ownerId?: string;
  ownerName?: string;
  agentId?: string;
  agentName?: string;
  agentPhone?: string;
  agentWhatsapp?: string;
  status: PropertyStatus;
  viewsCount: number;
  whatsappClicks: number;
  inquiriesCount: number;
  images: PropertyImage[];
  primaryImage?: string;
  createdAt: string;
}

// ----------------------------------------------------------
// MODULE BTP & PROJETS
// ----------------------------------------------------------

export type ProjectStatus = 
  | 'Planification'
  | 'En préparation'
  | 'En cours'
  | 'Suspendu'
  | 'Terminé'
  | 'Annulé';

export interface ProjectStage {
  id: string;
  projectId: string;
  organizationId: string;
  stageNumber: number; // 1 to 12
  name: string;
  description?: string;
  progress: number; // 0 to 100
  responsible?: string;
  budget: number;
  expenses: number;
  startDate?: string;
  endDate?: string;
  status: 'En attente' | 'En cours' | 'Terminé';
}

export interface ConstructionLog {
  id: string;
  projectId: string;
  projectName?: string;
  organizationId: string;
  logDate: string;
  authorName: string;
  weather: string;
  workDone: string;
  workersCount: number;
  equipmentUsed?: string;
  materialsUsed?: string;
  incidents?: string;
  observations?: string;
  images: string[];
  createdAt: string;
}

export interface BTPProject {
  id: string;
  organizationId: string;
  name: string;
  reference: string;
  slug: string;
  clientName?: string;
  companyName?: string;
  architectName?: string;
  engineerName?: string;
  address: string;
  city: string;
  description?: string;
  budget: number;
  actualExpenses: number;
  startDate?: string;
  expectedEndDate?: string;
  actualEndDate?: string;
  progress: number; // 0 to 100
  status: ProjectStatus;
  stages: ProjectStage[];
  logsCount?: number;
  primaryImage?: string;
  createdAt: string;
}

// ----------------------------------------------------------
// CRM, CLIENTS, PROPRIÉTAIRES, LOCATAIRES, CONTRATS & PAIEMENTS
// ----------------------------------------------------------

export type ClientType = 
  | 'Acheteur'
  | 'Locataire'
  | 'Propriétaire'
  | 'Investisseur'
  | 'Entreprise'
  | 'Autre';

export interface Client {
  id: string;
  organizationId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
  clientType: ClientType;
  notes?: string;
  source: string;
  agentId?: string;
  createdAt: string;
}

export interface Owner {
  id: string;
  organizationId: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  propertiesCount: number;
  createdAt: string;
}

export interface Tenant {
  id: string;
  organizationId: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  propertyId?: string;
  propertyTitle?: string;
  entryDate?: string;
  leaseEndDate?: string;
  monthlyRent: number;
  depositAmount: number;
  status: 'Actif' | 'En retard' | 'Contrat expiré' | 'Sorti';
  createdAt: string;
}

export type ContractType = 
  | 'Bail'
  | 'Vente'
  | 'Gestion immobilière'
  | 'Prestation'
  | 'Construction';

export interface Contract {
  id: string;
  organizationId: string;
  contractNumber: string;
  contractType: ContractType;
  clientId?: string;
  clientName?: string;
  ownerId?: string;
  ownerName?: string;
  propertyId?: string;
  propertyTitle?: string;
  startDate: string;
  endDate?: string;
  amount: number;
  terms?: string;
  pdfUrl?: string;
  status: 'Draft' | 'Actif' | 'Resilié' | 'Terminé' | 'Expiré';
  createdAt: string;
}

export type PaymentMethod = 
  | 'Espèces'
  | 'Wave'
  | 'Orange Money'
  | 'Virement'
  | 'Chèque'
  | 'Autre';

export interface Payment {
  id: string;
  organizationId: string;
  amount: number;
  paymentType: 'Loyer' | 'Vente' | 'Acompte' | 'Prestation' | 'Jalon BTP';
  clientId?: string;
  clientName?: string;
  propertyId?: string;
  propertyTitle?: string;
  contractId?: string;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  reference?: string;
  status: 'Payé' | 'En attente' | 'Annulé' | 'En retard';
  receiptUrl?: string;
  createdAt: string;
}

// ----------------------------------------------------------
// DOCUMENTS & PUBLICATIONS (CMS)
// ----------------------------------------------------------

export type DocumentCategory = 
  | 'Contrats'
  | 'Factures'
  | 'Quittances'
  | 'Plans'
  | 'Titres fonciers'
  | 'Pièces administratives'
  | 'Rapports'
  | 'Documents chantier'
  | 'Autres';

export interface DocumentItem {
  id: string;
  organizationId: string;
  name: string;
  category: DocumentCategory;
  fileUrl: string;
  fileSize: number; // KB
  fileType: string;
  uploadedBy: string;
  createdAt: string;
}

export type PublicationCategory = 
  | 'Vente' | 'Location' | 'Terrain' | 'Appartement' | 'Villa' | 'Maison' | 'Bureau' | 'Commerce'
  | 'Projet' | 'Chantier' | 'Construction' | 'Rénovation' | 'Architecture' | 'Réalisation'
  | 'Actualité' | 'Conseil immobilier' | 'Conseil BTP' | 'Guide' | 'Blog';

export interface Publication {
  id: string;
  organizationId: string;
  organizationName?: string;
  title: string;
  slug: string;
  content: string;
  category: PublicationCategory;
  primaryImage: string;
  gallery: string[];
  price?: number;
  location?: string;
  author: string;
  status: 'Brouillon' | 'En attente' | 'Publié' | 'Programmé' | 'Archivé';
  publishDate: string;
  scheduledDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords: string[];
  viewsCount: number;
  createdAt: string;
}

export interface ServiceProvider {
  id: string;
  slug: string;
  name: string;
  businessName: string;
  avatar: string;
  headline: string;
  bio: string;
  categoryName: string;
  specialties: string[];
  city: string;
  region: string;
  neighborhood: string;
  phone: string;
  whatsapp: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  isAvailable: boolean;
  yearsExperience: number;
}

export interface SaaSPlan {
  id: string;
  name: 'STARTER' | 'PRO' | 'BUSINESS';
  priceMonthly: number;
  priceYearly: number;
  maxProperties: number;
  maxProjects: number;
  maxUsers: number;
  features: string[];
}

export interface AuditLog {
  id: string;
  organizationId?: string;
  userName?: string;
  action: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  organizationId: string;
  title: string;
  message: string;
  type: 'client' | 'paiement' | 'contrat' | 'publication' | 'projet' | 'message' | 'rappel';
  isRead: boolean;
  createdAt: string;
}
