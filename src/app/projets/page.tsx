'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getBTPProjects } from '@/lib/supabase/services';
import { BTPProject } from '@/lib/types';
import { formatPrice, generateProjectWhatsAppLink } from '@/lib/utils';
import { HardHat, MapPin, Search, ArrowRight, MessageSquare, Building2, Calendar } from 'lucide-react';

export default function BTPProjectsPage() {
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
    p.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Chantiers & Bâtiment au Sénégal
            </span>
            <h1 className="text-3xl sm:text-5xl font-black">
              Projets BTP & Construction
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Découvrez nos projets de construction résidentiels, commerciaux et génie civil.
            </p>
          </div>

          {/* Search bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un projet, une ville ou un cabinet..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((proj) => (
              <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      Réf: {proj.reference}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-2">
                      {proj.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {proj.address}, {proj.city}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white">
                    {proj.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">Progression Globale</span>
                    <span className="text-amber-600 font-extrabold">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-500" 
                      style={{ width: `${proj.progress}%` }} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-t border-slate-100 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Budget Alloué</span>
                    <span className="font-bold text-slate-900 text-sm">{formatPrice(proj.budget)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Architecte</span>
                    <span className="font-bold text-slate-900 text-sm truncate block">{proj.architectName || 'Cabinet Ndoye'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500 font-medium">
                    {proj.companyName}
                  </span>

                  <div className="flex gap-2">
                    <a
                      href={generateProjectWhatsAppLink('221778000000', proj.name, proj.reference)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      href={`/projets/${proj.slug}`}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors"
                    >
                      Voir le Chantier →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
