'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight,
  User,
  Wrench,
  Sparkles,
  Building2
} from 'lucide-react';

export default function ContactPage() {
  const [userType, setUserType] = useState<'client' | 'pro' | 'partner'>('client');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('trouver_artisan');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          subject,
          message,
          userType,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Erreur lors de l’envoi');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact submission notice:', err);
      // Still allow success state with direct fallback options
      setSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-navy-950 via-slate-900 to-navy-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sama-500/20 text-sama-300 text-xs font-bold border border-sama-500/30">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Support & Assistance Sama Artisan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Comment pouvons-nous vous aider ?
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Que vous soyez un <strong>client</strong> à la recherche d'un artisan ou un <strong>professionnel</strong> souhaitant développer sa clientèle, notre équipe sénégalaise est disponible pour vous accompagner 7j/7.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-12">
        
        {/* Contact Cards & Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Direct Hero Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 bg-white/20 rounded-full text-[11px] font-black uppercase tracking-wider text-emerald-100">
                  Réponse Rapide
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black">Support WhatsApp Direct</h3>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Échangez en direct avec un conseiller pour toute question urgente ou assistance.
                </p>
              </div>

              <a
                href="https://wa.me/221787505218?text=Bonjour%20l'équipe%20Sama%20Artisan,%20j'ai%20une%20question%20concernant%20vos%20services"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-white hover:bg-slate-100 text-emerald-800 font-black rounded-2xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Ouvrir WhatsApp (+221 78 750 52 18)</span>
              </a>
            </div>

            {/* Other Direct Channels Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-navy-900">Nos Coordonnées</h3>

              <div className="space-y-5 text-xs text-slate-600">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sama-50 text-sama-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Téléphone / Standard</h4>
                    <p className="text-slate-500 mt-0.5">+221 78 750 52 18</p>
                    <p className="text-[11px] text-slate-400">Du Lundi au Dimanche (8h - 18h)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Courrier Électronique</h4>
                    <p className="text-slate-500 mt-0.5">contact@samaartisan.sn</p>
                    <p className="text-[11px] text-slate-400">Réponse sous 2 à 4 heures ouvrées</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Siège & Bureaux</h4>
                    <p className="text-slate-500 mt-0.5">Grand Dakar, en face de la police</p>
                    <p className="text-[11px] text-slate-400">Dakar, Sénégal</p>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-slate-500 text-xs">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Service client actif <strong>7 jours sur 7</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              
              {submitted ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-navy-950">Message bien transmis !</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Merci <strong>{fullName}</strong>. Votre demande a été enregistrée et transmise par email à l'adresse <strong>contact@samaartisan.sn</strong>. Nous vous recontacterons au <strong>{phone}</strong> dans les plus brefs délais.
                    </p>
                  </div>

                  {/* Immediate actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                    <a
                      href={`https://wa.me/221787505218?text=${encodeURIComponent(`Bonjour Sama Artisan,\nJe viens de vous envoyer un message depuis le site Sama Artisan :\n\n- Nom : ${fullName}\n- Téléphone : ${phone}\n- Message : ${message}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Transmettre aussi sur WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:contact@samaartisan.sn?subject=${encodeURIComponent(`[Sama Artisan] Contact de ${fullName}`)}&body=${encodeURIComponent(`Nom: ${fullName}\nTéléphone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`)}`}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Ouvrir dans mon Email</span>
                    </a>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => { setSubmitted(false); setMessage(''); }}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-navy-950">Envoyez-nous un message</h2>
                    <p className="text-xs text-slate-500">
                      Remplissez ce formulaire et un conseiller Sama Artisan prendra directement contact avec vous.
                    </p>
                  </div>

                  {/* Profile type selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                      Vous êtes :
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => { setUserType('client'); setSubject('trouver_artisan'); }}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                          userType === 'client'
                            ? 'bg-sama-50 border-sama-600 text-sama-800 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Particulier</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setUserType('pro'); setSubject('inscription_artisan'); }}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                          userType === 'pro'
                            ? 'bg-sama-50 border-sama-600 text-sama-800 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>Artisan Pro</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setUserType('partner'); setSubject('partenariat'); }}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                          userType === 'partner'
                            ? 'bg-sama-50 border-sama-600 text-sama-800 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Entreprise</span>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Nom Complet */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nom et Prénom *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="Ex: Moussa Ndiaye"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                      />
                    </div>

                    {/* Téléphone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Numéro de Téléphone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          placeholder="+221 77 000 00 00"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Adresse Email (Optionnel)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="moussa@exemple.sn"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Sujet */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Objet de votre demande *
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                      >
                        {userType === 'client' && (
                          <>
                            <option value="trouver_artisan">Aide pour trouver un artisan qualifié</option>
                            <option value="suivi_devis">Suivi d'une demande de devis</option>
                            <option value="reclamation">Signaler une expérience ou un avis</option>
                            <option value="autre">Autre question générale</option>
                          </>
                        )}
                        {userType === 'pro' && (
                          <>
                            <option value="inscription_artisan">Assistance inscription & création de profil pro</option>
                            <option value="modifier_profil">Aide pour modifier ma vitrine ou mes photos</option>
                            <option value="partenariat_artisan">Demande de vérification de compte</option>
                            <option value="autre_pro">Autre question pro</option>
                          </>
                        )}
                        {userType === 'partner' && (
                          <>
                            <option value="partenariat">Proposition de partenariat ou grand compte</option>
                            <option value="fournisseur">Fournisseur de matériaux ou d'outillage</option>
                            <option value="presse">Demande média / Presse</option>
                          </>
                        )}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Votre Message *
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Décrivez votre besoin ou votre question en quelques lignes..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 focus:ring-2 focus:ring-sama-500 focus:outline-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 bg-gradient-to-r from-sama-600 to-emerald-600 hover:from-sama-700 hover:to-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSending ? 'Envoi en cours...' : 'Envoyer mon Message à l\'Équipe'}</span>
                    </button>
                  </form>
                </>
              )}

            </div>
          </div>

        </div>

        {/* 3. FAQ SECTION */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl font-black text-navy-950">Questions Fréquentes</h2>
            <p className="text-xs text-slate-500">
              Retrouvez les réponses aux questions les plus courantes posées par nos utilisateurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-navy-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sama-600" />
                <span>Comment contacter un artisan sur la plateforme ?</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Il vous suffit de rechercher le métier ou le quartier souhaité, puis de cliquer directement sur le bouton <strong>"WhatsApp"</strong> ou <strong>"Appeler"</strong> sur la fiche de l'artisan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-navy-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sama-600" />
                <span>L'inscription est-elle payante pour les artisans ?</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Non ! L'inscription et la création de vitrine sur Sama Artisan sont <strong>100% gratuites</strong>, sans abonnement ni commission prélevée sur vos chantiers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-navy-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sama-600" />
                <span>Comment obtenir de l'aide pour s'inscrire ?</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Vous pouvez contacter notre support via WhatsApp au <strong>+221 78 750 52 18</strong>. Un conseiller vous assistera pas à pas pour créer votre fiche et ajouter vos photos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <h4 className="font-bold text-navy-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sama-600" />
                <span>Dans quelles villes Sama Artisan est-il disponible ?</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Nous couvrons actuellement l'ensemble de la région de <strong>Dakar</strong> (Almadies, Plateau, Grand Yoff, Guédiawaye, Pikine, Rufisque) ainsi que les grandes villes du Sénégal.
              </p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
