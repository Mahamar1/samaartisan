'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Building2, User, Phone, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { OrganizationActivity } from '@/lib/types';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [activityType, setActivityType] = useState<OrganizationActivity>('Agence immobilière');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const orgId = `org-${Date.now()}`;
      const newOrg = {
        id: orgId,
        name: companyName,
        slug: companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80',
        activityType,
        phone,
        email,
        city: 'Dakar',
        region: 'Dakar',
        whatsappNumber: phone.replace(/[^0-9]/g, ''),
        plan: 'PRO',
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      };

      const userSession = {
        id: `usr-${Date.now()}`,
        email,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        phone,
        role: 'owner',
        organizationId: orgId,
        organizationName: companyName,
        createdAt: new Date().toISOString()
      };

      // Save organization to local storage
      const existingOrgs = JSON.parse(localStorage.getItem('sama_organizations_data') || '[]');
      existingOrgs.unshift(newOrg);
      localStorage.setItem('sama_organizations_data', JSON.stringify(existingOrgs));

      // Save session
      localStorage.setItem('sama_user_session', JSON.stringify(userSession));
      window.dispatchEvent(new Event('storage'));
      window.location.href = '/dashboard';
    } catch {
      setErrorMsg('Erreur lors de la création de votre compte. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto border border-orange-200">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Créer mon Espace Entreprise</h1>
            <p className="text-xs text-slate-500">Inscrivez votre agence ou entreprise BTP sur SAMA BTP IMMO</p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="Ex: Mamadou"
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Ex: Diop"
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+221 77 000 00 00"
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email professionnel</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="contact@entreprise.sn"
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de l'Entreprise</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Ex: Dakar Immo SARL ou Sine BTP"
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Type d'activité</label>
              <select
                value={activityType}
                onChange={e => setActivityType(e.target.value as OrganizationActivity)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Agence immobilière">Agence immobilière</option>
                <option value="Entreprise BTP">Entreprise BTP</option>
                <option value="Promoteur immobilier">Promoteur immobilier</option>
                <option value="Gestion immobilière">Gestion immobilière</option>
                <option value="Architecture">Architecture</option>
                <option value="Bureau d'études">Bureau d'études</option>
                <option value="Artisan">Artisan</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Créer mon Espace Entreprise</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Déjà un espace entreprise ?{' '}
              <Link href="/login" className="font-bold text-orange-600 hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
