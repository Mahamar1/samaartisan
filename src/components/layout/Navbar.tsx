'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Wrench, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Menu, 
  X, 
  PhoneCall, 
  UserCheck, 
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('samapro_current_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {}
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-6">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-sama-600 via-sama-500 to-brand-600 flex items-center justify-center text-white shadow-md sm:shadow-lg shadow-sama-500/25 group-hover:scale-105 transition-transform shrink-0">
                <Wrench className="w-4.5 h-4.5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-navy-900 whitespace-nowrap">
                    Sama<span className="text-sama-600">Artisan</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sama-100 text-sama-800 rounded-full border border-sama-200">
                    Dakar & Régions
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                  Les Meilleurs Artisans au Sénégal
                </p>
              </div>
            </Link>

            {/* Desktop Categories Dropdown */}
            <div className="hidden lg:relative lg:block">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-sama-700 bg-slate-100/80 hover:bg-sama-50 rounded-xl transition-all border border-slate-200/60"
              >
                <span>Catégories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180 text-sama-600' : 'text-slate-400'}`} />
              </button>

              {categoryDropdownOpen && (
                <div 
                  className="absolute left-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Principaux Métiers</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto px-2 space-y-1">
                    {CATEGORIES.slice(0, 8).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/recherche?categorie=${cat.slug}`}
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-sama-50 hover:text-sama-700 rounded-xl transition-colors"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                          {cat.providerCount} pros
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-100 mt-2">
                    <Link
                      href="/recherche"
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="block text-center py-2 text-xs font-bold text-sama-600 hover:bg-sama-50 rounded-lg"
                    >
                      Voir tous les métiers &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.slug && (
                  <Link
                    href={`/prestataires/${currentUser.slug}`}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <span>Voir mon profil</span>
                  </Link>
                )}
                <Link
                  href="/pro/dashboard"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Mon Espace Artisan ({currentUser.name?.split(' ')[0] || 'Artisan'})</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/pro/dashboard"
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-navy-900 hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-brand-600" />
                <span>Mon Espace Artisan</span>
              </Link>
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/recherche"
              className="px-4 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 active:scale-95"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Trouver un artisan</span>
            </Link>

            {!currentUser && (
              <Link
                href="/devenir-prestataire"
                className="px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-sama-400" />
                <span>Devenir artisan</span>
              </Link>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
            <Link
              href="/recherche"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-1 shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Trouver</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 shadow-xl">
          <div className="space-y-1">
            {currentUser?.slug && (
              <Link
                href={`/prestataires/${currentUser.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 font-semibold hover:bg-slate-50 transition-colors"
              >
                <Briefcase className="w-5 h-5 text-sama-600" />
                <span>Voir mon profil public ({currentUser.name})</span>
              </Link>
            )}
            <Link
              href="/pro/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 font-semibold hover:bg-slate-50 transition-colors"
            >
              <UserCheck className="w-5 h-5 text-emerald-600" />
              <span>Mon Espace Artisan</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {!currentUser && (
              <Link
                href="/devenir-prestataire"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-center text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
              >
                <Briefcase className="w-4 h-4 text-sama-400" />
                <span>Devenir artisan</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
