'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { 
  Wrench, 
  MapPin, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { CATEGORIES, PROVIDERS, NEIGHBORHOODS, formatFcfa } from '@/lib/data';
import ProviderCard from '@/components/provider/ProviderCard';

export default function CategorySeoPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = CATEGORIES.find((c) => c.slug === slug || c.id === slug) || CATEGORIES[0];
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  const providers = PROVIDERS.filter((p) => {
    if (p.categorySlug !== category.slug) return false;
    if (selectedNeighborhood && !p.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-sama-700">Accueil</Link>
            <span>/</span>
            <Link href="/recherche" className="hover:text-sama-700">Métiers</Link>
            <span>/</span>
            <span className="text-navy-900 font-bold">{category.name} à Dakar</span>
          </div>
        </div>
      </div>

      {/* SEO Hero Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sama-500/20 text-sama-400 text-xs font-bold border border-sama-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sélection d'Artisans Vérifiés à Dakar</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl">
            {category.name} à Dakar : <br />
            <span className="bg-gradient-to-r from-sama-400 to-emerald-400 bg-clip-text text-transparent">
              Trouvez un Pro Disponible 24/7
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {category.description} Comparez les devis, avis clients et contactez directement les maîtres artisans par WhatsApp.
          </p>

          {/* Key Trust Signals */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{category.providerCount} professionnels référencés</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-4 h-4 text-sama-400" />
              <span>Intervention Almadies, Ouakam, Mermoz & Dakar</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Star className="w-4 h-4 fill-emerald-400" />
              <span>Devis & Contact Direct Gratuits</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Neighborhood Filter Pills */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filtrer par quartier :</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedNeighborhood('')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedNeighborhood === ''
                  ? 'bg-sama-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tout Dakar
            </button>
            {NEIGHBORHOODS.slice(0, 7).map((n) => (
              <button
                key={n.id}
                onClick={() => setSelectedNeighborhood(n.name.split(' ')[0])}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedNeighborhood.toLowerCase() === n.name.split(' ')[0].toLowerCase()
                    ? 'bg-sama-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {n.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-navy-900">
              {providers.length} professionnels de {category.name} disponibles
            </h2>
            <Link
              href={`/recherche?categorie=${category.slug}&urgence=immediat`}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1.5 shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Dépannage d'urgence immédiat</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        </div>

        {/* Local FAQ & SEO Guide */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xl font-black text-navy-900">
            Guide & Tarifs : {category.name} au Sénégal
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-navy-900 text-sm">Combien coûte une intervention en moyenne ?</h4>
              <p className="leading-relaxed">
                À Dakar, le tarif de départ moyen pour une prestation de {category.name} se situe autour de <strong>{formatFcfa(category.averageStartingPrice)}</strong> pour un diagnostic ou un dépannage simple. Les travaux plus importants font l'objet d'un devis sur mesure.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-navy-900 text-sm">Comment sont vérifiés les artisans ?</h4>
              <p className="leading-relaxed">
                Tous les prestataires arborant le badge <strong>"Identité Vérifiée"</strong> ont soumis leur pièce d'identité officielle et leurs références professionnelles à l'équipe Sama Artisan.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
