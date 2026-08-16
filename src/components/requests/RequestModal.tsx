'use client';

import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Provider, UrgencyLevel } from '@/lib/types';
import { NEIGHBORHOODS } from '@/lib/data';

interface RequestModalProps {
  provider: Provider;
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestModal({ provider, isOpen, onClose }: RequestModalProps) {
  const [urgency, setUrgency] = useState<UrgencyLevel>('TODAY');
  const [selectedService, setSelectedService] = useState<string>(provider?.services?.[0]?.name || provider?.categoryName || 'Prestation & Travaux');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [neighborhood, setNeighborhood] = useState(provider?.neighborhood || 'Dakar');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerPhone || !description) {
      alert('Veuillez renseigner au moins votre numéro de téléphone et la description de votre besoin.');
      return;
    }

    // Save request to localStorage
    const newRequest = {
      id: 'req-' + Date.now(),
      customerName: customerName || 'Client Sama Artisan',
      customerPhone,
      providerId: provider.id,
      providerName: provider.name,
      serviceCategory: selectedService,
      description,
      neighborhood,
      urgency,
      budgetIndicative: budget ? parseInt(budget) : undefined,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('samaartisan_requests') || localStorage.getItem('samapro_requests') || '[]');
      localStorage.setItem('samaartisan_requests', JSON.stringify([newRequest, ...existing]));
      localStorage.setItem('samapro_requests', JSON.stringify([newRequest, ...existing]));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitted(true);
  };

  const handleOpenWhatsAppDirect = () => {
    const urgencyLabel = 
      urgency === 'IMMEDIATE' ? '🚨 URGENCE IMMÉDIATE' :
      urgency === 'TODAY' ? '⚡ AUJOURD\'HUI' :
      urgency === 'THIS_WEEK' ? '📅 CETTE SEMAINE' : '🤝 FLEXIBLE';

    const message = encodeURIComponent(
      `Bonjour ${provider.name},\n` +
      `Je vous contacte via la plateforme *Sama Artisan* pour une prestation :\n\n` +
      `📌 *Service* : ${selectedService}\n` +
      `📍 *Localisation* : ${neighborhood}, Dakar\n` +
      `⏱️ *Urgence* : ${urgencyLabel}\n` +
      `📝 *Description* : ${description}\n` +
      (budget ? `💰 *Budget indicatif* : ${budget} FCFA\n` : '') +
      `👤 *Mon contact* : ${customerName || 'Client'} (${customerPhone})\n\n` +
      `Êtes-vous disponible ? Merci d'avance !`
    );

    window.open(`https://wa.me/${provider.whatsapp}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-sama-500 shadow-md">
              <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sama-400">Demande directe</p>
              <h3 className="text-lg font-bold text-white">{provider.businessName}</h3>
              <p className="text-xs text-slate-300">Géré par {provider.name} • Réponse moyenne en {provider.responseTimeMinutes} min</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Prestation souhaitée
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500 focus:outline-none"
                >
                  {provider.services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.indicativePrice.toLocaleString()} FCFA)
                    </option>
                  ))}
                  <option value={provider.categoryName}>Autre demande de {provider.categoryName}</option>
                </select>
              </div>

              {/* Urgency Radio Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quand avez-vous besoin du pro ?</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('IMMEDIATE')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-2 ${
                      urgency === 'IMMEDIATE'
                        ? 'bg-red-50 border-red-500 text-red-700 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>Urgence Immédiate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('TODAY')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-2 ${
                      urgency === 'TODAY'
                        ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Aujourd'hui</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('THIS_WEEK')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-2 ${
                      urgency === 'THIS_WEEK'
                        ? 'bg-sama-50 border-sama-500 text-sama-800 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-sama-500" />
                    <span>Cette semaine</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('FLEXIBLE')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center gap-2 ${
                      urgency === 'FLEXIBLE'
                        ? 'bg-slate-100 border-slate-400 text-slate-800 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>Projet futur</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Décrivez votre problème ou besoin *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex : Mon tuyau sous l'évier de la cuisine fuit depuis ce matin et inonde le meuble..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500 focus:outline-none"
                />
              </div>

              {/* Neighborhood & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sama-600" />
                    <span>Votre Quartier</span>
                  </label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500"
                  >
                    {NEIGHBORHOODS.map((n) => (
                      <option key={n.id} value={n.name}>
                        {n.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-sama-600" />
                    <span>Votre Téléphone / WhatsApp *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Ex: 77 123 45 67"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500"
                  />
                </div>
              </div>

              {/* Name & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Votre Prénom & Nom</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Aïda Diagne"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Budget indicatif (FCFA, optionnel)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Ex: 20000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl font-bold bg-sama-600 hover:bg-sama-700 text-white shadow-lg shadow-sama-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer la demande au prestataire</span>
                </button>
              </div>

            </form>
          ) : (
            <div className="py-6 text-center space-y-5 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-black text-navy-900">Demande transmise avec succès !</h4>
                <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                  Votre demande a été notifiée à <strong className="text-slate-800">{provider.name}</strong>. Pour une réponse encore plus rapide (en 2 min), vous pouvez ouvrir directement la conversation WhatsApp :
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Recommandé pour un dépannage express</span>
                </div>
                <button
                  onClick={handleOpenWhatsAppDirect}
                  className="w-full py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
                >
                  <span>Ouvrir sur WhatsApp avec le message prêt &rarr;</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
              >
                Fermer cette fenêtre
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
