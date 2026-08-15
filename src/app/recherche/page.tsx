'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Filter, 
  ShieldCheck, 
  Star, 
  SlidersHorizontal, 
  Crosshair, 
  Wrench, 
  Check, 
  Sparkles,
  PhoneCall,
  Clock
} from 'lucide-react';
import ProviderCard from '@/components/provider/ProviderCard';
import { CATEGORIES, NEIGHBORHOODS, PROVIDERS, calculateDistanceKm } from '@/lib/data';
import { getProviders } from '@/lib/supabase/services';
import { Provider } from '@/lib/types';

function SearchContent() {
  const searchParams = useSearchParams();
  
  const initialCategory = searchParams.get('categorie') || '';
  const initialNeighborhood = searchParams.get('quartier') || '';
  const initialUrgency = searchParams.get('urgence') || '';

  const [providersList, setProvidersList] = useState<Provider[]>(PROVIDERS);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(initialNeighborhood);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(initialUrgency === 'immediat');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'distance' | 'price_asc'>('rating');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Load live data from Supabase
  React.useEffect(() => {
    getProviders().then((pros) => {
      if (pros && pros.length > 0) {
        setProvidersList(pros);
      }
    });
  }, []);

  const handleUseGps = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsLocating(false);
        },
        () => {
          // Fallback coordinate for Dakar Almadies
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
    return providersList.filter((p) => {
      // Category filter
      if (selectedCategory && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Neighborhood filter
      if (selectedNeighborhood) {
        const targetNeigh = NEIGHBORHOODS.find((n) => n.id === selectedNeighborhood);
        if (targetNeigh && !p.neighborhood.toLowerCase().includes(targetNeigh.name.toLowerCase().split(' ')[0])) {
          // Check if within intervention radius
          const dist = calculateDistanceKm(targetNeigh.latitude, targetNeigh.longitude, p.latitude, p.longitude);
          if (dist > p.interventionRadiusKm) return false;
        }
      }
      // Verified filter
      if (onlyVerified && p.verificationLevel === 'UNVERIFIED') {
        return false;
      }
      // Availability filter
      if (onlyAvailable && !p.isAvailable) {
        return false;
      }
      // Min rating
      if (minRating > 0 && p.averageRating < minRating) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      // Always boost sponsored / elite on top if ranking
      if (a.isSponsored && !b.isSponsored) return -1;
      if (!a.isSponsored && b.isSponsored) return 1;

      if (sortBy === 'rating') return b.averageRating - a.averageRating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'price_asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'distance' && userLocation) {
        const distA = calculateDistanceKm(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
        const distB = calculateDistanceKm(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
        return distA - distB;
      }
      return 0;
    });
  }, [selectedCategory, selectedNeighborhood, onlyVerified, onlyAvailable, minRating, sortBy, userLocation]);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-navy-900">
            Trouver un prestataire à Dakar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comparez les artisans vérifiés, consultez les tarifs indicatifs et contactez-les directement.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Category Select */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                Métier / Service
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500"
              >
                <option value="">Tous les métiers ({CATEGORIES.length})</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Neighborhood Select */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                Quartier de Dakar
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500"
              >
                <option value="">Toutes les zones ({NEIGHBORHOODS.length})</option>
                {NEIGHBORHOODS.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GPS Locate Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleUseGps}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                  userLocation
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <Crosshair className={`w-4 h-4 text-sama-600 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{userLocation ? 'GPS : Position active' : 'Filtrer par ma position GPS'}</span>
              </button>
            </div>

            {/* Sort by */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500"
              >
                <option value="rating">Mieux notés (★ 4.9+)</option>
                <option value="reviews">Nombre d'avis clients</option>
                <option value="distance">Distance la plus proche</option>
                <option value="price_asc">Tarif indicatif le plus bas</option>
              </select>
            </div>

          </div>

          {/* Quick Toggle Checkboxes */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                onlyVerified 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Identité CNI Vérifiée uniquement</span>
            </button>

            <button
              onClick={() => setOnlyAvailable(!onlyAvailable)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                onlyAvailable 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Disponible immédiatement</span>
            </button>

            {(selectedCategory || selectedNeighborhood || onlyVerified || onlyAvailable) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedNeighborhood('');
                  setOnlyVerified(false);
                  setOnlyAvailable(false);
                  setUserLocation(null);
                }}
                className="text-xs font-bold text-red-600 hover:underline ml-auto"
              >
                Réinitialiser tous les filtres
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-slate-700">
            <span className="text-sama-600 text-base font-black">{filteredProviders.length}</span> prestataires trouvés
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
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">Aucun prestataire ne correspond à ces critères</h3>
            <p className="text-xs text-slate-500">
              Essayez d'élargir votre recherche en sélectionnant tous les quartiers ou un autre corps de métier.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedNeighborhood('');
                setOnlyVerified(false);
                setOnlyAvailable(false);
              }}
              className="px-5 py-2.5 rounded-xl font-bold bg-sama-600 text-white text-xs"
            >
              Afficher tous les professionnels de Dakar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 p-8 text-center">Chargement des prestataires...</div>}>
      <SearchContent />
    </Suspense>
  );
}
