'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPublications } from '@/lib/supabase/services';
import { Publication } from '@/lib/types';
import { Newspaper, Calendar, ArrowRight, Tag } from 'lucide-react';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getPublications();
      setPublications(data);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              CMS Publications & Annonces
            </span>
            <h1 className="text-3xl sm:text-5xl font-black">
              Publications Immobilières & BTP
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Consultez les articles, annonces et actualités publiés par les agences et entreprises de construction.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((pub) => (
              <div key={pub.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold">
                      {pub.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(pub.publishDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  <Link href={`/publications/${pub.slug}`}>
                    <h2 className="text-xl font-bold text-slate-900 hover:text-orange-600 transition-colors">
                      {pub.title}
                    </h2>
                  </Link>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {pub.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  <span>Auteur : {pub.author}</span>
                  <Link href={`/publications/${pub.slug}`} className="text-orange-600 font-bold hover:underline">
                    Lire l'annonce →
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
