'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  Zap, 
  Users,
  CheckCircle2,
  Gift,
  MessageCircle,
  Clock,
  Star
} from 'lucide-react';

export default function DevenirPrestatairePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. HERO PITCH */}
      <section className="pt-16 pb-20 bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Gift className="w-4 h-4" />
            <span>Offre 100% Gratuite — Lancement Spécial Sénégal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Développez votre clientèle à Dakar. <br />
            <span className="bg-gradient-to-r from-sama-400 to-emerald-400 bg-clip-text text-transparent">
              100% Gratuit, Zéro Commission.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Rejoignez gratuitement le réseau des meilleurs artisans du Sénégal. Recevez des demandes de chantiers de clients vérifiés directement sur votre WhatsApp, <strong>sans aucun abonnement ni frais cachés</strong>.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>0 FCFA d'inscription</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zéro commission sur vos chantiers</span>
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Contact WhatsApp direct & immédiat</span>
            </span>
          </div>

          <div className="pt-6">
            <Link
              href="/inscription"
              className="px-8 py-4 rounded-2xl font-black bg-gradient-to-r from-sama-500 to-emerald-500 hover:from-sama-600 hover:to-emerald-600 text-white shadow-xl shadow-sama-500/30 active:scale-95 transition-all inline-flex items-center gap-2 text-base"
            >
              <Sparkles className="w-5 h-5" />
              <span>Créer mon Profil Artisan Gratuitement &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION CARD */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full">
                  Formule Artisan Partenaire
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mt-2">
                  Tout ce qui est inclus gratuitement
                </h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-4xl font-black text-emerald-600">0 FCFA</span>
                <p className="text-xs text-slate-400 font-bold">Sans engagement / Accès Illimité</p>
              </div>
            </div>

            {/* Grid Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-sama-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy-900">Demandes WhatsApp Illimitées</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Les clients vous contactent directement sur votre numéro personnel sans intermédiaire.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy-900">Badge Officiel "Artisan Vérifié"</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Validation gratuite de votre pièce d'identité pour rassurer vos futurs clients.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy-900">Mini-Site Vitrine Professionnel</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Ajoutez vos photos de chantiers, vos tarifs indicatifs et présentez votre savoir-faire.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy-900">Tableau de Bord CRM Simplifié</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Suivez vos demandes entrantes, vos avis reçus et la visibilité de votre profil.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/70 p-6 rounded-2xl border border-emerald-100">
              <div className="space-y-1">
                <p className="font-bold text-emerald-950 text-sm">Prêt à recevoir plus de clients à Dakar ?</p>
                <p className="text-xs text-emerald-700">L'inscription prend moins de 2 minutes et ne requiert aucune carte bancaire.</p>
              </div>
              <Link
                href="/inscription"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white text-xs shadow-md transition-all text-center shrink-0"
              >
                S'inscrire Gratuitement
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CHARTE DE CONFIANCE & PROCESSUS */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sama-600">Inscription Simple en 3 Étapes</span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900">
              Comment rejoindre Sama Artisan ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Sama Artisan est réputé pour sa sélection d'artisans honnêtes et compétents. Voici les 3 étapes gratuites d'admission :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sama-100 text-sama-700 flex items-center justify-center font-bold">1</div>
              <h4 className="font-bold text-navy-900">1. Inscription Gratuite</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Renseignez votre nom, numéro WhatsApp, métier et quartier d'intervention à Dakar.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">2</div>
              <h4 className="font-bold text-navy-900">2. Validation CNI</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Téléversez votre pièce d'identité pour obtenir gratuitement le badge de confiance vérifié.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">3</div>
              <h4 className="font-bold text-navy-900">3. Réception des Chantiers</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Votre profil est visible en ligne. Les particuliers vous contactent directement sur WhatsApp.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-navy-900">Questions Fréquentes des Artisans</h2>
            <p className="text-xs text-slate-500">Tout ce que vous devez savoir sur la plateforme.</p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <h4 className="font-bold text-navy-900 text-sm">L'application est-elle vraiment 100% gratuite ?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Oui ! L'inscription, la mise en ligne de votre profil, l'obtention du badge vérifié et la réception illimitée de demandes clients sont totalement gratuites.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <h4 className="font-bold text-navy-900 text-sm">Prenez-vous une commission sur les chantiers ?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Non, zéro commission ! Vous négociez vos tarifs directement avec le client et conservez 100% de vos gains.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
              <h4 className="font-bold text-navy-900 text-sm">Comment les clients me contactent-ils ?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Les clients intéressés cliquent sur le bouton "Discuter sur WhatsApp" ou "Appeler" depuis votre fiche profil pour échanger directement avec vous.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
