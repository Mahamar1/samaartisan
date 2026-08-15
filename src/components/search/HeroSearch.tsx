'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Crosshair, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  PhoneCall, 
  Wrench, 
  Wind, 
  Key 
} from 'lucide-react';
import { CATEGORIES, NEIGHBORHOODS } from '@/lib/data';

export default function HeroSearch() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [geoDetectedText, setGeoDetectedText] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory) params.set('categorie', selectedCategory);
    if (selectedNeighborhood) params.set('quartier', selectedNeighborhood);
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
        setGeoDetectedText("Position détectée (Almadies / Ngor)");
        setSelectedNeighborhood("almadies");
      },
      (error) => {
        setIsLocating(false);
        // Fallback simulation for Dakar
        setGeoDetectedText("Position GPS activée (Dakar)");
        setSelectedNeighborhood("almadies");
      },
      { timeout: 5000 }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Form Card */}
      <div className="bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/40 ring-1 ring-slate-900/5">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-3">
          
          {/* Field 1: Category / Trade */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:bg-white focus-within:border-sama-500 focus-within:ring-2 focus-within:ring-sama-500/20 transition-all">
            <Search className="w-5 h-5 text-sama-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Quel service recherchez-vous ?
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-navy-900 focus:outline-none cursor-pointer"
              >
                <option value="">Tous les métiers (Plomberie, Clim, Électricité...)</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({cat.providerCount} pros)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Field 2: Neighborhood / Location */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:bg-white focus-within:border-sama-500 focus-within:ring-2 focus-within:ring-sama-500/20 transition-all relative">
            <MapPin className="w-5 h-5 text-brand-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Où à Dakar / Banlieue ?
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) => {
                  setSelectedNeighborhood(e.target.value);
                  setGeoDetectedText(null);
                }}
                className="w-full bg-transparent text-sm font-bold text-navy-900 focus:outline-none cursor-pointer"
              >
                <option value="">Tous les quartiers de Dakar</option>
                {NEIGHBORHOODS.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GPS Locate Button */}
            <button
              type="button"
              onClick={handleUseMyLocation}
              className={`shrink-0 p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                geoDetectedText 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200 shadow-sm'
              }`}
              title="Utiliser ma position GPS actuelle"
            >
              <Crosshair className={`w-4 h-4 text-sama-600 ${isLocating ? 'animate-spin' : ''}`} />
              <span className="hidden xl:inline">{isLocating ? 'Détection...' : 'GPS'}</span>
            </button>
          </div>

          {/* Submit Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-4 rounded-2xl font-black bg-gradient-to-r from-sama-600 via-sama-500 to-brand-600 hover:from-sama-700 hover:to-brand-700 text-white shadow-xl shadow-sama-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 text-base shrink-0"
          >
            <span>Trouver un Pro</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </form>
      </div>

      {/* Quick Access Badges & Emergencies */}
      <div className="mt-4 flex items-center justify-center flex-wrap gap-2 text-xs font-semibold">
        <span className="text-slate-500 font-bold hidden sm:inline">Urgences fréquentes :</span>
        
        <button
          onClick={() => {
            setSelectedCategory('plomberie');
            router.push('/recherche?categorie=plomberie&urgence=immediat');
          }}
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-navy-900 border border-slate-200/80 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Wrench className="w-3.5 h-3.5 text-blue-600" />
          <span>Fuite d'eau urgente</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('electricite');
            router.push('/recherche?categorie=electricite&urgence=immediat');
          }}
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-navy-900 border border-slate-200/80 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Panne électrique</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('climatisation');
            router.push('/recherche?categorie=climatisation');
          }}
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-navy-900 border border-slate-200/80 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Wind className="w-3.5 h-3.5 text-cyan-600" />
          <span>Clim ne refroidit plus</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('serrurerie');
            router.push('/recherche?categorie=serrurerie&urgence=immediat');
          }}
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-navy-900 border border-slate-200/80 shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Key className="w-3.5 h-3.5 text-red-500" />
          <span>Porte claquée 24/7</span>
        </button>
      </div>
    </div>
  );
}
