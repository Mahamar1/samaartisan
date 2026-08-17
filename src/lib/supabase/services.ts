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

// Helper to check if an artisan or account was deleted by admin
export function isBlacklistedOrDeleted(item: { id?: string; slug?: string; phone?: string; whatsapp?: string; email?: string }): boolean {
  if (!item) return false;
  if (typeof window === 'undefined') return false;

  try {
    const deletedPros: string[] = JSON.parse(localStorage.getItem('sama_deleted_providers') || '[]');
    const deletedAccs: string[] = JSON.parse(localStorage.getItem('sama_deleted_accounts') || '[]');
    const allDeleted = [...deletedPros, ...deletedAccs];

    if (allDeleted.length === 0) return false;

    const pPhone = (item.phone || '').replace(/[^0-9]/g, '');
    const pWhatsApp = (item.whatsapp || '').replace(/[^0-9]/g, '');
    const pSlug = (item.slug || '').toLowerCase().trim();
    const pId = (item.id || '').toString().toLowerCase().trim();
    const pEmail = (item.email || '').toLowerCase().trim();

    for (const d of allDeleted) {
      if (!d) continue;
      const dStr = d.toString().toLowerCase().trim();
      if (pId && dStr === pId) return true;
      if (pSlug && dStr === pSlug) return true;
      if (pEmail && dStr === pEmail) return true;

      const dDigits = dStr.replace(/[^0-9]/g, '');
      if (dDigits.length >= 7) {
        if (pPhone && (pPhone.includes(dDigits) || dDigits.includes(pPhone))) return true;
        if (pWhatsApp && (pWhatsApp.includes(dDigits) || dDigits.includes(pWhatsApp))) return true;
      }
    }
  } catch {}

  return false;
}

// 1. FETCH ALL PROVIDERS (Supabase Live with Fallback & Real Sync)
export async function getProviders(): Promise<Provider[]> {
  let dbPros: Provider[] = [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Exclude all client accounts strictly from public artisan search
        const actualArtisans = data.filter(item => {
          const catName = (item.category_name || '').toLowerCase();
          const catSlug = (item.category_slug || '').toLowerCase();
          const pSlug = (item.slug || '').toLowerCase();
          const pName = (item.name || '').toLowerCase();
          const bName = (item.business_name || '').toLowerCase();

          if (catName.includes('client') || catSlug.includes('client')) return false;
          if (pSlug.startsWith('usr-')) return false;
          if (pName.includes('compte client') || bName.includes('compte client')) return false;

          // Exclude if deleted
          if (isBlacklistedOrDeleted({ id: item.id, slug: item.slug, phone: item.phone, whatsapp: item.whatsapp })) {
            return false;
          }

          return true;
        });
        dbPros = actualArtisans.map(mapDbProviderToApp);
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local dataset:', err);
    }
  }

  // Also include any real artisan registered locally (strictly NO clients)
  const localPros: Provider[] = [];
  if (typeof window !== 'undefined') {
    try {
      const storedPro = localStorage.getItem('samapro_current_user');
      if (storedPro) {
        const parsed = JSON.parse(storedPro);
        if (parsed && (parsed.name || parsed.phone)) {
          const catName = (parsed.categoryName || parsed.category_name || '').toLowerCase();
          const catSlug = (parsed.categorySlug || parsed.category_slug || '').toLowerCase();
          const pSlug = (parsed.slug || '').toLowerCase();
          const pName = (parsed.name || '').toLowerCase();
          const bName = (parsed.businessName || parsed.business_name || '').toLowerCase();
          const role = (parsed.role || '').toLowerCase();

          const isClient = 
            catName.includes('client') || 
            catSlug.includes('client') || 
            pSlug.startsWith('usr-') || 
            pName.includes('compte client') || 
            bName.includes('compte client') || 
            role === 'user' || 
            role === 'client';

          if (!isClient && !isBlacklistedOrDeleted(parsed)) {
            localPros.push(parsed);
          } else if (isBlacklistedOrDeleted(parsed)) {
            localStorage.removeItem('samapro_current_user');
          }
        }
      }

      const adminData = localStorage.getItem('sama_admin_providers_data');
      if (adminData) {
        const parsedAdmin = JSON.parse(adminData);
        if (Array.isArray(parsedAdmin)) {
          for (const item of parsedAdmin) {
            const catName = (item.categoryName || item.category_name || '').toLowerCase();
            const pName = (item.name || '').toLowerCase();
            if (!catName.includes('client') && !pName.includes('compte client') && !isBlacklistedOrDeleted(item)) {
              localPros.push(item);
            }
          }
        }
      }
    } catch {}
  }

  // Merge database pros + local registered pros + reference verified pros (PROVIDERS)
  const combined: Provider[] = [...dbPros];

  for (const lp of localPros) {
    if (lp && !isBlacklistedOrDeleted(lp) && !combined.some(c => (lp.phone && c.phone === lp.phone) || (lp.id && c.id === lp.id))) {
      combined.push(lp);
    }
  }

  for (const bp of (PROVIDERS || [])) {
    if (bp && !isBlacklistedOrDeleted(bp) && !combined.some(c => (bp.phone && c.phone === bp.phone) || (bp.id && c.id === bp.id))) {
      combined.push(bp);
    }
  }

  // Final absolute guarantee: ONLY real artisans, NEVER client accounts, NEVER deleted accounts
  const strictlyPros = combined.filter((p: any) => {
    if (!p) return false;
    if (isBlacklistedOrDeleted(p)) return false;

    const catName = (p.categoryName || p.category_name || '').toLowerCase();
    const catSlug = (p.categorySlug || p.category_slug || '').toLowerCase();
    const pSlug = (p.slug || '').toLowerCase();
    const pName = (p.name || '').toLowerCase();
    const bName = (p.businessName || p.business_name || '').toLowerCase();
    const role = (p.role || '').toLowerCase();

    if (catName.includes('client') || catSlug.includes('client')) return false;
    if (pSlug.startsWith('usr-')) return false;
    if (pName.includes('compte client') || bName.includes('compte client')) return false;
    if (role === 'user' || role === 'client') return false;
    return true;
  });

  return strictlyPros;
}

