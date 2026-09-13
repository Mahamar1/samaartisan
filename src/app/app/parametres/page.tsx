'use client';

import React, { useState } from 'react';
import TenantLayout from '@/components/layout/TenantLayout';
import { Settings, Building2, Phone, Mail, Globe, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function TenantSettingsPage() {
  const [name, setName] = useState('Noune Immobilier SARL');
  const [activityType, setActivityType] = useState('Agence immobilière');
  const [phone, setPhone] = useState('+221 33 860 20 20');
  const [email, setEmail] = useState('contact@noune-immo.sn');
  const [whatsappNumber, setWhatsappNumber] = useState('221776543210');
  const [address, setAddress] = useState('Route des Almadies, Immeuble Prestige');
  const [city, setCity] = useState('Dakar');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <TenantLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Paramètres de l'Organisation</h1>
            <p className="text-xs text-slate-500 mt-1">Configurez le nom commercial, le logo, l'adresse et le numéro WhatsApp d'entreprise.</p>
          </div>
        </div>

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Paramètres enregistrés avec succès !</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de l'Organisation</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Type d'Activité</label>
              <input
                type="text"
                readOnly
                value={activityType}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro WhatsApp d'Entreprise</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                placeholder="221770000000"
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Siège</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ville</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md"
          >
            Enregistrer les Modificatiions
          </button>
        </form>

      </div>
    </TenantLayout>
  );
}
