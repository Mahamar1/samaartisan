import React from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sama-600 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                Sama<span className="text-sama-400">Artisan</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plateforme N°1 de mise en relation d'artisans qualifiés et prestataires de services vérifiés à Dakar et dans tout le Sénégal.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sama-400 shrink-0" />
                <span>Grand Dakar & Almadies, Sénégal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp / Tél : +221 78 750 52 18</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sama-400 shrink-0" />
                <a href="mailto:mmahamar32@gmail.com" className="hover:text-sama-400 transition-colors">
                  mmahamar32@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Catégories de Métiers */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Corps de Métiers
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/categories/plombier" className="hover:text-sama-400 transition-colors">
                  Plomberie & Dépannage
                </Link>
              </li>
              <li>
                <Link href="/categories/electricien" className="hover:text-sama-400 transition-colors">
                  Électricité & Installation
                </Link>
              </li>
              <li>
                <Link href="/categories/climaticien" className="hover:text-sama-400 transition-colors">
                  Climatisation & Entretien
                </Link>
              </li>
              <li>
                <Link href="/categories/peintre" className="hover:text-sama-400 transition-colors">
                  Peinture & Décoration
                </Link>
              </li>
              <li>
                <Link href="/categories/macon" className="hover:text-sama-400 transition-colors">
                  Maçonnerie & Gros Œuvre
                </Link>
              </li>
              <li>
                <Link href="/categories/menuisier-bois" className="hover:text-sama-400 transition-colors">
                  Menuiserie Bois & Alu
                </Link>
              </li>
            </ul>
          </div>

          {/* Liens Utiles */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Navigation & Services
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/recherche" className="hover:text-sama-400 transition-colors">
                  Rechercher un artisan par quartier
                </Link>
              </li>
              <li>
                <Link href="/devenir-prestataire" className="text-emerald-400 font-bold hover:underline">
                  Devenir Prestataire Partenaire
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="hover:text-sama-400 transition-colors">
                  Créer un profil professionnel
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-sama-400 transition-colors">
                  À Propos de Sama Artisan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sama-400 transition-colors">
                  Contact & Support Client
                </Link>
              </li>
            </ul>
          </div>

          {/* Espace Artisan Pro */}
          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Espace Pro & Inscription
            </h5>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <p className="text-xs text-slate-300 font-medium">
                Vous êtes un artisan qualifié à Dakar ? Inscrivez-vous gratuitement et recevez des clients en direct.
              </p>
              <Link
                href="/inscription?role=pro"
                className="w-full py-2.5 px-4 rounded-xl bg-sama-600 hover:bg-sama-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all block text-center"
              >
                <span>Rejoindre le Réseau →</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sama Artisan — Plateforme des Artisans Qualifiés du Sénégal. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Profils 100% Vérifiés CNI</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
