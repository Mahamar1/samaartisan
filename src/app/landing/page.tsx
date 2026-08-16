'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Wrench, 
  Zap, 
  Wind,
  Hammer,
  Paintbrush,
  Key,
  Flame,
  Layers,
  PhoneCall, 
  Star, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  MapPin, 
  ArrowRight,
  UserCheck,
  ChevronRight,
  MessageSquare,
  Search,
  HeartHandshake,
  TrendingUp,
  Award,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES, NEIGHBORHOODS, formatFcfa } from '@/lib/data';
import { getProviders } from '@/lib/supabase/services';
import { Provider } from '@/lib/types';

export default function LandingPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    getProviders().then((pros) => {
      if (pros && pros.length > 0) {
        setProviders(pros);
      }
    });
  }, []);

  const faqs = [
    {
      q: "Comment fonctionne la mise en relation sur Sama Artisan ?",
      a: "C'est 100% simple et direct : vous recherchez le métier dont vous avez besoin (plombier, électricien, maçon, etc.) et votre quartier à Dakar. Vous accédez immédiatement aux numéros directs et boutons WhatsApp des artisans vérifiés pour échanger sans intermédiaire."
    },
    {
      q: "Est-ce gratuit pour les particuliers ?",
      a: "Oui, la recherche d'artisans, l'accès à leurs coordonnées, leurs photos de réalisations et la prise de contact WhatsApp sont 100% gratuits pour tous les particuliers."
    },
    {
      q: "Comment les artisans sont-ils vérifiés ?",
      a: "Chaque artisan inscrit sur Sama Artisan est soumis à une vérification d'identité (CNI sénégalaise ou passeport), de ses compétences et de ses réalisations antérieures avant d'obtenir le badge 'Artisan Vérifié'."
    },
    {
      q: "Je suis artisan, comment rejoindre la plateforme ?",
      a: "Cliquez simplement sur 'Devenir artisan', remplissez vos informations professionnelles en 2 minutes et accédez immédiatement à votre Espace Artisan avec gestion de vos demandes clients et de votre portfolio."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 selection:bg-sama-500 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 border-b border-slate-800">
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sama-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-slate-200 shadow-xl animate-in fade-in slide-in-from-top-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Plateforme N°1 des Artisans Qualifiés à Dakar</span>
              <span className="text-sama-400 font-bold hidden sm:inline">★ 4.9/5</span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.15]">
              Trouvez le meilleur artisan <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-sama-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                en moins de 2 minutes
              </span> à Dakar.
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Plomberie, climatisation, électricité, peinture, serrurerie et maçonnerie. Contact direct WhatsApp avec des artisans certifiés et notés par vos voisins.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/recherche"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black bg-sama-600 hover:bg-sama-500 text-white shadow-xl shadow-sama-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 text-base"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>Trouver un artisan maintenant</span>
              </Link>

              <Link
                href="/devenir-prestataire"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-base"
              >
                <UserCheck className="w-5 h-5 text-sama-400" />
                <span>Vous êtes artisan ? Rejoignez-nous</span>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-center backdrop-blur-sm shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-sama-400">200+</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Artisans CNI Vérifiés</div>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-center backdrop-blur-sm shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">&lt; 15 min</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Réponse WhatsApp</div>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-center backdrop-blur-sm shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">98.5%</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Clients Satisfaits</div>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-center backdrop-blur-sm shadow-lg">
              <div className="text-3xl sm:text-4xl font-black text-brand-400">0 FCFA</div>
              <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Frais pour les particuliers</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS (3 ÉTAPES) */}
      <section className="py-20 md:py-28 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sama-400">Simple & Efficace</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Comment fonctionne Sama Artisan ?
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Une expérience fluide conçue spécialement pour les habitants de Dakar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-4 hover:border-sama-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-sama-600/20 text-sama-400 flex items-center justify-center font-black text-xl border border-sama-500/30">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Choisissez votre métier</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Sélectionnez le corps de métier recherché et filtrez par quartier (Almadies, Mermoz, Plateau, Ouakam, etc.).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-4 hover:border-sama-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-black text-xl border border-emerald-500/30">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Consultez le profil vérifié</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Découvrez les photos de chantiers récents, les avis certifiés, les années d'expérience et les garanties de l'artisan.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-4 hover:border-sama-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-black text-xl border border-amber-500/30">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Contact direct sur WhatsApp</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Appelez ou écrivez directement sur WhatsApp sans intermédiaire ni frais cachés. Fixez votre rendez-vous en direct !
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CATEGORIES HIGHLIGHT */}
      <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sama-400">Services Disponibles</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                Tous les corps de métier à portée de main
              </h2>
            </div>
            <Link
              href="/recherche"
              className="inline-flex items-center gap-2 font-bold text-sama-400 hover:text-sama-300 text-sm transition-colors"
            >
              <span>Voir tous les métiers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sama-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-800 group-hover:bg-sama-600 text-sama-400 group-hover:text-white transition-all flex items-center justify-center mb-4">
                  {cat.slug === 'plomberie' && <Wrench className="w-6 h-6" />}
                  {cat.slug === 'electricite' && <Zap className="w-6 h-6" />}
                  {cat.slug === 'climatisation' && <Wind className="w-6 h-6" />}
                  {cat.slug === 'menuiserie' && <Hammer className="w-6 h-6" />}
                  {cat.slug === 'peinture' && <Paintbrush className="w-6 h-6" />}
                  {cat.slug === 'serrurerie' && <Key className="w-6 h-6" />}
                  {cat.slug === 'soudure' && <Flame className="w-6 h-6" />}
                  {cat.slug === 'maconnerie' && <Layers className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-white group-hover:text-sama-400 transition-colors text-base">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {cat.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Dès {formatFcfa(cat.averageStartingPrice)}</span>
                  <ChevronRight className="w-4 h-4 text-sama-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. TRUST & SECURITY */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-900 to-navy-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sécurité & Transparence</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                La garantie d'un travail soigné, sans mauvaise surprise.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Chaque artisan présent sur notre plateforme s'engage à respecter notre charte de qualité, de ponctualité et d'honnêteté tarifaire.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Vérification d'Identité & CNI</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Vérification systématique des pièces d'identité et de l'expérience professionnelle.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-2 rounded-xl bg-sama-500/20 text-sama-400 shrink-0">
                    <Star className="w-5 h-5 fill-sama-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Avis et Notes 100% Authentiques</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Seuls les vrais clients ayant réalisé un chantier peuvent noter les professionnels.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Zéro Intermédiaire, Zéro Commission</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Le prix convenu avec l'artisan est celui que vous payez, directement et en toute clarté.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Box */}
            <div className="relative">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-navy-900 border border-slate-700 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sama-600 text-white font-black flex items-center justify-center text-lg">
                      SA
                    </div>
                    <div>
                      <h4 className="font-black text-white">Sama Artisan Sénégal</h4>
                      <p className="text-xs text-slate-400">Réseau Certifié Dakar</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Actif 24/7
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Plomberie & Dépannage</span>
                    <span className="font-bold text-emerald-400">38 artisans disponibles</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Climatisation & Froid</span>
                    <span className="font-bold text-emerald-400">29 artisans disponibles</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Électricité Bâtiment</span>
                    <span className="font-bold text-emerald-400">42 artisans disponibles</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Menuiserie & Peinture</span>
                    <span className="font-bold text-emerald-400">35 artisans disponibles</span>
                  </div>
                </div>

                <Link
                  href="/recherche"
                  className="w-full py-3.5 rounded-2xl font-bold bg-sama-600 hover:bg-sama-500 text-white text-xs flex items-center justify-center gap-2 shadow-lg shadow-sama-600/30 transition-all active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>Explorer les artisans de votre quartier</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-20 md:py-28 bg-slate-900 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sama-400">Foire Aux Questions</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Questions Fréquemment Posées
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-slate-800/80 border border-slate-700/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-white flex items-center justify-between gap-4 hover:bg-slate-700/50 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-sama-400 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/50 bg-slate-900/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. BOTTOM PRO CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-sama-900 via-navy-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-sama-300">
            <Sparkles className="w-4 h-4" />
            <span>Vous êtes un professionnel du bâtiment ou du dépannage ?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Développez votre clientèle à Dakar dès aujourd'hui.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Rejoignez le réseau Sama Artisan en moins de 2 minutes. Recevez des demandes de chantiers directement sur votre téléphone WhatsApp sans commission.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/devenir-prestataire"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black bg-white text-navy-950 hover:bg-slate-100 shadow-2xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-base"
            >
              <UserCheck className="w-5 h-5 text-sama-600" />
              <span>Créer mon profil artisan gratuit</span>
            </Link>

            <Link
              href="/pro/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-base"
            >
              <span>Accéder à mon Espace Pro</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