// 2. FETCH A SINGLE PROVIDER BY SLUG (Supabase Live with Fallback & Local Storage)
export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  if (!slug || slug === 'undefined' || slug === 'null') return null;
  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

  // 0. Check if blacklisted / deleted
  if (isBlacklistedOrDeleted({ slug: decodedSlug, id: decodedSlug, phone: decodedSlug })) {
    return null;
  }

  // 1. Check in local storage first for instant response
  if (typeof window !== 'undefined') {
    try {
      const storedPro = localStorage.getItem('samapro_current_user');
      if (storedPro) {
        const parsed = JSON.parse(storedPro);
        if (isBlacklistedOrDeleted(parsed)) {
          localStorage.removeItem('samapro_current_user');
          return null;
        }

        const pSlug = (parsed.slug || '').toLowerCase();
        const pNameSlug = (parsed.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const pPhone = (parsed.phone || '').replace(/[^0-9]/g, '');
        const targetPhone = decodedSlug.replace(/[^0-9]/g, '');

        if (
          pSlug === decodedSlug || 
          parsed.id === decodedSlug || 
          pNameSlug === decodedSlug || 
          (targetPhone.length >= 8 && pPhone.includes(targetPhone)) ||
          decodedSlug === 'mon-profil' || 
          decodedSlug === 'me'
        ) {
          return parsed;
        }
      }

      const accounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const matchedAcc = accounts.find((a: any) => {
        if (isBlacklistedOrDeleted(a)) return false;
        const aSlug = (a.slug || '').toLowerCase();
        const aNameSlug = (a.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const aPhone = (a.phone || '').replace(/[^0-9]/g, '');
        const targetPhone = decodedSlug.replace(/[^0-9]/g, '');
        return aSlug === decodedSlug || a.id === decodedSlug || aNameSlug === decodedSlug || (targetPhone.length >= 8 && aPhone.includes(targetPhone));
      });
      if (matchedAcc && matchedAcc.role === 'pro') {
        return {
          id: matchedAcc.id || `pro-${Date.now()}`,
          slug: matchedAcc.slug || (matchedAcc.name || 'artisan').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: matchedAcc.name,
          businessName: matchedAcc.businessName || matchedAcc.name,
          phone: matchedAcc.phone,
          whatsapp: (matchedAcc.phone || '').replace(/[^0-9]/g, ''),
          headline: matchedAcc.headline || 'Artisan Qualifié',
          categorySlug: matchedAcc.categorySlug || 'plomberie',
          categoryName: matchedAcc.categoryName || 'Artisanat & Services',
          neighborhood: matchedAcc.neighborhood || 'Dakar',
          city: 'Dakar',
          latitude: 14.7167,
          longitude: -17.4677,
          interventionRadiusKm: 20,
          experienceYears: matchedAcc.yearsExperience || 5,
          avatar: matchedAcc.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
          bio: matchedAcc.bio || 'Artisan professionnel qualifié au Sénégal.',
          verificationLevel: 'ID_VERIFIED',
          averageRating: 5.0,
          reviewCount: 0,
          startingPrice: 15000,
          responseTimeMinutes: 15,
          isAvailable: true,
          subscriptionTier: 'FREE',
          completedJobsCount: 0,
          joinedDate: new Date().toISOString(),
          specialties: ['Intervention rapide', 'Travail garanti'],
          services: [],
          portfolio: matchedAcc.portfolio || [],
          reviews: []
        };
      }
    } catch {}
  }

  // 2. Fetch from Supabase
  if (isSupabaseConfigured()) {
    try {
      const cleanPhone = decodedSlug.replace(/[^0-9]/g, '');
      let query = supabase.from('providers').select('*');

      if (cleanPhone.length >= 8) {
        query = query.or(`slug.eq.${decodedSlug},id.eq.${decodedSlug},phone.ilike.%${cleanPhone}%,whatsapp.ilike.%${cleanPhone}%`);
      } else {
        query = query.or(`slug.eq.${decodedSlug},id.eq.${decodedSlug}`);
      }

      const { data, error } = await query.maybeSingle();

      if (!error && data) {
        const mapped = mapDbProviderToApp(data);
        if (!isBlacklistedOrDeleted(mapped)) {
          return mapped;
        }
        return null;
      }
    } catch (err) {
      console.warn('Supabase single fetch failed:', err);
    }
  }

  // 3. Fallback to all known providers
  const all = await getProviders();
  return all.find((p) => {
    if (!p) return false;
    if (isBlacklistedOrDeleted(p)) return false;
    const pSlug = (p.slug || '').toLowerCase();
    const pNameSlug = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const pPhone = (p.phone || '').replace(/[^0-9]/g, '');
    const targetPhone = decodedSlug.replace(/[^0-9]/g, '');

    return (
      pSlug === decodedSlug || 
      p.id === decodedSlug || 
      pNameSlug === decodedSlug || 
      (targetPhone.length >= 8 && pPhone.includes(targetPhone))
    );
  }) || null;
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
      if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
      if (updates.avatar !== undefined) dbUpdates.avatar = updates.avatar;
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

// 5. DELETE PROVIDER (Supabase Live Delete & Instant Cross-Platform Purge)
export interface DeleteOptions {
  phone?: string;
  slug?: string;
  name?: string;
  role?: 'client' | 'pro';
}

export async function deleteProvider(id: string, options?: DeleteOptions): Promise<{ success: boolean }> {
  const cleanPhone = (options?.phone || '').replace(/[^0-9]/g, '');
  const cleanSlug = options?.slug ? options.slug.toLowerCase().trim() : '';

  // 1. Supabase Cloud Live Deletion
  if (isSupabaseConfigured()) {
    try {
      // Delete by ID if valid
      if (id && !id.startsWith('p-') && !id.startsWith('manual-') && !id.startsWith('usr-') && !id.startsWith('pro-') && !id.startsWith('reg-')) {
        await supabase.from('providers').delete().eq('id', id);
      }
      
      // Delete by slug
      if (cleanSlug) {
        await supabase.from('providers').delete().eq('slug', cleanSlug);
      }
      if (id) {
        await supabase.from('providers').delete().eq('slug', id);
      }

      // Delete by phone & whatsapp
      if (cleanPhone && cleanPhone.length >= 7) {
        await supabase.from('providers').delete().eq('whatsapp', cleanPhone);
        await supabase.from('providers').delete().ilike('phone', `%${cleanPhone.slice(-8)}%`);
      }

      if (options?.name) {
        await supabase.from('providers').delete().eq('name', options.name);
      }
    } catch (err) {
      console.warn('Supabase delete exception:', err);
    }
  }

  // 2. Cross-Device / LocalStorage Tombstone and Cache Purge
  if (typeof window !== 'undefined') {
    try {
      // A. Register in deleted blacklist so it NEVER resurfaces
      const deletedIds: string[] = JSON.parse(localStorage.getItem('sama_deleted_providers') || '[]');
      if (id && !deletedIds.includes(id)) deletedIds.push(id);
      if (cleanSlug && !deletedIds.includes(cleanSlug)) deletedIds.push(cleanSlug);
      if (cleanPhone && !deletedIds.includes(cleanPhone)) deletedIds.push(cleanPhone);
      localStorage.setItem('sama_deleted_providers', JSON.stringify(deletedIds));

      // B. Filter from sama_admin_providers_data
      const adminData = JSON.parse(localStorage.getItem('sama_admin_providers_data') || '[]');
      const filteredAdmin = adminData.filter((p: any) => {
        const pPhone = (p.phone || '').replace(/[^0-9]/g, '');
        const pSlug = (p.slug || '').toLowerCase();
        if (p.id === id || pSlug === cleanSlug || (cleanPhone && pPhone.includes(cleanPhone))) return false;
        return true;
      });
      localStorage.setItem('sama_admin_providers_data', JSON.stringify(filteredAdmin));

      // C. Filter from sama_registered_accounts
      const accounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const filteredAccs = accounts.filter((a: any) => {
        const aPhone = (a.phone || '').replace(/[^0-9]/g, '');
        const aSlug = (a.slug || '').toLowerCase();
        if (a.id === id || aSlug === cleanSlug || (cleanPhone && aPhone.includes(cleanPhone))) return false;
        return true;
      });
      localStorage.setItem('sama_registered_accounts', JSON.stringify(filteredAccs));

      // D. Filter from sama_artisan_registrations
      const reg = JSON.parse(localStorage.getItem('sama_artisan_registrations') || '[]');
      const filteredReg = reg.filter((r: any) => {
        const rPhone = (r.phone || '').replace(/[^0-9]/g, '');
        if (r.id === id || (cleanPhone && rPhone.includes(cleanPhone))) return false;
        return true;
      });
      localStorage.setItem('sama_artisan_registrations', JSON.stringify(filteredReg));

      // E. Clear session if it belongs to the deleted artisan
      const currentPro = localStorage.getItem('samapro_current_user');
      if (currentPro) {
        try {
          const parsedPro = JSON.parse(currentPro);
          const pPhone = (parsedPro.phone || '').replace(/[^0-9]/g, '');
          if (parsedPro.id === id || parsedPro.slug === cleanSlug || (cleanPhone && pPhone.includes(cleanPhone))) {
            localStorage.removeItem('samapro_current_user');
          }
        } catch {}
      }

      const currentSession = localStorage.getItem('sama_user_session');
      if (currentSession) {
        try {
          const parsedSession = JSON.parse(currentSession);
          const sPhone = (parsedSession.phone || '').replace(/[^0-9]/g, '');
          if (parsedSession.id === id || (cleanPhone && sPhone.includes(cleanPhone))) {
            localStorage.removeItem('sama_user_session');
            localStorage.removeItem('samapro_current_user');
          }
        } catch {}
      }

      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('sama_data_updated'));
    } catch (e) {
      console.warn('Local cleanup error:', e);
    }
  }

  return { success: true };
}

// 5b. DELETE USER ACCOUNT (Client or Pro User Full Deletion)
export async function deleteUserAccount(userId: string, options?: { phone?: string; email?: string; name?: string; role?: 'client' | 'pro' }): Promise<{ success: boolean }> {
  const cleanPhone = (options?.phone || '').replace(/[^0-9]/g, '');
  const cleanEmail = (options?.email || '').trim().toLowerCase();

  // 1. Delete from Supabase cloud
  if (isSupabaseConfigured()) {
    try {
      if (userId && !userId.startsWith('usr-') && !userId.startsWith('acc-') && !userId.startsWith('p-')) {
        await supabase.from('providers').delete().eq('id', userId);
      }
      if (cleanPhone && cleanPhone.length >= 7) {
        await supabase.from('providers').delete().eq('whatsapp', cleanPhone);
        await supabase.from('providers').delete().ilike('phone', `%${cleanPhone.slice(-8)}%`);
      }
      if (cleanEmail) {
        await supabase.from('providers').delete().ilike('bio', `%"email":"${cleanEmail}"%`);
      }
    } catch (err) {
      console.warn('Supabase delete user exception:', err);
    }
  }

  // 2. Local persistence cleanup
  if (typeof window !== 'undefined') {
    try {
      const deletedAccounts: string[] = JSON.parse(localStorage.getItem('sama_deleted_accounts') || '[]');
      if (userId && !deletedAccounts.includes(userId)) deletedAccounts.push(userId);
      if (cleanPhone && !deletedAccounts.includes(cleanPhone)) deletedAccounts.push(cleanPhone);
      if (cleanEmail && !deletedAccounts.includes(cleanEmail)) deletedAccounts.push(cleanEmail);
      localStorage.setItem('sama_deleted_accounts', JSON.stringify(deletedAccounts));

      // Filter registered accounts
      const accounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const filteredAccs = accounts.filter((a: any) => {
        const aPhone = (a.phone || '').replace(/[^0-9]/g, '');
        const aEmail = (a.email || '').trim().toLowerCase();
        if (a.id === userId) return false;
        if (cleanPhone && aPhone.includes(cleanPhone)) return false;
        if (cleanEmail && aEmail === cleanEmail) return false;
        return true;
      });
      localStorage.setItem('sama_registered_accounts', JSON.stringify(filteredAccs));

      // Filter admin providers
      const adminData = JSON.parse(localStorage.getItem('sama_admin_providers_data') || '[]');
      const filteredAdmin = adminData.filter((p: any) => {
        const pPhone = (p.phone || '').replace(/[^0-9]/g, '');
        if (p.id === userId || (cleanPhone && pPhone.includes(cleanPhone))) return false;
        return true;
      });
      localStorage.setItem('sama_admin_providers_data', JSON.stringify(filteredAdmin));

      // Filter artisan registrations
      const reg = JSON.parse(localStorage.getItem('sama_artisan_registrations') || '[]');
      const filteredReg = reg.filter((r: any) => {
        const rPhone = (r.phone || '').replace(/[^0-9]/g, '');
        if (r.id === userId || (cleanPhone && rPhone.includes(cleanPhone))) return false;
        return true;
      });
      localStorage.setItem('sama_artisan_registrations', JSON.stringify(filteredReg));

      // Clear session if logged in
      const currentSession = localStorage.getItem('sama_user_session');
      if (currentSession) {
        try {
          const parsedSession = JSON.parse(currentSession);
          const sPhone = (parsedSession.phone || '').replace(/[^0-9]/g, '');
          const sEmail = (parsedSession.email || '').trim().toLowerCase();
          if (parsedSession.id === userId || (cleanPhone && sPhone.includes(cleanPhone)) || (cleanEmail && sEmail === cleanEmail)) {
            localStorage.removeItem('sama_user_session');
            localStorage.removeItem('samapro_current_user');
          }
        } catch {}
      }

      const currentPro = localStorage.getItem('samapro_current_user');
      if (currentPro) {
        try {
          const parsedPro = JSON.parse(currentPro);
          const pPhone = (parsedPro.phone || '').replace(/[^0-9]/g, '');
          if (parsedPro.id === userId || (cleanPhone && pPhone.includes(cleanPhone))) {
            localStorage.removeItem('samapro_current_user');
          }
        } catch {}
      }

      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('sama_data_updated'));
    } catch (e) {
      console.warn('Local account cleanup error:', e);
    }
  }

  return { success: true };
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

// 7. CROSS-DEVICE USER ACCOUNT REGISTRATION & CLOUD SYNC
export interface UserAccountData {
  name: string;
  phone: string;
  email?: string;
  password?: string;
  role?: 'user' | 'pro' | 'client' | 'admin';
  businessName?: string;
  categorySlug?: string;
  categoryName?: string;
  neighborhood?: string;
  regionId?: string;
}

export interface AppUserAccount {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'client' | 'pro';
  neighborhood?: string;
  city?: string;
  categoryName?: string;
  businessName?: string;
  registeredAt: string;
  status: 'ACTIVE' | 'SUSPENDED';
}

export interface PendingArtisanData {
  id: string;
  name: string;
  businessName?: string;
  trade: string;
  neighborhood: string;
  regionName?: string;
  phone: string;
  email?: string;
  cniNumber: string;
  dateSubmitted: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export async function registerUserAccount(userData: UserAccountData): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const cleanPhone = userData.phone ? userData.phone.replace(/[^0-9]/g, '') : '';
    const cleanEmail = userData.email ? userData.email.trim().toLowerCase() : '';
    const cleanName = userData.name ? userData.name.trim() : 'Utilisateur Sama';
    const isPro = userData.role === 'pro';
    const role = isPro ? 'pro' : 'client';
    const password = userData.password || '';
    const passwordHash = typeof btoa !== 'undefined' ? btoa(password) : Buffer.from(password).toString('base64');
    const slug = isPro ? `pro-${cleanPhone || Date.now()}` : `client-${cleanPhone || Date.now()}`;

    // 1. Cloud Save in Supabase for ALL users (Clients and Artisans)
    if (isSupabaseConfigured()) {
      try {
        const metadata = {
          email: cleanEmail,
          passwordHash,
          password,
          role,
          businessName: userData.businessName || cleanName,
          registeredAt: new Date().toISOString()
        };

        // Check if already in Supabase to avoid duplicate rows
        let existingUser: any = null;
        if (cleanPhone.length >= 7) {
          const { data } = await supabase
            .from('providers')
            .select('id, slug, phone, whatsapp')
            .or(`whatsapp.eq.${cleanPhone},phone.ilike.%${cleanPhone.slice(-8)}%`);
          if (data && data.length > 0) {
            existingUser = data[0];
          }
        }

        if (!existingUser) {
          const { error } = await supabase
            .from('providers')
            .insert([{
              slug,
              name: cleanName,
              business_name: userData.businessName || cleanName,
              phone: userData.phone.trim(),
              whatsapp: cleanPhone || '221770000000',
              category_slug: isPro ? (userData.categorySlug || 'plomberie') : 'client',
              category_name: isPro ? (userData.categoryName || 'Artisan Qualifié') : 'Client Particulier',
              neighborhood: userData.neighborhood || 'Dakar',
              verification_level: 'ID_VERIFIED',
              bio: JSON.stringify(metadata)
            }]);

          if (error) {
            console.warn('Supabase user register note:', error.message);
          }
        }
      } catch (err) {
        console.warn('Supabase register exception:', err);
      }
    }

    const newUser = {
      name: cleanName,
      phone: userData.phone.trim(),
      email: cleanEmail,
      role,
      passwordHash,
      businessName: userData.businessName || cleanName,
      categorySlug: userData.categorySlug,
      categoryName: userData.categoryName,
      neighborhood: userData.neighborhood,
      registeredAt: new Date().toISOString()
    };

    // 2. Local Session Cache
    if (typeof window !== 'undefined') {
      // Un-blacklist if re-registering
      try {
        const deletedPros: string[] = JSON.parse(localStorage.getItem('sama_deleted_providers') || '[]');
        const filteredPros = deletedPros.filter(d => d !== cleanPhone && d !== userData.phone && d !== cleanEmail);
        localStorage.setItem('sama_deleted_providers', JSON.stringify(filteredPros));

        const deletedAccs: string[] = JSON.parse(localStorage.getItem('sama_deleted_accounts') || '[]');
        const filteredAccs = deletedAccs.filter(d => d !== cleanPhone && d !== userData.phone && d !== cleanEmail);
        localStorage.setItem('sama_deleted_accounts', JSON.stringify(filteredAccs));
      } catch {}

      const existingAccounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const filtered = existingAccounts.filter((a: any) => {
        const aClean = (a.phone || '').replace(/[^0-9]/g, '');
        return aClean !== cleanPhone;
      });
      filtered.push(newUser);
      localStorage.setItem('sama_registered_accounts', JSON.stringify(filtered));
      localStorage.setItem('sama_user_session', JSON.stringify(newUser));
      localStorage.setItem('sama_last_user_role', role);

      if (role === 'pro') {
        localStorage.setItem('samapro_current_user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('samapro_current_user');
      }

      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('sama_data_updated'));
    }

    return { success: true, user: newUser };
  } catch (err: any) {
    console.error('registerUserAccount error:', err);
    return { success: false, error: err.message || "Erreur lors de l'enregistrement." };
  }
}

