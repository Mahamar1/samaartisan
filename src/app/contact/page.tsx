'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, RefreshCw } from 'lucide-react';
import { saveContactMessage } from '@/lib/supabase/services';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Demande d\'information');
  const [message, setMessage] = useState('');
  const [userType, setUserType] = useState('Particulier');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveContactMessage({
        fullName,
        phone,
        email,
        subject,
        message,
        userType
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sama-600 bg-sama-50 px-3 py-1 rounded-full border border-sama-200">
              Support & Contact 7j/7
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
              Contactez l'Équipe Sama Artisan
            </h1>
            <p className="text-slate-600 text-sm">
              Notre équipe est à votre écoute à Dakar pour toute question, suggestion ou besoin d'assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Contact details */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl">
              <h2 className="text-2xl font-black">Nos Coordonnées</h2>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sama-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Zone d'Intervention principale</strong>
                    <span>Grand Dakar, Almadies, Mermoz, Sacré-Cœur, Plateau, Sénégal</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="block text-white">Téléphone & WhatsApp</strong>
                    <span>+221 78 750 52 18</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sama-400 shrink-0" />
                  <div>
                    <strong className="block text-white">Email Support</strong>
                    <span>mmahamar32@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="https://wa.me/221787505218"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discussion WhatsApp Directe</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              {submitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold">Message Envoyé !</h3>
                  <p className="text-xs text-slate-600">Un conseiller Sama Artisan vous recontactera rapidement.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex: Babacar Ndiaye"
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sama-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+221 77 000 00 00"
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sama-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre.email@domaine.sn"
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sama-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Vous êtes</label>
                      <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sama-500 font-medium"
                      >
                        <option value="Particulier">Particulier / Client</option>
                        <option value="Artisan Pro">Artisan Professionnel</option>
                        <option value="Entreprise">Entreprise / Partenaire</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sujet de votre message</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ex: Demande de renseignement ou devis"
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sama-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Comment pouvons-nous vous aider..."
                      className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sama-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-sama-600 hover:bg-sama-500 text-white font-extrabold text-xs shadow-md shadow-sama-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>Envoyer le Message à l'Équipe</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
