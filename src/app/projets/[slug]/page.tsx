'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getBTPProjectBySlug, getConstructionLogs } from '@/lib/supabase/services';
import { BTPProject, ConstructionLog } from '@/lib/types';
import { formatPrice, generateProjectWhatsAppLink } from '@/lib/utils';
import { HardHat, MapPin, Calendar, CheckCircle2, MessageSquare, ArrowLeft, Clock, FileText, UserCheck } from 'lucide-react';

export default function BTPProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [project, setProject] = useState<BTPProject | null>(null);
  const [logs, setLogs] = useState<ConstructionLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (slug) {
        const item = await getBTPProjectBySlug(slug);
        setProject(item);
        if (item) {
          const projectLogs = await getConstructionLogs(item.id);
          setLogs(projectLogs);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <HardHat className="w-16 h-16 text-slate-300 mx-auto" />
          <h1 className="text-2xl font-bold text-slate-900">Projet introuvable</h1>
          <Link href="/projets" className="inline-block px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs">
            Retour aux projets BTP
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
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-orange-600">Accueil</Link>
            <span>/</span>
            <Link href="/projets" className="hover:text-orange-600">Projets BTP</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-xs">{project.name}</span>
          </div>

          {/* Header Box */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-navy-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-extrabold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Réf: {project.reference}
                  </span>
                  <span className="px-3 py-1 text-xs font-extrabold rounded-lg bg-emerald-500/20 text-emerald-300">
                    {project.status}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black">{project.name}</h1>

                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{project.address}, {project.city}</span>
                </p>
              </div>

              <div className="space-y-2 text-left md:text-right">
                <p className="text-xs text-slate-400 font-semibold">Budget Total du Chantier</p>
                <p className="text-3xl font-black text-amber-400">{formatPrice(project.budget)}</p>
                <a
                  href={generateProjectWhatsAppLink('221778000000', project.name, project.reference)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contacter le Chef de Chantier</span>
                </a>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Avancement Global du Projet</span>
                <span className="text-amber-400">{project.progress}%</span>
              </div>
              <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500" 
                  style={{ width: `${project.progress}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Project Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
              <span className="text-slate-400 text-xs font-semibold">Client / Maître d'Ouvrage</span>
              <p className="text-slate-900 font-bold text-sm">{project.clientName || 'Groupe RealEstate'}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
              <span className="text-slate-400 text-xs font-semibold">Architecte & Bureau d'Études</span>
              <p className="text-slate-900 font-bold text-sm">{project.architectName || 'Cabinet Ndoye'}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
              <span className="text-slate-400 text-xs font-semibold">Entreprise Générale BTP</span>
              <p className="text-slate-900 font-bold text-sm">{project.companyName}</p>
            </div>
          </div>

          {/* Construction Stages (12 Stages) */}
          {project.stages && project.stages.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Les 12 Étapes du Chantier</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.stages.map((stg) => (
                  <div key={stg.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                        Étape {stg.stageNumber}
                      </span>
                      <span className={`font-bold text-[11px] ${stg.status === 'Terminé' ? 'text-emerald-600' : stg.status === 'En cours' ? 'text-amber-600' : 'text-slate-400'}`}>
                        {stg.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{stg.name}</h4>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: `${stg.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Construction Logs (Journal de Chantier) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Journal de Chantier</h2>
              <span className="text-xs font-bold text-slate-500">{logs.length} Entrées enregistrées</span>
            </div>

            <div className="space-y-6">
              {logs.map((log) => (
                <div key={log.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span>{log.logDate}</span>
                      <span className="text-slate-400">• Météo : {log.weather}</span>
                    </div>

                    <span className="text-xs text-slate-500 font-semibold">
                      Auteur : {log.authorName}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-sm">Travaux Réalisés</h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{log.workDone}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 pt-2">
                    {log.workersCount > 0 && <div><span className="font-bold text-slate-900">Ouvriers :</span> {log.workersCount} présents</div>}
                    {log.equipmentUsed && <div><span className="font-bold text-slate-900">Matériels :</span> {log.equipmentUsed}</div>}
                    {log.incidents && <div><span className="font-bold text-slate-900">Incidents :</span> {log.incidents}</div>}
                  </div>
                </div>
              ))}

              {logs.length === 0 && (
                <p className="text-slate-500 text-xs text-center py-6">Aucune mise à jour de journal disponible pour ce projet.</p>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
