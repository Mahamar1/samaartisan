'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Calendar, ArrowLeft } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full">
        
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-emerald-600">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate">Article</span>
        </div>

        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              Conseil & Expertise
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              Comment choisir le bon artisan pour vos travaux à Dakar
            </h1>
            <p className="text-xs text-slate-500 font-medium">Par Équipe Sama Artisan • Publié en 2026</p>
          </div>

          <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Trouver un professionnel de confiance pour des travaux de plomberie, d'électricité ou de menuiserie à Dakar demande de vérifier son expérience, ses réalisations passées et les avis clients.
            </p>
            <p>
              <strong>1. Exigez la transparence des tarifs</strong><br />
              Demandez un devis détaillé avec le coût des fournitures et de la main d'œuvre avant le démarrage des travaux.
            </p>
            <p>
              <strong>2. Vérifiez le statut de certification sur Sama Artisan</strong><br />
              Tous les artisans affichant le badge 'VÉRIFIÉ' ont fourni leur pièce d'identité et leur registre de commerce ou attestation de qualification.
            </p>
          </div>
        </article>

      </div>
    </div>
  );
}
