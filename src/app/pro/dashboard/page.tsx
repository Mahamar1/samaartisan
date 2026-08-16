'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  Settings, 
  Upload, 
  Plus, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import { PROVIDERS, formatFcfa } from '@/lib/data';
import { Provider, ServiceRequest } from '@/lib/types';
import { getProviders } from '@/lib/supabase/services';

const DEFAULT_PRO_FALLBACK: Provider = {
  id: 'pro-me',
  slug: 'mon-profil-artisan',
  name: 'Mon Compte Artisan',
  businessName: 'Entreprise Artisanale',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  headline: 'Artisan Professionnel Certifié',
  bio: 'Bienvenue sur votre espace professionnel.',
  categorySlug: 'plomberie',
  categoryName: 'Artisanat & Services',
  specialties: ['Dépannage', 'Installation'],
  city: 'Dakar',
  neighborhood: 'Dakar',
  latitude: 14.7167,
  longitude: -17.4677,
  interventionRadiusKm: 20,
  phone: '+221 77 000 00 00',
  whatsapp: '221770000000',
  experienceYears: 5,
  verificationLevel: 'ID_VERIFIED',
  subscriptionTier: 'FREE',
  isAvailable: true,
  averageRating: 5.0,
  reviewCount: 0,
  completedJobsCount: 0,
  responseTimeMinutes: 15,
  services: [],
  portfolio: [],
  reviews: [],
  startingPrice: 15000,
  joinedDate: '2026-01-01'
};

