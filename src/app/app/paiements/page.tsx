'use client';

import React, { useState } from 'react';
import TenantLayout from '@/components/layout/TenantLayout';
import { DEMO_PAYMENTS } from '@/lib/data';
import { Payment } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { CreditCard, Plus, Download, CheckCircle2, Clock, Smartphone, FileCheck } from 'lucide-react';

export default function TenantPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(DEMO_PAYMENTS);
  const [selectedReceipt, setSelectedReceipt] = useState<Payment | null>(null);

  return (
    <TenantLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Module Comptable & Encaissements</h1>
            <p className="text-xs text-slate-500 mt-1">Suivez les loyers encaissés, paiements de jalons BTP et préparez les factures mobile money (Wave & Orange Money).</p>
          </div>
        </div>

        {/* Payment Methods Info Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-xs">Paiement Mobile Wave</p>
              <p className="text-[11px] text-slate-500">API Intégrée pré-configurée</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-xs">Orange Money Sénégal</p>
              <p className="text-[11px] text-slate-500">Validation instantanée</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-xs">Virements & Chèques</p>
              <p className="text-[11px] text-slate-500">Rapprochement bancaire</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                  <th className="py-3 px-4">Type & Réf</th>
                  <th className="py-3 px-4">Client / Payeur</th>
                  <th className="py-3 px-4">Bien / Projet</th>
                  <th className="py-3 px-4">Montant (FCFA)</th>
                  <th className="py-3 px-4">Méthode</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Quittance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {payments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{pay.paymentType}</div>
                      <span className="text-[10px] text-slate-400 font-normal">{pay.reference}</span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {pay.clientName}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                      {pay.propertyTitle}
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {formatPrice(pay.amount)}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                        {pay.paymentMethod}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {pay.paymentDate}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {pay.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedReceipt(pay)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] inline-flex items-center gap-1"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Voir Quittance</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quittance Modal */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-slate-900 border border-slate-200">
              <div className="text-center space-y-2 border-b border-slate-100 pb-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-2xl font-black">QUITTANCE DE PAIEMENT</h3>
                <p className="text-xs text-slate-500">Référence transaction : {selectedReceipt.reference}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Reçu de :</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.clientName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Motif du paiement :</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.paymentType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Bien / Désignation :</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">{selectedReceipt.propertyTitle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Méthode de règlement :</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Date d'encaissement :</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.paymentDate}</span>
                </div>
                <div className="flex justify-between py-2 bg-emerald-50 px-3 rounded-xl text-sm font-black text-emerald-900">
                  <span>Montant Total Réglé :</span>
                  <span>{formatPrice(selectedReceipt.amount)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                >
                  Imprimer Quittance
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </TenantLayout>
  );
}
