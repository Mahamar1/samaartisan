'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TenantLayout from '@/components/layout/TenantLayout';
import { getBTPProjects } from '@/lib/supabase/services';
import { BTPProject } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { HardHat, Plus, Search, MapPin, Eye, FileText, Calendar } from 'lucide-react';

export default function TenantProjectsPage() {
  const [projects, setProjects] = useState<BTPProject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      const data = await getBTPProjects();
      setProjects(data);
    }
    loadData();
  }, []);

  const filtered = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TenantLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Module BTP & Suivi des Chantiers</h1>
            <p className="text-xs text-slate-500 mt-1">Pilotez l'avancement des 12 étapes de construction et tenez à jour le journal de chantier.</p>
          </div>

          <Link
            href="/app/projets/new"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Créer un Projet BTP</span>
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom de projet ou référence..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
            />
          </div>
        </div>

        {/* Projects Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((proj) => (
            <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Réf: {proj.reference}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{proj.name}</h2>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    {proj.address}, {proj.city}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white">
                  {proj.status}
                </span>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600">Avancement Globale</span>
                  <span className="text-amber-600">{proj.progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${proj.progress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Budget Alloué</span>
                  <span className="font-bold text-slate-900">{formatPrice(proj.budget)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Client</span>
                  <span className="font-bold text-slate-900 truncate block">{proj.clientName || 'Client Pro'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Link
                  href={`/app/projets/${proj.id}/journal`}
                  className="px-3 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs font-bold flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Journal de Chantier</span>
                </Link>

                <Link
                  href={`/projets/${proj.slug}`}
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                >
                  Aperçu Public →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </TenantLayout>
  );
}
