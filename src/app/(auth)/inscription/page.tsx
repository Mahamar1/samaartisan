'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Globe2
} from 'lucide-react';
import { CATEGORIES, SENEGAL_REGIONS } from '@/lib/data';
import { registerArtisan } from '@/lib/supabase/services';

export default function InscriptionPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('plomberie');
  const [selectedRegionId, setSelectedRegionId] = useState('dakar');
  
  // Get available districts for the selected region
  const availableDistricts = useMemo(() => {
    const found = SENEGAL_REGIONS.find((r) => r.id === selectedRegionId);
    return found ? found.districts : [];
  }, [selectedRegionId]);

  const [selectedDistrictId, setSelectedDistrictId] = useState('almadies');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle region change: update region and reset district to the first available district
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
    setIsSubmitting(true);
    
    try {
      const categoryObj = CATEGORIES.find((c) => c.slug === category);
      const regionObj = SENEGAL_REGIONS.find((r) => r.id === selectedRegionId);
      const districtObj = regionObj?.districts.find((d) => d.id === selectedDistrictId);

      const newRegistration = {
        name: fullName,
        businessName: businessName || fullName,
        phone: phone,
        categorySlug: category,
        categoryName: categoryObj ? categoryObj.name : category,
        regionId: selectedRegionId,
        neighborhood: districtObj ? districtObj.name : (selectedDistrictId || 'Dakar'),
        cniNumber: 'En cours de validation'
      };

      // Register with Supabase / local fallback
      await registerArtisan(newRegistration);
    } catch (err) {
      console.error('Error saving registration:', err);
    }

    // Redirect to pro dashboard
    setTimeout(() => {
      router.push('/pro/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sama-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-md">
            <Wrench className="w-6 h-6" />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            <span>Offre 100% Gratuite</span>
          </div>

          <h1 className="text-2xl font-black text-navy-950">Inscription Artisan</h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Rejoignez gratuitement le réseau Sama Artisan et recevez des demandes de chantiers partout au Sénégal.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* 1. Nom & Prénom (Obligatoire) */}
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

          {/* 2. Nom d'entreprise ou d'atelier (Facultatif) */}
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
                Téléphone / WhatsApp Pro *
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

          {/* 4. Corps de Métier */}
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

          {/* 5. Région & Quartier / Ville (Cascade dynamique) */}
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

          {/* 6. Mot de passe */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Mot de passe *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Minimum 6 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Free Badge */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>0 FCFA</strong> • Inscription gratuite sans frais ni commission.</span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-sama-600 to-emerald-600 hover:from-sama-700 hover:to-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Création en cours...' : 'Créer mon Profil Gratuitement & Activer mon Espace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600">
          <p>
            Vous avez déjà un compte ?{' '}
            <Link href="/connexion" className="font-bold text-sama-600 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
