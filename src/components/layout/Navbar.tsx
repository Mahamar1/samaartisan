'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Wrench, 
  LogOut, 
  User,
  Sparkles,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [isPro, setIsPro] = useState(false);

  const checkUserSession = () => {
    try {
      const storedAuth = localStorage.getItem('sama_user_session');
      const storedPro = localStorage.getItem('samapro_current_user');
      if (storedPro) {
        setSessionUser(JSON.parse(storedPro));
        setIsPro(true);
      } else if (storedAuth) {
        setSessionUser(JSON.parse(storedAuth));
        setIsPro(false);
      } else {
        setSessionUser(null);
        setIsPro(false);
      }
    } catch (e) {
      setSessionUser(null);
      setIsPro(false);
    }
  };

  useEffect(() => {
    checkUserSession();
    window.addEventListener('storage', checkUserSession);
    return () => window.removeEventListener('storage', checkUserSession);
  }, [pathname]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('sama_user_session');
      localStorage.removeItem('samapro_current_user');
      setSessionUser(null);
      setIsPro(false);
      window.dispatchEvent(new Event('storage'));
      window.location.href = '/';
    } catch (e) {
      window.location.href = '/';
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-200 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-sama-600 via-sama-500 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-sama-500/25 group-hover:scale-105 transition-transform shrink-0">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-navy-900 whitespace-nowrap">
                    Sama<span className="text-sama-600">Artisan</span>
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                    Sénégal
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                  Plateforme des Artisans Qualifiés & Vérifiés
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Droite : Statut de Connexion & Bouton Déconnexion */}
          <div className="flex items-center gap-2 sm:gap-3">
            {sessionUser ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Badge utilisateur connecté */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="max-w-[120px] sm:max-w-[180px] truncate">
                    {sessionUser.name || 'Utilisateur'}
                  </span>
                </div>

                {/* Accès rapide Espace Pro si artisan */}
                {isPro && (
                  <Link
                    href="/pro/dashboard"
                    className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-navy-900 text-white hover:bg-navy-800 transition-colors"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Espace Pro</span>
                  </Link>
                )}

                {/* Bouton Se Déconnecter pour Client ou Artisan */}
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/60 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
                  title="Se déconnecter de votre compte"
                >
                  <LogOut className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Plateforme Sécurisée</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
