'use client';

import React from 'react';
import TenantLayout from '@/components/layout/TenantLayout';
import { BarChart3, Eye, MessageSquare, TrendingUp, Users, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TenantStatsPage() {
  const viewsData = [
    { month: 'Jan', vues: 420, whatsapp: 58 },
    { month: 'Fév', vues: 680, whatsapp: 89 },
    { month: 'Mar', vues: 950, whatsapp: 120 },
    { month: 'Avr', vues: 1200, whatsapp: 165 },
    { month: 'Mai', vues: 1450, whatsapp: 210 },
    { month: 'Juin', vues: 1890, whatsapp: 280 }
  ];

  return (
    <TenantLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Statistiques & Performance Analytics</h1>
            <p className="text-xs text-slate-500 mt-1">Analyse des vues des annonces, des clics WhatsApp et du taux de conversion.</p>
          </div>
        </div>

        {/* Metric boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Vues Cumulées d'Annonces</span>
            <p className="text-3xl font-black text-slate-900 mt-1">6 590</p>
            <span className="text-[11px] text-emerald-600 font-bold">↑ +28% ce mois</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Clics WhatsApp Directs</span>
            <p className="text-3xl font-black text-emerald-600 mt-1">922</p>
            <span className="text-[11px] text-emerald-600 font-bold">Taux conversion 14%</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500">Demandes de Visite</span>
            <p className="text-3xl font-black text-orange-600 mt-1">154</p>
            <span className="text-[11px] text-slate-400 font-medium">Reçues via formulaires</span>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Visites Publiques & Interactions WhatsApp</h3>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="vues" fill="#ea580c" radius={[4, 4, 0, 0]} name="Vues annonces" />
                <Bar dataKey="whatsapp" fill="#10b981" radius={[4, 4, 0, 0]} name="Clics WhatsApp" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </TenantLayout>
  );
}