// 7b. FETCH ALL REGISTERED ACCOUNTS FROM SUPABASE CLOUD (Live Multi-Device Sync)
export async function getRegisteredAccounts(): Promise<AppUserAccount[]> {
  let dbUsers: AppUserAccount[] = [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        for (const item of data) {
          if (isBlacklistedOrDeleted({ id: item.id, slug: item.slug, phone: item.phone, whatsapp: item.whatsapp })) {
            continue;
          }

          let meta: any = {};
          try {
            if (item.bio && item.bio.startsWith('{')) {
              meta = JSON.parse(item.bio);
            }
          } catch {}

          const catName = (item.category_name || '').toLowerCase();
          const catSlug = (item.category_slug || '').toLowerCase();
          const pSlug = (item.slug || '').toLowerCase();
          const pName = (item.name || '').toLowerCase();
          const isClient = 
            catName.includes('client') || 
            catSlug.includes('client') || 
            pSlug.startsWith('client-') || 
            pSlug.startsWith('usr-') || 
            pName.includes('compte client') || 
            meta.role === 'client' || 
            meta.role === 'user';

          dbUsers.push({
            id: item.id ? String(item.id) : (item.slug || `acc-${Date.now()}`),
            name: item.name || 'Utilisateur',
            phone: item.phone || '',
            email: meta.email || (isClient ? 'client@samaartisan.sn' : `${item.slug || 'pro'}@samaartisan.sn`),
            role: isClient ? 'client' : 'pro',
            neighborhood: item.neighborhood || 'Dakar',
            city: item.city || 'Dakar',
            categoryName: isClient ? 'Particulier' : (item.category_name || 'Artisan'),
            businessName: item.business_name || item.name,
            registeredAt: item.created_at ? (item.created_at.includes('T') ? new Date(item.created_at).toLocaleDateString('fr-FR') : item.created_at) : 'Récemment',
            status: item.is_available === false ? 'SUSPENDED' : 'ACTIVE'
          });
        }
      }
    } catch (err) {
      console.warn('Supabase getRegisteredAccounts error:', err);
    }
  }

  // Merge local storage accounts
  let localUsers: AppUserAccount[] = [];
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('sama_registered_accounts');
      if (stored) {
        const parsed = JSON.parse(stored);
        for (const a of parsed) {
          if (!isBlacklistedOrDeleted(a)) {
            const isClient = a.role === 'client' || a.role === 'user';
            localUsers.push({
              id: a.id || `acc-${Date.now()}`,
              name: a.name || 'Utilisateur',
              phone: a.phone || '',
              email: a.email || '',
              role: isClient ? 'client' : 'pro',
              neighborhood: a.neighborhood || 'Dakar',
              city: a.city || 'Dakar',
              categoryName: a.categoryName || (isClient ? 'Particulier' : 'Artisan'),
              businessName: a.businessName || a.name,
              registeredAt: a.registeredAt ? (a.registeredAt.includes('T') ? new Date(a.registeredAt).toLocaleDateString('fr-FR') : a.registeredAt) : 'Récemment',
              status: 'ACTIVE'
            });
          }
        }
      }
    } catch {}
  }

  const combined: AppUserAccount[] = [...dbUsers];
  for (const lu of localUsers) {
    const luPhoneDigits = (lu.phone || '').replace(/[^0-9]/g, '');
    if (!combined.some(c => {
      const cPhoneDigits = (c.phone || '').replace(/[^0-9]/g, '');
      return (luPhoneDigits.length >= 7 && cPhoneDigits.includes(luPhoneDigits)) || (lu.id && c.id === lu.id);
    })) {
      combined.push(lu);
    }
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('sama_registered_accounts', JSON.stringify(combined));
  }

  return combined;
}