export default function ProviderDashboardPage() {
  const [currentProvider, setCurrentProvider] = useState<Provider>(DEFAULT_PRO_FALLBACK);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'profile'>('requests');
  
  // Profile edit fields
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [portfolio, setPortfolio] = useState<{ id: string; title: string; imageUrl: string; description?: string }[]>([]);
  const [savedToast, setSavedToast] = useState(false);

  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const portfolioInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 1. Load current logged in artisan profile from localStorage or Supabase
    try {
      const storedUser = localStorage.getItem('samapro_current_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setCurrentProvider(parsed);
        setName(parsed.name || '');
        setBusinessName(parsed.businessName || '');
        setPhone(parsed.phone || '');
        setBio(parsed.bio || '');
        setAvatar(parsed.avatar || DEFAULT_PRO_FALLBACK.avatar);
        setPortfolio(parsed.portfolio || []);
      } else {
        // Fetch from Supabase
        getProviders().then((pros) => {
          if (pros && pros.length > 0) {
            const p = pros[0];
            setCurrentProvider(p);
            setName(p.name || '');
            setBusinessName(p.businessName || '');
            setPhone(p.phone || '');
            setBio(p.bio || '');
            setAvatar(p.avatar || DEFAULT_PRO_FALLBACK.avatar);
            setPortfolio(p.portfolio || []);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Load requests
    try {
      const stored = JSON.parse(localStorage.getItem('samapro_requests') || '[]');
      if (stored.length > 0) {
        setRequests(stored);
      } else {
        // Initial requests
        setRequests([
          {
            id: 'req-init-1',
            customerName: 'Aïssatou Sow',
            customerPhone: '77 645 12 34',
            providerId: 'pro-me',
            providerName: 'Mon Entreprise',
            serviceCategory: 'Dépannage à Domicile',
            description: 'Bonjour, j\'ai besoin d\'un devis rapide pour une intervention à Dakar.',
            neighborhood: 'Almadies',
            urgency: 'IMMEDIATE',
            budgetIndicative: 25000,
            status: 'PENDING',
            createdAt: 'Aujourd\'hui',
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleUpdateStatus = (reqId: string, newStatus: any) => {
    const updated = requests.map((r) => r.id === reqId ? { ...r, status: newStatus } : r);
    setRequests(updated);
    try {
      localStorage.setItem('samapro_requests', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Avatar upload handler
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Portfolio photo upload handler
  const handlePortfolioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const newItem = {
            id: `port-${Date.now()}`,
            title: 'Nouvelle Réalisation',
            imageUrl: reader.result,
            description: 'Photo de réalisation'
          };
          setPortfolio((prev) => [...prev, newItem]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePortfolioItem = (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Provider = {
      ...currentProvider,
      name: name || currentProvider.name,
      businessName: businessName || currentProvider.businessName,
      phone: phone || currentProvider.phone,
      bio: bio || currentProvider.bio,
      avatar: avatar || currentProvider.avatar,
      portfolio: portfolio,
    };
    setCurrentProvider(updated);
    try {
      localStorage.setItem('samapro_current_user', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Toast Saved */}
      {savedToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profil et photo enregistrés avec succès !</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-sama-500 shadow-xl shrink-0 bg-slate-800">
                <img src={avatar || currentProvider.avatar} alt={currentProvider.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  Mon Espace Artisan : <span className="text-sama-400">{currentProvider.name || currentProvider.businessName}</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  {currentProvider.businessName} • {currentProvider.categoryName} • {currentProvider.neighborhood}, Dakar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/prestataires/${currentProvider.slug}`}
                target="_blank"
                className="px-5 py-3 rounded-2xl text-xs font-bold bg-sama-600 hover:bg-sama-700 text-white flex items-center gap-2 shadow-lg shadow-sama-600/30 transition-all active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Voir mon profil public</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-sama-600 text-white shadow-md shadow-sama-600/20'
                : 'text-slate-600 hover:bg-white hover:text-navy-900'
            }`}
          >
            <span>Demandes des clients</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'requests' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 font-bold'}`}>
              {requests.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-sama-600 text-white shadow-md shadow-sama-600/20'
                : 'text-slate-600 hover:bg-white hover:text-navy-900'
            }`}
          >
            Éditer profil & portfolio
          </button>
        </div>

        {/* TAB 1: REQUESTS CRM */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-900">Demandes des clients</h3>
              <span className="text-xs text-slate-500">Contactez directement les clients sur WhatsApp</span>
            </div>

            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-navy-900 text-base">{req.customerName}</span>
                      <span className="text-xs text-slate-400">({req.customerPhone})</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 text-slate-700">
                        {req.neighborhood}
                      </span>
                      {req.urgency === 'IMMEDIATE' && (
                        <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-red-100 text-red-700">
                          🚨 URGENCE IMMÉDIATE
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      "{req.description}"
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span>Service : <strong>{req.serviceCategory}</strong></span>
                      {req.budgetIndicative && (
                        <span>Budget estimé : <strong className="text-emerald-700">{formatFcfa(req.budgetIndicative)}</strong></span>
                      )}
                      <span>{req.createdAt}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`https://wa.me/221${req.customerPhone.replace(/\s+/g, '')}?text=${encodeURIComponent(`Bonjour ${req.customerName}, je suis ${currentProvider.name} de Sama Artisan suite à votre demande. Je suis disponible !`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Répondre sur WhatsApp</span>
                    </a>

                    {req.status === 'PENDING' ? (
                      <button
                        onClick={() => handleUpdateStatus(req.id, 'ACCEPTED')}
                        className="px-3.5 py-2.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs transition-all"
                      >
                        Accepter
                      </button>
                    ) : (
                      <span className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ Acceptée
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE & PORTFOLIO */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-8 max-w-3xl">
            <div>
              <h3 className="text-xl font-black text-navy-900">Éditer votre profil et vitrine</h3>
              <p className="text-xs text-slate-500 mt-1">Personnalisez vos informations visibles par les clients de Dakar.</p>
            </div>
            
            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* SECTION 1: PHOTO DE PROFIL / AVATAR */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  Photo de Profil Artisan
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-sama-500 shadow-md shrink-0 bg-white">
                    <img
                      src={avatar || currentProvider.avatar}
                      alt={name || 'Artisan'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <input
                      type="file"
                      ref={avatarInputRef}
                      onChange={handleAvatarFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Upload className="w-4 h-4 text-sama-400" />
                      <span>Changer ma photo de profil</span>
                    </button>
                    <p className="text-[11px] text-slate-500">
                      Importez une photo claire de votre visage ou de votre atelier (JPG, PNG).
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: IDENTITÉ & COORDONNÉES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom & Prénom</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Mahamar"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom Commercial / Atelier</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ex: Mahamar Électro Service"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Numéro de Téléphone & WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: +221 77 123 45 67"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Présentation / Description</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Décrivez votre expérience, vos spécialités et vos garanties..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sama-500 focus:outline-none"
                />
              </div>

              {/* SECTION 3: PORTFOLIO / PHOTOS DE RÉALISATIONS */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Portfolio & Photos de chantiers ({portfolio.length})
                  </label>
                  <span className="text-[11px] text-slate-400">Photos de vos réalisations</span>
                </div>

                <input
                  type="file"
                  ref={portfolioInputRef}
                  onChange={handlePortfolioFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {portfolio.map((p) => (
                    <div key={p.id} className="group relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePortfolioItem(p.id)}
                        className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        title="Supprimer la photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => portfolioInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 hover:border-sama-500 rounded-xl aspect-video flex flex-col items-center justify-center p-3 text-slate-400 hover:text-sama-600 transition-all cursor-pointer bg-slate-50 hover:bg-sama-50/30"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-[10px] font-bold mt-1">Ajouter une photo</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-sama-600 hover:bg-sama-700 text-white text-xs shadow-lg shadow-sama-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistrer toutes les modifications</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
