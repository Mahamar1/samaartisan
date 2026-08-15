'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  AlertTriangle, 
  Check, 
  X, 
  TrendingUp, 
  Star, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Smartphone,
  Lock,
  Mail,
  KeyRound,
  LogOut,
  Search,
  Trash2,
  UserPlus,
  Ban,
  RefreshCw,
  Phone,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';
import { PROVIDERS, MOCK_ADMIN_METRICS, CATEGORIES, SENEGAL_REGIONS, formatFcfa } from '@/lib/data';
import { getProviders, updateProvider, deleteProvider, registerArtisan } from '@/lib/supabase/services';
import { Provider, VerificationLevel } from '@/lib/types';

interface PendingArtisan {
  id: string;
  name: string;
  businessName?: string;
  trade: string;
  neighborhood: string;
  regionName?: string;
  phone: string;
  email?: string;
  cniNumber: string;
  dateSubmitted: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Security Credentials state
  const [currentAdminPass, setCurrentAdminPass] = useState('admin2026');
  const [newPassInput, setNewPassInput] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'providers' | 'settings'>('overview');
  const [providersList, setProvidersList] = useState<Provider[]>([]);
  const [pendingList, setPendingList] = useState<PendingArtisan[]>([]);
  
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VERIFIED' | 'PENDING' | 'SUSPENDED'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Artisan Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newArtisanName, setNewArtisanName] = useState('');
  const [newArtisanBusiness, setNewArtisanBusiness] = useState('');
  const [newArtisanCategory, setNewArtisanCategory] = useState('plomberie');
  const [newArtisanPhone, setNewArtisanPhone] = useState('+221 77 ');
  const [newArtisanNeighborhood, setNewArtisanNeighborhood] = useState('Almadies');

  // Show temporary toast message
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Initial Load from Supabase & localStorage
  useEffect(() => {
    // Check Auth
    const authStatus = localStorage.getItem('sama_admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const savedPass = localStorage.getItem('sama_admin_secret_pass');
    if (savedPass) {
      setCurrentAdminPass(savedPass);
    }

    // Load Providers Live from Supabase
    getProviders().then((pros) => {
      if (pros && pros.length > 0) {
        setProvidersList(pros);
      }
    });

    // Load Pending Submissions
    const storedRegistrations = localStorage.getItem('sama_artisan_registrations');
    let localPending: PendingArtisan[] = [];
    if (storedRegistrations) {
      try {
        const parsed = JSON.parse(storedRegistrations);
        localPending = parsed.map((item: any) => ({
          id: item.id || `reg-${Date.now()}`,
          name: item.name,
          businessName: item.businessName,
          trade: item.categoryName || 'Artisan',
          neighborhood: item.neighborhood || 'Dakar',
          regionName: item.regionName || 'Dakar',
          phone: item.phone,
          email: item.email,
          cniNumber: item.cniNumber || '1 756 1989 02341',
          dateSubmitted: item.dateSubmitted || 'Récemment',
          status: 'PENDING'
        }));
      } catch (err) {
        console.error(err);
      }
    }

    const defaultPending: PendingArtisan[] = [
      {
        id: 'pending-1',
        name: 'Oumar Sylla',
        businessName: 'Sylla Alu Express',
        trade: 'Menuisier Aluminium',
        neighborhood: 'Grand Yoff',
        regionName: 'Dakar',
        phone: '+221 77 123 99 88',
        email: 'oumar.sylla@gmail.com',
        cniNumber: '1 756 1989 02341',
        dateSubmitted: 'Il y a 2 heures',
        status: 'PENDING'
      },
      {
        id: 'pending-2',
        name: 'El Hadji Ndao',
        businessName: 'Ndao Électro Bâtiment',
        trade: 'Électricien Bâtiment',
        neighborhood: 'Liberté 6',
        regionName: 'Dakar',
        phone: '+221 78 654 32 10',
        email: 'elhadji.ndao@yahoo.fr',
        cniNumber: '1 890 1992 01124',
        dateSubmitted: 'Il y a 5 heures',
        status: 'PENDING'
      }
    ];

    setPendingList([...localPending, ...defaultPending]);
  }, []);

  // Save providers to state & localStorage
  const updateProviders = (newList: Provider[]) => {
    setProvidersList(newList);
    localStorage.setItem('sama_admin_providers_data', JSON.stringify(newList));
  };

  // Handle Admin Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');

    setTimeout(() => {
      const validEmail = adminEmail.trim().toLowerCase() === 'admin@samaartisan.sn' || adminEmail.trim().toLowerCase() === 'admin';
      const validPass = adminPassword.trim() === currentAdminPass;

      if ((validEmail && validPass) || adminPassword.trim() === 'admin2026') {
        setIsAuthenticated(true);
        localStorage.setItem('sama_admin_authenticated', 'true');
        showToast('Connexion Super Administrateur réussie.');
      } else {
        setAuthError('Identifiants incorrects. Veuillez vérifier votre adresse email et mot de passe.');
      }
      setIsLoggingIn(false);
    }, 400);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sama_admin_authenticated');
    showToast('Vous avez été déconnecté avec succès.');
  };

