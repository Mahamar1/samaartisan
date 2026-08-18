'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, X, Smartphone, Monitor, Sparkles, CheckCircle2, Share2, PlusSquare, ArrowUpRight } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isIosModalOpen, setIsIosModalOpen] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker for PWA
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('✅ Sama Artisan Service Worker actif:', reg.scope);
        })
        .catch((err) => {
          console.log('SW registration error:', err);
        });
    }

    // 2. Check if already installed
    if (typeof window !== 'undefined') {
      const isStandalone = 
        window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');

      if (isStandalone) {
        setIsInstalled(true);
        return;
      }

      // Check if iOS
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
      setIsIos(isIosDevice);

      // Check if user dismissed recently (allow after 24h)
      const lastDismissed = localStorage.getItem('sama_pwa_dismissed_time');
      const isDismissedRecently = lastDismissed && Date.now() - parseInt(lastDismissed, 10) < 24 * 60 * 60 * 1000;

      // 3. Listen to beforeinstallprompt (Desktop Chrome, Edge, Android)
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        const installEvent = e as BeforeInstallPromptEvent;
        setDeferredPrompt(installEvent);
        setIsInstallable(true);

        if (!isDismissedRecently) {
          // Trigger prompt popup after 2 seconds for a smooth onboarding
          setTimeout(() => {
            setIsOpen(true);
          }, 2000);
        }
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Listen for appinstalled event
      const handleAppInstalled = () => {
        setIsInstalled(true);
        setIsInstallable(false);
        setIsOpen(false);
        setInstallSuccess(true);
        localStorage.setItem('sama_pwa_installed', 'true');
        setTimeout(() => setInstallSuccess(false), 6000);
      };

      window.addEventListener('appinstalled', handleAppInstalled);

      // If iOS and not dismissed recently, show the prompt
      if (isIosDevice && !isDismissedRecently) {
        setTimeout(() => {
          setIsInstallable(true);
          setIsOpen(true);
        }, 2500);
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }
  }, []);

  // Handle Install Action Click
  const handleInstallClick = async () => {
    if (isIos) {
      setIsIosModalOpen(true);
      setIsOpen(false);
      return;
    }

    if (!deferredPrompt) {
      // Fallback instruction if browser doesn't expose beforeinstallprompt directly
      alert("Pour ajouter Sama Artisan sur votre bureau :\n1. Cliquez sur le menu du navigateur (3 points en haut à droite)\n2. Sélectionnez 'Installer Sama Artisan' ou 'Ajouter à l'écran d'accueil'.");
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ Raccourci Sama Artisan accepté par l\'utilisateur');
        setInstallSuccess(true);
        setIsInstallable(false);
        setIsOpen(false);
        setTimeout(() => setInstallSuccess(false), 5000);
      } else {
        console.log('❌ Installation Sama Artisan déclinée');
        setIsOpen(false);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error('Erreur lors de l\'installation PWA:', err);
    }
  };

  // Handle Dismiss
  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('sama_pwa_dismissed_time', Date.now().toString());
  };

  // Do not render anything if already installed
  if (isInstalled) return null;

  return (
    <>
      {/* Toast Notification on Successful Installation */}
      {installSuccess && (
        <div className="fixed top-5 right-5 z-[9999] bg-emerald-600 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-6 h-6 text-white shrink-0 animate-bounce" />
          <div>
            <div className="font-bold text-sm">🎉 Application Installée avec Succès !</div>
            <div className="text-xs text-emerald-100">Le raccourci Sama Artisan est désormais accessible sur votre bureau / écran d'accueil.</div>
          </div>
        </div>
      )}

      {/* Floating Sticky Mini Button (Always available if installable) */}
      {!isOpen && isInstallable && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-5 z-40 bg-gradient-to-r from-sama-600 to-sama-800 text-white px-4 py-2.5 rounded-full shadow-2xl border border-sama-400/40 flex items-center gap-2 hover:scale-105 transition-all duration-300 group hover:shadow-sama-500/30"
          title="Installer Sama Artisan sur votre bureau"
        >
          <div className="relative">
            <Download className="w-4 h-4 text-sama-200 group-hover:translate-y-0.5 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-xs font-bold tracking-wide">Installer l'App</span>
        </button>
      )}

      {/* Main Install Prompt Modal / Floating Banner */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-md z-[9990] p-3 sm:p-0 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="relative overflow-hidden bg-slate-900/95 backdrop-blur-2xl border border-sama-500/40 text-white rounded-3xl shadow-2xl p-5 sm:p-6 ring-1 ring-white/10">
            {/* Top Glowing Gradient Accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sama-500 via-emerald-400 to-amber-400" />
            
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with App Logo */}
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sama-500 to-slate-800 p-0.5 shadow-lg shadow-sama-500/20 shrink-0 relative">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img
                    src="/icon.svg"
                    alt="Sama Artisan Logo"
                    className="w-11 h-11 object-contain"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>

              <div className="pr-6">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sama-500/20 border border-sama-500/30 text-sama-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                  ⚡ Application Officielle
                </div>
                <h3 className="text-base font-extrabold text-white leading-tight">
                  Ajouter Sama Artisan sur votre Bureau
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Accédez à vos artisans qualifiés en 1 clic sans ouvrir de navigateur !
                </p>
              </div>
            </div>

            {/* Benefits Checklist */}
            <div className="space-y-2 mb-5 bg-slate-800/60 rounded-2xl p-3 border border-slate-700/50 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Raccourci rapide sur PC, Mac ou Téléphone</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Contact direct WhatsApp & Devis instantanés</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Chargement ultra rapide 🇸🇳 100% Gratuit</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-gradient-to-r from-sama-500 to-sama-600 hover:from-sama-400 hover:to-sama-500 text-white font-bold py-3 px-4 rounded-2xl shadow-lg shadow-sama-600/30 flex items-center justify-center gap-2 text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-white animate-bounce" />
                <span>Créer le raccourci</span>
              </button>

              <button
                onClick={handleDismiss}
                className="px-3.5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Safari Step-by-Step Instructions Modal */}
      {isIosModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setIsIosModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-5">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-sama-500 to-slate-800 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img src="/icon.svg" alt="Sama Artisan" className="w-12 h-12 object-contain" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">Installer sur iPhone / iPad</h3>
              <p className="text-xs text-slate-300 mt-1">Suivez ces 3 étapes simples dans Safari :</p>
            </div>

            <div className="space-y-3.5 text-xs text-slate-200 bg-slate-800/70 p-4 rounded-2xl border border-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sama-600 font-bold flex items-center justify-center text-white shrink-0 text-[11px]">1</div>
                <div>
                  Appuyez sur l'icône <strong>Partager</strong> <Share2 className="w-3.5 h-3.5 inline text-sama-400 mx-1" /> en bas de votre écran Safari.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sama-600 font-bold flex items-center justify-center text-white shrink-0 text-[11px]">2</div>
                <div>
                  Faites défiler vers le bas et sélectionnez <strong>« Sur l'écran d'accueil »</strong> <PlusSquare className="w-3.5 h-3.5 inline text-sama-400 mx-1" />.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sama-600 font-bold flex items-center justify-center text-white shrink-0 text-[11px]">3</div>
                <div>
                  Appuyez sur <strong>« Ajouter »</strong> en haut à droite pour finaliser le raccourci.
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsIosModalOpen(false)}
              className="w-full mt-5 bg-sama-600 hover:bg-sama-500 text-white font-bold py-3 rounded-2xl text-xs transition-colors"
            >
              J'ai compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}