// 7c. FETCH PENDING ARTISANS (Cloud + Local)
export async function getPendingArtisans(): Promise<PendingArtisanData[]> {
  let pending: PendingArtisanData[] = [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('verification_level', 'UNVERIFIED')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        for (const item of data) {
          if (isBlacklistedOrDeleted({ id: item.id, slug: item.slug, phone: item.phone, whatsapp: item.whatsapp })) {
            continue;
          }

          pending.push({
            id: String(item.id),
            name: item.name,
            businessName: item.business_name || item.name,
            trade: item.category_name || 'Artisan',
            neighborhood: item.neighborhood || 'Dakar',
            regionName: item.region_id || 'Dakar',
            phone: item.phone,
            cniNumber: item.cni_number || '1 756 1989 02341',
            dateSubmitted: item.created_at ? (item.created_at.includes('T') ? new Date(item.created_at).toLocaleDateString('fr-FR') : item.created_at) : 'Récemment',
            status: 'PENDING'
          });
        }
      }
    } catch (err) {
      console.warn('Supabase getPendingArtisans error:', err);
    }
  }

  // Merge local registrations
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('sama_artisan_registrations');
      if (stored) {
        const parsed = JSON.parse(stored);
        for (const p of parsed) {
          if (!isBlacklistedOrDeleted(p) && !pending.some(item => item.phone === p.phone || item.id === p.id)) {
            pending.push({
              id: p.id || `reg-${Date.now()}`,
              name: p.name,
              businessName: p.businessName || p.name,
              trade: p.categoryName || 'Artisan',
              neighborhood: p.neighborhood || 'Dakar',
              regionName: p.regionName || 'Dakar',
              phone: p.phone,
              email: p.email,
              cniNumber: p.cniNumber || '1 756 1989 02341',
              dateSubmitted: p.dateSubmitted || 'Récemment',
              status: 'PENDING'
            });
          }
        }
      }
    } catch {}
  }

  return pending;
}

