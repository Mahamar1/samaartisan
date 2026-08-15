import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, Heart, Sparkles, Users, Award, MapPin } from 'lucide-react';

export default function AProposPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          Notre Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-navy-950">
          Digitaliser et Sécuriser l'Immobilier au Sénégal
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          <strong>SamaSolution</strong> est née de la volonté d'offrir aux particuliers, aux agences immobilières et aux investisseurs de la diaspora une plateforme transparente, moderne et adaptée aux réalités africaines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Transparence & Sécurité</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nous luttons contre les fraudes en certifiant chaque bien et chaque professionnel inscrit.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Simplicité Technologique</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Intégration directe de WhatsApp, Wave, Orange Money et d'une IA dédiée pour fluidifier toutes les transactions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Expertise Locale</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Une connaissance pointue du marché sénégalais (Dakar, Petite Côte, Thiès, Saint-Louis).
          </p>
        </div>
      </div>
    </div>
  );
}
