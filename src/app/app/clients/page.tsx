'use client';

import React, { useState } from 'react';
import TenantLayout from '@/components/layout/TenantLayout';
import { DEMO_CLIENTS } from '@/lib/data';
import { Client, ClientType } from '@/lib/types';
import { Users, Plus, Search, Phone, Mail, MapPin } from 'lucide-react';

export default function TenantClientsPage() {
  const [clients, setClients] = useState<Client[]>(DEMO_CLIENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = clients.filter(c => {
    const matchesSearch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
    const matchesType = typeFilter === 'all' || c.clientType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <TenantLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">CRM Clients & Prospects</h1>
            <p className="text-xs text-slate-500 mt-1">Gérez le répertoire des acheteurs, locataires, investisseurs et propriétaires.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none"
            />
          </div>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none"
          >
            <option value="all">Tous les types</option>
            <option value="Acheteur">Acheteur</option>
            <option value="Locataire">Locataire</option>
            <option value="Propriétaire">Propriétaire</option>
            <option value="Investisseur">Investisseur</option>
            <option value="Entreprise">Entreprise</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Notes & Préférences</th>
                  <th className="py-3 px-4">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((cli) => (
                  <tr key={cli.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {cli.firstName} {cli.lastName}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700">
                        {cli.clientType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1 font-semibold text-slate-900">{cli.phone}</div>
                      <div className="text-[11px] text-slate-400">{cli.email}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                      {cli.notes || 'Aucune note'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 font-medium">
                      {cli.source}
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
