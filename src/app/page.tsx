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
  ChevronDown,
  User,
  Phone,
  Briefcase,
  Lock
} from 'lucide-react';
import { CATEGORIES, NEIGHBORHOODS, formatFcfa } from '@/lib/data';
import { getProviders } from '@/lib/supabase/services';
import { Provider } from '@/lib/types';

export default function HomePage() {
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Registration gate form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [userRole, setUserRole] = useState<'client' | 'pro'>('client');
  const [district, setDistrict] = useState('Almadies');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sama_user_session');
      const storedPro = localStorage.getItem('samapro_current_user');
      if (stored) {
        setSessionUser(JSON.parse(stored));
      } else if (storedPro) {
        setSessionUser(JSON.parse(storedPro));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingSession(false);
    }
  }, []);

  const handleRegisterEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    const newUser = {
      name: fullName.trim(),
      phone: phone.trim(),
      role: userRole,
      neighborhood: district,
      registeredAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('sama_user_session', JSON.stringify(newUser));
      setSessionUser(newUser);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    }
  };

  const faqs = [
    {
      q: "Comment trouver rapidement un artisan à Dakar ?",
      a: "Sur Sama Artisan, choisissez simplement le métier (plombier, électricien, climaticien, etc.) et votre quartier. Vous avez un accès immédiat aux profils vérifiés, numéros directs et boutons WhatsApp."
    },
    {
      q: "Est-ce gratuit pour les clients ?",
      a: "Oui, à 100% ! Aucun frais, aucune commission sur les devis ou les travaux."
    },
    {
      q: "Comment s'inscrire en tant qu'artisan professionnel ?",
      a: "Cliquez sur 'Créer mon profil Artisan' ou 'Devenir artisan', complétez vos coordonnées professionnelles en 2 minutes et commencez à recevoir des demandes de chantiers sur WhatsApp."
    },
    {
      q: "Comment sont vérifiés les artisans ?",
      a: "Chaque professionnel doit fournir une pièce d'identité officielle sénégalaise (CNI/Passeport) et justifier de ses qualifications et chantiers antérieurs."
    }
  ];

  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-sama-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-semibold">Chargement de Sama Artisan...</span>
        </div>
      </div>
    );
  }

  // 🚪 1. GATED ENTRY: SHOW REGISTRATION MODAL/PORTAL IF NOT REGISTERED
  if (!sessionUser) {
    return (
      <div className="min-h-[90vh] bg-gradient-to-b from-slate-950 via-navy-950 to-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sama-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20 relative z-10 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sama-600 to-brand-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-sama-600/30">
              <Wrench className="w-7 h-7 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
              Bienvenue sur <span className="text-sama-600">Sama Artisan</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              Inscrivez-vous en 30 secondes pour accéder à la plateforme des meilleurs artisans vérifiés au Sénégal.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegisterEntry} className="space-y-4">
            
            {/* Role selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setUserRole('client')}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  userRole === 'client'
                    ? 'bg-sama-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Je cherche un artisan</span>
              </button>

              <button
                type="button"
                onClick={() => setUserRole('pro')}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  userRole === 'pro'
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Je suis artisan</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nom & Prénom <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Moussa Diop"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none bg-slate-50/50"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Numéro WhatsApp / Téléphone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: 77 123 45 67"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none bg-slate-50/50"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Quartier / Zone à Dakar
              </label>
              <div className="relative">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none bg-slate-50/50 appearance-none"
                >
                  {NEIGHBORHOODS.map((n) => (
                    <option key={n.id} value={n.name}>{n.name}</option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-black bg-sama-600 hover:bg-sama-700 text-white shadow-xl shadow-sama-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
            >
              <span>Accéder à la plateforme</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Micro trust indicators */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Gratuit
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Artisans CNI Vérifiés
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Dakar & Régions
            </span>
          </div>

        </div>
      </div>
    );
  }

  // 🚀 2. CLEAN LANDING PAGE (AFTER SIGNUP) WITH 2 DISTINCT CHOICES
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 selection:bg-sama-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 border-b border-slate-800">
        
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sama-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Welcome User Pill */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-slate-200 shadow-xl">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bienvenue, <strong>{sessionUser.name}</strong> ({sessionUser.neighborhood || 'Dakar'})</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Que souhaitez-vous faire <br className="hidden sm:block" />
              sur <span className="bg-gradient-to-r from-sama-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">Sama Artisan</span> ?
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Choisissez l'option qui vous correspond pour démarrer immédiatement :
            </p>
          </div>

          {/* 🌟 THE 2 MAIN CLEAR CHOICES */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* OPTION 1: CLIENT / PARTICULIER */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 to-navy-900/90 border-2 border-sama-500/40 hover:border-sama-500 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-sama-600/20 text-sama-400 flex items-center justify-center border border-sama-500/30 group-hover:scale-110 transition-transform">
                  <Search className="w-8 h-8 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-sama-400">Pour les Particuliers & Entreprises</span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Je cherche un artisan
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Trouvez un plombier, électricien, climaticien, menuisier ou maçon certifié près de chez vous à Dakar. Contact direct WhatsApp sans frais.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>200+ Artisans CNI Vérifiés</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Réponse WhatsApp en moins de 15 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>100% Gratuit, 0 FCFA de commission</span>
                  </div>
                </div>
              </div>

              <Link
                href="/recherche"
                className="w-full py-4 rounded-2xl font-black bg-sama-600 hover:bg-sama-500 text-white shadow-xl shadow-sama-600/30 flex items-center justify-center gap-3 transition-all active:scale-95 text-sm"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Chercher & Trouver un artisan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* OPTION 2: ARTISAN / PROFESSIONNEL */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 to-navy-900/90 border-2 border-emerald-500/40 hover:border-emerald-500 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Pour les Professionnels du Métier</span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Je suis un artisan
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Créez votre vitrine professionnelle, ajoutez vos photos de chantiers et recevez des demandes de clients directement sur votre WhatsApp.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Inscription rapide et gratuite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Espace de gestion des demandes & portfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Visibilité maximale sur tout Dakar</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/devenir-prestataire"
                  className="w-full py-4 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3 transition-all active:scale-95 text-sm"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Créer mon profil artisan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/pro/dashboard"
                  className="w-full py-2.5 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Déjà inscrit ? Accéder à mon Espace Pro</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3 ÉTAPES COMMENT ÇA MARCHE */}
      <section className="py-16 md:py-24 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sama-400">Simplicité & Rapidité</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Comment ça fonctionne ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sama-600/20 text-sama-400 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Choisissez le métier</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recherchez par profession et quartier (Almadies, Mermoz, Plateau, Ouakam...).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-black text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Consultez les avis & photos</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vérifiez les compétences, réalisations récentes et notes authentiques.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Échangez sur WhatsApp</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contact direct sans intermédiaire pour fixer votre rendez-vous d'intervention.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-24 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sama-400">Aide & Questions</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Questions Fréquentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-white flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-sama-400 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 bg-slate-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