// 8. CROSS-DEVICE USER LOGIN & INSTANT CLOUD SYNC
export async function loginUserAccount(identifier: string, password: string): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const cleanIdent = identifier.trim().toLowerCase();
    const cleanDigits = identifier.replace(/[^0-9]/g, '');
    const givenHash = typeof btoa !== 'undefined' ? btoa(password) : Buffer.from(password).toString('base64');

    // 0. Check if account or phone is blacklisted/deleted
    if (isBlacklistedOrDeleted({ phone: identifier, email: identifier, id: identifier })) {
      return { success: false, error: "Ce compte a été supprimé par l'administration." };
    }

    let foundUser: any = null;

    // 1. Check Cloud Supabase First (Enables cross-device phone <-> PC sync)
    if (isSupabaseConfigured()) {
      try {
        const { data: dbPros } = await supabase
          .from('providers')
          .select('*');

        if (dbPros && dbPros.length > 0) {
          const match = dbPros.find((p: any) => {
            if (isBlacklistedOrDeleted({ id: p.id, slug: p.slug, phone: p.phone, whatsapp: p.whatsapp })) return false;

            const pPhoneDigits = (p.phone || '').replace(/[^0-9]/g, '');
            const pWhatsAppDigits = (p.whatsapp || '').replace(/[^0-9]/g, '');
            
            // Check direct phone matches
            if (cleanDigits.length >= 7) {
              if (pPhoneDigits.includes(cleanDigits) || cleanDigits.includes(pPhoneDigits)) return true;
              if (pWhatsAppDigits.includes(cleanDigits) || cleanDigits.includes(pWhatsAppDigits)) return true;
            }

            // Check metadata in bio
            try {
              if (p.bio && p.bio.startsWith('{')) {
                const meta = JSON.parse(p.bio);
                if (meta.email && meta.email.toLowerCase() === cleanIdent) return true;
                if (meta.phone && meta.phone.replace(/[^0-9]/g, '').includes(cleanDigits)) return true;
              }
            } catch (e) {}

            return false;
          });

          if (match) {
            let meta: any = {};
            try {
              if (match.bio && match.bio.startsWith('{')) {
                meta = JSON.parse(match.bio);
              }
            } catch (e) {}

            const isPro = match.category_name !== 'Client Particulier' && !match.slug?.startsWith('usr-');
            const expectedHash = meta.passwordHash;
            const expectedPlain = meta.password;

            // Password check (if password was stored)
            if (expectedHash || expectedPlain) {
              const matches = (expectedHash && expectedHash === givenHash) || (expectedPlain && expectedPlain === password);
              if (!matches) {
                return { success: false, error: 'Mot de passe incorrect. Veuillez vérifier votre mot de passe.' };
              }
            }

            foundUser = {
              name: match.name,
              phone: match.phone,
              email: meta.email || (isPro ? 'pro@samaartisan.sn' : 'client@samaartisan.sn'),
              role: isPro ? 'pro' : (meta.role || 'user'),
              businessName: match.business_name,
              categorySlug: match.category_slug,
              categoryName: match.category_name,
              neighborhood: match.neighborhood,
              avatar: match.avatar,
              registeredAt: match.created_at || new Date().toISOString()
            };
          }
        }
      } catch (err) {
        console.warn('Supabase cloud login fetch failed:', err);
      }
    }

    // 2. Check Static/Verified Providers Dataset (PROVIDERS)
    if (!foundUser) {
      const matchedStaticPro = PROVIDERS.find((p: any) => {
        if (isBlacklistedOrDeleted(p)) return false;
        const pDigits = (p.phone || '').replace(/[^0-9]/g, '');
        const pWa = (p.whatsapp || '').replace(/[^0-9]/g, '');
        if (cleanDigits.length >= 7) {
          return pDigits.includes(cleanDigits) || cleanDigits.includes(pDigits) || pWa.includes(cleanDigits);
        }
        return p.name.toLowerCase().includes(cleanIdent);
      });

      if (matchedStaticPro) {
        foundUser = {
          id: matchedStaticPro.id,
          slug: matchedStaticPro.slug,
          name: matchedStaticPro.name,
          phone: matchedStaticPro.phone,
          whatsapp: matchedStaticPro.whatsapp,
          email: `${matchedStaticPro.slug}@samaartisan.sn`,
          role: 'pro',
          businessName: matchedStaticPro.businessName,
          categorySlug: matchedStaticPro.categorySlug,
          categoryName: matchedStaticPro.categoryName,
          neighborhood: matchedStaticPro.neighborhood,
          avatar: matchedStaticPro.avatar,
          bio: matchedStaticPro.bio,
          verificationLevel: matchedStaticPro.verificationLevel
        };
      }
    }

    // 3. Check Local Storage fallback
    if (!foundUser && typeof window !== 'undefined') {
      const localAccounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const localMatch = localAccounts.find((a: any) => {
        if (isBlacklistedOrDeleted(a)) return false;
        const aDigits = (a.phone || '').replace(/[^0-9]/g, '');
        const aEmail = (a.email || '').toLowerCase();
        return (cleanDigits.length >= 7 && (aDigits.includes(cleanDigits) || cleanDigits.includes(aDigits))) || (aEmail && aEmail === cleanIdent);
      });

      if (localMatch) {
        if (localMatch.passwordHash && localMatch.passwordHash !== givenHash && localMatch.password !== password) {
          return { success: false, error: 'Mot de passe incorrect. Veuillez vérifier votre mot de passe.' };
        }
        foundUser = localMatch;
      }

      // Check Pro session fallback
      if (!foundUser) {
        const storedPro = localStorage.getItem('samapro_current_user');
        if (storedPro) {
          try {
            const p = JSON.parse(storedPro);
            if (!isBlacklistedOrDeleted(p)) {
              const pDigits = (p.phone || '').replace(/[^0-9]/g, '');
              if (cleanDigits.length >= 7 && (pDigits.includes(cleanDigits) || cleanDigits.includes(pDigits))) {
                foundUser = {
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  phone: p.phone,
                  email: p.email || 'pro@samaartisan.sn',
                  role: 'pro',
                  businessName: p.businessName || p.name,
                  categorySlug: p.categorySlug,
                  categoryName: p.categoryName,
                  neighborhood: p.neighborhood,
                  avatar: p.avatar,
                  bio: p.bio
                };
              }
            }
          } catch (e) {}
        }
      }

      // Check registrations list fallback
      if (!foundUser) {
        const regList = JSON.parse(localStorage.getItem('sama_artisan_registrations') || '[]');
        const regMatch = regList.find((r: any) => {
          if (isBlacklistedOrDeleted(r)) return false;
          const rDigits = (r.phone || '').replace(/[^0-9]/g, '');
          return cleanDigits.length >= 7 && (rDigits.includes(cleanDigits) || cleanDigits.includes(rDigits));
        });
        if (regMatch) {
          foundUser = {
            id: regMatch.id || `pro-${Date.now()}`,
            slug: (regMatch.name || 'artisan').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            name: regMatch.name,
            phone: regMatch.phone,
            email: regMatch.email || 'pro@samaartisan.sn',
            role: 'pro',
            businessName: regMatch.businessName || regMatch.name,
            categorySlug: regMatch.categorySlug,
            categoryName: regMatch.categoryName,
            neighborhood: regMatch.neighborhood
          };
        }
      }
    }

    if (!foundUser) {
      return { success: false, error: "Aucun compte trouvé avec ce numéro ou email. Veuillez vérifier vos identifiants ou créer un profil." };
    }

    if (isBlacklistedOrDeleted(foundUser)) {
      return { success: false, error: "Ce compte a été supprimé par l'administration." };
    }

    // 4. Activate session locally on device
    if (typeof window !== 'undefined') {
      localStorage.setItem('sama_user_session', JSON.stringify(foundUser));
      
      // If user is a pro, activate pro session object
      if (foundUser.role === 'pro') {
        const proPayload = {
          id: foundUser.id || `pro-${Date.now()}`,
          slug: foundUser.slug || (foundUser.name || 'artisan').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: foundUser.name,
          businessName: foundUser.businessName || foundUser.name,
          phone: foundUser.phone,
          whatsapp: (foundUser.whatsapp || foundUser.phone || '').replace(/[^0-9]/g, ''),
          categorySlug: foundUser.categorySlug || 'plomberie',
          categoryName: foundUser.categoryName || 'Artisanat',
          neighborhood: foundUser.neighborhood || 'Dakar',
          city: foundUser.city || 'Dakar',
          avatar: foundUser.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
          bio: foundUser.bio || `Artisan professionnel qualifié à Dakar.`,
          verificationLevel: foundUser.verificationLevel || 'ID_VERIFIED',
          averageRating: foundUser.averageRating || 5.0,
          reviewCount: foundUser.reviewCount || 0,
          portfolio: foundUser.portfolio || []
        };
        localStorage.setItem('samapro_current_user', JSON.stringify(proPayload));
        localStorage.setItem('sama_last_user_role', 'pro');
      } else {
        // Client account: explicitly clean any previous pro session
        localStorage.removeItem('samapro_current_user');
        localStorage.setItem('sama_last_user_role', 'client');
      }
      
      const localAccounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      if (!localAccounts.some((a: any) => a.phone === foundUser.phone)) {
        localAccounts.push(foundUser);
        localStorage.setItem('sama_registered_accounts', JSON.stringify(localAccounts));
      }

      window.dispatchEvent(new Event('storage'));
    }

    return { success: true, user: foundUser };
  } catch (err: any) {
    console.error('loginUserAccount error:', err);
    return { success: false, error: err.message || 'Erreur lors de la connexion.' };
  }
}