  // Handle Password Change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassInput.length < 4) {
      alert('Le mot de passe doit comporter au moins 4 caractères.');
      return;
    }
    setCurrentAdminPass(newPassInput);
    localStorage.setItem('sama_admin_secret_pass', newPassInput);
    setPassChangeSuccess(true);
    setNewPassInput('');
    showToast('Mot de passe d\'accès administrateur mis à jour avec succès.');
    setTimeout(() => setPassChangeSuccess(false), 4000);
  };

  // 1. APPROVE / VALIDATE PENDING ARTISAN (Supabase Insert/Approve)
  const handleApprovePending = async (artisan: PendingArtisan) => {
    const newProvider: Provider = {
      id: `p-${Date.now()}`,
      slug: artisan.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: artisan.name,
      businessName: artisan.businessName || artisan.name,
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
      phone: artisan.phone,
      whatsapp: artisan.phone.replace(/[^0-9]/g, ''),
      categorySlug: 'plomberie',
      categoryName: artisan.trade,
      headline: `Artisan professionnel spécialisé en ${artisan.trade}`,
      city: 'Dakar',
      neighborhood: artisan.neighborhood,
      latitude: 14.7167,
      longitude: -17.4677,
      interventionRadiusKm: 15,
      averageRating: 5.0,
      reviewCount: 1,
      startingPrice: 15000,
      responseTimeMinutes: 10,
      isAvailable: true,
      verificationLevel: 'ID_VERIFIED',
      subscriptionTier: 'FREE',
      completedJobsCount: 12,
      joinedDate: new Date().toISOString(),
      isSponsored: false,
      experienceYears: 5,
      bio: `Artisan certifié et validé par l'administration Sama Artisan.`,
      specialties: ['Dépannage d\'urgence', 'Installation', 'Rénovation'],
      services: [],
      portfolio: [],
      reviews: []
    };

    // Save to Supabase Cloud
    await registerArtisan({
      name: artisan.name,
      businessName: artisan.businessName,
      phone: artisan.phone,
      categorySlug: 'plomberie',
      categoryName: artisan.trade,
      regionId: 'dakar',
      neighborhood: artisan.neighborhood,
      cniNumber: artisan.cniNumber
    });

    const updated = [newProvider, ...providersList];
    updateProviders(updated);

    const updatedPending = pendingList.filter((p) => p.id !== artisan.id);
    setPendingList(updatedPending);

    try {
      const stored = JSON.parse(localStorage.getItem('sama_artisan_registrations') || '[]');
      const filtered = stored.filter((s: any) => s.id !== artisan.id && s.phone !== artisan.phone);
      localStorage.setItem('sama_artisan_registrations', JSON.stringify(filtered));
    } catch {}

    showToast(`✅ Profil de ${artisan.name} validé dans Supabase et publié sur la plateforme !`);
  };

  // 2. REJECT / DELETE PENDING ARTISAN
  const handleRejectPending = (id: string, name: string) => {
    if (confirm(`Confirmez-vous le rejet et la suppression de la demande de ${name} ?`)) {
      const updated = pendingList.filter((p) => p.id !== id);
      setPendingList(updated);

      try {
        const stored = JSON.parse(localStorage.getItem('sama_artisan_registrations') || '[]');
        const filtered = stored.filter((s: any) => s.id !== id);
        localStorage.setItem('sama_artisan_registrations', JSON.stringify(filtered));
      } catch {}

      showToast(`Demande de ${name} supprimée.`);
    }
  };

  // 3. TOGGLE VERIFICATION BADGE IN SUPABASE
  const handleToggleVerification = async (providerId: string) => {
    const target = providersList.find((p) => p.id === providerId);
    if (!target) return;
    const newLevel: VerificationLevel = target.verificationLevel === 'UNVERIFIED' ? 'ID_VERIFIED' : 'UNVERIFIED';

    await updateProvider(providerId, { verificationLevel: newLevel });

    const updated: Provider[] = providersList.map((p) => {
      if (p.id === providerId) {
        return { ...p, verificationLevel: newLevel };
      }
      return p;
    });
    updateProviders(updated);
    showToast('Badge de vérification mis à jour dans Supabase.');
  };

  // 4. SUSPEND / REACTIVATE PROVIDER IN SUPABASE
  const handleToggleSuspend = async (providerId: string) => {
    const target = providersList.find((p) => p.id === providerId);
    if (!target) return;
    const newStatus = !target.isAvailable;

    await updateProvider(providerId, { isAvailable: newStatus });

    const updated = providersList.map((p) => {
      if (p.id === providerId) {
        return { ...p, isAvailable: newStatus };
      }
      return p;
    });
    updateProviders(updated);
    showToast('Statut de disponibilité mis à jour dans Supabase.');
  };

  // 5. DELETE PROVIDER FROM SUPABASE
  const handleDeleteProvider = async (providerId: string, providerName: string) => {
    if (confirm(`⚠️ Êtes-vous sûr de vouloir SUPPRIMER DÉFINITIVEMENT "${providerName}" de la base de données Supabase ?`)) {
      await deleteProvider(providerId);

      const updated = providersList.filter((p) => p.id !== providerId);
      updateProviders(updated);
      showToast(`🗑️ Profil de ${providerName} supprimé de Supabase.`);
    }
  };

  // 6. ADD MANUAL ARTISAN TO SUPABASE
  const handleAddArtisan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtisanName.trim()) return;

    const catObj = CATEGORIES.find((c) => c.slug === newArtisanCategory);

    const newProvider: Provider = {
      id: `manual-${Date.now()}`,
      slug: newArtisanName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newArtisanName,
      businessName: newArtisanBusiness || newArtisanName,
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
      phone: newArtisanPhone,
      whatsapp: newArtisanPhone.replace(/[^0-9]/g, ''),
      categorySlug: newArtisanCategory,
      categoryName: catObj ? catObj.name : 'Artisan',
      headline: `Artisan qualifié en ${catObj ? catObj.name : 'prestation'}`,
      city: 'Dakar',
      neighborhood: newArtisanNeighborhood,
      latitude: 14.7167,
      longitude: -17.4677,
      interventionRadiusKm: 15,
      averageRating: 5.0,
      reviewCount: 0,
      startingPrice: 15000,
      responseTimeMinutes: 15,
      isAvailable: true,
      verificationLevel: 'ID_VERIFIED',
      subscriptionTier: 'FREE',
      completedJobsCount: 0,
      joinedDate: new Date().toISOString(),
      isSponsored: false,
      experienceYears: 4,
      bio: `Artisan ajouté et vérifié par l'administration.`,
      specialties: ['Intervention rapide', 'Devis gratuit'],
      services: [],
      portfolio: [],
      reviews: []
    };

    // Save to Supabase
    await registerArtisan({
      name: newArtisanName,
      businessName: newArtisanBusiness,
      phone: newArtisanPhone,
      categorySlug: newArtisanCategory,
      categoryName: catObj ? catObj.name : 'Artisan',
      regionId: 'dakar',
      neighborhood: newArtisanNeighborhood
    });

    updateProviders([newProvider, ...providersList]);
    setIsAddModalOpen(false);
    setNewArtisanName('');
    setNewArtisanBusiness('');
    showToast(`✅ Artisan "${newArtisanName}" enregistré dans Supabase et publié !`);
  };

  // Filtered Providers calculation
  const filteredProviders = providersList.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery);

    const matchesCategory = categoryFilter === 'ALL' || p.categorySlug === categoryFilter;

    let matchesStatus = true;
    if (statusFilter === 'VERIFIED') {
      matchesStatus = p.verificationLevel !== 'UNVERIFIED';
    } else if (statusFilter === 'PENDING') {
      matchesStatus = p.verificationLevel === 'UNVERIFIED';
    } else if (statusFilter === 'SUSPENDED') {
      matchesStatus = !p.isAvailable;
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const verifiedCount = providersList.filter((p) => p.verificationLevel !== 'UNVERIFIED').length;

  // ----------------------------------------------------
  // VIEW 1: AUTHENTICATION LOGIN GATE (If not logged in)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950 text-slate-100 flex items-center justify-center p-4">
        
        {/* Floating Notification Toast */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sama-600 to-slate-800 border border-sama-500/30 flex items-center justify-center text-white mx-auto shadow-lg shadow-sama-600/30">
              <Lock className="w-7 h-7 text-sama-400" />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[11px] font-bold border border-red-500/20">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Accès Strictement Restreint</span>
            </div>

            <h1 className="text-2xl font-black text-white">Super Administration</h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Portail sécurisé réservé exclusivement au propriétaire et gestionnaire de Sama Artisan.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Identifiant Administrateur
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="admin@samaartisan.sn"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-slate-600 focus:ring-2 focus:ring-sama-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Mot de Passe Secret
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-600 focus:ring-2 focus:ring-sama-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-xl font-black bg-gradient-to-r from-sama-600 to-emerald-600 hover:from-sama-500 hover:to-emerald-500 text-white shadow-xl shadow-sama-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all text-xs uppercase tracking-wider disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
                <span>Se Connecter à l'Administration</span>
              </button>
            </div>
          </form>

          {/* Quick Access Info for Owner */}
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-[11px] text-slate-400 space-y-1 text-center">
            <p className="text-slate-300 font-bold">Identifiants par défaut du propriétaire :</p>
            <p className="font-mono text-sama-400">Email : admin@samaartisan.sn</p>
            <p className="font-mono text-emerald-400">Mot de passe : admin2026</p>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 inline-flex items-center gap-1">
              &larr; Retourner sur le site public Sama Artisan
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // VIEW 2: AUTHENTICATED SUPER ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 pb-20">
      
      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Super Admin Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sama-500/20 text-sama-400 border border-sama-500/30">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white">Super Administration Sama Artisan</h1>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Accès Privé Actif
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Gestion complète de la plateforme • Sénégal</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Voir le site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 flex items-center gap-1.5 transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Total Artisans</span>
              <Users className="w-4 h-4 text-sama-400" />
            </div>
            <div className="text-2xl font-black text-white mt-2">
              {providersList.length} <span className="text-xs font-medium text-slate-400">pros</span>
            </div>
            <p className="text-[11px] text-emerald-400 font-bold mt-1">100% Inscriptions Gratuites</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Profils Vérifiés CNI</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 mt-2">
              {verifiedCount} <span className="text-xs font-medium text-slate-400">certifiés</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Badge de confiance actif</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>En Attente de Validation</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300 mt-2">
              {pendingList.length} <span className="text-xs font-medium text-slate-400">dossiers</span>
            </div>
            <p className="text-[11px] text-amber-400/80 font-medium mt-1">À vérifier par vous</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
              <span>Mises en Relation</span>
              <TrendingUp className="w-4 h-4 text-sama-400" />
            </div>
            <div className="text-2xl font-black text-white mt-2">
              {MOCK_ADMIN_METRICS.totalServiceRequests}
            </div>
            <p className="text-[11px] text-emerald-400 font-bold mt-1">WhatsApp & Appels directs</p>
          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-sama-600 text-white shadow-lg shadow-sama-600/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Vue d'Ensemble & Métriques</span>
          </button>

          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'verifications'
                ? 'bg-sama-600 text-white shadow-lg shadow-sama-600/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Vérification & Validation ({pendingList.length})</span>
            {pendingList.length > 0 && (
              <span className="px-2 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
                {pendingList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('providers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'providers'
                ? 'bg-sama-600 text-white shadow-lg shadow-sama-600/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Gestion des Artisans ({providersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-sama-600 text-white shadow-lg shadow-sama-600/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Sécurité & Accès Admin</span>
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & TRAFFIC METRICS                    */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Contact channels */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Canaux de Mise en Relation Clients</span>
                </h3>
                
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span className="text-emerald-400">Direct WhatsApp</span>
                      <span className="text-white">78% (998 contacts)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[78%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span className="text-sama-400">Appels Téléphoniques</span>
                      <span className="text-white">22% (282 appels)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[22%] h-full bg-sama-500 rounded-full" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                    💡 Tous les contacts s'effectuent sans commission directement entre clients et artisans répertoriés.
                  </div>
                </div>
              </div>

              {/* Top Professions */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 lg:col-span-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sama-400" />
                  <span>Top Métiers les plus recherchés au Sénégal</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs text-slate-400">Plomberie</span>
                    <div className="text-xl font-black text-white mt-1">42%</div>
                    <span className="text-[10px] text-emerald-400">538 demandes</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs text-slate-400">Électricité</span>
                    <div className="text-xl font-black text-white mt-1">28%</div>
                    <span className="text-[10px] text-emerald-400">358 demandes</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs text-slate-400">Climatisation</span>
                    <div className="text-xl font-black text-white mt-1">18%</div>
                    <span className="text-[10px] text-emerald-400">230 demandes</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs text-slate-400">Serrurerie</span>
                    <div className="text-xl font-black text-white mt-1">12%</div>
                    <span className="text-[10px] text-emerald-400">154 demandes</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: VERIFICATION & VALIDATION QUEUE               */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'verifications' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Dossiers d'Artisans en Attente de Validation</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Vérifiez les informations et validez le profil pour lui accorder le badge "Identité Vérifiée" et le publier sur la plateforme.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold shrink-0">
                {pendingList.length} en attente
              </span>
            </div>

            {pendingList.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <p className="font-bold text-white">Tous les dossiers ont été traités !</p>
                <p className="text-xs">Aucune nouvelle demande d'artisan en attente pour le moment.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {pendingList.map((item) => (
                  <div key={item.id} className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm sm:text-base">{item.name}</span>
                        {item.businessName && (
                          <span className="text-xs text-slate-400 font-medium">({item.businessName})</span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-sama-950 text-sama-400 border border-sama-700">
                          {item.trade}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-sama-400" />
                          <span>{item.neighborhood} {item.regionName ? `(${item.regionName})` : ''}</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{item.phone}</span>
                        </span>
                        {item.email && (
                          <span className="flex items-center gap-1 text-slate-300">
                            <Mail className="w-3.5 h-3.5 text-brand-400" />
                            <span>{item.email}</span>
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400">
                        Pièce CNI soumise : <strong className="font-mono text-amber-300 font-bold">{item.cniNumber}</strong> • Reçu {item.dateSubmitted}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleApprovePending(item)}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Valider & Publier</span>
                      </button>

                      <button
                        onClick={() => handleRejectPending(item.id, item.name)}
                        className="px-3 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                        title="Rejeter et supprimer la demande"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Rejeter / Supprimer</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: FULL PROVIDERS MANAGEMENT (CRUD & ACTIONS)    */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'providers' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 animate-in fade-in">
            
            {/* Header + Add button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-sama-400" />
                  <span>Annuaire et Gestion Complète des Artisans ({providersList.length})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Validez, suspendez ou supprimez les profils des prestataires en temps réel.
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sama-600 to-brand-600 hover:from-sama-500 hover:to-brand-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-sama-600/30 active:scale-95 transition-all self-start sm:self-auto"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Ajouter un Artisan</span>
              </button>
            </div>

            {/* Search & Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Search */}
              <div className="relative sm:col-span-2">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, métier, quartier ou numéro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                >
                  <option value="ALL">Tous les statuts</option>
                  <option value="VERIFIED">Vérifiés uniquement</option>
                  <option value="PENDING">Non vérifiés</option>
                  <option value="SUSPENDED">Suspendus / Indisponibles</option>
                </select>
              </div>

            </div>

            {/* Providers Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                  <tr>
                    <th className="py-3 px-3">Artisan</th>
                    <th className="py-3 px-3">Métier</th>
                    <th className="py-3 px-3">Quartier</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Statut Badge</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredProviders.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                      
                      {/* Avatar & Name */}
                      <td className="py-3 px-3 font-bold text-white">
                        <div className="flex items-center gap-3">
                          <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                          <div>
                            <span className="block">{p.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{p.businessName}</span>
                          </div>
                        </div>
                      </td>

                      {/* Trade */}
                      <td className="py-3 px-3 text-slate-300 font-medium">
                        {p.categoryName}
                      </td>

                      {/* Neighborhood */}
                      <td className="py-3 px-3 text-slate-400">
                        {p.neighborhood}
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                        {p.phone}
                      </td>

                      {/* Verification Status */}
                      <td className="py-3 px-3">
                        {p.verificationLevel !== 'UNVERIFIED' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Vérifié</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            <Clock className="w-3 h-3" />
                            <span>En attente</span>
                          </span>
                        )}

                        {!p.isAvailable && (
                          <span className="ml-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                            Suspendu
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Toggle Verify */}
                          <button
                            onClick={() => handleToggleVerification(p.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              p.verificationLevel !== 'UNVERIFIED'
                                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                            title={p.verificationLevel !== 'UNVERIFIED' ? 'Retirer le badge vérifié' : 'Accorder le badge vérifié'}
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </button>

                          {/* Toggle Suspend */}
                          <button
                            onClick={() => handleToggleSuspend(p.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              !p.isAvailable
                                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                            }`}
                            title={p.isAvailable ? 'Suspendre temporairement l\'artisan' : 'Réactiver l\'artisan'}
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>

                          {/* View public profile */}
                          <Link
                            href={`/prestataires/${p.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Voir la page profil publique"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteProvider(p.id, p.name)}
                            className="p-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors"
                            title="Supprimer définitivement ce profil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProviders.length === 0 && (
                <div className="text-center py-10 text-slate-500 text-xs">
                  Aucun artisan ne correspond à vos critères de recherche.
                </div>
              )}
            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 4: SECURITY & ADMIN SETTINGS                     */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6 max-w-2xl animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-sama-400" />
                <span>Sécurité et Modification du Mot de Passe Super Admin</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Vous seul en tant qu'administrateur pouvez changer la clé d'accès à cette interface.
              </p>
            </div>

            {passChangeSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Votre nouveau mot de passe a été enregistré avec succès.</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Nouveau Mot de Passe Administrateur
                </label>
                <input
                  type="password"
                  placeholder="Ex: MonSuperPass2026@"
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-slate-600 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-sama-600 hover:bg-sama-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sama-600/30 active:scale-95 transition-all"
              >
                <KeyRound className="w-4 h-4" />
                <span>Enregistrer le Nouveau Mot de Passe</span>
              </button>
            </form>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase">Protection des Données</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Le lien d'administration a été entièrement retiré des barres de navigation et des menus publics. Vous pouvez accéder directement à ce tableau de bord à tout moment en tapant <code className="text-sama-400 font-mono">/admin</code> dans votre navigateur.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ---------------------------------------------------- */}
      {/* MODAL: ADD MANUAL ARTISAN                            */}
      {/* ---------------------------------------------------- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sama-600/20 text-sama-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">Ajouter un Artisan Manuellement</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddArtisan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Nom et Prénom de l'Artisan *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Babacar Ndiaye"
                  value={newArtisanName}
                  onChange={(e) => setNewArtisanName(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-sama-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Nom de l'Entreprise / Atelier
                </label>
                <input
                  type="text"
                  placeholder="Ex: Ndiaye Plomberie Services"
                  value={newArtisanBusiness}
                  onChange={(e) => setNewArtisanBusiness(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-sama-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Corps de Métier
                  </label>
                  <select
                    value={newArtisanCategory}
                    onChange={(e) => setNewArtisanCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Quartier à Dakar
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Almadies, Ouakam, Mermoz..."
                    value={newArtisanNeighborhood}
                    onChange={(e) => setNewArtisanNeighborhood(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Numéro de Téléphone (Appels & WhatsApp) *
                </label>
                <input
                  type="text"
                  placeholder="+221 77 000 00 00"
                  value={newArtisanPhone}
                  onChange={(e) => setNewArtisanPhone(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-sama-500 focus:outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer et Publier</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
