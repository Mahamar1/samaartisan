'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  SlidersHorizontal, 
  Crosshair, 
  Wrench, 
  Check, 
  Sparkles,
  PhoneCall,
  Clock,
  RotateCcw
} from 'lucide-react';
import ProviderCard from '@/components/provider/ProviderCard';
import { CATEGORIES, SENEGAL_REGIONS, PROVIDERS, calculateDistanceKm } from '@/lib/data';
import { getProviders } from '@/lib/supabase/services';
import { Provider } from '@/lib/types';

function SearchContent() {
  const searchParams = useSearchParams();
  
  const initialCategory = searchParams.get('categorie') || '';
  const initialRegion = searchParams.get('region') || '';
  const initialDistrict = searchParams.get('quartier') || '';
  const initialUrgency = searchParams.get('urgence') || '';

  const [providersList, setProvidersList] = useState<Provider[]>(PROVIDERS);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [onlyAvailable, setOnlyAvailable] = useState(initialUrgency === 'immediat');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'distance' | 'price_asc'>('rating');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Load live data from Supabase & sync dynamically
  React.useEffect(() => {
    const loadPros = () => {
      getProviders().then((pros) => {
        setProvidersList(pros || []);
      });
    };

    loadPros();
    window.addEventListener('storage', loadPros);
    window.addEventListener('sama_data_updated', loadPros);
    return () => {
      window.removeEventListener('storage', loadPros);
      window.removeEventListener('sama_data_updated', loadPros);
    };
  }, []);

  // Compute available districts based on selected region
  const availableDistricts = useMemo(() => {
    if (selectedRegion) {
      const reg = SENEGAL_REGIONS.find((r) => r.id === selectedRegion);
      return reg ? reg.districts : [];
    }
    // If no region selected, aggregate all districts
    return SENEGAL_REGIONS.flatMap((r) => r.districts);
  }, [selectedRegion]);

  const handleRegionChange = (newRegion: string) => {
    setSelectedRegion(newRegion);
    setSelectedDistrict(''); // Reset district when region changes
  };

  const handleUseGps = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsLocating(false);
        },
        () => {
          setUserLocation({ lat: 14.7456, lng: -17.5186 });
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setUserLocation({ lat: 14.7456, lng: -17.5186 });
      setIsLocating(false);
    }
  };

  // Filter and sort providers
  const filteredProviders = useMemo(() => {
    return (providersList || []).filter((p) => {
      if (!p) return false;

      // 0. STRICT CLIENT EXCLUSION: Only display real artisan professionals
      const catName = (p.categoryName || (p as any).category_name || '').toLowerCase();
      const catSlug = (p.categorySlug || (p as any).category_slug || '').toLowerCase();
      const pSlug = (p.slug || '').toLowerCase();
      const pName = (p.name || '').toLowerCase();
      const bName = (p.businessName || (p as any).business_name || '').toLowerCase();
      const role = ((p as any).role || '').toLowerCase();

      if (catName.includes('client') || catSlug.includes('client')) return false;
      if (pSlug.startsWith('usr-')) return false;
      if (pName.includes('compte client') || bName.includes('compte client')) return false;
      if (role === 'user' || role === 'client') return false;

      // 1. Category filter
      if (selectedCategory) {
        const pCat = (p.categorySlug || '').toLowerCase();
        const pCatName = (p.categoryName || '').toLowerCase();
        const selCat = selectedCategory.toLowerCase();
        const matchesCat = pCat === selCat || pCatName.includes(selCat) || selCat.includes(pCat);
        if (!matchesCat) return false;
      }

      // 2. Region filter
      if (selectedRegion) {
        const regObj = SENEGAL_REGIONS.find((r) => r.id === selectedRegion);
        if (regObj) {
          const regName = regObj.name.toLowerCase();
          const pRegion = (p.region || '').toLowerCase();
          const pCity = (p.city || '').toLowerCase();
          const pNeigh = (p.neighborhood || '').toLowerCase();

          const matchesRegion = 
            (p as any).region_id === selectedRegion ||
            pRegion === regName ||
            pCity === regName ||
            pNeigh.includes(regName) ||
            regObj.districts.some(d => pNeigh.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(pNeigh));

          if (!matchesRegion) return false;
        }
      }

      // 3. District / Quartier filter
      if (selectedDistrict) {
        const districtObj = availableDistricts.find((d) => d.id === selectedDistrict);
        if (districtObj) {
          const dName = districtObj.name.toLowerCase();
          const pNeigh = (p.neighborhood || '').toLowerCase();
          const words = districtObj.name.split(/[ ,&/()]+/).filter(w => w.length > 2);
          
          const matchNeigh = 
            pNeigh.includes(dName) || 
            dName.includes(pNeigh) ||
            words.some(word => pNeigh.includes(word.toLowerCase()));

          if (!matchNeigh) {
            // Check distance if coordinates available
            if (p.latitude && p.longitude && userLocation) {
              const dist = calculateDistanceKm(userLocation.lat, userLocation.lng, p.latitude, p.longitude);
              if (dist > (p.interventionRadiusKm || 25)) return false;
            } else {
              return false;
            }
          }
        }
      }

      // 4. Availability filter
      if (onlyAvailable && p.isAvailable === false) {
        return false;
      }

      // 5. Min rating
      if (minRating > 0 && (p.averageRating || 0) < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sponsored first
      if (a.isSponsored && !b.isSponsored) return -1;
      if (!a.isSponsored && b.isSponsored) return 1;

      if (sortBy === 'rating') return (b.averageRating || 0) - (a.averageRating || 0);
      if (sortBy === 'reviews') return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sortBy === 'price_asc') return (a.startingPrice || 0) - (b.startingPrice || 0);
      if (sortBy === 'distance' && userLocation && a.latitude && a.longitude && b.latitude && b.longitude) {
        const distA = calculateDistanceKm(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
        const distB = calculateDistanceKm(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
        return distA - distB;
      }
      return 0;
    });
  }, [selectedCategory, selectedRegion, selectedDistrict, availableDistricts, onlyAvailable, minRating, sortBy, userLocation, providersList]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900">
            Trouver un artisan qualifié
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sélectionnez votre métier, région et quartier pour contacter directement le bon artisan sur WhatsApp.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Métier / Service */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Métiers & Services ({CATEGORIES.length})
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500 text-navy-900"
              >
                <option value="">Tous les métiers ({CATEGORIES.length})</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Région */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Région
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500 text-navy-900"
              >
                <option value="">Toutes les régions ({SENEGAL_REGIONS.length})</option>
                {SENEGAL_REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    📍 {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Quartiers (dynamique selon la région) */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Quartiers {selectedRegion ? `(${SENEGAL_REGIONS.find(r => r.id === selectedRegion)?.name})` : ''}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500 text-navy-900"
              >
                <option value="">Tous les quartiers ({availableDistricts.length})</option>
                {availableDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Trier par */}
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500 text-navy-900"
              >
                <option value="rating">Mieux notés (★ 4.9+)</option>
                <option value="reviews">Nombre d'avis clients</option>
                <option value="distance">Distance la plus proche</option>
                <option value="price_asc">Tarif indicatif le plus bas</option>
              </select>
            </div>

          </div>

          {/* Quick Toggle Checkboxes & GPS */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
            
            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                onlyAvailable 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Disponible immédiatement</span>
            </button>

            <button
              type="button"
              onClick={handleUseGps}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                userLocation
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Crosshair className={`w-3.5 h-3.5 text-sama-600 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{userLocation ? 'Position GPS active' : 'Ma position GPS'}</span>
            </button>

            {(selectedCategory || selectedRegion || selectedDistrict || onlyAvailable) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedRegion('');
                  setSelectedDistrict('');
                  setOnlyAvailable(false);
                  setUserLocation(null);
                }}
                className="text-xs font-bold text-red-600 hover:underline ml-auto flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Réinitialiser les filtres</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-slate-700">
            <span className="text-sama-600 text-base font-black">{filteredProviders.length}</span> artisans disponibles
          </p>
        </div>

        {/* Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => {
              const dist = userLocation
                ? calculateDistanceKm(userLocation.lat, userLocation.lng, provider.latitude, provider.longitude)
                : undefined;

              return (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  userDistanceKm={dist}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Aucun prestataire ne correspond à ces critères</h3>
            <p className="text-xs text-slate-500">
              Essayez d'élargir votre recherche en sélectionnant tous les quartiers ou une autre région.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedRegion('');
                setSelectedDistrict('');
                setOnlyAvailable(false);
              }}
              className="px-5 py-2.5 rounded-xl font-bold bg-sama-600 text-white text-xs shadow-md"
            >
              Afficher tous les artisans du Sénégal
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 p-8 text-center font-bold text-slate-500">Chargement des artisans...</div>}>
      <SearchContent />
    </Suspense>
  );
}
