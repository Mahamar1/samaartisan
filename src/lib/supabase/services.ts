import { supabase, isSupabaseConfigured } from './client';
import { PROVIDERS, CATEGORIES } from '@/lib/data';
import { Provider } from '@/lib/types';

function mapDbProviderToApp(item: any): Provider {
  return {
    id: item.id,
    slug: item.slug || String(item.id),
    name: item.name,
    businessName: item.business_name || item.name,
    avatar: item.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    phone: item.phone,
    whatsapp: item.whatsapp || item.phone.replace(/[^0-9]/g, ''),
    categorySlug: item.category_slug || 'plomberie',
    categoryName: item.category_name || 'Artisan',
    headline: item.headline || `Artisan professionnel qualifié à Dakar`,
    city: item.city || 'Dakar',
    neighborhood: item.neighborhood || 'Dakar',
    latitude: item.latitude ? Number(item.latitude) : 14.7167,
    longitude: item.longitude ? Number(item.longitude) : -17.4677,
    interventionRadiusKm: item.intervention_radius_km ? Number(item.intervention_radius_km) : 15,
    averageRating: item.average_rating ? Number(item.average_rating) : 5.0,
    reviewCount: item.review_count ? Number(item.review_count) : 0,
    startingPrice: item.starting_price ? Number(item.starting_price) : 15000,
    responseTimeMinutes: item.response_time_minutes ? Number(item.response_time_minutes) : 15,
    isAvailable: item.is_available ?? true,
    verificationLevel: item.verification_level || 'UNVERIFIED',
    subscriptionTier: 'FREE',
    completedJobsCount: item.completed_jobs_count ? Number(item.completed_jobs_count) : 10,
    joinedDate: item.created_at || new Date().toISOString(),
    isSponsored: false,
    experienceYears: item.years_experience ? Number(item.years_experience) : (item.experience_years ? Number(item.experience_years) : 4),
    bio: item.bio || 'Artisan certifié et expérimenté au Sénégal.',
    specialties: (item.specialties || ['Intervention rapide', 'Travail soigné']).filter((s: string) => !s.toLowerCase().includes('devis gratuit')),
    services: item.services || [],
    portfolio: item.portfolio || [],
    reviews: item.reviews || []
  };
}

// 1. FETCH ALL PROVIDERS (Supabase Live with Fallback)
export async function getProviders(): Promise<Provider[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase query error:', error);
      } else if (data) {
        return data.map(mapDbProviderToApp);
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local dataset:', err);
    }
  }

  // Fallback to localStorage or empty array
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('sama_admin_providers_data');
    if (local) {
      try {
        return JSON.parse(local);
      } catch {}
    }
  }

  return PROVIDERS || [];
}

// 2. FETCH A SINGLE PROVIDER BY SLUG (Supabase Live with Fallback)
export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        return mapDbProviderToApp(data);
      }
    } catch (err) {
      console.warn('Supabase single fetch failed:', err);
    }
  }

  const all = await getProviders();
  return all.find((p) => p.slug === slug) || null;
}

