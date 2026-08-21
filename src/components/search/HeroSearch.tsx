'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Crosshair, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  PhoneCall, 
  Wrench, 
  Wind, 
  Key 
} from 'lucide-react';
import { CATEGORIES, SENEGAL_REGIONS } from '@/lib/data';

export default function HeroSearch() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [geoDetectedText, setGeoDetectedText] = useState<string | null>(null);

  // Available districts based on region
  const availableDistricts = useMemo(() => {
    if (selectedRegion) {
      const reg = SENEGAL_REGIONS.find((r) => r.id === selectedRegion);
      return reg ? reg.districts : [];
    }
    return SENEGAL_REGIONS.flatMap((r) => r.districts);
  }, [selectedRegion]);

  const handleRegionChange = (reg: string) => {
    setSelectedRegion(reg);
    setSelectedDistrict('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory) params.set('categorie', selectedCategory);
    if (selectedRegion) params.set('region', selectedRegion);
    if (selectedDistrict) params.set('quartier', selectedDistrict);
    router.push(`/recherche?${params.toString()}`);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setGeoDetectedText("Position détectée");
        setSelectedRegion("dakar");
        setSelectedDistrict("almadies");
      },
      (error) => {
        setIsLocating(false);
        setGeoDetectedText("GPS Dakar");
        setSelectedRegion("dakar");
        setSelectedDistrict("almadies");
      },
      { timeout: 5000 }
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Search Form Card */}
      <div className="bg-white/95 backdrop-blur-xl p-3 sm:p-5 rounded-3xl shadow-2xl border border-white/40 ring-1 ring-slate-900/5">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Field 1: Category / Trade */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:bg-white focus-within:border-sama-500 focus-within:ring-2 focus-within:ring-sama-500/20 transition-all">
            <Search className="w-5 h-5 text-sama-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Métier ou Service
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-navy-900 focus:outline-none cursor-pointer"
              >
                <option value="">Tous les métiers ({CATEGORIES.length})</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Field 2: Region */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:bg-white focus-within:border-sama-500 focus-within:ring-2 focus-within:ring-sama-500/20 transition-all">
            <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Région
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-navy-900 focus:outline-none cursor-pointer"
              >
                <option value="">Toutes les régions ({SENEGAL_REGIONS.length})</option>
                {SENEGAL_REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    📍 {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Field 3: Quartiers */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:bg-white focus-within:border-sama-500 focus-within:ring-2 focus-within:ring-sama-500/20 transition-all relative">
            <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Quartiers
              </label>
              <input
                type="text"
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setGeoDetectedText(null);
                }}
                placeholder="Entrez un quartier..."
                className="w-full bg-transparent text-xs font-bold text-navy-900 focus:outline-none placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* GPS Locate Button */}
            <button
              type="button"
              onClick={handleUseMyLocation}
              className={`shrink-0 p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                geoDetectedText 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200 shadow-sm'
              }`}
              title="Utiliser ma position GPS"
            >
              <Crosshair className={`w-3.5 h-3.5 text-sama-600 ${isLocating ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Field 4: Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3.5 rounded-2xl font-black bg-gradient-to-r from-sama-600 via-sama-500 to-brand-600 hover:from-sama-700 hover:to-brand-700 text-white shadow-xl shadow-sama-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm shrink-0"
          >
            <span>Trouver un Artisan</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

        </form>
      </div>

      {/* Quick Access Badges & Emergencies */}
      <div className="mt-4 flex items-center justify-center flex-wrap gap-2 text-xs font-semibold">
        <span className="text-slate-300 font-bold hidden sm:inline">Urgences fréquentes :</span>
        
        <button
          onClick={() => {
            setSelectedCategory('plomberie');
            router.push('/recherche?categorie=plomberie&urgence=immediat');
          }}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Wrench className="w-3.5 h-3.5 text-blue-400" />
          <span>Fuite d'eau urgente</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('electricite');
            router.push('/recherche?categorie=electricite&urgence=immediat');
          }}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Panne d'électricité</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('climatisation');
            router.push('/recherche?categorie=climatisation');
          }}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Wind className="w-3.5 h-3.5 text-cyan-400" />
          <span>Clim ne refroidit plus</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('serrurerie');
            router.push('/recherche?categorie=serrurerie&urgence=immediat');
          }}
          className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Key className="w-3.5 h-3.5 text-red-400" />
          <span>Porte claquée 24/7</span>
        </button>
      </div>
    </div>
  );
}
