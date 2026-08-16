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
    <header className="sticky top-0 z-50 transition-all duration-200 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-6 min-w-0 shrink-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-sama-600 via-sama-500 to-brand-600 flex items-center justify-center text-white shadow-md sm:shadow-lg shadow-sama-500/25 group-hover:scale-105 transition-transform shrink-0">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-navy-900 whitespace-nowrap">
                    Sama<span className="text-sama-600">Artisan</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200 shrink-0">
                    Sénégal
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 hidden md:block">
                  Plateforme des Artisans Qualifiés & Vérifiés
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Droite : Statut de Connexion & Bouton Déconnexion */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {sessionUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* Badge utilisateur connecté */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 max-w-[100px] xs:max-w-[130px] sm:max-w-[180px]">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="truncate">
                    {sessionUser.name || 'Utilisateur'}
                  </span>
                </div>

                {/* Accès rapide Espace Pro */}
                <Link
                  href="/pro/dashboard"
                  className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-navy-900 text-white hover:bg-navy-800 transition-colors shrink-0 shadow-sm"
                  title="Accéder à votre Espace Pro Artisan"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Espace Pro</span>
                </Link>

                {/* Bouton Se Déconnecter pour Client ou Artisan */}
                <button
                  onClick={handleLogout}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/60 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm shrink-0"
                  title="Se déconnecter de votre compte"
                >
                  <LogOut className="w-3.5 h-3.5 stroke-[2.2] shrink-0" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/connexion"
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold bg-navy-900 hover:bg-navy-800 text-white transition-all shadow-sm active:scale-95"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Espace Pro</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
