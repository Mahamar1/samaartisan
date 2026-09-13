'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TenantLayout from '@/components/layout/TenantLayout';
import { getProperties } from '@/lib/supabase/services';
import { Property, PropertyStatus } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Building2, Plus, Search, MapPin, Eye, MessageSquare, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

export default function TenantPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    async function loadData() {
      const data = await getProperties();
      setProperties(data);
    }
    loadData();
  }, []);

  const handleStatusChange = (id: string, newStatus: PropertyStatus) => {
    const updated = properties.map(p => p.id === id ? { ...p, status: newStatus } : p);
    setProperties(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sama_properties_data', JSON.stringify(updated));
    }
  };

  const filtered = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <TenantLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Gestion des Biens Immobiliers</h1>
            <p className="text-xs text-slate-500 mt-1">Gérez le catalogue de votre organisation, ajustez les prix et modifiez les statuts.</p>
          </div>

          <Link
            href="/app/biens/new"
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-600/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un Bien</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par titre ou référence..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="Brouillon">Brouillon</option>
            <option value="Disponible">Disponible</option>
            <option value="Réservé">Réservé</option>
            <option value="Loué">Loué</option>
            <option value="Vendu">Vendu</option>
            <option value="Masqué">Masqué</option>
          </select>
        </div>

        {/* Table / Cards */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                  <th className="py-3 px-4">Bien & Référence</th>
                  <th className="py-3 px-4">Type / Transaction</th>
                  <th className="py-3 px-4">Prix</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={prop.primaryImage} alt="" className="w-12 h-10 object-cover rounded-lg bg-slate-200 shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{prop.title}</p>
                          <p className="text-[11px] text-slate-400">{prop.reference} • {prop.neighborhood}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-700 block">{prop.propertyType}</span>
                      <span className="text-[11px] text-slate-400">{prop.transactionType}</span>
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900">
                      {formatPrice(prop.price, prop.currency)}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={prop.status}
                        onChange={(e) => handleStatusChange(prop.id, e.target.value as PropertyStatus)}
                        className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          prop.status === 'Disponible' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          prop.status === 'Loué' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          prop.status === 'Vendu' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="Brouillon">Brouillon</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Réservé">Réservé</option>
                        <option value="Loué">Loué</option>
                        <option value="Vendu">Vendu</option>
                        <option value="Masqué">Masqué</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/biens/${prop.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                          title="Voir fiche publique"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/app/biens/${prop.id}`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-orange-600 hover:bg-orange-50"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </TenantLayout>
  );
}
