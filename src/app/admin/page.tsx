'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getOrganizations, getProperties, getBTPProjects } from '@/lib/supabase/services';
import { Organization } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { ShieldCheck, Building2, Users, HardHat, CreditCard, AlertTriangle, CheckCircle2, Ban } from 'lucide-react';

export default function SuperAdminPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getOrganizations();
      setOrganizations(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const toggleOrgStatus = (id: string) => {
    const updated = organizations.map(o => {
      if (o.id === id) {
        return { ...o, status: (o.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE') as 'ACTIVE' | 'SUSPENDED' };
      }
      return o;
    });
    setOrganizations(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sama_organizations_data', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white font-sans">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700 p-8 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                <span>Super Admin Global System</span>
              </div>
              <h1 className="text-3xl font-black text-white">Administration SaaS SAMA BTP IMMO</h1>
              <p className="text-xs text-slate-400 mt-1">Supervision globale des entreprises, abonnements, revenus et modération.</p>
            </div>

            <div className="flex gap-2">
              <Link href="/dashboard" className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow">
                Accéder Espace Tenant →
              </Link>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Entreprises Inscrites</span>
              <p className="text-3xl font-black text-white">{organizations.length}</p>
              <span className="text-[11px] text-emerald-400 font-bold">Organisations RLS</span>
            </div>

            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Revenus MRR SaaS</span>
              <p className="text-3xl font-black text-amber-400">{formatPrice(1850000)}</p>
              <span className="text-[11px] text-slate-400">Abonnements mensuels</span>
            </div>

            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Utilisateurs Totaux</span>
              <p className="text-3xl font-black text-white">48</p>
              <span className="text-[11px] text-emerald-400 font-bold">Actifs sur le SaaS</span>
            </div>

            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-5 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">Biens & Projets Totaux</span>
              <p className="text-3xl font-black text-orange-400">128</p>
              <span className="text-[11px] text-slate-400">Publiés publiquement</span>
            </div>
          </div>

          {/* Organizations Table */}
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 overflow-hidden shadow-xl space-y-4 p-6">
            <h2 className="text-xl font-bold text-white">Liste des Entreprises Multi-Tenant</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                    <th className="py-3 px-4">Entreprise</th>
                    <th className="py-3 px-4">Activité</th>
                    <th className="py-3 px-4">Contact / Email</th>
                    <th className="py-3 px-4">Plan SaaS</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-right">Action Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-xs">
                  {organizations.map((org) => (
                    <tr key={org.id} className="hover:bg-slate-700/40">
                      <td className="py-3.5 px-4 font-bold text-white">
                        <div>{org.name}</div>
                        <span className="text-[10px] text-slate-400 font-normal">{org.city}, Senegal</span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">
                        <span className="px-2.5 py-1 rounded bg-slate-700 text-slate-200 text-[11px] font-bold">
                          {org.activityType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">
                        <div>{org.phone}</div>
                        <div className="text-[11px] text-slate-400">{org.email}</div>
                      </td>

                      <td className="py-3.5 px-4 font-black text-amber-400">
                        {org.plan}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                          org.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                          {org.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => toggleOrgStatus(org.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            org.status === 'ACTIVE'
                              ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                          }`}
                        >
                          {org.status === 'ACTIVE' ? 'Suspendre' : 'Activer'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
