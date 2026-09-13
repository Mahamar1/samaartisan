'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DEMO_SAAS_PLANS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function TarifsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
              Forfaits SaaS Transparents
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
              Tarifs Adaptés au Marché Africain
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Pas de frais cachés. Choisissez l'abonnement qui convient à la taille de votre agence ou entreprise BTP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMO_SAAS_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`rounded-3xl p-8 border flex flex-col justify-between space-y-8 ${
                  plan.name === 'PRO'
                    ? 'bg-slate-900 text-white border-orange-500 shadow-2xl relative'
                    : 'bg-white text-slate-900 border-slate-200 shadow-sm'
                }`}
              >
                {plan.name === 'PRO' && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest shadow">
                    Le plus choisi
                  </span>
                )}

                <div className="space-y-4">
                  <h3 className="text-2xl font-black">{plan.name}</h3>
                  <p className="text-3xl font-black">
                    {formatPrice(plan.priceMonthly)} <span className="text-xs font-normal text-slate-400">/ mois</span>
                  </p>

                  <ul className="space-y-3 pt-6 text-xs sm:text-sm">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.name === 'PRO' ? 'text-orange-400' : 'text-emerald-600'}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  href={`/register?plan=${plan.name}`}
                  className={`w-full py-4 text-center rounded-xl font-extrabold text-xs transition-colors shadow-md ${
                    plan.name === 'PRO'
                      ? 'bg-orange-600 hover:bg-orange-500 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Souscrire au plan {plan.name}
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
