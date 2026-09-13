'use client';

import React from 'react';
import TenantLayout from '@/components/layout/TenantLayout';
import { DEMO_SAAS_PLANS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { Zap, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function TenantSubscriptionPage() {
  return (
    <TenantLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              Forfait Actif : PRO
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-2">Gestion de l'Abonnement SaaS</h1>
            <p className="text-xs text-slate-500 mt-1">Consultez les limites de votre plan et mettez à niveau vers le plan Business.</p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_SAAS_PLANS.map((plan) => (
            <div 
              key={plan.id} 
              className={`rounded-3xl p-6 border flex flex-col justify-between space-y-6 ${
                plan.name === 'PRO' 
                  ? 'bg-slate-900 text-white border-orange-500 shadow-xl relative' 
                  : 'bg-white text-slate-900 border-slate-200 shadow-sm'
              }`}
            >
              {plan.name === 'PRO' && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider">
                  Votre Plan Actuel
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-3xl font-black mt-3">
                  {formatPrice(plan.priceMonthly)} <span className="text-xs font-normal text-slate-400">/ mois</span>
                </p>

                <ul className="space-y-2.5 pt-6 text-xs">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.name === 'PRO' ? 'text-orange-400' : 'text-emerald-600'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-3 rounded-xl font-bold text-xs transition-colors ${
                plan.name === 'PRO' 
                  ? 'bg-orange-600 hover:bg-orange-500 text-white' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}>
                {plan.name === 'PRO' ? 'Gérer le Renouvellement' : 'Changer de Plan'}
              </button>
            </div>
          ))}
        </div>

      </div>
    </TenantLayout>
  );
}