// ----------------------------------------------------
// CONTACT MESSAGES & EMAIL INBOX SERVICES
// ----------------------------------------------------
export interface ContactMessage {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  user_type?: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
  created_at: string;
  replied_at?: string;
  reply_notes?: string;
}

export const DEFAULT_CONTACT_MESSAGES: ContactMessage[] = [];

// Fetch all contact messages (100% Real from Supabase & actual submissions)
export async function getContactMessages(): Promise<ContactMessage[]> {
  let dbMessages: ContactMessage[] = [];

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        dbMessages = data.map((m: any) => ({
          id: String(m.id),
          full_name: m.full_name || 'Expéditeur anonyme',
          phone: m.phone || '',
          email: m.email || '',
          subject: m.subject || 'Message de contact',
          message: m.message || '',
          user_type: m.user_type || 'Particulier',
          status: (m.status || 'NEW') as any,
          created_at: m.created_at || new Date().toISOString(),
          replied_at: m.replied_at,
          reply_notes: m.reply_notes
        }));
      }
    } catch (err) {
      console.warn('Supabase getContactMessages error:', err);
    }
  }

  // Local storage real messages
  let localMessages: ContactMessage[] = [];
  let deletedMsgIds: string[] = [];

  if (typeof window !== 'undefined') {
    try {
      deletedMsgIds = JSON.parse(localStorage.getItem('sama_deleted_message_ids') || '[]');
      const stored = localStorage.getItem('sama_contact_messages_cache');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Filter out any previous fake mock IDs and deleted IDs
        localMessages = parsed.filter((m: any) => !m.id?.startsWith('msg-') && !deletedMsgIds.includes(m.id));
      }
    } catch {}
  }

  const combined = dbMessages.filter(m => !deletedMsgIds.includes(m.id));
  for (const lm of localMessages) {
    if (!deletedMsgIds.includes(lm.id) && !combined.some(c => c.id === lm.id)) {
      combined.push(lm);
    }
  }

  // Sort descending by created_at
  combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (typeof window !== 'undefined') {
    localStorage.setItem('sama_contact_messages_cache', JSON.stringify(combined));
  }

  return combined;
}

