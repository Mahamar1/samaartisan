'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProperties, getBTPProjects, getPublications } from '@/lib/supabase/services';
import { Property, BTPProject, Publication } from '@/lib/types';
import { formatPrice, generatePropertyWhatsAppLink } from '@/lib/utils';
import { 
  Building2, 
  HardHat, 
  Users, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  Layers, 
  Zap, 
  CreditCard,
  ChevronRight,
  Eye,
  Calendar
} from 'lucide-react';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<BTPProject[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [propsData, projsData, pubsData] = await Promise.all([
          getProperties(),
          getBTPProjects(),
          getPublications()
        ]);
        setProperties(propsData);
        setProjects(projsData);
        setPublications(pubsData);
      } catch (err) {
        console.error('Erreur chargement données accueil:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-850 to-navy-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Hero Text */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Solution SaaS Multi-Tenant Sénégal & Afrique</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  Votre plateforme tout-en-un pour gérer votre activité <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">BTP & Immobilier</span>
                </h1>

                <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Gérez vos biens, projets, clients, publications et activités financières depuis une seule plateforme sécurisée.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Commencer gratuitement</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/biens"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Découvrir la plateforme</span>
                  </Link>
                </div>

                {/* Key stats row */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800 text-center lg:text-left">
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-orange-400">100%</p>
                    <p className="text-xs text-slate-400 font-medium">Multi-Tenant & RLS</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white">FCFA</p>
                    <p className="text-xs text-slate-400 font-medium">Devise & Wave / OM</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-amber-400">12 Étapes</p>
                    <p className="text-xs text-slate-400 font-medium">Journal BTP & Suivi</p>
                  </div>
                </div>

              </div>

              {/* Right Hero Card / Visual Preview */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl bg-slate-800/80 p-5 border border-slate-700/80 shadow-2xl backdrop-blur-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">SAMA BTP IMMO Dashboard</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/50">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Biens Actifs</span>
                        <Building2 className="w-4 h-4 text-orange-400" />
                      </div>
                      <p className="text-2xl font-black text-white mt-1">24</p>
                      <p className="text-[10px] text-emerald-400 mt-0.5">↑ +4 ce mois-ci</p>
                    </div>

                    <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/50">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Chantiers BTP</span>
                        <HardHat className="w-4 h-4 text-amber-400" />
                      </div>
                      <p className="text-2xl font-black text-white mt-1">6</p>
                      <p className="text-[10px] text-amber-400 mt-0.5">Avancement moyen 65%</p>
                    </div>
                  </div>

                  {/* Sample Property Box inside Hero card */}
                  <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-400">Dernier Bien Publié</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Disponible</span>
                    </div>
                    <p className="text-sm font-bold text-white truncate">Appartement F4 Vue Mer Almadies</p>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>1 250 000 FCFA / mois</span>
                      <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <MapPin className="w-3 h-3 text-orange-400" /> Almadies
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 flex items-center justify-between text-xs text-orange-300 font-bold">
                    <span>⚡ Génération automatique d'annonce publique</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION IMMOBILIER */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  Immobilier de Standing
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
                  Biens Immobiliers à la Une
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Découvrez les appartements, villas et terrains disponibles à Dakar et au Sénégal.
                </p>
              </div>

              <Link
                href="/biens"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                <span>Voir tous les biens</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(0, 3).map((prop) => (
                <div 
                  key={prop.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="relative h-52 bg-slate-200 overflow-hidden">
                    <img
                      src={prop.primaryImage}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900/80 text-white backdrop-blur-md">
                        {prop.transactionType}
                      </span>
                      <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-orange-600 text-white">
                        {prop.propertyType}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-extrabold text-slate-900 shadow">
                      {formatPrice(prop.price, prop.currency)}
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>{prop.neighborhood}, {prop.city}</span>
                      </div>

                      <Link href={`/biens/${prop.slug}`}>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {prop.title}
                        </h3>
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs text-slate-600 font-semibold">
                      <div>
                        <span className="block text-slate-900 font-bold text-sm">{prop.surface} m²</span>
                        <span className="text-[10px] text-slate-400">Surface</span>
                      </div>
                      <div>
                        <span className="block text-slate-900 font-bold text-sm">{prop.rooms}</span>
                        <span className="text-[10px] text-slate-400">Chambres</span>
                      </div>
                      <div>
                        <span className="block text-slate-900 font-bold text-sm">{prop.bathrooms}</span>
                        <span className="text-[10px] text-slate-400">SDB</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-slate-500 truncate">
                        {prop.organizationName}
                      </span>

                      <a
                        href={generatePropertyWhatsAppLink(prop.agentWhatsapp || '221776543210', prop.title, prop.reference)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION BTP & CHANTIERS */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  Ingénierie & Bâtiment
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                  Projets BTP & Suivi de Chantiers
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Suivez la progression en temps réel des chantiers avec le journal de bord quotidien.
                </p>
              </div>

              <Link
                href="/projets"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Voir tous les projets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 space-y-4 shadow-xl">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                        {proj.reference}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 inline mr-1 text-amber-400" />
                        {proj.address}, {proj.city}
                      </p>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {proj.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">Progression Globale</span>
                      <span className="text-amber-400">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500" 
                        style={{ width: `${proj.progress}%` }} 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-slate-700/80 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Budget Alloué</span>
                      <span className="font-bold text-white text-sm">{formatPrice(proj.budget)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Architecte / Cabinet</span>
                      <span className="font-bold text-white text-sm truncate block">{proj.architectName || 'Cabinet Ndoye'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400 font-medium">
                      Entreprise : {proj.companyName}
                    </span>

                    <Link
                      href={`/projets/${proj.slug}`}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors"
                    >
                      Détails & Journal
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION CMS & PUBLICATIONS */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Actualités & Publications
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
                  Dernières Annonces et Conseils
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Restez informé des tendances immobilières et des innovations du secteur BTP au Sénégal.
                </p>
              </div>

              <Link
                href="/publications"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Voir toutes les publications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {publications.slice(0, 2).map((pub) => (
                <div key={pub.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold">
                        {pub.category}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(pub.publishDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>

                    <Link href={`/publications/${pub.slug}`}>
                      <h3 className="text-xl font-bold text-slate-900 hover:text-orange-600 transition-colors">
                        {pub.title}
                      </h3>
                    </Link>

                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {pub.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                    <span>Auteur : {pub.author}</span>
                    <Link
                      href={`/publications/${pub.slug}`}
                      className="text-orange-600 font-bold hover:underline"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION TARIFS & ABONNEMENTS */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                Offres SaaS Accessibles
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3">
                Tarifs adaptés aux Agences & Entreprises BTP
              </h2>
              <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-2">
                Choisissez le forfait qui correspond le mieux à la taille de votre entreprise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* STARTER */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">STARTER</h3>
                  <p className="text-xs text-slate-500 mt-1">Pour petites agences & indépendants</p>
                  <p className="text-3xl font-black text-slate-900 mt-4">
                    25 000 <span className="text-xs font-bold text-slate-500">FCFA / mois</span>
                  </p>
                  <ul className="space-y-3 pt-6 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Jusqu'à 15 biens immobiliers</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 3 projets BTP actifs</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 2 utilisateurs inclus</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Galerie photos & PDF</li>
                  </ul>
                </div>
                <Link href="/register?plan=STARTER" className="w-full py-3 text-center rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors">
                  Choisir Starter
                </Link>
              </div>

              {/* PRO */}
              <div className="bg-gradient-to-b from-slate-900 to-navy-950 rounded-3xl border-2 border-orange-500 p-8 text-white flex flex-col justify-between space-y-6 shadow-2xl relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow">
                  Populaire Sénégal
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">PRO</h3>
                  <p className="text-xs text-slate-400 mt-1">Pour agences immobilières & PME BTP</p>
                  <p className="text-3xl font-black text-orange-400 mt-4">
                    65 000 <span className="text-xs font-bold text-slate-400">FCFA / mois</span>
                  </p>
                  <ul className="space-y-3 pt-6 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> Jusqu'à 100 biens immobiliers</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> 15 projets BTP & Journal</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> 10 utilisateurs & RLS</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" /> CRM Clients & Paiements (Wave/OM)</li>
                  </ul>
                </div>
                <Link href="/register?plan=PRO" className="w-full py-3 text-center rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow-lg shadow-orange-600/30 transition-colors">
                  Démarrer l'essai PRO
                </Link>
              </div>

              {/* BUSINESS */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">BUSINESS</h3>
                  <p className="text-xs text-slate-500 mt-1">Pour grands groupes & promoteurs</p>
                  <p className="text-3xl font-black text-slate-900 mt-4">
                    150 000 <span className="text-xs font-bold text-slate-500">FCFA / mois</span>
                  </p>
                  <ul className="space-y-3 pt-6 text-xs text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Biens & Projets Illimités</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Utilisateurs illimités</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Nom de domaine dédié</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Support Dédié 24/7</li>
                  </ul>
                </div>
                <Link href="/register?plan=BUSINESS" className="w-full py-3 text-center rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors">
                  Contact Entreprise
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
