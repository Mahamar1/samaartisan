'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getOrganizations } from '@/lib/supabase/services';
import { Organization } from '@/lib/types';
import { Briefcase, MapPin, Phone, Mail, Globe, ArrowRight, Building2 } from 'lucide-react';

export default function CompaniesPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getOrganizations();
      setOrganizations(data);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Annuaire Public Sénégal
            </span>
            <h1 className="text-3xl sm:text-5xl font-black">
              Agences Immobilières & Entreprises BTP
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Retrouvez l'annuaire certifié des promoteurs, entreprises de construction et cabinets d'architecture au Sénégal.
            </p>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizations.map((org) => (
              <div key={org.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg border border-orange-200 shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        {org.activityType}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{org.name}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {org.bio}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>{org.address}, {org.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-orange-500" />
                    <span>{org.phone}</span>
                  </div>
                </div>

                <Link
                  href={`/entreprises/${org.slug}`}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center block transition-colors"
                >
                  Voir la Fiche Entreprise →
                </Link>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
