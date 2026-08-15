'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-navy-950">
          Contactez l'Équipe SamaSolution
        </h1>
        <p className="text-slate-600 text-sm">
          Une question concernant un logement ou une demande de partenariat agence ? Nous sommes à votre écoute 7j/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-navy-950 text-white p-8 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-xl font-bold">Nos Coordonnées</h2>
          <div className="space-y-4 text-xs">
            <div className="flex items-start space-x-3 text-slate-300">
              <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0" />
              <span>Route des Almadies, Immeuble Horizon, Dakar, Sénégal</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <Phone className="w-5 h-5 text-sama-400 flex-shrink-0" />
              <span>+221 77 000 00 00 / 33 800 00 00</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <Mail className="w-5 h-5 text-brand-400 flex-shrink-0" />
              <span>contact@samasolution.sn</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-2">
            <p className="text-xs text-slate-400">Assistance directe :</p>
            <a
              href="https://wa.me/221770000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Support WhatsApp Immédiat</span>
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-slate-900">Message bien envoyé !</h3>
              <p className="text-xs text-slate-500">
                Notre équipe vous répondra dans un délai de 2 heures ouvrées.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email ou Téléphone *
                </label>
                <input
                  type="text"
                  required
                  placeholder="contact@email.com / +221..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer le message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
