'use client';

import React, { useState } from 'react';
import TenantLayout from '@/components/layout/TenantLayout';
import { DEMO_DOCUMENTS } from '@/lib/data';
import { DocumentItem } from '@/lib/types';
import { FolderCheck, Upload, Download, FileText, Trash2 } from 'lucide-react';

export default function TenantDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(DEMO_DOCUMENTS);

  return (
    <TenantLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Bibliothèque Documentaire</h1>
            <p className="text-xs text-slate-500 mt-1">Stockez et classez les contrats, factures, quittances, plans 3D et titres fonciers.</p>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-600/20">
            <Upload className="w-4 h-4" />
            <span>Téléverser un Fichier</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-orange-50 text-orange-600 border border-orange-200">
                    {doc.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{doc.fileSize} KB</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="truncate">{doc.name}</span>
                </h3>
                <p className="text-[11px] text-slate-400">Ajouté par {doc.uploadedBy} le {new Date(doc.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </TenantLayout>
  );
}
