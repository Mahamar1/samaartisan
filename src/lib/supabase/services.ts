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
        // Exclude internal client accounts from public artisan search
        const actualArtisans = data.filter(item => 
          item.category_name !== 'Client Particulier' && 
          !item.slug?.startsWith('usr-')
        );
        dbPros = actualArtisans.map(mapDbProviderToApp);
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local dataset:', err);
    }
  }

  // Also include any artisan registered locally
  const localPros: Provider[] = [];
  if (typeof window !== 'undefined') {
    try {
      const storedPro = localStorage.getItem('samapro_current_user');
      if (storedPro) {
        const parsed = JSON.parse(storedPro);
        if (parsed && (parsed.name || parsed.phone)) {
          localPros.push(parsed);
        }
      }

      const adminData = localStorage.getItem('sama_admin_providers_data');
      if (adminData) {
        const parsedAdmin = JSON.parse(adminData);
        if (Array.isArray(parsedAdmin)) {
          localPros.push(...parsedAdmin);
        }
      }
    } catch {}
  }

  // Merge database pros + local registered pros + reference verified pros (PROVIDERS)
  const combined: Provider[] = [...dbPros];

  for (const lp of localPros) {
    if (lp && !combined.some(c => (lp.phone && c.phone === lp.phone) || (lp.id && c.id === lp.id))) {
      combined.push(lp);
    }
  }

  for (const bp of (PROVIDERS || [])) {
    if (bp && !combined.some(c => (bp.phone && c.phone === bp.phone) || (bp.id && c.id === bp.id))) {
      combined.push(bp);
    }
  }

  return combined;
}

// 2. FETCH A SINGLE PROVIDER BY SLUG (Supabase Live with Fallback)
export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  if (!slug || slug === 'undefined' || slug === 'null') return null;
  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .or(`slug.eq.${decodedSlug},id.eq.${decodedSlug}`)
        .maybeSingle();

      if (!error && data) {
        return mapDbProviderToApp(data);
      }
    } catch (err) {
      console.warn('Supabase single fetch failed:', err);
    }
  }

  const all = await getProviders();
  return all.find((p) => {
    if (!p) return false;
    const pSlug = (p.slug || '').toLowerCase();
    const pNameSlug = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return pSlug === decodedSlug || p.id === decodedSlug || pNameSlug === decodedSlug;
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

// 7. CROSS-DEVICE USER ACCOUNT REGISTRATION & CLOUD SYNC
export interface UserAccountData {
  name: string;
  phone: string;
  email?: string;
  password?: string;
  role?: 'user' | 'pro' | 'admin';
  businessName?: string;
  categorySlug?: string;
  categoryName?: string;
  neighborhood?: string;
}

export async function registerUserAccount(userData: UserAccountData): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const cleanPhone = userData.phone ? userData.phone.replace(/[^0-9]/g, '') : '';
    const cleanEmail = userData.email ? userData.email.trim().toLowerCase() : '';
    const cleanName = userData.name ? userData.name.trim() : 'Utilisateur Sama';
    const role = userData.role || 'user';
    const password = userData.password || '';
    const passwordHash = typeof btoa !== 'undefined' ? btoa(password) : Buffer.from(password).toString('base64');
    const slug = `usr-${cleanPhone || Date.now()}`;

    // 1. Cloud Save in Supabase
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

        const { data, error } = await supabase
          .from('providers')
          .insert([{
            slug,
            name: cleanName,
            business_name: userData.businessName || (role === 'pro' ? cleanName : `Compte Client (${cleanName})`),
            phone: userData.phone.trim(),
            whatsapp: cleanPhone || '221770000000',
            category_slug: userData.categorySlug || 'plomberie',
            category_name: role === 'pro' ? (userData.categoryName || 'Artisan') : 'Client Particulier',
            neighborhood: userData.neighborhood || 'Dakar',
            verification_level: 'ID_VERIFIED',
            bio: JSON.stringify(metadata)
          }])
          .select();

        if (error) {
          console.warn('Supabase account register note:', error.message);
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

    // 2. Local Cache
    if (typeof window !== 'undefined') {
      const existingAccounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const filtered = existingAccounts.filter((a: any) => {
        const aClean = (a.phone || '').replace(/[^0-9]/g, '');
        return aClean !== cleanPhone;
      });
      filtered.push(newUser);
      localStorage.setItem('sama_registered_accounts', JSON.stringify(filtered));
      localStorage.setItem('sama_user_session', JSON.stringify(newUser));

      if (role === 'pro') {
        localStorage.setItem('samapro_current_user', JSON.stringify(newUser));
      }

      window.dispatchEvent(new Event('storage'));
    }

    return { success: true, user: newUser };
  } catch (err: any) {
    console.error('registerUserAccount error:', err);
    return { success: false, error: err.message || "Erreur lors de l'enregistrement." };
  }
}

// 8. CROSS-DEVICE USER LOGIN & INSTANT CLOUD SYNC
export async function loginUserAccount(identifier: string, password: string): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const cleanIdent = identifier.trim().toLowerCase();
    const cleanDigits = identifier.replace(/[^0-9]/g, '');
    const givenHash = typeof btoa !== 'undefined' ? btoa(password) : Buffer.from(password).toString('base64');

    let foundUser: any = null;

    // 1. Check Cloud Supabase First (Enables cross-device phone <-> PC sync)
    if (isSupabaseConfigured()) {
      try {
        const { data: dbPros } = await supabase
          .from('providers')
          .select('*');

        if (dbPros && dbPros.length > 0) {
          const match = dbPros.find((p: any) => {
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

    // 2. Check Local Storage fallback
    if (!foundUser && typeof window !== 'undefined') {
      const localAccounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const localMatch = localAccounts.find((a: any) => {
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
            const pDigits = (p.phone || '').replace(/[^0-9]/g, '');
            if (cleanDigits.length >= 7 && (pDigits.includes(cleanDigits) || cleanDigits.includes(pDigits))) {
              foundUser = {
                name: p.name,
                phone: p.phone,
                email: p.email || 'pro@samaartisan.sn',
                role: 'pro',
                businessName: p.businessName || p.name
              };
            }
          } catch (e) {}
        }
      }
    }

    if (!foundUser) {
      return { success: false, error: "Aucun compte trouvé avec ce numéro ou email. Veuillez d'abord créer un compte." };
    }

    // 3. Activate session locally on device
    if (typeof window !== 'undefined') {
      localStorage.setItem('sama_user_session', JSON.stringify(foundUser));
      if (foundUser.role === 'pro') {
        localStorage.setItem('samapro_current_user', JSON.stringify(foundUser));
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
