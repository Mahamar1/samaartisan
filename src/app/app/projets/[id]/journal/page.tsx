'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TenantLayout from '@/components/layout/TenantLayout';
import { getBTPProjects, getConstructionLogs, addConstructionLog } from '@/lib/supabase/services';
import { BTPProject, ConstructionLog } from '@/lib/types';
import { HardHat, Calendar, Plus, Printer, CheckCircle2, ArrowLeft, Sun, Users, Wrench, AlertTriangle, FileText } from 'lucide-react';

export default function ConstructionJournalPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [project, setProject] = useState<BTPProject | null>(null);
  const [logs, setLogs] = useState<ConstructionLog[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [authorName, setAuthorName] = useState('Ing. Babacar Tall');
  const [weather, setWeather] = useState('Ensoleillé, 31°C');
  const [workDone, setWorkDone] = useState('');
  const [workersCount, setWorkersCount] = useState(15);
  const [equipmentUsed, setEquipmentUsed] = useState('Toupie à béton, Grue, Vibreurs');
  const [materialsUsed, setMaterialsUsed] = useState('Béton C30/37, Fer à béton Ø12');
  const [incidents, setIncidents] = useState('Aucun incident à déplorer');
  const [observations, setObservations] = useState('');

  useEffect(() => {
    async function loadData() {
      const projs = await getBTPProjects();
      const p = projs.find(item => item.id === id || item.slug === id) || projs[0];
      setProject(p);
      if (p) {
        const l = await getConstructionLogs(p.id);
        setLogs(l);
      }
    }
    loadData();
  }, [id]);

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    const newEntry = await addConstructionLog({
      projectId: project.id,
      projectName: project.name,
      organizationId: project.organizationId,
      logDate,
      authorName,
      weather,
      workDone,
      workersCount: Number(workersCount),
      equipmentUsed,
      materialsUsed,
      incidents,
      observations,
      images: ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80']
    });

    setLogs([newEntry, ...logs]);
    setShowModal(false);
    setWorkDone('');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  if (!project) return null;

  return (
    <TenantLayout>
      <div className="space-y-6 print:p-0">
        
        {/* Header (Hidden in Print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm print:hidden">
          <div className="space-y-1">
            <button onClick={() => router.back()} className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Retour
            </button>
            <h1 className="text-2xl font-black text-slate-900">Journal de Chantier</h1>
            <p className="text-xs text-slate-500">{project.name} (Réf: {project.reference})</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Saisir une Entrée</span>
            </button>

            <button
              onClick={handlePrintPDF}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Générer Rapport PDF</span>
            </button>
          </div>
        </div>

        {/* Print Header */}
        <div className="hidden print:block text-center border-b-2 border-slate-900 pb-4 mb-6">
          <h1 className="text-2xl font-black uppercase text-slate-900">RAPPORT DU JOURNAL DE CHANTIER BTP</h1>
          <p className="text-sm font-bold text-slate-700">{project.name} — Réf: {project.reference}</p>
          <p className="text-xs text-slate-500">Document généré le {new Date().toLocaleDateString('fr-FR')} | SAMA BTP IMMO</p>
        </div>

        {/* Logs List */}
        <div className="space-y-6">
          {logs.map((log) => (
            <div key={log.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 print:border-slate-300 print:shadow-none">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 font-bold text-xs border border-amber-200">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Rapport du {log.logDate}</h3>
                    <p className="text-xs text-slate-500">Responsable : {log.authorName}</p>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-amber-500" /> {log.weather}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">Travaux Effectués</h4>
                <p className="text-slate-800 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">{log.workDone}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" /> Ouvriers Présents
                  </span>
                  <span className="text-slate-600">{log.workersCount} ouvriers qualifiés</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-amber-600" /> Matériel Utilisé
                  </span>
                  <span className="text-slate-600">{log.equipmentUsed || 'Matériel standard'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-900 block flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Incidents / Remarques
                  </span>
                  <span className="text-slate-600">{log.incidents || 'Aucun incident'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for adding log */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-black text-slate-900">Nouvelle Entrée du Journal</h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">Fermer</button>
              </div>

              <form onSubmit={handleAddLog} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={logDate}
                      onChange={e => setLogDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Responsable</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={e => setAuthorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Météo</label>
                  <input
                    type="text"
                    value={weather}
                    onChange={e => setWeather(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Travaux réalisés dans la journée</label>
                  <textarea
                    rows={3}
                    required
                    value={workDone}
                    onChange={e => setWorkDone(e.target.value)}
                    placeholder="Coulage dalle, pose réseau électrique..."
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre d'ouvriers</label>
                    <input
                      type="number"
                      value={workersCount}
                      onChange={e => setWorkersCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Incidents</label>
                    <input
                      type="text"
                      value={incidents}
                      onChange={e => setIncidents(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/20"
                >
                  Enregistrer l'Entrée
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </TenantLayout>
  );
}
