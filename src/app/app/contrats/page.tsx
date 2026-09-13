'use client';

import React, { useState } from 'react';
import TenantLayout from '@/components/layout/TenantLayout';
import { DEMO_CONTRACTS } from '@/lib/data';
import { Contract } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { FileText, Plus, Download, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function TenantContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>(DEMO_CONTRACTS);

  const handleDownloadPDF = (contractNumber: string) => {
    alert(`Téléchargement du contrat ${contractNumber} au format PDF...`);
  };

  return (
    <TenantLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Gestion des Contrats & Baux</h1>
            <p className="text-xs text-slate-500 mt-1">Suivez les contrats de bail, actes de vente, mandats de gestion et contrats BTP.</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                  <th className="py-3 px-4">N° Contrat & Type</th>
                  <th className="py-3 px-4">Client / Parties</th>
                  <th className="py-3 px-4">Objet / Bien</th>
                  <th className="py-3 px-4">Période Validité</th>
                  <th className="py-3 px-4">Montant (FCFA)</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {contracts.map((cnt) => (
                  <tr key={cnt.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{cnt.contractNumber}</div>
                      <span className="text-[10px] font-extrabold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        {cnt.contractType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{cnt.clientName}</div>
                      <div className="text-[11px] text-slate-400">Prop: {cnt.ownerName}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                      {cnt.propertyTitle}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{cnt.startDate} au {cnt.endDate}</div>
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {formatPrice(cnt.amount)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {cnt.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDownloadPDF(cnt.contractNumber)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        <span>Télécharger</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </TenantLayout>
  );
}
