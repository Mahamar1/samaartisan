import React from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { CATEGORIES, NEIGHBORHOODS } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sama-600 to-brand-600 flex items-center justify-center text-white font-bold shadow-md">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                Sama<span className="text-sama-400">Artisan</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              La plateforme de référence au Sénégal pour trouver rapidement des artisans qualifiés, électriciens, plombiers, climaticiens et mécaniciens de proximité.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sama-400" />
                <span>Siège : Grand Dakar, en face de la police, Dakar, Sénégal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sama-400" />
                <span>Assistance & Urgence : +221 78 750 52 18</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sama-400" />
                <span>contact@samaartisan.sn</span>
              </div>
            </div>
          </div>

          {/* Métiers Populaires (SEO) */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Métiers Populaires
            </h5>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/recherche?categorie=${cat.slug}`}
                    className="hover:text-sama-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* À Propos & Contact */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              À Propos & Aide
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/a-propos" className="hover:text-sama-400 transition-colors font-medium">
                  🇸🇳 Notre Histoire & Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sama-400 font-bold hover:underline flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Contact & Support 7j/7</span>
                </Link>
              </li>
              <li>
                <Link href="/mon-compte" className="hover:text-sama-400 transition-colors">
                  Espace Particulier
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/221787505218"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>WhatsApp Support (+221 78 750 52 18)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Espace Pro & Plateforme */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Espace Artisans
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/devenir-prestataire" className="text-emerald-400 font-bold hover:underline">
                  ★ Devenir artisan (Gratuit)
                </Link>
              </li>
              <li>
                <Link href="/pro/dashboard" className="hover:text-sama-400 transition-colors">
                  Connexion Espace Pro
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="hover:text-sama-400 transition-colors">
                  Créer un compte artisan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sama-400 transition-colors">
                  Assistance pour artisans
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Sama Artisan Sénégal. Tous droits réservés. Conçu pour booster l'artisanat local.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Système Opérationnel 24/7</span>
            </span>
            <Link href="/cgu" className="hover:text-slate-300">Conditions Générales</Link>
            <Link href="/confidentialite" className="hover:text-slate-300">Protection des Données (CDP)</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
