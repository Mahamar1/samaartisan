'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  X, 
  Monitor, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  PlusSquare, 
  ArrowRight, 
  Zap, 
  ShieldCheck,
  Laptop
} from 'lucide-react';

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
  const [isInstallable, setIsInstallable] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isIosModalOpen, setIsIosModalOpen] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // 1. Register Service Worker for PWA
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('✅ Service Worker Sama Artisan actif:', reg.scope);
        })
        .catch((err) => {
          console.log('SW registration error:', err);
        });
    }

    if (typeof window !== 'undefined') {
      // 2. Check if already running in standalone / installed mode
      const isStandalone = 
        window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');

      if (isStandalone) {
        setIsInstalled(true);
        return;
      }

      // Check device type
      const ua = window.navigator.userAgent.toLowerCase();
      const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
      const isIosDevice = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
      setIsIos(isIosDevice);
      setIsDesktop(!isMobile);

      // Check if user dismissed in the last 12 hours
      const lastDismissed = localStorage.getItem('sama_pwa_dismissed_time');
      const isDismissedRecently = lastDismissed && Date.now() - parseInt(lastDismissed, 10) < 12 * 60 * 60 * 1000;

      // 3. Listen to beforeinstallprompt (Chrome / Edge / Android)
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        const installEvent = e as BeforeInstallPromptEvent;
        setDeferredPrompt(installEvent);
        setIsInstallable(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Listen for appinstalled event
      const handleAppInstalled = () => {
        setIsInstalled(true);
        setIsOpen(false);
        setInstallSuccess(true);
        setSuccessMessage('🎉 Application Sama Artisan installée avec succès sur votre bureau !');
        localStorage.setItem('sama_pwa_installed', 'true');
        setTimeout(() => setInstallSuccess(false), 7000);
      };

      window.addEventListener('appinstalled', handleAppInstalled);

      // Open automatically after 800ms for immediate prompt on visit
      if (!isDismissedRecently) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }
  }, []);

  // Download Windows / Mac Desktop Shortcut file (.url)
  const downloadDesktopShortcut = () => {
    try {
      const siteUrl = window.location.origin || 'https://samaartisan.vercel.app';
      const shortcutContent = `[InternetShortcut]\r\nURL=${siteUrl}/\r\nIconIndex=0\r\nIconFile=${siteUrl}/favicon.ico\r\nHotKey=0\r\n`;
      const blob = new Blob([shortcutContent], { type: 'application/octet-stream' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Sama Artisan - Dakar.url';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.log('Shortcut download fallback error:', e);
    }
  };

  // Main 1-Click Install Handler
  const handleInstallClick = async () => {
    // 1. If on iOS, show the 3-step guide
    if (isIos) {
      setIsIosModalOpen(true);
      setIsOpen(false);
      return;
    }

    let installedViaPrompt = false;

    // 2. If browser supports native PWA prompt (Chrome, Edge, Samsung Internet, Android)
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ Raccourci Sama Artisan installé par prompt natif');
          installedViaPrompt = true;
          setInstallSuccess(true);
          setSuccessMessage('🎉 Raccourci Sama Artisan ajouté avec succès sur votre bureau !');
          setIsOpen(false);
          setTimeout(() => setInstallSuccess(false), 6000);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Erreur prompt PWA:', err);
      }
    }

    // 3. For Desktop browsers (Windows / Mac), trigger desktop shortcut file download
    if (isDesktop && !installedViaPrompt) {
      downloadDesktopShortcut();
      setInstallSuccess(true);
      setSuccessMessage('🚀 Raccourci de bureau "Sama Artisan" téléchargé ! Glissez-le ou ouvrez-le sur votre bureau.');
      setIsOpen(false);
      setTimeout(() => setInstallSuccess(false), 7000);
    } else if (!deferredPrompt && !isDesktop) {
      // Mobile Android fallback
      alert("Pour créer le raccourci sur votre écran d'accueil :\n1. Appuyez sur le menu (3 points en haut à droite)\n2. Sélectionnez 'Ajouter à l'écran d'accueil' ou 'Installer l'application'.");
      setIsOpen(false);
    }
  };

  // Handle Dismiss
  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('sama_pwa_dismissed_time', Date.now().toString());
  };

  // Do not render anything if running inside standalone PWA
  if (isInstalled) return null;

  return (
    <>
      {/* Toast Notification on Successful Installation */}
      {installSuccess && (
        <div className="fixed top-5 inset-x-4 sm:inset-x-auto sm:right-5 z-[9999] bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-emerald-400 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-white animate-bounce" />
          </div>
          <div>
            <div className="font-extrabold text-sm">Action Réussie !</div>
            <div className="text-xs text-emerald-100 mt-0.5">{successMessage}</div>
          </div>
        </div>
      )}

      {/* Floating Sticky Mini Button (Permanent 1-Click trigger positioned in bottom-left to avoid form overlap) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-4 sm:left-6 z-30 bg-gradient-to-r from-sama-600 via-sama-700 to-navy-900 text-white px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-2xl border border-sama-400/40 flex items-center gap-2 hover:scale-105 transition-all duration-300 group hover:shadow-sama-500/40 active:scale-95"
          title="Créer un raccourci Sama Artisan sur votre bureau"
        >
          <div className="relative">
            <Download className="w-3.5 h-3.5 text-sama-200 group-hover:translate-y-0.5 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-black tracking-wide">
            {isDesktop ? 'Raccourci Bureau' : 'Installer l\'App'}
          </span>
        </button>
      )}

      {/* Main Automatic Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
          <div className="relative overflow-hidden bg-slate-900 border border-sama-500/40 text-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 ring-1 ring-white/10 animate-in zoom-in-95 duration-300">
            {/* Top Multi-Color Glowing Accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sama-500 via-emerald-400 to-amber-400" />
            
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with App Logo & Badge */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sama-500 to-slate-800 p-0.5 shadow-xl shadow-sama-500/25 shrink-0 relative">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <img
                    src="/icon.svg"
                    alt="Sama Artisan Logo"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sama-500/20 border border-sama-500/40 text-sama-300 text-[11px] font-extrabold uppercase tracking-wider mb-1">
                  ⚡ 1-Clic Automatique
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                  {isDesktop 
                    ? 'Créer un Raccourci sur votre Bureau' 
                    : 'Installer Sama Artisan sur votre Écran'}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Accédez à tous vos artisans qualifiés à Dakar sans ouvrir de navigateur !
                </p>
              </div>
            </div>

            {/* Feature Points Box */}
            <div className="space-y-2.5 mb-6 bg-slate-800/70 rounded-2xl p-4 border border-slate-700/60 text-xs text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Accès direct en 1 clic</strong> depuis votre bureau ou écran d'accueil</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Contact WhatsApp direct</strong> & Devis d'urgence instantanés</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>🇸🇳 Artisans certifiés</strong> (Dakar, Thiès & tout le Sénégal)</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-gradient-to-r from-sama-500 via-sama-600 to-brand-600 hover:from-sama-400 hover:to-sama-500 text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-xl shadow-sama-600/30 flex items-center justify-center gap-2.5 text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-white animate-bounce" />
                <span>
                  {isDesktop ? 'Créer le raccourci sur mon bureau' : 'Installer l\'application'}
                </span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </button>

              <button
                onClick={handleDismiss}
                className="py-3 px-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors text-center"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Safari Step-by-Step Instructions Modal */}
      {isIosModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
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
                  Appuyez sur <strong>« Ajouter »</strong> en haut à droite pour créer l'icône sur votre écran.
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
