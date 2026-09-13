'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProperties } from '@/lib/supabase/services';
import { Property, PropertyType, TransactionType } from '@/lib/types';
import { formatPrice, generatePropertyWhatsAppLink } from '@/lib/utils';
import { Building2, MapPin, Search, Filter, MessageSquare, Phone, ArrowRight } from 'lucide-react';

export default function BiensPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');

  useEffect(() => {
    async function loadData() {
      const data = await getProperties();
      setProperties(data);
      setFilteredProperties(data);
    }
    loadData();
  }, []);

  useEffect(() => {
    let result = [...properties];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.neighborhood.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q)
      );
    }

    if (selectedType !== 'all') {
      result = result.filter(p => p.propertyType === selectedType);
    }

    if (selectedTransaction !== 'all') {
      result = result.filter(p => p.transactionType === selectedTransaction);
    }

    if (selectedCity !== 'all') {
      result = result.filter(p => p.city === selectedCity);
    }

    setFilteredProperties(result);
  }, [searchQuery, selectedType, selectedTransaction, selectedCity, properties]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Page Title Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Catalogue Immobilier Sénégal
            </span>
            <h1 className="text-3xl sm:text-5xl font-black">
              Biens Immobiliers Disponibles
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Consultez les annonces de vente et location d'appartements, villas, terrains et bureaux au Sénégal.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Keyword input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Quartier, mot-clé, référence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Property type */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Tous les types de biens</option>
                <option value="Appartement">Appartement</option>
                <option value="Villa">Villa</option>
                <option value="Maison">Maison</option>
                <option value="Terrain">Terrain</option>
                <option value="Bureau">Bureau</option>
                <option value="Magasin">Magasin</option>
                <option value="Immeuble">Immeuble</option>
                <option value="Studio">Studio</option>
              </select>

              {/* Transaction type */}
              <select
                value={selectedTransaction}
                onChange={(e) => setSelectedTransaction(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Toutes les transactions</option>
                <option value="Vente">Vente</option>
                <option value="Location">Location</option>
                <option value="Location courte durée">Location courte durée</option>
              </select>

              {/* City */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Toutes les villes</option>
                <option value="Dakar">Dakar</option>
                <option value="Rufisque">Rufisque</option>
                <option value="Thiès">Thiès</option>
                <option value="Mbour / Saly">Mbour / Saly</option>
              </select>

            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div 
                key={prop.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative h-52 bg-slate-200 overflow-hidden">
                  <img
                    src={prop.primaryImage}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900/80 text-white backdrop-blur-md">
                      {prop.transactionType}
                    </span>
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-orange-600 text-white">
                      {prop.propertyType}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-extrabold text-slate-900 shadow">
                    {formatPrice(prop.price, prop.currency)}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      <span>{prop.neighborhood}, {prop.city}</span>
                    </div>

                    <Link href={`/biens/${prop.slug}`}>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {prop.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs text-slate-600 font-semibold">
                    <div>
                      <span className="block text-slate-900 font-bold text-sm">{prop.surface} m²</span>
                      <span className="text-[10px] text-slate-400">Surface</span>
                    </div>
                    <div>
                      <span className="block text-slate-900 font-bold text-sm">{prop.rooms}</span>
                      <span className="text-[10px] text-slate-400">Chambres</span>
                    </div>
                    <div>
                      <span className="block text-slate-900 font-bold text-sm">{prop.bathrooms}</span>
                      <span className="text-[10px] text-slate-400">SDB</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-slate-500 truncate">
                      {prop.organizationName}
                    </span>

                    <a
                      href={generatePropertyWhatsAppLink(prop.agentWhatsapp || '221776543210', prop.title, prop.reference)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">Aucun bien ne correspond à votre recherche</h3>
              <p className="text-xs text-slate-500">Essayez de réinitialiser vos filtres ou de modifier les termes de recherche.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
