import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  HardHat, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                SAMA <span className="text-orange-500">BTP</span> IMMO
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              "Construisez, gérez et publiez. Tout au même endroit."
              Plateforme SaaS multi-tenant tout-en-un dédiée aux agences immobilières, entreprises BTP, promoteurs, architectes et artisans au Sénégal & en Afrique.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Siège : Route des Almadies, VDN Extension, Dakar, Sénégal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>Support Commercial & Client : +221 33 860 20 20 / +221 77 654 32 10</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <a href="mailto:contact@samabtpimmo.sn" className="hover:text-orange-400 transition-colors">
                  contact@samabtpimmo.sn
                </a>
              </div>
            </div>
          </div>

          {/* Solutions Immobilier */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Immobilier
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/biens?type=appartement" className="hover:text-orange-400 transition-colors">
                  Appartements F3 / F4
                </Link>
              </li>
              <li>
                <Link href="/biens?type=villa" className="hover:text-orange-400 transition-colors">
                  Villas de Luxe
                </Link>
              </li>
              <li>
                <Link href="/biens?type=terrain" className="hover:text-orange-400 transition-colors">
                  Terrains & Titres Fonciers
                </Link>
              </li>
              <li>
                <Link href="/biens?type=bureau" className="hover:text-orange-400 transition-colors">
                  Bureaux & Commerces
                </Link>
              </li>
              <li>
                <Link href="/entreprises" className="hover:text-orange-400 transition-colors">
                  Agences Immobilières
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions BTP & Chantiers */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              BTP & Chantiers
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/projets" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <HardHat className="w-4 h-4 text-orange-500" />
                  <span>Projets de Construction</span>
                </Link>
              </li>
              <li>
                <Link href="/prestataires" className="hover:text-orange-400 transition-colors">
                  Artisans & Prestataires
                </Link>
              </li>
              <li>
                <Link href="/publications?category=chantier" className="hover:text-orange-400 transition-colors">
                  Journaux de Chantier
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-400 transition-colors">
                  Guides Techniques BTP
                </Link>
              </li>
            </ul>
          </div>

          {/* SaaS & Espace Client */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Espace SaaS Pro
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tarifs" className="text-orange-400 font-bold hover:underline">
                  Nos Tarifs (Starter, Pro, Business)
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-orange-400 transition-colors font-medium">
                  Créer son Espace Entreprise
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-orange-400 transition-colors">
                  Accéder au Tableau de Bord
                </Link>
              </li>
              <li>
                <Link href="/wp-aguissa" className="text-slate-500 hover:text-slate-300 transition-colors text-xs">
                  Espace Administration (wp-aguissa)
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SAMA BTP IMMO — Conçu pour l'Afrique et le Sénégal. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-orange-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Multi-Tenant & Sécurité RLS Active</span>
            </span>
            <Link href="/cgu" className="hover:text-slate-300">CGU / Mentions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
