'use client';

import React, { useState } from 'react';
import { 
  X, 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Send,
  Sparkles
} from 'lucide-react';
import { Provider, Review } from '@/lib/types';

interface ReviewModalProps {
  provider: Provider;
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded: (newReview: Review) => void;
}

export default function ReviewModal({ provider, isOpen, onClose, onReviewAdded }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [qualityRating, setQualityRating] = useState(5);
  const [punctualityRating, setPunctualityRating] = useState(5);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState(provider.neighborhood);
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !comment.trim()) {
      alert('Veuillez renseigner votre nom et votre avis.');
      return;
    }

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      providerId: provider.id,
      customerName: customerName.trim(),
      customerCity: customerCity.trim(),
      rating,
      qualityRating,
      punctualityRating,
      communicationRating,
      comment: comment.trim(),
      date: "Aujourd'hui",
      isVerifiedService: true,
    };

    onReviewAdded(newRev);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Évaluation Authentique</span>
          </div>

          <h3 className="text-xl font-bold text-white mt-1">
            Noter la prestation de {provider.name}
          </h3>
          <p className="text-xs text-slate-300">
            {provider.businessName} • Votre retour aide la communauté de Dakar
          </p>
        </div>

        <div className="p-6">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Overall Star Rating */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Note Globale
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-extrabold text-amber-800">
                  {rating === 5 && '⭐ Exceptionnel (5/5)'}
                  {rating === 4 && '👍 Très Bon Travail (4/5)'}
                  {rating === 3 && '👌 Satisfaisant (3/5)'}
                  {rating === 2 && '⚠️ Décevant (2/5)'}
                  {rating === 1 && '❌ Insuffisant (1/5)'}
                </span>
              </div>

              {/* Sub-ratings */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase">Qualité</span>
                  <select
                    value={qualityRating}
                    onChange={(e) => setQualityRating(parseInt(e.target.value))}
                    className="mt-1 font-bold text-navy-900 bg-transparent text-xs cursor-pointer focus:outline-none"
                  >
                    <option value={5}>5/5</option>
                    <option value={4}>4/5</option>
                    <option value={3}>3/5</option>
                    <option value={2}>2/5</option>
                    <option value={1}>1/5</option>
                  </select>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase">Ponctualité</span>
                  <select
                    value={punctualityRating}
                    onChange={(e) => setPunctualityRating(parseInt(e.target.value))}
                    className="mt-1 font-bold text-navy-900 bg-transparent text-xs cursor-pointer focus:outline-none"
                  >
                    <option value={5}>5/5</option>
                    <option value={4}>4/5</option>
                    <option value={3}>3/5</option>
                    <option value={2}>2/5</option>
                    <option value={1}>1/5</option>
                  </select>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase">Communication</span>
                  <select
                    value={communicationRating}
                    onChange={(e) => setCommunicationRating(parseInt(e.target.value))}
                    className="mt-1 font-bold text-navy-900 bg-transparent text-xs cursor-pointer focus:outline-none"
                  >
                    <option value={5}>5/5</option>
                    <option value={4}>4/5</option>
                    <option value={3}>3/5</option>
                    <option value={2}>2/5</option>
                    <option value={1}>1/5</option>
                  </select>
                </div>
              </div>

              {/* Name & City */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Votre Prénom & Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Cheikh Diop"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Votre Quartier
                  </label>
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="Ex: Almadies"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500"
                  />
                </div>
              </div>

              {/* Comment text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Votre Commentaire Détaillé *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Décrivez votre expérience : ponctualité, propreté du chantier, respect des tarifs convenus..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl font-bold bg-gradient-to-r from-sama-600 to-emerald-600 hover:from-sama-700 hover:to-emerald-700 text-white shadow-lg shadow-sama-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Publier mon avis certifié</span>
              </button>

            </form>
          ) : (
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-navy-900">Merci pour votre retour !</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Votre avis a été validé et ajouté instantanément à la fiche de <strong>{provider.name}</strong>.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold bg-navy-900 text-white text-xs hover:bg-navy-800"
              >
                Retourner à la fiche profil
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
