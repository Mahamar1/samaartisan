'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TenantLayout from '@/components/layout/TenantLayout';
import { getProperties, getBTPProjects, getPublications } from '@/lib/supabase/services';
import { Property, BTPProject, Publication } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { 
  Building2, 
  HardHat, 
  Users, 
  CreditCard, 
  Newspaper, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<BTPProject[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    async function loadData() {
      const [propsData, projsData, pubsData] = await Promise.all([
        getProperties(),
        getBTPProjects(),
        getPublications()
      ]);
      setProperties(propsData);
      setProjects(projsData);
      setPublications(pubsData);
    }
    loadData();
  }, []);

  const totalBiens = properties.length;
  const disponiblesCount = properties.filter(p => p.status === 'Disponible').length;
  const vendusCount = properties.filter(p => p.status === 'Vendu').length;
  const louesCount = properties.filter(p => p.status === 'Loué').length;

  const totalProjets = projects.length;
  const projetsEnCours = projects.filter(p => p.status === 'En cours').length;
  const projetsTermines = projects.filter(p => p.status === 'Terminé').length;

  const totalRevenue = 14500000;
  const pendingPayments = 2500000;

  // Chart data for revenue trajectory
  const revenueData = [
    { month: 'Jan', revenus: 2400000, ventes: 1, locations: 2 },
    { month: 'Fév', revenus: 3100000, ventes: 1, locations: 3 },
    { month: 'Mar', revenus: 1800000, ventes: 0, locations: 2 },
    { month: 'Avr', revenus: 4200000, ventes: 2, locations: 3 },
    { month: 'Mai', revenus: 3900000, ventes: 1, locations: 4 },
    { month: 'Juin', revenus: 5500000, ventes: 2, locations: 5 },
    { month: 'Juil', revenus: 6800000, ventes: 3, locations: 6 },
    { month: 'Août', revenus: 7900000, ventes: 3, locations: 7 },
    { month: 'Sept', revenus: 8500000, ventes: 4, locations: 8 }
  ];

  const recentActivities = [
    { title: 'Nouveau bien ajouté', desc: 'Appartement F4 Vue Mer Almadies (Réf: REF-ALM-04)', time: 'Il y a 10 min', type: 'bien' },
    { title: 'Publication publiée', desc: 'Comment bien investir dans l immobilier neuf à Dakar', time: 'Il y a 1 heure', type: 'pub' },
    { title: 'Paiement reçu via Wave', desc: 'Loyer de 1 250 000 FCFA reçu de Amadou Ba', time: 'Il y a 3 heures', type: 'paiement' },
    { title: 'Projet BTP mis à jour', desc: 'Ing. Babacar Tall a validé le coulage de la dalle R+4 (Point E)', time: 'Hier', type: 'projet' },
    { title: 'Nouveau client enregistré', desc: 'Fatou Ndiaye (Acheteur - Budget 300M FCFA)', time: 'Hier', type: 'client' }
  ];

  return (
    <TenantLayout>
      <div className="space-y-8">
        
        {/* Header & Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Espace Multi-Tenant Connecté
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Tableau de Bord Général
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Vue synthétique des activités immobilières, chantiers BTP, revenus et clients.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/app/biens/new"
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Bien</span>
            </Link>

            <Link
              href="/app/projets/new"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Nouveau Projet BTP</span>
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Biens */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Biens Immobiliers</span>
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-200">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">{totalBiens}</p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
              <span className="text-emerald-600 font-bold">{disponiblesCount} Dispo</span>
              <span>{louesCount} Loués</span>
              <span>{vendusCount} Vendus</span>
            </div>
          </div>

          {/* BTP Projects */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Projets BTP & Chantiers</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                <HardHat className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">{totalProjets}</p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
              <span className="text-amber-600 font-bold">{projetsEnCours} En cours</span>
              <span className="text-emerald-600 font-bold">{projetsTermines} Terminés</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Revenus Encaissement</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-slate-900">{formatPrice(totalRevenue)}</p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
              <span className="text-emerald-600 font-bold">↑ +14.2% ce mois</span>
              <span>Wave / OM</span>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Paiements en Attente</span>
              <div className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-red-600">{formatPrice(pendingPayments)}</p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-100">
              <span className="text-red-500 font-bold">2 Loyers en retard</span>
              <Link href="/app/paiements" className="text-orange-600 hover:underline">Relancer →</Link>
            </div>
          </div>
        </div>

        {/* Charts & Graphs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Chart */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Évolution des Revenus & Encaissements</h3>
                <p className="text-xs text-slate-500">Montants cumulés en FCFA sur l'année 2026</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                Performance FCFA
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(value) => `${value / 1000000}M`} />
                  <Tooltip formatter={(value: any) => formatPrice(Number(value))} />
                  <Area type="monotone" dataKey="revenus" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenus)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities Feed */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Activités Récentes</h3>
              <Activity className="w-4 h-4 text-orange-500" />
            </div>

            <div className="space-y-4">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-3 text-xs border-b border-slate-100 pb-3 last:border-none">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-orange-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {act.type === 'bien' && <Building2 className="w-4 h-4" />}
                    {act.type === 'pub' && <Newspaper className="w-4 h-4 text-blue-600" />}
                    {act.type === 'paiement' && <CreditCard className="w-4 h-4 text-emerald-600" />}
                    {act.type === 'projet' && <HardHat className="w-4 h-4 text-amber-600" />}
                    {act.type === 'client' && <Users className="w-4 h-4 text-purple-600" />}
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">{act.title}</p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{act.desc}</p>
                    <span className="text-[10px] text-slate-400 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </TenantLayout>
  );
}
