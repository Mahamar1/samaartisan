'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Home, 
  HardHat, 
  Briefcase, 
  Users, 
  Newspaper, 
  BookOpen, 
  Tag, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  LogOut,
  Menu,
  X,
  Search
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const checkUserSession = () => {
    try {
      const storedUser = localStorage.getItem('sama_user_session');
      if (storedUser) {
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
    { name: 'Biens', href: '/biens', icon: Building2 },
    { name: 'Projets BTP', href: '/projets', icon: HardHat },
    { name: 'Entreprises', href: '/entreprises', icon: Briefcase },
    { name: 'Prestataires', href: '/prestataires', icon: Users },
    { name: 'Publications', href: '/publications', icon: Newspaper },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Tarifs', href: '/tarifs', icon: Tag },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-blue-900 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                    SAMA <span className="text-orange-600">BTP</span> IMMO
                  </span>
                  <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-800 rounded-full border border-orange-200">
                    Sénégal
                  </span>
                </div>
                <p className="text-[10px] font-medium text-slate-500 hidden sm:block">
                  SaaS Immobilier & BTP Multi-Tenant
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-bold text-slate-600">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-orange-600 font-extrabold bg-orange-50' 
                      : 'hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Button & Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/recherche"
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-bold"
              title="Recherche globale"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">Recherche</span>
            </Link>

            {sessionUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all"
                >
                  <LayoutDashboard className="w-4 h-4 text-orange-400" />
                  <span>Espace Client</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 transition-all"
                >
                  <LogIn className="w-4 h-4 text-orange-600" />
                  <span>Connexion</span>
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/20 hover:from-orange-500 hover:to-amber-500 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden xs:inline">Créer mon espace</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 xl:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold ${
                    isActive ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-orange-500" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
