'use client';

import React, { useState } from 'react';
import TenantLayout from '@/components/layout/TenantLayout';
import { Users, Plus, ShieldCheck, UserCheck } from 'lucide-react';
import { UserRole } from '@/lib/types';

export default function TenantTeamPage() {
  const [members, setMembers] = useState([
    { id: '1', name: 'Aïssatou Sow', email: 'a.sow@noune-immo.sn', role: 'manager', status: 'Actif' },
    { id: '2', name: 'Mamadou Ndiaye', email: 'm.ndiaye@noune-immo.sn', role: 'agent', status: 'Actif' },
    { id: '3', name: 'Cheikh Tidiane Sy', email: 'c.sy@noune-immo.sn', role: 'accountant', status: 'Actif' }
  ]);

  return (
    <TenantLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Équipe & Rôles Organisation</h1>
            <p className="text-xs text-slate-500 mt-1">Gérez les permissions des membres (owner, admin, manager, agent, comptable, viewer).</p>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
            <Plus className="w-4 h-4 text-orange-400" />
            <span>Inviter un Membre</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                  <th className="py-3 px-4">Membre</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Rôle</th>
                  <th className="py-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{m.name}</td>
                    <td className="py-3.5 px-4 text-slate-500">{m.email}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase bg-slate-100 text-slate-800 border border-slate-200">
                        {m.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700">
                        {m.status}
                      </span>
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
