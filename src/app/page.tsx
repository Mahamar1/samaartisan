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
  LogIn,
  UserPlus,
  SlidersHorizontal,
  Rocket
} from 'lucide-react';
import { CATEGORIES, formatFcfa } from '@/lib/data';
import { getProviders } from '@/lib/supabase/services';
import { Provider } from '@/lib/types';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [providersCount, setProvidersCount] = useState<number>(250);

  useEffect(() => {
    // 1. Loading splash animation (1.2 seconds)
    const hasLoaded = sessionStorage.getItem('sama_splash_done');
    if (hasLoaded) {
      setIsLoading(false);
    } else {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setIsLoading(false);
              sessionStorage.setItem('sama_splash_done', 'true');
            }, 300);
            return 100;
          }
          return prev + Math.floor(Math.random() * 20) + 15;
        });
      }, 90);

      return () => clearInterval(timer);
    }

    // 2. Fetch live providers count
    getProviders().then((pros) => {
      if (pros && pros.length > 0) {
        setProvidersCount(pros.length + 250);
      }
    });
  }, []);

  const faqs = [
    {
      q: "Comment s'inscrire sur la plateforme Sama Artisan ?",
      a: "C'est 100% gratuit et rapide ! Cliquez simplement sur le bouton 'S'inscrire maintenant'. Vous pouvez créer votre compte en 2 minutes en choisissant votre profil : Client Particulier ou Artisan Professionnel."
    },
    {
      q: "Quels sont les avantages de créer un compte ?",
      a: "Pour les clients : accès direct aux numéros WhatsApp des artisans certifiés CNI, enregistrement d'artisans favoris et suivi des demandes. Pour les artisans : vitrine professionnelle gratuite, réception de chantiers en direct sans commission."
    },
    {
      q: "Comment les artisans sont-ils vérifiés ?",
      a: "Chaque artisan inscrit fournit sa pièce d'identité CNI sénégalaise et ses références. Nos équipes contrôlent les informations avant de délivrer le badge d'Artisan Certifié CNI."
    }
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-sama-500 selection:text-white font-sans">
      
      {/* ========================================================================= */}
      {/* 1. ÉCRAN DE CHARGEMENT ANIMÉ (SPLASH LOADING SCREEN)                       */}
      {/* ========================================================================= */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-700 ease-out">
          
          {/* Light Auras Background */}
          <div className="absolute w-[500px] h-[500px] bg-sama-600/20 rounded-full blur-[140px] animate-pulse pointer-events-none" />
          <div className="absolute w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Center Brand Badge & Progress */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm px-6">
            
            {/* Glowing Icon Ring */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sama-500 via-emerald-400 to-amber-400 blur-lg opacity-70 animate-pulse" />
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-white shadow-2xl relative">
                <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-sama-400 animate-bounce" />
              </div>
            </div>

            {/* Platform Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Sama<span className="text-sama-400">Artisan</span>
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Sénégal
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-400">
                Chargement de la plateforme des artisans qualifiés...
              </p>
            </div>

            {/* Progress Bar & Percentage */}
            <div className="w-full space-y-2.5 pt-2">
              <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-3 overflow-hidden p-0.5 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-sama-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 px-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-sama-400 animate-spin" />
                  <span>Initialisation de l'accueil...</span>
                </span>
                <span className="text-sama-400 font-mono font-black">{Math.min(progress, 100)}%</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. LOADING PAGE DE PRÉSENTATION (PAGE D'ACCUEIL AVEC BOUTON D'INSCRIPTION)  */}
      {/* ========================================================================= */}
      <div className={isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-700'}>
        
        {/* Top Status Announcement Ribbon */}
        <div className="bg-gradient-to-r from-sama-700 via-sama-600 to-emerald-600 text-white text-[11px] sm:text-xs font-bold py-2.5 px-4 text-center flex items-center justify-center gap-2 shadow-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-300 animate-ping shrink-0" />
          <span>🇸🇳 Bienvenue sur Sama Artisan • Plateforme N°1 des Artisans Certifiés au Sénégal</span>
          <Link href="/inscription" className="underline font-black text-amber-300 hover:text-white ml-2 hidden sm:inline flex items-center gap-1">
            <span>S'inscrire maintenant &rarr;</span>
          </Link>
        </div>

        {/* HERO ACCUEIL & PRESENTATION */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900 to-slate-950 border-b border-slate-800">
          
          {/* Glowing Aura Effects */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sama-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Top Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-slate-200 shadow-2xl">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Réseau d'Artisans Qualifiés & Certifiés CNI</span>
                <span className="px-2 py-0.5 rounded-full bg-sama-500/30 text-sama-300 font-extrabold text-[10px]">
                  ★ 4.9/5
                </span>
              </div>
            </div>

            {/* Main Presentation Title & Subtitle */}
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.12]">
                Trouvez le meilleur artisan <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-sama-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                  en moins de 2 minutes
                </span> à Dakar.
              </h1>

              <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                Plomberie, climatisation, électricité, peinture, serrurerie et maçonnerie. Prise de contact WhatsApp directe avec des artisans vérifiés.
              </p>

              {/* ========================================================================= */}
              {/* BOUTON PRINCIPAL D'ACCÈS AU FORMULAIRE D'INSCRIPTION (HIGHLIGHTED CTA)   */}
              {/* ========================================================================= */}
              <div className="pt-6 max-w-2xl mx-auto">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-sama-500/60 shadow-2xl shadow-sama-600/20 backdrop-blur-xl space-y-5 transform hover:scale-[1.01] transition-all">
                  
                  <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
                    <Rocket className="w-4 h-4" />
                    <span>Inscrivez-vous en 2 minutes gratuitement</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Vous souhaitez utiliser nos services ou devenir artisan ?
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    
                    {/* BOUTON REQUIS : REDIRECTION VERS LE FORMULAIRE D'INSCRIPTION */}
                    <Link
                      href="/inscription"
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black bg-gradient-to-r from-sama-600 via-sama-500 to-emerald-500 hover:from-sama-500 hover:to-emerald-400 text-white shadow-xl shadow-sama-600/40 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 text-base border border-emerald-400/30"
                    >
                      <UserPlus className="w-5 h-5 stroke-[2.5]" />
                      <span>Aller au formulaire d'inscription &rarr;</span>
                    </Link>

                    {/* BOUTON CONNEXION */}
                    <Link
                      href="/connexion"
                      className="w-full sm:w-auto px-7 py-4 rounded-2xl font-extrabold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-sm"
                    >
                      <LogIn className="w-4 h-4 text-sama-400" />
                      <span>Se Connecter</span>
                    </Link>

                  </div>

                  <p className="text-[11px] text-slate-400 font-medium">
                    ✓ Inscription 100% Gratuite pour Clients et Artisans • Zéro frais cachés
                  </p>

                </div>
              </div>

            </div>

            {/* Stats Counter Bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-center backdrop-blur-sm shadow-xl">
                <div className="text-3xl sm:text-4xl font-black text-sama-400">{providersCount}+</div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Artisans Certifiés CNI</div>
              </div>
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-center backdrop-blur-sm shadow-xl">
                <div className="text-3xl sm:text-4xl font-black text-amber-400">&lt; 10 min</div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Réponse WhatsApp Directe</div>
              </div>
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-center backdrop-blur-sm shadow-xl">
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">99.2%</div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Avis Clients Positifs</div>
              </div>
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-center backdrop-blur-sm shadow-xl">
                <div className="text-3xl sm:text-4xl font-black text-blue-400">0 FCFA</div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Frais pour les particuliers</div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTON DES MÉTIERS & SERVICES DISPONIBLES */}
        <section className="py-20 md:py-28 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sama-400">Catalogue des Services</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                  Les corps de métier disponibles sur Sama Artisan
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Trouvez des artisans qualifiés dans votre zone à Dakar et au Sénégal.
                </p>
              </div>

              {/* BOUTON D'INSCRIPTION SECONDAIRE */}
              <Link
                href="/inscription"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sama-600 hover:bg-sama-500 text-white font-bold text-xs shadow-lg transition-all shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>Créer un compte &rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group p-6 rounded-3xl bg-slate-900 border border-slate-800/90 hover:border-sama-500/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 group-hover:bg-sama-600 text-sama-400 group-hover:text-white transition-all flex items-center justify-center mb-4 shadow-md">
                    {cat.iconName === 'Zap' && <Zap className="w-6 h-6" />}
                    {cat.iconName === 'Wind' && <Wind className="w-6 h-6" />}
                    {cat.iconName === 'Hammer' && <Hammer className="w-6 h-6" />}
                    {cat.iconName === 'Paintbrush' && <Paintbrush className="w-6 h-6" />}
                    {cat.iconName === 'Key' && <Key className="w-6 h-6" />}
                    {cat.iconName === 'Flame' && <Flame className="w-6 h-6" />}
                    {cat.iconName === 'Layers' && <Layers className="w-6 h-6" />}
                    {cat.iconName === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                    {(!cat.iconName || cat.iconName === 'Wrench' || !['Zap', 'Wind', 'Hammer', 'Paintbrush', 'Key', 'Flame', 'Layers', 'Smartphone'].includes(cat.iconName)) && <Wrench className="w-6 h-6" />}
                  </div>
                  <h3 className="font-bold text-white group-hover:text-sama-400 transition-colors text-base">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {cat.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-emerald-400">Dès {formatFcfa(cat.averageStartingPrice)}</span>
                    <ChevronRight className="w-4 h-4 text-sama-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION « POURQUOI REJOINDRE LA PLATEFORME » */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-slate-900 to-navy-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sécurité & Transparence</span>
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  La garantie d'un service de qualité au Sénégal.
                </h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  En créant votre compte sur Sama Artisan, vous accédez à un réseau sécurisé de prestataires qualifiés.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Vérification d'Identité CNI</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Contrôle des pièces d'identité sénégalaises de chaque artisan.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="p-2.5 rounded-xl bg-sama-500/20 text-sama-400 shrink-0">
                      <Star className="w-6 h-6 fill-sama-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Avis et Notes 100% Authentiques</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Seuls les vrais clients ayant réalisé un chantier peuvent évaluer les artisans.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte d'Initation Inscription */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-navy-900 border border-slate-700 shadow-2xl space-y-6 text-center">
                <div className="w-16 h-16 rounded-3xl bg-sama-600/20 text-sama-400 border border-sama-500/30 flex items-center justify-center mx-auto text-2xl">
                  <UserPlus className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-black text-white">
                  Prêt à rejoindre Sama Artisan ?
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                  Que vous soyez un particulier à la recherche d'un artisan ou un professionnel souhaitant recevoir des clients, votre inscription prend moins de 2 minutes.
                </p>

                {/* BOUTON INSCRIPTION PRINCIPAL DANS LA CARTE */}
                <Link
                  href="/inscription"
                  className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-sama-600 to-emerald-500 hover:from-sama-500 hover:to-emerald-400 text-white text-sm flex items-center justify-center gap-2 shadow-xl shadow-sama-600/30 transition-all active:scale-95"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Accéder au Formulaire d'Inscription &rarr;</span>
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 md:py-28 bg-slate-900 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sama-400">Questions Fréquentes</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Foire Aux Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left font-bold text-white flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-sama-400 shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-900/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-sama-950 via-navy-950 to-slate-950 text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Créez votre compte en quelques clics.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              Rejoignez dès maintenant la communauté Sama Artisan au Sénégal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/inscription"
                className="w-full sm:w-auto px-9 py-4 rounded-2xl font-black bg-gradient-to-r from-sama-500 to-emerald-500 hover:from-sama-600 hover:to-emerald-600 text-white shadow-2xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 text-base"
              >
                <UserPlus className="w-5 h-5" />
                <span>Ouvrir le formulaire d'inscription &rarr;</span>
              </Link>

              <Link
                href="/connexion"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-base"
              >
                <LogIn className="w-5 h-5 text-sama-400" />
                <span>Se Connecter</span>
              </Link>
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sama-600 flex items-center justify-center text-white font-black text-lg">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-black text-white">Sama<span className="text-sama-500">Artisan</span></span>
                  <p className="text-[11px] text-slate-500">Plateforme N°1 des Artisans Qualifiés au Sénégal</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
                <Link href="/inscription" className="text-sama-400 hover:text-white font-bold transition-colors">S'inscrire</Link>
                <Link href="/connexion" className="hover:text-white transition-colors">Connexion</Link>
                <Link href="/recherche" className="hover:text-white transition-colors">Recherche</Link>
                <Link href="/a-propos" className="hover:text-white transition-colors">À Propos</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
              <p>© {new Date().getFullYear()} Sama Artisan Sénégal. Tous droits réservés.</p>
              <p>Dakar • Thiès • Saint-Louis • Ziguinchor</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
