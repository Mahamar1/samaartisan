'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  HardHat, 
  Users, 
  UserCheck, 
  FileText, 
  CreditCard, 
  FolderCheck, 
  Newspaper, 
  Users2, 
  BarChart3, 
  Settings, 
  Zap, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Home
} from 'lucide-react';

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sama_user_session');
      if (stored) {
        setUserSession(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sama_user_session');
    window.location.href = '/login';
  };

  const navItems = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Biens Immobiliers', href: '/app/biens', icon: Building2 },
    { name: 'Publications', href: '/app/publications', icon: Newspaper },
    { name: 'Projets BTP', href: '/app/projets', icon: HardHat },
    { name: 'Clients (CRM)', href: '/app/clients', icon: Users },
    { name: 'Propriétaires', href: '/app/proprietaires', icon: UserCheck },
    { name: 'Locataires', href: '/app/locataires', icon: Users2 },
    { name: 'Contrats', href: '/app/contrats', icon: FileText },
    { name: 'Paiements', href: '/app/paiements', icon: CreditCard },
    { name: 'Documents', href: '/app/documents', icon: FolderCheck },
    { name: 'Équipe', href: '/app/equipe', icon: Users },
    { name: 'Statistiques', href: '/app/statistiques', icon: BarChart3 },
    { name: 'Paramètres', href: '/app/parametres', icon: Settings },
    { name: 'Abonnement SaaS', href: '/app/abonnement', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white h-16 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white shadow">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-black text-lg text-white tracking-tight hidden xs:inline">
              SAMA <span className="text-orange-500">BTP</span> IMMO
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-slate-300 hover:text-white font-semibold flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Home className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Site Public</span>
          </Link>

          <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">{userSession?.name || 'Agence Noune Immo'}</p>
              <p className="text-[10px] text-orange-400 font-semibold">{userSession?.organizationName || 'Organisation Pro'}</p>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
        
        {/* Sidebar Desktop */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out pt-20 lg:pt-4 border-r border-slate-800 flex flex-col justify-between overflow-y-auto`}>
          <div className="px-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Espace Organisation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/20' 
                      : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-800 space-y-2">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-1">
              <span className="font-extrabold text-orange-400 block text-[11px]">FORFAIT PRO ACTIF</span>
              <p className="text-[11px] text-slate-300">Biens: 3 / 100 • Chantiers: 2 / 15</p>
            </div>
          </div>
        </aside>

        {/* Main Content Body */}
        <main className="flex-grow lg:pl-64 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
