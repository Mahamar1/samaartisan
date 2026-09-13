'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProperties, getBTPProjects, getPublications } from '@/lib/supabase/services';
import { Property, BTPProject, Publication } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Search, Building2, HardHat, Newspaper, MapPin } from 'lucide-react';

export default function GlobalSearchPage() {
  const [query, setQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<BTPProject[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    async function loadData() {
      const [props, projs, pubs] = await Promise.all([
        getProperties(),
        getBTPProjects(),
        getPublications()
      ]);
      setProperties(props);
      setProjects(projs);
      setPublications(pubs);
    }
    loadData();
  }, []);

  const filteredProps = properties.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.neighborhood.toLowerCase().includes(query.toLowerCase()));
  const filteredProjs = projects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.address.toLowerCase().includes(query.toLowerCase()));
  const filteredPubs = publications.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.content.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900">Recherche Globale Multi-Critères</h1>
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher 'Appartement Almadies', 'Point E', 'Titre Foncier'..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Results Sections */}
          <div className="space-y-8">
            {/* Properties */}
            {filteredProps.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-orange-600" />
                  <span>Biens Immobiliers ({filteredProps.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredProps.map(p => (
                    <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-sm">
                      <img src={p.primaryImage} alt="" className="w-full h-36 object-cover rounded-xl" />
                      <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-orange-600 font-extrabold">{formatPrice(p.price)}</p>
                      <Link href={`/biens/${p.slug}`} className="text-xs font-bold text-slate-900 hover:text-orange-600 block">
                        Voir l'annonce →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BTP Projects */}
            {filteredProjs.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-amber-600" />
                  <span>Projets BTP ({filteredProjs.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjs.map(p => (
                    <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 shadow-sm">
                      <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
                      <p className="text-xs text-slate-500">{p.address}</p>
                      <Link href={`/projets/${p.slug}`} className="text-xs font-bold text-slate-900 hover:text-orange-600 block">
                        Voir le chantier →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