// 3. REGISTER A NEW ARTISAN (Supabase Live Insert)
export async function registerArtisan(artisanData: {
  name: string;
  businessName?: string;
  phone: string;
  categorySlug: string;
  categoryName: string;
  regionId: string;
  neighborhood: string;
  cniNumber?: string;
}) {
  const newSlug = artisanData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
  const defaultAvatar = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80';

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .insert([
          {
            slug: newSlug,
            name: artisanData.name,
            business_name: artisanData.businessName || artisanData.name,
            avatar: defaultAvatar,
            phone: artisanData.phone,
            whatsapp: artisanData.phone.replace(/[^0-9]/g, ''),
            category_slug: artisanData.categorySlug,
            category_name: artisanData.categoryName,
            region_id: artisanData.regionId,
            neighborhood: artisanData.neighborhood,
            address: `${artisanData.neighborhood}, Dakar`,
            is_available: true,
            verification_level: 'ID_VERIFIED',
            cni_number: artisanData.cniNumber || null,
            average_rating: 5.0,
            review_count: 0,
            starting_price: 15000,
            response_time_minutes: 15,
            years_experience: 4,
            bio: `Artisan qualifié en ${artisanData.categoryName} intervenant à ${artisanData.neighborhood} et dans la région de Dakar.`,
            specialties: ['Prestations soignées', 'Intervention rapide', 'Conseils professionnels'],
            services: [
              { id: 's1', name: 'Diagnostic & Intervention Standard', indicativePrice: 15000, unit: 'forfait' },
              { id: 's2', name: 'Prestation Complète Sur Mesure', indicativePrice: 35000, unit: 'devis' }
            ]
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase registration error:', error);
      } else if (data) {
        const mapped = mapDbProviderToApp(data);
        return { success: true, data: mapped };
      }
    } catch (err) {
      console.error('Supabase registration exception:', err);
    }
  }

  // Local storage fallback
  const fallbackProvider: Provider = {
    id: `prov-${Date.now()}`,
    slug: newSlug,
    name: artisanData.name,
    businessName: artisanData.businessName || artisanData.name,
    avatar: defaultAvatar,
    phone: artisanData.phone,
    whatsapp: artisanData.phone.replace(/[^0-9]/g, ''),
    categorySlug: artisanData.categorySlug,
    categoryName: artisanData.categoryName,
    headline: `Artisan qualifié en ${artisanData.categoryName}`,
    city: 'Dakar',
    neighborhood: artisanData.neighborhood,
    latitude: 14.7167,
    longitude: -17.4677,
    interventionRadiusKm: 15,
    averageRating: 5.0,
    reviewCount: 0,
    startingPrice: 15000,
    responseTimeMinutes: 15,
    isAvailable: true,
    verificationLevel: 'ID_VERIFIED',
    subscriptionTier: 'FREE',
    completedJobsCount: 0,
    joinedDate: new Date().toISOString(),
    experienceYears: 4,
    bio: `Artisan qualifié en ${artisanData.categoryName} à ${artisanData.neighborhood}.`,
    specialties: ['Intervention rapide', 'Travail soigné'],
    services: [],
    portfolio: [],
    reviews: []
  };

  if (typeof window !== 'undefined') {
    const existing = JSON.parse(localStorage.getItem('sama_artisan_registrations') || '[]');
    existing.unshift({
      id: `reg-${Date.now()}`,
      ...artisanData,
      status: 'APPROVED',
      dateSubmitted: 'À l\'instant'
    });
    localStorage.setItem('sama_artisan_registrations', JSON.stringify(existing));

    const currentPros = JSON.parse(localStorage.getItem('sama_admin_providers_data') || '[]');
    currentPros.unshift(fallbackProvider);
    localStorage.setItem('sama_admin_providers_data', JSON.stringify(currentPros));
  }

  return { success: true, data: fallbackProvider };
}

// 4. UPDATE PROVIDER STATUS (Verify, Suspend, Update Info)
export async function updateProvider(id: string, updates: Partial<Provider>) {
  if (isSupabaseConfigured()) {
    try {
      const dbUpdates: any = {};
      if (updates.verificationLevel !== undefined) dbUpdates.verification_level = updates.verificationLevel;
      if (updates.isAvailable !== undefined) dbUpdates.is_available = updates.isAvailable;
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.businessName !== undefined) dbUpdates.business_name = updates.businessName;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.neighborhood !== undefined) dbUpdates.neighborhood = updates.neighborhood;

      const { data, error } = await supabase
        .from('providers')
        .update(dbUpdates)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
      } else {
        return { success: true, data };
      }
    } catch (err) {
      console.error('Supabase update exception:', err);
    }
  }

  return { success: true, fallback: true };
}

// 5. DELETE PROVIDER (Supabase Live Delete)
export async function deleteProvider(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('providers')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error:', error);
      } else {
        return { success: true };
      }
    } catch (err) {
      console.error('Supabase delete exception:', err);
    }
  }

  return { success: true, fallback: true };
}

// 6. LOG SERVICE REQUEST / CONTACT CLICK (Supabase Live Tracking)
export async function logServiceRequest(request: {
  providerId?: string;
  clientName: string;
  clientPhone: string;
  serviceType: string;
  channel: 'WHATSAPP' | 'CALL' | 'FORM';
  details?: string;
}) {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert([
          {
            provider_id: request.providerId || null,
            client_name: request.clientName || 'Visiteur Anonyme',
            client_phone: request.clientPhone || 'N/A',
            service_type: request.serviceType,
            channel: request.channel,
            details: request.details || null,
            status: 'CONTACTED'
          }
        ]);

      if (error) console.error('Error logging service request to Supabase:', error);
    } catch (err) {
      console.warn('Logging request failed:', err);
    }
  }
}
