'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const articles = [
    {
      id: '1',
      title: 'Comment choisir le bon artisan pour vos travaux à Dakar',
      slug: 'guide-choisir-artisan-dakar-senegal',
      desc: 'Découvrez les conseils et vérifications essentielles pour recruter un plombier, électricien ou maçon certifié en toute sérénité.',
      date: '2026-09-10',
      author: 'Équipe Sama Artisan',
      category: 'Conseils Travaux'
    },
    {
      id: '2',
      title: 'Guide d\'entretien et de rénovation de votre maison au Sénégal',
      slug: 'guide-entretien-renovation-maison-senegal',
      desc: 'Prévenir l\'humidité de l\'hivernage, entretenir vos installations électriques et choisir les bons matériaux adaptés au climat.',
      date: '2026-09-05',
      author: 'Ing. Babacar Tall',
      category: 'Rénovation'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full">
        
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Blog & Guides Pratiques
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            Conseils Artisans & Travaux au Sénégal
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Retrouvez nos guides pratiques, astuces de rénovation et conseils d'experts pour réussir vos chantiers et dépannages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <div key={art.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                  {art.category}
                </span>
                <Link href={`/blog/${art.slug}`}>
                  <h2 className="text-xl font-bold text-slate-900 hover:text-emerald-600 transition-colors">
                    {art.title}
                  </h2>
                </Link>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{art.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                <span>{art.author}</span>
                <Link href={`/blog/${art.slug}`} className="text-emerald-600 font-bold hover:underline">
                  Lire l'article →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
