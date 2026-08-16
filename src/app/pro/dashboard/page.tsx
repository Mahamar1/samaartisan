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
  const [activeTab, setActiveTab] = useState<'requests' | 'analytics' | 'subscription' | 'profile'>('requests');

  useEffect(() => {
    // 1. Load current logged in artisan profile from localStorage
    try {
      const storedUser = localStorage.getItem('samapro_current_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setCurrentProvider(parsed);
      } else {
        // Fetch from Supabase
        getProviders().then((pros) => {
          if (pros && pros.length > 0) {
            setCurrentProvider(pros[0]);
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

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-sama-500 shadow-md">
                <img src={currentProvider.avatar} alt={currentProvider.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white">{currentProvider.businessName}</h1>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-emerald-500 text-white rounded-full">
                    Abonnement Pro Actif
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {currentProvider.name} • {currentProvider.neighborhood}, Dakar • Noté 4.95/5
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/prestataires/${currentProvider.slug}`}
                target="_blank"
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Voir mon profil public</span>
              </Link>
              <div className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Accès Illimité Gratuit</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vues du Profil</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-navy-900 mt-2">1,248</div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">+18% cette semaine</p>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contacts WhatsApp</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-navy-900 mt-2">47</div>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">~12 discussions / semaine</p>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Demandes Reçues</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-navy-900 mt-2">{requests.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Taux de réponse : 96%</p>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Statut Compte</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-black text-emerald-600 mt-2">100% Gratuit</div>
            <p className="text-[11px] text-slate-500 mt-1">Accès Illimité Partenaire</p>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'requests'
                ? 'bg-sama-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            Demandes Clients ({requests.length})
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'subscription'
                ? 'bg-sama-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            Statut & Avantages Gratuits
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-sama-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            Édition Profil & Portfolio
          </button>
        </div>

        {/* TAB 1: REQUESTS CRM */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-900">Demandes de prestations entrantes</h3>
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
                      href={`https://wa.me/221${req.customerPhone.replace(/\s+/g, '')}?text=${encodeURIComponent(`Bonjour ${req.customerName}, je suis Moussa Diop de Sama Artisan suite à votre demande. Je suis disponible !`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Répondre sur WhatsApp</span>
                    </a>

                    {req.status === 'PENDING' ? (
                      <button
                        onClick={() => handleUpdateStatus(req.id, 'ACCEPTED')}
                        className="px-3.5 py-2.5 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs"
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

        {/* TAB 2: FREE STATUS & PERKS */}
        {activeTab === 'subscription' && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6 max-w-3xl">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-navy-900">Statut de votre Compte</h3>
                <p className="text-xs text-slate-500 mt-0.5">Offre spéciale de lancement pour tous les artisans</p>
              </div>
              <span className="px-3 py-1 text-xs font-black uppercase bg-emerald-100 text-emerald-800 rounded-full">
                Accès Illimité • 0 FCFA
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Frais mensuels</span>
                <p className="font-bold text-emerald-600 text-sm">0 FCFA (Gratuit à vie)</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Commission par chantier</span>
                <p className="font-bold text-emerald-600 text-sm">0% (Vous gardez 100%)</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
              <p className="font-bold">✓ Vos avantages actifs en tant qu'Artisan Partenaire :</p>
              <ul className="list-disc list-inside space-y-1 text-emerald-800">
                <li>Réception directe des messages WhatsApp des clients de Dakar</li>
                <li>Affichage prioritaire de vos photos de chantiers</li>
                <li>Badge "Artisan Vérifié" visible par les particuliers</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE & PORTFOLIO */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6 max-w-3xl">
            <h3 className="text-xl font-bold text-navy-900">Mettre à jour votre vitrine</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom Commercial</label>
                <input
                  type="text"
                  defaultValue={currentProvider.businessName}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Numéro WhatsApp Réception</label>
                <input
                  type="text"
                  defaultValue={currentProvider.phone}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Galerie Photos (15 max)</label>
                <div className="grid grid-cols-3 gap-3">
                  {currentProvider.portfolio.map((p) => (
                    <div key={p.id} className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border">
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 text-slate-400 hover:text-sama-600 hover:border-sama-400 cursor-pointer">
                    <Plus className="w-6 h-6" />
                    <span className="text-[10px] font-bold mt-1">Ajouter photo</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert('Modifications enregistrées avec succès sur votre profil Sama Artisan.')}
                className="px-6 py-3 rounded-xl font-bold bg-sama-600 text-white text-xs"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
