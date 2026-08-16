'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Wrench, Lock, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { getProviders } from '@/lib/supabase/services';

export default function ConnexionPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 6) {
        setErrorMessage('Veuillez renseigner un numéro de téléphone valide.');
        setIsLoading(false);
        return;
      }

      // 1. Chercher dans les prestataires Supabase
      const pros = await getProviders();
      const matchedPro = pros.find((p) => {
        const pClean = (p.phone || '').replace(/[^0-9]/g, '');
        return pClean.includes(cleanPhone) || cleanPhone.includes(pClean);
      });

      // 2. Chercher dans les comptes enregistrés
      const accounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const matchedAccount = accounts.find((a: any) => {
        if (!a.phone) return false;
        const aClean = a.phone.replace(/[^0-9]/g, '');
        return aClean.includes(cleanPhone) || cleanPhone.includes(aClean);
      });

      if (matchedPro) {
        localStorage.setItem('samapro_current_user', JSON.stringify(matchedPro));
        localStorage.setItem('sama_user_session', JSON.stringify({
          name: matchedPro.name,
          phone: matchedPro.phone,
          role: 'pro'
        }));
        window.dispatchEvent(new Event('storage'));
        router.push('/pro/dashboard');
        return;
      } else if (matchedAccount) {
        // Créer l'objet pro à partir du compte
        const proUser = {
          id: matchedAccount.id || `pro-${Date.now()}`,
          slug: matchedAccount.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
          name: matchedAccount.name,
          businessName: matchedAccount.businessName || matchedAccount.name,
          phone: matchedAccount.phone,
          categorySlug: matchedAccount.categorySlug || 'plomberie',
          categoryName: matchedAccount.categoryName || 'Artisanat & Services',
          neighborhood: matchedAccount.neighborhood || 'Dakar',
          city: 'Dakar',
          avatar: matchedAccount.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
          bio: matchedAccount.bio || `Artisan professionnel au Sénégal.`,
          verificationLevel: 'ID_VERIFIED',
          averageRating: 5.0,
          reviewCount: 0,
          portfolio: []
        };
        localStorage.setItem('samapro_current_user', JSON.stringify(proUser));
        localStorage.setItem('sama_user_session', JSON.stringify({
          name: matchedAccount.name,
          phone: matchedAccount.phone,
          email: matchedAccount.email,
          role: 'pro'
        }));
        window.dispatchEvent(new Event('storage'));
        router.push('/pro/dashboard');
        return;
      } else {
        setErrorMessage('Aucun compte artisan trouvé avec ce numéro. Veuillez d\'abord vous inscrire gratuitement.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sama-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-md">
            <Wrench className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-navy-950">Espace Pro Sama Artisan</h1>
          <p className="text-xs text-slate-500">
            Connectez-vous pour gérer vos demandes clients et votre vitrine.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Numéro de Téléphone Professionnel
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="Ex: 77 645 89 12"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-sama-600 to-emerald-600 hover:from-sama-700 hover:to-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Se connecter à mon Espace Pro</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2">
          <p>
            Vous êtes artisan mais pas encore inscrit ?{' '}
            <Link href="/inscription" className="font-bold text-sama-600 hover:underline">
              Créer mon profil gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
