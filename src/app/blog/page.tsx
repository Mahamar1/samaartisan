'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const articles = [
    {
      id: '1',
      title: 'Guide complet pour l acquisition de terrain avec Titre Foncier au Sénégal',
      slug: 'guide-acquisition-terrain-titre-foncier-senegal',
      desc: 'Comprendre les démarches du Cadastre, du Domaine et du Notaire pour sécuriser un investissement immobilier à Dakar, Rufisque et Thiès.',
      date: '2026-08-28',
      author: 'Maître Ousmane Ndiaye (Notaire)',
      category: 'Conseil Immobilier'
    },
    {
      id: '2',
      title: 'Les 12 Étapes clés du suivi de chantier BTP : De l étude à la livraison',
      slug: '12-etapes-cles-suivi-chantier-btp',
      desc: 'Comment optimiser la gestion d un projet de construction R+5 avec un journal de chantier rigoureux et une traçabilité du béton.',
      date: '2026-09-01',
      author: 'Ing. Babacar Tall',
      category: 'Guide BTP'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Blog & Conseils Experts
            </span>
            <h1 className="text-3xl sm:text-5xl font-black">
              Blog Immobilier & BTP
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Retrouvez nos guides juridiques, techniques et économiques pour réussir vos projets immobiliers et de construction au Sénégal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((art) => (
              <div key={art.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-2.5 py-1 rounded-md bg-orange-50 text-orange-700 text-xs font-bold">
                    {art.category}
                  </span>
                  <Link href={`/blog/${art.slug}`}>
                    <h2 className="text-xl font-bold text-slate-900 hover:text-orange-600 transition-colors">
                      {art.title}
                    </h2>
                  </Link>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{art.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  <span>{art.author}</span>
                  <Link href={`/blog/${art.slug}`} className="text-orange-600 font-bold hover:underline">
                    Lire l'article →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
