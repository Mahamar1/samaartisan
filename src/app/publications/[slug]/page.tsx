'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPublicationBySlug } from '@/lib/supabase/services';
import { Publication } from '@/lib/types';
import { Newspaper, Calendar, ArrowLeft, Tag, Building2 } from 'lucide-react';

export default function PublicationDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (slug) {
        const item = await getPublicationBySlug(slug);
        setPublication(item);
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <Newspaper className="w-16 h-16 text-slate-300 mx-auto" />
          <h1 className="text-2xl font-bold text-slate-900">Publication introuvable</h1>
          <Link href="/publications" className="inline-block px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs">
            Retour aux publications
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-orange-600">Accueil</Link>
            <span>/</span>
            <Link href="/publications" className="hover:text-orange-600">Publications</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-xs">{publication.title}</span>
          </div>

          <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-3 border-b border-slate-100 pb-6">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold">
                {publication.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                {publication.title}
              </h1>
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Par {publication.author} ({publication.organizationName || 'Équipe SAMA'})</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(publication.publishDate).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>

            {publication.primaryImage && (
              <img
                src={publication.primaryImage}
                alt={publication.title}
                className="w-full h-80 object-cover rounded-2xl"
              />
            )}

            <div className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
              {publication.content}
            </div>

            {publication.keywords && publication.keywords.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                {publication.keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                    #{kw}
                  </span>
                ))}
              </div>
            )}
          </article>

        </div>
      </main>

      <Footer />
    </div>
  );
}
