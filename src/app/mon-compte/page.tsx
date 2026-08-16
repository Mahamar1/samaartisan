'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Clock, 
  Heart, 
  MessageSquare, 
  CheckCircle2, 
  Star, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { formatFcfa } from '@/lib/data';
import { getProviders } from '@/lib/supabase/services';
import { Provider, ServiceRequest } from '@/lib/types';
import ProviderCard from '@/components/provider/ProviderCard';

export default function MonComptePage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'favorites'>('requests');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [favorites, setFavorites] = useState<Provider[]>([]);
  const [clientUser, setClientUser] = useState<any>(null);
  const [hasProAccount, setHasProAccount] = useState<boolean>(false);

  useEffect(() => {
    try {
      const sessionUserStr = localStorage.getItem('sama_user_session');
      const proUserStr = localStorage.getItem('samapro_current_user');

      if (sessionUserStr) {
        const parsed = JSON.parse(sessionUserStr);
        setClientUser(parsed);
      }

      if (proUserStr) {
        setHasProAccount(true);
      }

      const storedReqs = JSON.parse(localStorage.getItem('samaartisan_requests') || localStorage.getItem('samapro_requests') || '[]');
      setRequests(storedReqs);

      const favIds = JSON.parse(localStorage.getItem('samaartisan_favorites') || localStorage.getItem('samapro_favorites') || '[]');
      if (favIds.length > 0) {
        getProviders().then((pros) => {
          if (pros) {
            const matched = pros.filter((p) => favIds.includes(p.id));
            setFavorites(matched);
          }
        });
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sama_user_session');
    localStorage.removeItem('samapro_current_user');
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sama-600 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                <User className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {clientUser?.name || 'Mon Espace Client'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-bold uppercase tracking-wider">
                    Client Particulier
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  {clientUser?.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-sama-400" />
                      <span>{clientUser.phone}</span>
                    </span>
                  )}
                  {clientUser?.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-sama-400" />
                      <span>{clientUser.email}</span>
                    </span>
                  )}
                  {clientUser?.neighborhood && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-sama-400" />
                      <span>{clientUser.neighborhood}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              {hasProAccount && (
                <Link
                  href="/pro/dashboard"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-2 shadow-sm"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Tableau de Bord Pro</span>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 transition-all flex items-center gap-2"
              >
                <span>Se déconnecter</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 space-y-6">
        
        {/* Pro Banner Upgrade / Invitation for clients */}
        {!hasProAccount && (
          <div className="bg-gradient-to-r from-emerald-900 to-navy-900 rounded-3xl p-6 text-white border border-emerald-500/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Vous êtes artisan ou professionnel ?</span>
              </div>
              <p className="text-sm font-semibold text-white">
                Proposez vos services sur Sama Artisan et recevez des demandes de chantiers sans commission.
              </p>
            </div>
            <Link
              href="/devenir-prestataire"
              className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-sama-500 to-emerald-500 hover:from-sama-600 hover:to-emerald-600 text-white text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>Créer mon profil Artisan (Gratuit)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'requests'
                ? 'bg-sama-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            Mes Demandes de Devis ({requests.length})
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'favorites'
                ? 'bg-sama-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            Mes Artisans Favoris ({favorites.length})
          </button>
        </div>

        {/* TAB 1: REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {requests.length > 0 ? (
              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-navy-900 text-base">{req.providerName}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-sama-100 text-sama-800">
                          {req.serviceCategory}
                        </span>
                        <span className="text-xs text-slate-400">📍 {req.neighborhood}</span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        "{req.description}"
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                        <span>Urgence : <strong className="text-slate-700">{req.urgency}</strong></span>
                        {req.budgetIndicative && (
                          <span>Budget estimé : <strong className="text-emerald-700">{formatFcfa(req.budgetIndicative)}</strong></span>
                        )}
                        <span>{new Date(req.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/prestataires/${req.providerId}`}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800"
                      >
                        Voir la fiche pro
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-navy-900">Aucune demande en cours</h3>
                <p className="text-xs text-slate-500">
                  Vous n'avez pas encore envoyé de demande de devis à un professionnel.
                </p>
                <Link
                  href="/recherche"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-sama-600 text-white text-xs shadow-sm hover:bg-sama-700 transition-all"
                >
                  <span>Trouver un artisan qualifié</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FAVORITES */}
        {activeTab === 'favorites' && (
          <div>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((p) => (
                  <ProviderCard key={p.id} provider={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-navy-900">Aucun artisan favori sauvegardé</h3>
                <p className="text-xs text-slate-500">
                  Cliquez sur l'icône cœur sur le profil d'un artisan pour le retrouver facilement ici.
                </p>
                <Link
                  href="/recherche"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-sama-600 text-white text-xs shadow-sm hover:bg-sama-700 transition-all"
                >
                  <span>Explorer le répertoire</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
