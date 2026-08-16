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
  Phone
} from 'lucide-react';
import { formatFcfa } from '@/lib/data';
import { getProviders } from '@/lib/supabase/services';
import { Provider, ServiceRequest } from '@/lib/types';
import ProviderCard from '@/components/provider/ProviderCard';

export default function MonComptePage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'favorites'>('requests');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [favorites, setFavorites] = useState<Provider[]>([]);

  useEffect(() => {
    try {
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

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sama-600/30 border border-sama-500/40 flex items-center justify-center text-sama-400">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Espace Client</h1>
              <p className="text-xs text-slate-300">Suivez vos demandes d'intervention et vos artisans favoris à Dakar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-sama-600 text-white text-xs"
                >
                  <span>Trouver un artisan maintenant</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FAVORITES */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