// Update contact message status
export async function updateContactMessageStatus(
  id: string, 
  status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED',
  replyNotes?: string
): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const updateData: any = { status };
      if (status === 'REPLIED') {
        updateData.replied_at = new Date().toISOString();
        if (replyNotes) updateData.reply_notes = replyNotes;
      }
      await supabase
        .from('contact_messages')
        .update(updateData)
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase updateContactMessageStatus notice:', err);
    }
  }

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('sama_contact_messages_cache');
      if (stored) {
        const parsed: ContactMessage[] = JSON.parse(stored);
        const updated = parsed.map(m => {
          if (m.id === id) {
            return {
              ...m,
              status,
              replied_at: status === 'REPLIED' ? new Date().toISOString() : m.replied_at,
              reply_notes: replyNotes || m.reply_notes
            };
          }
          return m;
        });
        localStorage.setItem('sama_contact_messages_cache', JSON.stringify(updated));
      }
    } catch {}
  }

  return true;
}

// Delete contact message
export async function deleteContactMessage(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteContactMessage notice:', err);
    }
  }

  if (typeof window !== 'undefined') {
    try {
      const deletedIds: string[] = JSON.parse(localStorage.getItem('sama_deleted_message_ids') || '[]');
      if (!deletedIds.includes(id)) deletedIds.push(id);
      localStorage.setItem('sama_deleted_message_ids', JSON.stringify(deletedIds));

      const stored = localStorage.getItem('sama_contact_messages_cache');
      if (stored) {
        const parsed: ContactMessage[] = JSON.parse(stored);
        const filtered = parsed.filter(m => m.id !== id);
        localStorage.setItem('sama_contact_messages_cache', JSON.stringify(filtered));
      }
    } catch {}
  }

  return true;
}

