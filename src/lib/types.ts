export type UserRole = 'CUSTOMER' | 'PROVIDER' | 'ADMIN';

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
  indicativePrice: number; // in FCFA
  unit: string; // e.g. "forfait", "/ heure", "/ m²"
}

export interface Review {
  id: string;
  providerId: string;
  customerName: string;
  customerAvatar?: string;
  customerCity?: string;
  rating: number; // 1 to 5
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
  headline: string;
  bio: string;
  categorySlug: string;
  categoryName: string;
  specialties: string[];
  city: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  interventionRadiusKm: number;
  phone: string;
  whatsapp: string;
  experienceYears: number;
  verificationLevel: VerificationLevel;
  subscriptionTier: SubscriptionTier;
  isAvailable: boolean;
  averageRating: number;
  reviewCount: number;
  completedJobsCount: number;
  responseTimeMinutes: number;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  startingPrice: number; // in FCFA
  joinedDate: string;
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
  tier: SubscriptionTier;
  priceMonthlyFcfa: number;
  priceAnnualFcfa: number;
  priceMonthlyEur: number;
  badge: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  maxPhotos: number;
  contactsLimit: 'LIMITED' | 'UNLIMITED';
  prioritySupport: boolean;
  boostedRanking: boolean;
}

export interface AdminMetrics {
  mrrFcfa: number;
  activeSubscribers: number;
  totalProviders: number;
  pendingVerifications: number;
  totalServiceRequests: number;
  totalReviews: number;
  satisfactionRate: number;
  churnRatePercent: number;
}

export interface District {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
  districts: District[];
}
