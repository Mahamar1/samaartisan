'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Wrench, 
  ArrowRight, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Gift, 
  User, 
  Building2, 
  Mail, 
  Lock,
  Globe2,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Eye,
  EyeOff,
  Briefcase,
  Search
} from 'lucide-react';
import { CATEGORIES, SENEGAL_REGIONS } from '@/lib/data';
import { registerArtisan, registerUserAccount, logServiceRequest } from '@/lib/supabase/services';

function HomePageContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams?.get('role') === 'client' ? 'client' : 'pro';
  
  const [activeRole, setActiveRole] = useState<'pro' | 'client'>(initialRole);
  
  // Common Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState('dakar');
  
  // Pro Specific Fields
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]?.slug || 'plombier');

  // Districts for selected region
  const availableDistricts = useMemo(() => {
    const found = SENEGAL_REGIONS.find((r) => r.id === selectedRegionId);
    return found ? found.districts : [];
  }, [selectedRegionId]);

  const [selectedDistrictId, setSelectedDistrictId] = useState('almadies');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState<any>(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const roleParam = searchParams?.get('role');
    if (roleParam === 'client' || roleParam === 'pro') {
      setActiveRole(roleParam);
    }
  }, [searchParams]);

  // Handle region change
  const handleRegionChange = (newRegionId: string) => {
    setSelectedRegionId(newRegionId);
    const region = SENEGAL_REGIONS.find((r) => r.id === newRegionId);
    if (region && region.districts.length > 0) {
      setSelectedDistrictId(region.districts[0].id);
    } else {
      setSelectedDistrictId('');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);
    
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPhone = phone.replace(/[^0-9]/g, '');

      // Validation
      if (!fullName.trim()) {
        setFormError('Veuillez renseigner votre nom et prénom.');
        setIsSubmitting(false);
        return;
      }
      if (!cleanPhone || cleanPhone.length < 6) {
        setFormError('Veuillez renseigner un numéro de téléphone valide.');
        setIsSubmitting(false);
        return;
      }
      if (!cleanEmail || !cleanEmail.includes('@')) {
        setFormError('Veuillez renseigner une adresse email valide.');
        setIsSubmitting(false);
        return;
      }
      if (!password || password.length < 6) {
        setFormError('Le mot de passe doit contenir au moins 6 caractères.');
        setIsSubmitting(false);
        return;
      }

      // Check existing accounts in local storage
      const accounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const emailExists = accounts.some((a: any) => a.email && a.email.toLowerCase() === cleanEmail);
      if (emailExists) {
        setFormError('Cette adresse email est déjà associée à un compte. Veuillez vous connecter.');
        setIsSubmitting(false);
        return;
      }

      const regionObj = SENEGAL_REGIONS.find((r) => r.id === selectedRegionId);
      const districtObj = regionObj?.districts.find((d) => d.id === selectedDistrictId);
      const districtName = districtObj ? districtObj.name : (selectedDistrictId || 'Dakar');

      if (activeRole === 'pro') {
        const categoryObj = CATEGORIES.find((c) => c.slug === category);
        const newRegistration = {
          name: fullName.trim(),
          businessName: businessName.trim() || fullName.trim(),
          email: cleanEmail,
          phone: phone.trim(),
          categorySlug: category,
          categoryName: categoryObj ? categoryObj.name : category,
          regionId: selectedRegionId,
          neighborhood: districtName,
          cniNumber: 'En cours de validation'
        };

        // Register in Supabase Cloud
        const res = await registerArtisan(newRegistration);
        const savedArtisan = res?.data || newRegistration;

        // Register account credentials
        await registerUserAccount({
          name: newRegistration.name,
          phone: newRegistration.phone,
          email: cleanEmail,
          password: password,
          role: 'pro',
          businessName: newRegistration.businessName,
          categorySlug: newRegistration.categorySlug,
          categoryName: newRegistration.categoryName,
          neighborhood: newRegistration.neighborhood
        });

        localStorage.setItem('sama_last_user_role', 'pro');
        setRegisteredSuccess({ ...savedArtisan, role: 'pro' });

        // Log request
        logServiceRequest({
          clientName: newRegistration.name,
          clientPhone: newRegistration.phone,
          serviceType: `Inscription Artisan Pro - ${newRegistration.categoryName}`,
          channel: 'FORM'
        }).catch(() => {});

      } else {
        // Enregistrement CLIENT PARTICULIER
        const clientAccount = {
          name: fullName.trim(),
          phone: phone.trim(),
          email: cleanEmail,
          password: password,
          role: 'client' as const,
          neighborhood: districtName,
          regionId: selectedRegionId
        };

        const res = await registerUserAccount(clientAccount);
        if (!res.success) {
          setFormError(res.error || "Erreur lors de l'enregistrement.");
          setIsSubmitting(false);
          return;
        }

        localStorage.setItem('sama_last_user_role', 'client');
        setRegisteredSuccess({ ...clientAccount, role: 'client' });

        // Log request
        logServiceRequest({
          clientName: clientAccount.name,
          clientPhone: clientAccount.phone,
          serviceType: 'Inscription Client Particulier',
          channel: 'FORM'
        }).catch(() => {});
      }
    } catch (err) {
      console.error('Error saving registration:', err);
      setFormError("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-8 sm:py-12 bg-slate-50">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        
        {registeredSuccess ? (
          <div className="text-center py-6 space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                {registeredSuccess.role === 'pro' ? 'Profil Artisan Activé & En Ligne' : 'Compte Client Activé'}
              </div>
              <h2 className="text-2xl font-black text-navy-950">
                Bienvenue {registeredSuccess.name} !
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {registeredSuccess.role === 'pro' ? (
                  <>Votre entreprise <strong>{registeredSuccess.businessName}</strong> a été enregistrée avec succès sur <strong>Sama Artisan</strong>.</>
                ) : (
                  <>Votre compte <strong>Client Particulier</strong> est prêt. Vous pouvez maintenant contacter les meilleurs artisans et suivre vos demandes.</>
                )}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1.5 text-left max-w-sm mx-auto">
              {registeredSuccess.role === 'pro' && (
                <p><strong className="text-slate-800">Métier :</strong> {registeredSuccess.categoryName}</p>
              )}
              <p><strong className="text-slate-800">Zone :</strong> {registeredSuccess.neighborhood}</p>
              <p><strong className="text-slate-800">Téléphone :</strong> {registeredSuccess.phone}</p>
              <p><strong className="text-slate-800">Type de Compte :</strong> <span className="text-emerald-600 font-bold">{registeredSuccess.role === 'pro' ? 'Artisan Professionnel' : 'Client Particulier'}</span></p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {registeredSuccess.role === 'pro' ? (
                <>
                  {registeredSuccess.slug && (
                    <Link
                      href={`/prestataires/${registeredSuccess.slug}`}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs shadow-sm transition-all text-center"
                    >
                      Voir ma page publique
                    </Link>
                  )}
                  <Link
                    href="/pro/dashboard"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-sama-600 hover:bg-sama-700 text-white text-xs shadow-md transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>Accéder à mon Espace Pro</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/recherche"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs shadow-sm transition-all text-center flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4 text-sama-400" />
                    <span>Chercher un Artisan</span>
                  </Link>
                  <Link
                    href="/mon-compte"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-sama-600 hover:bg-sama-700 text-white text-xs shadow-md transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>Accéder à mon Espace Client</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* En-tête avec Sélecteur de Rôle */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sama-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-md">
                {activeRole === 'pro' ? <Wrench className="w-6 h-6" /> : <User className="w-6 h-6" />}
              </div>

              {/* Onglets de sélection du rôle */}
              <div className="flex p-1 bg-slate-100 rounded-2xl max-w-sm mx-auto border border-slate-200">
                <button
                  type="button"
                  onClick={() => { 
                    setActiveRole('pro'); 
                    setFormError(''); 
                    localStorage.setItem('sama_last_user_role', 'pro');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeRole === 'pro'
                      ? 'bg-white text-navy-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5 text-sama-600" />
                  <span>Je suis Artisan</span>
                </button>

                <button
                  type="button"
                  onClick={() => { 
                    setActiveRole('client'); 
                    setFormError(''); 
                    localStorage.setItem('sama_last_user_role', 'client');
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeRole === 'client'
                      ? 'bg-white text-navy-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Je suis Client</span>
                </button>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-black text-navy-950">
                  {activeRole === 'pro' ? 'Inscription Artisan & Prestataire' : 'Inscription Espace Client'}
                </h1>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {activeRole === 'pro' 
                    ? 'Rejoignez gratuitement le réseau Sama Artisan et recevez des demandes de chantiers partout au Sénégal.'
                    : 'Créez votre compte pour trouver les meilleurs artisans certifiés, suivre vos demandes et sauvegarder vos favoris.'
                  }
                </p>
              </div>
            </div>

            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl font-medium space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{formError}</span>
                </div>
                <Link
                  href="/connexion"
                  className="w-full py-2 bg-sama-600 hover:bg-sama-700 text-white rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-1 shadow-sm block text-center"
                >
                  <span>Se connecter avec ces identifiants &rarr;</span>
                </Link>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* 1. Nom & Prénom */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nom et Prénom *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Ex: Moussa Diop"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* 2. Nom d'entreprise ou d'atelier (Pour les Pros uniquement) */}
              {activeRole === 'pro' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase">
                      Nom d'Entreprise ou d'Atelier
                    </label>
                    <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
                      Facultatif
                    </span>
                  </div>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Ex: Diop Plomberie Express (Optionnel)"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 3. Adresse Email & Téléphone/WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Adresse Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="moussa.diop@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    {activeRole === 'pro' ? 'Téléphone / WhatsApp Pro *' : 'Téléphone / WhatsApp *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+221 77 000 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Corps de Métier (Pour les Pros uniquement) */}
              {activeRole === 'pro' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Corps de Métier *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* 5. Région & Quartier / Ville */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <Globe2 className="w-3.5 h-3.5 text-sama-600" />
                    <span>Région *</span>
                  </label>
                  <select
                    value={selectedRegionId}
                    onChange={(e) => handleRegionChange(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  >
                    {SENEGAL_REGIONS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sama-600" />
                    <span>Quartier / Ville *</span>
                  </label>
                  <select
                    value={selectedDistrictId}
                    onChange={(e) => setSelectedDistrictId(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  >
                    {availableDistricts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 6. Mot de Passe */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Mot de passe *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Au moins 6 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Avantages & Badge */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-start gap-2.5">
                <Gift className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-emerald-900 space-y-0.5 leading-relaxed">
                  <span className="font-bold">
                    {activeRole === 'pro' ? 'Avantage Lancement Professionnel :' : 'Avantage Client Sama Artisan :'}
                  </span>
                  <p className="text-emerald-700">
                    {activeRole === 'pro' 
                      ? 'Profil en ligne immédiat, visibilité sur Dakar et tout le Sénégal, zéro commission sur vos devis.'
                      : 'Accès 100% gratuit à tous les artisans certifiés, contact direct WhatsApp et devis sans intermédiaire.'}
                  </p>
                </div>
              </div>

              {/* Bouton de Soumission */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold bg-sama-600 hover:bg-sama-700 text-white text-xs shadow-lg shadow-sama-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {activeRole === 'pro' ? 'Créer mon compte Artisan' : 'Créer mon compte Client'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                Vous avez déjà un compte ?{' '}
                <Link href="/connexion" className="text-sama-600 font-bold hover:underline">
                  Se connecter
                </Link>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-3 border-sama-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
