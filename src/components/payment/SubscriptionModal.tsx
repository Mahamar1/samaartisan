'use client';

import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  Sparkles, 
  QrCode, 
  CheckCircle2, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { SubscriptionPlan } from '@/lib/types';
import { formatFcfa } from '@/lib/data';

interface SubscriptionModalProps {
  plan: SubscriptionPlan;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SubscriptionModal({ plan, isOpen, onClose, onSuccess }: SubscriptionModalProps) {
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('MONTHLY');
  const [paymentMethod, setPaymentMethod] = useState<'WAVE' | 'OM' | 'CARD'>('WAVE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const price = billingCycle === 'MONTHLY' ? plan.priceMonthlyFcfa : plan.priceAnnualFcfa;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (price > 0 && !phoneNumber && paymentMethod !== 'CARD') {
      alert('Veuillez saisir votre numéro Wave ou Orange Money.');
      return;
    }

    setIsProcessing(true);

    // Simulate Payment Gateway API Call (Wave / PayTech webhook response)
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      if (onSuccess) onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white rounded-full">
              {plan.badge}
            </span>
            <span className="text-xs text-slate-300">Abonnement Prestataire</span>
          </div>

          <h3 className="text-2xl font-black text-white mt-1">Formule {plan.name}</h3>
          
          {/* Price display */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">
              {formatFcfa(price)}
            </span>
            <span className="text-xs text-slate-300">
              / {billingCycle === 'MONTHLY' ? 'mois' : 'an (2 mois offerts)'}
            </span>
          </div>
        </div>

        <div className="p-6">
          {!isCompleted ? (
            <form onSubmit={handlePayment} className="space-y-5">
              
              {/* Billing Cycle Toggle */}
              {plan.tier !== 'FREE' && (
                <div className="p-1 bg-slate-100 rounded-xl flex items-center">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('MONTHLY')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      billingCycle === 'MONTHLY'
                        ? 'bg-white text-navy-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Mensuel ({formatFcfa(plan.priceMonthlyFcfa)}/m)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('ANNUAL')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      billingCycle === 'ANNUAL'
                        ? 'bg-white text-navy-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Annuel (-17% Économie)
                  </button>
                </div>
              )}

              {/* Payment Method Selector */}
              {price > 0 ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Moyen de paiement sécurisé
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    
                    {/* Wave */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('WAVE')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'WAVE'
                          ? 'border-cyan-500 bg-cyan-50/80 ring-2 ring-cyan-500/20 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center font-black text-xs shadow-sm">
                        W
                      </div>
                      <span className="text-xs font-bold text-slate-800">Wave</span>
                      <span className="text-[9px] text-cyan-700 font-bold">Instantané 0%</span>
                    </button>

                    {/* Orange Money */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('OM')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'OM'
                          ? 'border-orange-500 bg-orange-50/80 ring-2 ring-orange-500/20 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs shadow-sm">
                        OM
                      </div>
                      <span className="text-xs font-bold text-slate-800">Orange Money</span>
                      <span className="text-[9px] text-orange-700 font-bold">Code USSD</span>
                    </button>

                    {/* Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CARD')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                        paymentMethod === 'CARD'
                          ? 'border-slate-800 bg-slate-100 ring-2 ring-slate-800/20 shadow-sm'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs shadow-sm">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">Carte Visa</span>
                      <span className="text-[9px] text-slate-500 font-medium">Diaspora / Intl</span>
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Phone or Card input */}
              {price > 0 && paymentMethod !== 'CARD' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-sama-600" />
                    <span>Numéro de compte {paymentMethod === 'WAVE' ? 'Wave' : 'Orange Money'}</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Ex: 77 000 00 00 ou 76 000 00 00"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sama-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    {paymentMethod === 'WAVE' 
                      ? 'Une notification de débit sera envoyée directement sur votre application Wave.'
                      : 'Composez le #144#391# pour valider le débit de votre compte Orange Money.'}
                  </p>
                </div>
              )}

              {/* Feature Highlights */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <p className="text-xs font-bold uppercase text-slate-600">Inclus dans votre plan :</p>
                <div className="space-y-1.5">
                  {plan.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-sama-600 shrink-0 stroke-[2.5]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-sama-600 to-brand-600 hover:from-sama-700 hover:to-brand-700 text-white shadow-xl shadow-sama-600/25 flex items-center justify-center gap-2 active:scale-95 transition-all text-base disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Communication avec {paymentMethod}...</span>
                  </div>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-white text-white" />
                    <span>
                      {price === 0 ? 'Activer mon compte Gratuit' : `Payer ${formatFcfa(price)} avec ${paymentMethod}`}
                    </span>
                  </>
                )}
              </button>

            </form>
          ) : (
            <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-navy-900">Abonnement Activé avec Succès !</h4>
                <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                  Félicitations ! Votre profil bénéficie désormais des avantages du plan <strong>{plan.name}</strong>. Votre badge de visibilité est immédiatement actif sur Dakar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                Paiement vérifié par Wave / Sama Artisan • Facture disponible dans votre Espace Pro.
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl font-bold bg-navy-900 text-white text-sm hover:bg-navy-800 transition-colors"
              >
                Accéder à mon tableau de bord Pro &rarr;
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
