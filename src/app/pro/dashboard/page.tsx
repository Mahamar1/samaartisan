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
  Sparkles, 
  ShieldCheck, 
  Settings, 
  Upload, 
  Plus, 
  Trash2,
  ExternalLink,
  LogOut,
  Wrench,
  ArrowRight,
  Share2,
  MapPin,
  Inbox
} from 'lucide-react';
import { formatFcfa } from '@/lib/data';
import { Provider, ServiceRequest } from '@/lib/types';
import { updateProvider } from '@/lib/supabase/services';

export default function ProviderDashboardPage() {
  const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'profile'>('requests');
  
  // Profile edit fields
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [avatar, setAvatar] = useState('');
  const [portfolio, setPortfolio] = useState<{ id: string; title: string; imageUrl: string; description?: string }[]>([]);
  const [savedToast, setSavedToast] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const portfolioInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 1. Charger UNIQUEMENT le profil de l'artisan actuellement connecté
    try {
      const storedUser = localStorage.getItem('samapro_current_user');
      if (storedUser) {
        const parsed: Provider = JSON.parse(storedUser);
        if (parsed && (parsed.name || parsed.phone)) {
          setCurrentProvider(parsed);
          setName(parsed.name || '');
          setBusinessName(parsed.businessName || '');
          setPhone(parsed.phone || '');
          setBio(parsed.bio || '');
          setNeighborhood(parsed.neighborhood || 'Dakar');
          setAvatar(parsed.avatar || '');
          setPortfolio(parsed.portfolio || []);
        }
      }
    } catch (e) {
      console.error('Error loading provider profile:', e);
    } finally {
      setIsLoading(false);
    }

    // 2. Charger les demandes réelles enregistrées
    try {
      const storedReqs = JSON.parse(localStorage.getItem('samapro_requests') || '[]');
      setRequests(storedReqs);
    } catch (err) {
      console.error('Error loading requests:', err);
      setRequests([]);
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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProvider) return;

    const updated: Provider = {
      ...currentProvider,
      name: name.trim() || currentProvider.name,
      businessName: businessName.trim() || currentProvider.businessName,
      phone: phone.trim() || currentProvider.phone,
      bio: bio.trim() || currentProvider.bio,
      neighborhood: neighborhood.trim() || currentProvider.neighborhood,
      avatar: avatar || currentProvider.avatar,
      portfolio: portfolio,
    };

    setCurrentProvider(updated);

    try {
      // Sauvegarder dans localStorage
      localStorage.setItem('samapro_current_user', JSON.stringify(updated));
      
      // Mettre à jour dans Supabase si l'id existe
      if (updated.id) {
        await updateProvider(updated.id, {
          name: updated.name,
          businessName: updated.businessName,
          phone: updated.phone,
          bio: updated.bio,
          neighborhood: updated.neighborhood,
          avatar: updated.avatar
        });
      }

      window.dispatchEvent(new Event('storage'));
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShareProfile = () => {
    if (!currentProvider) return;
    const url = typeof window !== 'undefined' ? `${window.location.origin}/prestataires/${currentProvider.slug}` : `https://samaartisan.vercel.app/prestataires/${currentProvider.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('samapro_current_user');
      localStorage.removeItem('sama_user_session');
      window.dispatchEvent(new Event('storage'));
      window.location.href = '/connexion';
    } catch (e) {
      window.location.href = '/connexion';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sama-600"></div>
      </div>
    );
  }

  // SI AUCUN ARTISAN N'EST CONNECTÉ : Pas de compte par défaut factice !
  if (!currentProvider) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-slate-50">
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sama-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-lg">
            <Wrench className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-navy-950">Espace Professionnel Artisan</h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Vous n'êtes pas encore connecté à votre compte artisan. Créez votre profil avec vos vraies coordonnées ou connectez-vous pour accéder à votre espace de gestion.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/inscription"
              className="w-full py-3.5 bg-gradient-to-r from-sama-600 to-emerald-600 hover:from-sama-700 hover:to-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Créer mon profil Artisan (100% Gratuit)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/connexion"
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Se connecter avec mes identifiants</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Toast Saved */}
      {savedToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Vos vraies informations ont été enregistrées avec succès !</span>
        </div>
      )}

      {/* Toast Share */}
      {shareToast && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
          <Share2 className="w-4 h-4 text-sama-400" />
          <span>Lien de votre vitrine copié ! Vous pouvez le coller sur WhatsApp ou Facebook.</span>
        </div>
      )}

      {/* Top Banner avec les VRAIES informations de l'artisan */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-sama-500 shadow-xl shrink-0 bg-slate-800">
                <img 
                  src={avatar || currentProvider.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80'} 
                  alt={currentProvider.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {currentProvider.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
                    Profil Actif & En Ligne
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {currentProvider.businessName} • {currentProvider.categoryName} • {currentProvider.neighborhood || 'Dakar'}, Sénégal
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span>Tél : <strong>{currentProvider.phone}</strong></span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleShareProfile}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2 transition-all active:scale-95"
                title="Partager mon lien"
              >
                <Share2 className="w-4 h-4 text-sama-400" />
                <span>Partager mon lien</span>
              </button>

              <Link
                href={`/prestataires/${currentProvider.slug}`}
                target="_blank"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-sama-600 hover:bg-sama-700 text-white flex items-center gap-2 shadow-lg shadow-sama-600/30 transition-all active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Voir ma vitrine publique</span>
              </Link>

              <button
                onClick={handleLogout}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 hover:border-red-600 flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                title="Se déconnecter de votre espace artisan"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Cartes Métriques Réelles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Demandes Reçues</span>
              <MessageSquare className="w-4 h-4 text-sama-600" />
            </div>
            <p className="text-xl font-black text-navy-950">{requests.length}</p>
            <p className="text-[10px] text-slate-500">Demandes de clients</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Statut Compte</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl font-black text-emerald-600">100% Gratuit</p>
            <p className="text-[10px] text-slate-500">Accès Partenaire Actif</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Zone Couverte</span>
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-base font-black text-navy-950 truncate">{currentProvider.neighborhood || 'Dakar'}</p>
            <p className="text-[10px] text-slate-500">Sénégal</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Disponibilité</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-base font-black text-navy-950">Disponible 24/7</p>
            <p className="text-[10px] text-slate-500">Réponse directe WhatsApp</p>
          </div>

        </div>
      </div>

      {/* Conteneur Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Navigation Onglets */}
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
            Éditer mes vraies informations & portfolio
          </button>
        </div>

        {/* ONGLETS 1 : DEMANDES CLIENTS */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-900">Demandes de prestations entrantes</h3>
              <span className="text-xs text-slate-500">Contactez directement vos clients sur WhatsApp</span>
            </div>

            {requests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 shadow-sm max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Inbox className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-navy-950">Aucune demande reçue pour le moment</h4>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Votre profil <strong>{currentProvider.name}</strong> est actif et visible auprès des clients de <strong>{currentProvider.neighborhood || 'Dakar'}</strong>. Dès qu'un client vous sollicite, ses coordonnées apparaîtront ici.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleShareProfile}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sama-50 text-sama-700 font-bold text-xs hover:bg-sama-100 transition-all border border-sama-200"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Partager mon profil sur WhatsApp pour obtenir des clients</span>
                  </button>
                </div>
              </div>
            ) : (
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
                          {req.neighborhood || currentProvider.neighborhood}
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
                        <span>Service : <strong>{req.serviceCategory || currentProvider.categoryName}</strong></span>
                        {req.budgetIndicative && (
                          <span>Budget estimé : <strong className="text-emerald-700">{formatFcfa(req.budgetIndicative)}</strong></span>
                        )}
                        <span>{req.createdAt}</span>
                      </div>
                    </div>

                    {/* Actions WhatsApp */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/221${(req.customerPhone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${req.customerName}, je suis ${currentProvider.name} (${currentProvider.businessName}) sur Sama Artisan suite à votre demande. Je suis disponible !`)}`}
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
                          ✓ Traitée
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ONGLETS 2 : ÉDITION DU PROFIL & PORTFOLIO */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-8 max-w-3xl">
            <div>
              <h3 className="text-xl font-black text-navy-900">Éditer vos vraies informations</h3>
              <p className="text-xs text-slate-500 mt-1">
                Vos modifications seront visibles immédiatement par tous les clients sur votre vitrine publique.
              </p>
            </div>
            
            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* SECTION 1: PHOTO DE PROFIL */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  Votre Photo de Profil / Atelier
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-sama-500 shadow-md shrink-0 bg-white">
                    <img
                      src={avatar || currentProvider.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80'}
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
                      <span>Télécharger une nouvelle photo</span>
                    </button>
                    <p className="text-[11px] text-slate-500">
                      Formats acceptés : JPG, PNG. Une photo claire rassure vos futurs clients.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: IDENTITÉ & CONTACT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Votre Nom & Prénom</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ex: Moussa Ndiaye"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom Commercial / Atelier</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Ex: Ndiaye Plomberie Express"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Numéro de Téléphone & WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Ex: +221 77 123 45 67"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Quartier & Zone d'intervention</label>
                  <input
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Grand Yoff, Almadies, Sacré-Cœur..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-sama-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Présentation de votre savoir-faire</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Décrivez votre expérience, vos spécialités et vos engagements qualité..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-sama-500 focus:outline-none"
                />
              </div>

              {/* SECTION 3: PORTFOLIO / PHOTOS DE RÉALISATIONS */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Portfolio & Photos de chantiers ({portfolio.length})
                  </label>
                  <span className="text-[11px] text-slate-400">Photos de vos travaux réels</span>
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
                    <span className="text-[10px] font-bold mt-1">Ajouter une réalisation</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-sama-600 hover:bg-sama-700 text-white text-xs shadow-lg shadow-sama-600/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistrer toutes mes vraies informations</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold bg-red-50 hover:bg-red-100 text-red-600 text-xs border border-red-200 transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Se déconnecter</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
