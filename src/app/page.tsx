'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Wrench, 
  Zap, 
  PhoneCall, 
  Star, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  MapPin, 
  Award, 
  TrendingUp, 
  ArrowRight,
  UserCheck,
  ChevronRight,
  Coins,
  MessageSquare
} from 'lucide-react';
import HeroSearch from '@/components/search/HeroSearch';
import ProviderCard from '@/components/provider/ProviderCard';
import { CATEGORIES, PROVIDERS, NEIGHBORHOODS, formatFcfa } from '@/lib/data';
import { getProviders } from '@/lib/supabase/services';
import { Provider } from '@/lib/types';

export default function HomePage() {
  const [providersList, setProvidersList] = useState<Provider[]>(PROVIDERS);
  const [jobsPerMonth, setJobsPerMonth] = useState(4);
  const [averageJobPrice, setAverageJobPrice] = useState(35000);

  React.useEffect(() => {
    getProviders().then((pros) => {
      if (pros && pros.length > 0) {
        setProvidersList(pros);
      }
    });
  }, []);

  const potentialRevenue = jobsPerMonth * averageJobPrice;
  const subscriptionCost = 5000;
  const netEarnings = potentialRevenue - subscriptionCost;
  const roi = Math.round((netEarnings / subscriptionCost) * 100);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-900 via-navy-900 to-slate-900 text-white">
        
        {/* Background ambient glowing spheres */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sama-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill Announcement */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-200 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>N°1 de la mise en relation d'artisans vérifiés à Dakar</span>
              <span className="text-sama-400 font-bold">★ 4.9/5</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Trouvez un professionnel <br />
              <span className="bg-gradient-to-r from-sama-400 via-emerald-300 to-brand-400 bg-clip-text text-transparent">
                fiable & vérifié
              </span> près de chez vous.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Plomberie, climatisation, électricité, menuiserie, peinture ou mécanique. Contactez directement les meilleurs artisans de votre quartier en quelques secondes.
            </p>
          </div>

          {/* Hero Search Box */}
          <HeroSearch />

          {/* Key Trust Counters */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-sama-400">200+</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Artisans CNI Vérifiés</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">&lt; 15 min</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Délai moyen de réponse</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">98.4%</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Clients Satisfaits</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-brand-400">0 FCFA</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">Gratuit pour les clients</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sama-600">Explorez nos services</span>
              <h2 className="text-2xl sm:text-4xl font-black text-navy-900 mt-1">
                Tous les corps de métier à Dakar
              </h2>
            </div>
            <Link
              href="/recherche"
              className="inline-flex items-center gap-2 font-bold text-sama-700 hover:text-sama-800 text-sm"
            >
              <span>Voir les {CATEGORIES.length} métiers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                href={`/recherche?categorie=${category.slug}`}
                className="group p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-sama-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sama-50 to-slate-100 text-sama-700 flex items-center justify-center group-hover:bg-sama-600 group-hover:text-white transition-colors shadow-sm">
                    {category.slug === 'plomberie' && <Wrench className="w-6 h-6" />}
                    {category.slug === 'electricite' && <Zap className="w-6 h-6" />}
                    {category.slug === 'climatisation' && <Wind className="w-6 h-6" />}
                    {category.slug === 'menuiserie' && <Hammer className="w-6 h-6" />}
                    {category.slug === 'peinture' && <Paintbrush className="w-6 h-6" />}
                    {category.slug === 'serrurerie' && <Key className="w-6 h-6" />}
                    {category.slug === 'soudure' && <Flame className="w-6 h-6" />}
                    {category.slug === 'maconnerie' && <Layers className="w-6 h-6" />}
                  </div>

                  <div>
                    <h3 className="font-bold text-navy-900 group-hover:text-sama-600 transition-colors text-base">
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {category.shortDesc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 3. FEATURED & VERIFIED PROVIDERS */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Sélection Recommandée & Identité Certifiée</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-navy-900">
                Les prestataires les mieux notés de la semaine
              </h2>
            </div>
            
            <Link
              href="/recherche"
              className="px-5 py-2.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs flex items-center gap-2 shadow-sm shrink-0"
            >
              <span>Explorer l'annuaire complet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {providersList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providersList.slice(0, 6).map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-xl mx-auto space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy-900">Aucun prestataire pour le moment</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Vous êtes un artisan qualifié à Dakar ou dans les régions du Sénégal ? Soyez le premier à inscrire votre entreprise gratuitement !
              </p>
              <div className="pt-2">
                <Link
                  href="/devenir-prestataire"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-sama-600 hover:bg-sama-700 text-white shadow-md shadow-sama-600/20 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Inscrire mon entreprise gratuitement</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. HOW IT WORKS (CLIENT & ARTISAN) */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sama-400">Simplicité & Rapidité</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Comment fonctionne Sama Artisan ?
            </h2>
            <p className="text-sm text-slate-300">
              Un processus en 3 étapes transparentes, pensé pour les réalités locales et la réactivité WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 relative">
              <div className="w-12 h-12 rounded-2xl bg-sama-500 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-sama-500/30">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Recherchez & Comparez</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Indiquez votre besoin (ex: fuite d'eau) et votre quartier à Dakar. Visualisez les artisans vérifiés, leurs photos de réalisations et les avis clients.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Échangez sur WhatsApp ou Appel</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Envoyez les photos du problème en un clic. L'artisan vous donne une estimation de prix et fixe l'heure de son intervention chez vous.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white font-black text-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Travail Réalisé & Avis Partagé</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Le professionnel effectue la prestation avec soin. Vous réglez directement l'artisan et laissez votre note pour guider la communauté.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. ARTISAN REVENUE / ROI CALCULATOR */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-sama-900 via-slate-900 to-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left pitch */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <Coins className="w-4 h-4" />
                <span>100% Gratuit — Zéro Frais & Zéro Commission</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Vous êtes artisan ? <br />
                Multipliez vos chantiers dès cette semaine.
              </h2>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                L'inscription et la réception de demandes clients sont <strong className="text-emerald-400">100% gratuites</strong>. Recevez des appels et messages de clients qualifiés directement sur votre WhatsApp. <strong>Zéro commission sur vos chantiers</strong>.
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Votre mini-site professionnel avec vos plus belles réalisations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Badge "Identité Vérifiée" gratuit pour inspirer confiance aux clients</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Contact direct sur votre numéro WhatsApp personnel</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/inscription"
                  className="px-8 py-4 rounded-2xl font-black bg-gradient-to-r from-sama-500 to-emerald-500 hover:from-sama-600 hover:to-emerald-600 text-white shadow-xl shadow-sama-500/30 active:scale-95 transition-all inline-flex items-center gap-2 text-base"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Créer mon Profil Artisan Gratuitement &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive Simulator */}
            <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 space-y-6 shadow-2xl">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sama-400" />
                <span>Simulateur de Gains Mensuels</span>
              </h3>

              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Chantiers estimés / mois obtenus via Sama Artisan</span>
                  <span className="text-amber-400 font-extrabold text-sm">{jobsPerMonth} chantiers</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={jobsPerMonth}
                  onChange={(e) => setJobsPerMonth(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sama-400"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Prix moyen d'une de vos prestations</span>
                  <span className="text-amber-400 font-extrabold text-sm">{formatFcfa(averageJobPrice)}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={averageJobPrice}
                  onChange={(e) => setAverageJobPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sama-400"
                />
              </div>

              {/* Results Box */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700 text-center space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Votre Chiffre d'Affaires Brut Estimé
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                  +{formatFcfa(potentialRevenue)} <span className="text-xs text-slate-300">/ mois</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                  <span>Frais d'accès : <strong className="text-emerald-400 font-bold">0 FCFA (100% Gratuit)</strong></span>
                  <span className="text-emerald-300 font-bold">Commission : 0%</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. NEIGHBORHOODS LOCAL FOOTPRINT */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sama-600">Présents Partout</span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mt-1">
              Des artisans disponibles dans tous les quartiers de Dakar
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {NEIGHBORHOODS.map((n) => (
              <Link
                key={n.id}
                href={`/recherche?quartier=${n.id}`}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sama-50 border border-slate-200/80 hover:border-sama-300 text-center transition-all group"
              >
                <MapPin className="w-4 h-4 text-sama-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-navy-900 group-hover:text-sama-700 block">
                  {n.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {n.popularServices[0]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA BANNER */}
      <section className="py-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Un problème de plomberie ou d'électricité maintenant ?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Trouvez un artisan compétent à moins de 2 km en 30 secondes chrono.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/recherche?urgence=immediat"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all text-base"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Dépannage d'urgence immédiat</span>
            </Link>
            <Link
              href="/recherche"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition-all text-base"
            >
              <Wrench className="w-5 h-5" />
              <span>Consulter l'annuaire des pros</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// Icon helper components for missing lucide imports
function Hammer(props: any) {
  return <Wrench {...props} />;
}
function Paintbrush(props: any) {
  return <Sparkles {...props} />;
}
function Flame(props: any) {
  return <Zap {...props} />;
}
function Layers(props: any) {
  return <Award {...props} />;
}
function Wind(props: any) {
  return <Sparkles {...props} />;
}
function Key(props: any) {
  return <Wrench {...props} />;
}
