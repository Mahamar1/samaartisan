'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Wrench, Lock, Phone, ArrowRight, ShieldCheck, AlertCircle, User, Briefcase } from 'lucide-react';
import { loginUserAccount } from '@/lib/supabase/services';

function ConnexionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');

  const [selectedRole, setSelectedRole] = useState<'client' | 'pro'>(
    roleParam === 'client' ? 'client' : (roleParam === 'pro' ? 'pro' : 'client')
  );

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (roleParam === 'client' || roleParam === 'pro') {
      setSelectedRole(roleParam);
    } else {
      const storedLast = localStorage.getItem('sama_last_user_role');
      if (storedLast === 'client' || storedLast === 'pro') {
        setSelectedRole(storedLast);
      }
    }
  }, [roleParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await loginUserAccount(phone, password);

      if (!res.success) {
        setErrorMessage(res.error || 'Identifiants incorrects.');
        return;
      }

      const role = res.user?.role === 'pro' ? 'pro' : 'client';
      localStorage.setItem('sama_last_user_role', role);

      if (role === 'pro') {
        router.push('/pro/dashboard');
      } else {
        router.push('/mon-compte');
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
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        
        {/* Header with Icon */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sama-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-md">
            {selectedRole === 'client' ? <User className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
          </div>

          {/* Role selector tabs */}
          <div className="flex p-1 bg-slate-100 rounded-2xl max-w-xs mx-auto border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('client');
                localStorage.setItem('sama_last_user_role', 'client');
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                selectedRole === 'client'
                  ? 'bg-white text-navy-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Espace Client</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('pro');
                localStorage.setItem('sama_last_user_role', 'pro');
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                selectedRole === 'pro'
                  ? 'bg-white text-navy-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-sama-600" />
              <span>Espace Artisan</span>
            </button>
          </div>

          <h1 className="text-2xl font-black text-navy-950">
            {selectedRole === 'client' ? 'Connexion Espace Client' : 'Connexion Espace Artisan'}
          </h1>
          <p className="text-xs text-slate-500">
            {selectedRole === 'client' 
              ? 'Accédez à vos demandes, devis et artisans favoris.' 
              : 'Accédez à votre tableau de bord artisan et vos contacts clients.'}
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
              Numéro de Téléphone ou Email
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ex: 77 645 89 12 ou email@domaine.com"
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
            disabled={isLoading}
            className={`w-full py-3.5 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 ${
              selectedRole === 'client'
                ? 'bg-gradient-to-r from-sama-600 to-blue-600 hover:from-sama-700 hover:to-blue-700'
                : 'bg-gradient-to-r from-navy-900 to-slate-900 hover:from-navy-950 hover:to-slate-950'
            }`}
          >
            <span>
              {isLoading 
                ? 'Connexion en cours...' 
                : selectedRole === 'client' 
                  ? 'Se connecter à mon Espace Client' 
                  : 'Se connecter à mon Espace Artisan'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2">
          <p>
            Vous n'avez pas encore de compte ?{' '}
            <Link 
              href={`/inscription?role=${selectedRole}`} 
              className="font-bold text-sama-600 hover:underline"
            >
              Créer un compte {selectedRole === 'client' ? 'Client' : 'Artisan'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sama-600"></div>
      </div>
    }>
      <ConnexionContent />
    </Suspense>
  );
}

