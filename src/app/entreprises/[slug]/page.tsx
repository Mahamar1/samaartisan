'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getOrganizationBySlug, getProperties, getBTPProjects } from '@/lib/supabase/services';
import { Organization, Property, BTPProject } from '@/lib/types';
import { Building2, MapPin, Phone, Mail, Globe, MessageSquare, CheckCircle2, HardHat } from 'lucide-react';
import { formatPrice, generatePropertyWhatsAppLink } from '@/lib/utils';

export default function CompanyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<BTPProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (slug) {
        const org = await getOrganizationBySlug(slug);
        setOrganization(org);
        if (org) {
          const [propsData, projsData] = await Promise.all([
            getProperties(org.id),
            getBTPProjects(org.id)
          ]);
          setProperties(propsData);
          setProjects(projsData);
        }
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

  if (!organization) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
          <h1 className="text-2xl font-bold text-slate-900">Entreprise introuvable</h1>
          <Link href="/entreprises" className="inline-block px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs">
            Retour à l'annuaire
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-2xl border border-orange-200 shrink-0">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                    {organization.activityType}
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">{organization.name}</h1>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {organization.address}, {organization.city}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${organization.whatsappNumber}?text=Bonjour%20${encodeURIComponent(organization.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${organization.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-4">
              {organization.bio}
            </p>
          </div>

          {/* Properties Published by Company */}
          {properties.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Biens Immobilier Publiés ({properties.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((prop) => (
                  <div key={prop.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
                    <img src={prop.primaryImage} alt="" className="w-full h-40 object-cover rounded-xl" />
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{prop.title}</h3>
                    <p className="text-xs text-orange-600 font-extrabold">{formatPrice(prop.price)}</p>
                    <Link href={`/biens/${prop.slug}`} className="text-xs font-bold text-slate-900 hover:text-orange-600 block">
                      Voir l'annonce →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BTP Projects by Company */}
          {projects.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Projets & Chantiers BTP ({projects.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600">Réf: {proj.reference}</span>
                      <span className="text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">{proj.status}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{proj.name}</h3>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: `${proj.progress}%` }} />
                    </div>
                    <Link href={`/projets/${proj.slug}`} className="text-xs font-bold text-slate-900 hover:text-orange-600 block">
                      Détails du chantier →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
