'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Award, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake, 
  TrendingUp, 
  MessageSquare,
  Globe2,
  Clock,
  Briefcase
} from 'lucide-react';

export default function AProposPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <span>🇸🇳 La Référence des Artisans au Sénégal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Valoriser le savoir-faire local, <br />
            <span className="bg-gradient-to-r from-sama-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              connecter les talents du Sénégal.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            <strong>Sama Artisan</strong> est la première plateforme sénégalaise conçue pour permettre aux particuliers et entreprises de trouver en un clic des artisans compétents, sérieux et de proximité, tout en offrant aux prestataires une vitrine moderne 100% sans commission.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3.5 rounded-2xl font-bold bg-sama-600 hover:bg-sama-700 text-white text-xs shadow-lg shadow-sama-600/30 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Trouver un Artisan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/devenir-prestataire"
              className="px-6 py-3.5 rounded-2xl font-bold bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700 active:scale-95 transition-all flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-sama-400" />
              <span>Devenir Artisan Partenaire</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-navy-900">50+</div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Corps de Métier</p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600">0 FCFA</div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Zéro Commission</p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-sama-600">14</div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Zones Couvertes</p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-navy-900">&lt; 15 min</div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Réponse WhatsApp</p>
          </div>

        </div>
      </section>

      {/* 3. NOTRE HISTOIRE & NOTRE MISSION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-sama-100 text-sama-800 text-xs font-black uppercase tracking-wider">
              Notre Genèse
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-navy-950 leading-tight">
              Pourquoi avons-nous créé Sama Artisan ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              À Dakar et dans tout le Sénégal, trouver un bon électricien, un plombier d'urgence ou un menuisier de confiance a trop longtemps reposé sur le simple bouche-à-oreille, souvent source d'attente et d'imprévus.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              D'un autre côté, des milliers d'artisans hautement qualifiés manquent d'une visibilité professionnelle sur internet pour mettre en valeur la qualité de leur travail.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
              Sama Artisan est né pour créer ce pont : donner aux artisans la vitrine digitale qu'ils méritent et offrir aux familles sénégalaises une solution rapide, sûre et transparente.
            </p>
          </div>

          <div className="bg-gradient-to-br from-navy-900 to-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-xl border border-slate-800">
            <h3 className="text-xl font-bold text-sama-400">Ce qui nous rend uniques :</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Direct & Sans Commission</h4>
                  <p className="text-slate-300 mt-0.5">Nous ne prélevons aucun pourcentage sur les prestations. Le prix convenu revient intégralement à l'artisan.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">WhatsApp & Téléphone Immédiat</h4>
                  <p className="text-slate-300 mt-0.5">Pas de formulaires interminables : discutez directement par messagerie instantanée avec le professionnel.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Photos Réelles & Avis Authentiques</h4>
                  <p className="text-slate-300 mt-0.5">Chaque profil met en avant des réalisations photographiées sur le terrain et des retours d'expérience clients.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. NOS 4 VALEURS FONDATRICES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-10">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-sama-600">Nos Engagements</span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-950">Les 4 Piliers de Sama Artisan</h2>
          <p className="text-xs text-slate-500">Une éthique claire au service de l'excellence et de l'économie locale.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sama-50 text-sama-600 flex items-center justify-center">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy-900">Excellence & Savoir-Faire</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Valoriser la maîtrise technique et l'amour du travail bien fait dans chaque spécialité artisanale.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy-900">Équité & Gratuité</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Garantir un modèle accessible sans barrière financière pour soutenir les travailleurs indépendants.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy-900">Transparence Totale</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Affichage clair des zones d'intervention, délais de réponse et portfolios de travaux déjà réalisés.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy-900">Ancrage Local Sénégalais</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Une plateforme pensée pour les quartiers de Dakar et adaptée aux usages réels des Sénégalais.
            </p>
          </div>

        </div>

      </section>

      {/* 5. CALL TO ACTION DUAL */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl border border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sama-500 to-emerald-500 flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-7 h-7 text-white" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black">
              Rejoignez l'aventure Sama Artisan
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Que vous cherchiez un professionnel pour votre maison ou que vous soyez artisan prêt à développer vos chantiers, démarrez dès aujourd'hui.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold bg-sama-600 hover:bg-sama-700 text-white text-xs shadow-lg transition-all"
            >
              Rechercher un Artisan
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700 transition-all"
            >
              Contacter l'Équipe
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
