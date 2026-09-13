'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProviders } from '@/lib/supabase/services';
import { Provider } from '@/lib/types';
import { Search, MapPin, Star, ShieldCheck, Wrench, Phone, MessageSquare } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function GlobalSearchPage() {
  const [query, setQuery] = useState('');
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProviders();
        setProviders(data);
      } catch (err) {
        console.error('Error fetching providers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProviders = providers.filter(p => {
    const q = query.toLowerCase();
    return (
      (p.name || '').toLowerCase().includes(q) ||
      (p.categoryName || '').toLowerCase().includes(q) ||
      (p.city || '').toLowerCase().includes(q) ||
      (p.neighborhood || '').toLowerCase().includes(q) ||
      (p.headline || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full">
        
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Search className="w-4 h-4" />
            <span>Recherche d'Artisans Qualifiés au Sénégal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Trouvez un Artisan ou Prestataire</h1>
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom, métier (Plombier, Électricien...), quartier (Almadies, Mermoz)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center justify-between">
            <span>Artisans & Prestataires ({filteredProviders.length})</span>
            {loading && <span className="text-xs text-slate-400 font-normal">Chargement...</span>}
          </h2>

          {filteredProviders.length === 0 && !loading ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Wrench className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-slate-600 font-medium">Aucun artisan ne correspond à votre recherche.</p>
              <p className="text-xs text-slate-400">Essayez des termes comme "Plomberie", "Électricité", "Menuiserie" ou "Dakar".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProviders.map(p => (
                <div key={p.id} className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <img src={p.avatar} alt={p.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shrink-0" />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-base truncate">{p.name}</h3>
                          {p.verificationLevel && p.verificationLevel !== 'UNVERIFIED' && (
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                          {p.categoryName || 'Artisan'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{p.headline}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.neighborhood || p.city || 'Dakar'}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{p.averageRating || 5.0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">À partir de</span>
                      <span className="text-sm font-black text-slate-900">{formatPrice(p.startingPrice || 15000)}</span>
                    </div>
                    <Link
                      href={`/prestataires/${p.slug}`}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      Voir profil
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
