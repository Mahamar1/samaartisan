'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Calendar, ArrowLeft } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-orange-600">Accueil</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-orange-600">Blog</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate">Article</span>
          </div>

          <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-3 border-b border-slate-100 pb-6">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold">
                Conseil & Expertise
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                Guide complet pour l'acquisition de bien avec Titre Foncier au Sénégal
              </h1>
              <p className="text-xs text-slate-500 font-medium">Par Maître Ousmane Ndiaye (Notaire) • Publié en 2026</p>
            </div>

            <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                L'achat d'un bien immobilier ou d'une parcelle de terrain au Sénégal nécessite une rigueur juridique exemplaire. Le Titre Foncier (TF) offre la garantie de propriété la plus solide et inattaquable en droit sénégalais.
              </p>
              <p>
                <strong>Étape 1 : Vérification au Cadastre</strong><br />
                Avant toute signature de promesse de vente, demandez un état de droits réels au livre foncier afin de vérifier l'absence d'hypothèque ou de litige.
              </p>
              <p>
                <strong>Étape 2 : L'Acte Notarié</strong><br />
                La vente immobilière pour un bien immatriculé doit obligatoirement être constatée par acte notarié sous peine de nullité absolue.
              </p>
            </div>
          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}
