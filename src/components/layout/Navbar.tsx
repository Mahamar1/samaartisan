'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Wrench, 
  Home, 
  Search, 
  Users, 
  Tag, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  LogOut,
  Menu,
  X,
  Sparkles,
  Info,
  PhoneCall
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const checkUserSession = () => {
    try {
      const storedUser = localStorage.getItem('sama_user_session');
      const storedPro = localStorage.getItem('samapro_current_user');
      if (storedPro) {
        setSessionUser(JSON.parse(storedPro));
      } else if (storedUser) {
        setSessionUser(JSON.parse(storedUser));
      } else {
        setSessionUser(null);
      }
    } catch {
      setSessionUser(null);
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
      window.location.href = '/';
    } catch {
      window.location.href = '/';
    }
  };

  const navLinks = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Trouver un Artisan', href: '/recherche', icon: Search },
    { name: 'Devenir Prestataire', href: '/devenir-prestataire', icon: Sparkles },
    { name: 'À Propos', href: '/a-propos', icon: Info },
    { name: 'Contact & Support', href: '/contact', icon: PhoneCall },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-sama-600 via-sama-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-sama-500/20 group-hover:scale-105 transition-transform shrink-0">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900">
                    Sama<span className="text-sama-600">Artisan</span>
                  </span>
                  <span className="px-1.5 py-0.5 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200 shrink-0">
                    Sénégal
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-500 hidden sm:block">
                  Plateforme des Artisans Qualifiés & Vérifiés
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-sama-600 font-extrabold bg-sama-50' 
                      : 'hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {sessionUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href={sessionUser.role === 'pro' ? '/pro/dashboard' : '/mon-compte'}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sama-400" />
                  <span className="text-[11px] sm:text-xs">{sessionUser.role === 'pro' ? 'Espace Pro' : 'Mon Compte'}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href="/connexion"
                  className="flex items-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-sama-600 shrink-0" />
                  <span className="text-[11px] sm:text-xs">Connexion</span>
                </Link>

                <Link
                  href="/inscription"
                  className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sama-600 to-emerald-600 text-white shadow-md shadow-sama-600/20 hover:from-sama-500 hover:to-emerald-500 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px] sm:text-xs">S'inscrire</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive ? 'bg-sama-50 text-sama-600 font-extrabold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5 text-sama-500 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/inscription"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl font-extrabold bg-gradient-to-r from-sama-600 to-emerald-600 text-white text-center text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <UserPlus className="w-4 h-4" />
              <span>Créer un compte Particulier ou Artisan</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
