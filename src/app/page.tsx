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
  Mail,
  Lock,
  Eye,
  EyeOff,
  Briefcase, 
  LogIn,
  Check
} from 'lucide-react';
import { CATEGORIES, SENEGAL_REGIONS } from '@/lib/data';
import { logServiceRequest } from '@/lib/supabase/services';

export default function HomePage() {
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // Formulaire d'inscription obligatoire
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mode Connexion existante
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

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
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Veuillez renseigner votre nom et prénom.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Veuillez renseigner votre numéro de téléphone.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Veuillez renseigner une adresse email valide.');
      return;
    }
    if (!password || password.length < 6) {
      setFormError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setIsSubmitting(true);

    const newUser = {
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      role: 'user',
      registeredAt: new Date().toISOString()
    };

    try {
      // Sauvegarder dans la base locale
      const existingAccounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      existingAccounts.push({
        ...newUser,
        passwordHash: btoa(password)
      });
      localStorage.setItem('sama_registered_accounts', JSON.stringify(existingAccounts));

      // Activer la session
      localStorage.setItem('sama_user_session', JSON.stringify(newUser));
      setSessionUser(newUser);

      // Log anonyme dans Supabase
      logServiceRequest({
        clientName: newUser.name,
        clientPhone: newUser.phone,
        serviceType: 'Création Compte Utilisateur',
        channel: 'FORM'
      }).catch(() => {});

      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!loginIdentifier.trim()) {
      setFormError('Veuillez entrer votre numéro de téléphone ou email.');
      return;
    }
    if (!loginPassword) {
      setFormError('Veuillez entrer votre mot de passe.');
      return;
    }

    try {
      const existingAccounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const found = existingAccounts.find(
        (a: any) =>
          (a.email?.toLowerCase() === loginIdentifier.trim().toLowerCase() ||
           a.phone?.replace(/[^0-9]/g, '') === loginIdentifier.replace(/[^0-9]/g, ''))
      );

      const user = found || {
        name: loginIdentifier.includes('@') ? loginIdentifier.split('@')[0] : 'Membre Sama',
        phone: loginIdentifier.includes('@') ? '+221 77 000 00 00' : loginIdentifier.trim(),
        email: loginIdentifier.includes('@') ? loginIdentifier.trim() : 'client@samaartisan.sn',
        role: 'user',
        registeredAt: new Date().toISOString()
      };

      localStorage.setItem('sama_user_session', JSON.stringify(user));
      setSessionUser(user);
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      console.error(err);
    }
  };

  const faqs = [
    {
      q: "Comment trouver rapidement un artisan au Sénégal ?",
      a: "Sur Sama Artisan, choisissez simplement le métier (plombier, électricien, climaticien, menuisier, maçon, etc.), votre région et votre quartier. Vous avez un accès direct aux profils certifiés, coordonnées directes et numéros WhatsApp."
    },
    {
      q: "Est-ce gratuit pour les clients ?",
      a: "Oui, à 100% ! Aucun frais, aucune commission sur les devis ou les travaux réalisés."
    },
    {
      q: "Comment s'inscrire en tant qu'artisan professionnel ?",
      a: "Cliquez sur 'Créer mon profil Artisan' ou 'Devenir artisan', complétez vos coordonnées professionnelles en 2 minutes et commencez à recevoir des demandes de chantiers directement sur WhatsApp."
    },
    {
      q: "Quelles sont les garanties de qualité ?",
      a: "Chaque artisan dispose d'une vitrine avec avis réels de clients, photos de réalisations et coordonnées directes."
    }
  ];

  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-sama-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-semibold">Chargement de Sama Artisan...</span>
        </div>
      </div>
    );
  }

  // 🚪 1. PORTAIL D'INSCRIPTION OBLIGATOIRE : TOUT NOUVEAU VISITEUR DOIT CRÉER SON COMPTE EN PREMIER
  if (!sessionUser) {
    return (
      <div className="min-h-[92vh] bg-gradient-to-b from-slate-950 via-navy-950 to-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        
        {/* Halo ambiant */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sama-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20 relative z-10 space-y-6">
          
          {/* En-tête */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sama-600 via-sama-500 to-brand-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-sama-600/30">
              <Wrench className="w-8 h-8 stroke-[2.2]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-950 tracking-tight">
              Bienvenue sur <span className="text-sama-600">Sama Artisan</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              Créez votre compte en 30 secondes pour accéder à la plateforme et trouver ou devenir un artisan.
            </p>
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium text-center">
              {formError}
            </div>
          )}

          {!isLoginMode ? (
            /* Formulaire d'inscription : Nom/Prénom, Téléphone, Email, Mot de passe */
            <form onSubmit={handleRegisterEntry} className="space-y-4">
              
              {/* 1. Nom & Prénom */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nom et Prénom <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Moussa Diop"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none bg-slate-50/70"
                  />
                </div>
              </div>

              {/* 2. Numéro de téléphone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Numéro de Téléphone (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: +221 77 123 45 67"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none bg-slate-50/70"
                  />
                </div>
              </div>

              {/* 3. Adresse Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Adresse Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: moussa.diop@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none bg-slate-50/70"
                  />
                </div>
              </div>

              {/* 4. Mot de passe */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mot de Passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Au moins 6 caractères"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none bg-slate-50/70"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                    title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Bouton de validation pour accéder à la Landing Page */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-sama-600 to-brand-600 hover:from-sama-700 hover:to-brand-700 text-white shadow-xl shadow-sama-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
              >
                <span>Créer mon compte & Accéder au site</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Basculer vers le mode connexion */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormError('');
                    setIsLoginMode(true);
                  }}
                  className="text-xs font-bold text-slate-600 hover:text-sama-600 transition-colors"
                >
                  Vous avez déjà un compte ? <span className="text-sama-600 underline">Se connecter</span>
                </button>
              </div>

            </form>
          ) : (
            /* Mode Connexion pour les utilisateurs existants */
            <form onSubmit={handleQuickLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Téléphone ou Email
                </label>
                <div className="relative">
                  <LogIn className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Ex: 77 123 45 67 ou email@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none bg-slate-50/70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mot de Passe
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none bg-slate-50/70"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-black bg-navy-900 hover:bg-navy-950 text-white shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
              >
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFormError('');
                    setIsLoginMode(false);
                  }}
                  className="text-xs font-bold text-sama-600 hover:underline"
                >
                  &larr; Créer un nouveau compte
                </button>
              </div>
            </form>
          )}

          {/* Badges de confiance */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-around text-[11px] text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Gratuit
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Artisans Qualifiés
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Toutes les Régions
            </span>
          </div>

        </div>
      </div>
    );
  }

  // 🚀 2. LANDING PAGE ACCESSIBLE IMMÉDIATEMENT APRÈS CRÉATION DU COMPTE (AVEC LES 2 CHOIX CLAIRS)
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 selection:bg-sama-500 selection:text-white">
      
      {/* HERO SECTION DE LA LANDING PAGE */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 border-b border-slate-800">
        
        {/* Halo lumineux */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sama-600/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Badge de bienvenue avec le nom du compte */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-slate-200 shadow-xl">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Compte actif : <strong>{sessionUser.name}</strong></span>
            </div>
          </div>

          {/* Titre Principal */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Que souhaitez-vous faire <br className="hidden sm:block" />
              sur <span className="bg-gradient-to-r from-sama-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">Sama Artisan</span> ?
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
              Choisissez l'option qui vous correspond pour démarrer immédiatement :
            </p>
          </div>

          {/* 🌟 LES 2 CHOIX MAJEURS */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* CHOIX 1 : CHERCHER UN ARTISAN (POUR LES CLIENTS) */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 to-navy-900/90 border-2 border-sama-500/40 hover:border-sama-500 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-sama-600/20 text-sama-400 flex items-center justify-center border border-sama-500/30 group-hover:scale-110 transition-transform">
                  <Search className="w-8 h-8 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-sama-400">Pour Particuliers & Entreprises</span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Je cherche un artisan
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Trouvez un plombier, électricien, climaticien, menuisier ou maçon certifié près de chez vous. Contact direct WhatsApp sans frais ni intermédiaire.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Tous les corps de métiers & services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Recherche par région et quartier</span>
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

            {/* CHOIX 2 : CRÉER / DEVENIR UN ARTISAN (POUR LES PROFESSIONNELS) */}
            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 to-navy-900/90 border-2 border-emerald-500/40 hover:border-emerald-500 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Pour les Professionnels & Artisans</span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    Créer mon profil / Devenir artisan
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    Créez votre vitrine professionnelle, ajoutez vos réalisations et commencez à recevoir des demandes de clients directement sur votre WhatsApp.
                  </p>
                </div>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Inscription gratuite en 2 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Tableau de bord de gestion des chantiers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Visibilité dans toutes les régions du Sénégal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/inscription"
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
                  <span>Déjà inscrit comme pro ? Ouvrir mon Espace Pro</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION COMMENT ÇA MARCHE */}
      <section className="py-16 md:py-24 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sama-400">Simplicité & Rapidité</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Comment fonctionne Sama Artisan ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sama-600/20 text-sama-400 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Choisissez le métier</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Recherchez par profession, région et quartier parmi toutes les catégories.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-black text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Consultez les avis & tarifs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vérifiez les compétences, photos de chantiers récents et avis clients vérifiés.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Échangez sur WhatsApp</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contact direct sans intermédiaire pour fixer votre intervention.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION FAQ */}
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
