'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPropertyBySlug } from '@/lib/supabase/services';
import { Property } from '@/lib/types';
import { formatPrice, generatePropertyWhatsAppLink, generatePhoneLink } from '@/lib/utils';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Share2, 
  Calendar, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  BedDouble, 
  Bath, 
  Maximize2,
  Send,
  X
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  // Form states for visit inquiry
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      if (slug) {
        const item = await getPropertyBySlug(slug);
        setProperty(item);
      }
      setLoading(false);
    }
    loadProperty();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
          <h1 className="text-2xl font-bold text-slate-900">Bien introuvable</h1>
          <p className="text-slate-500 text-sm">L'annonce recherchée n'existe pas ou a été retirée par l'agence.</p>
          <Link href="/biens" className="inline-block px-6 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs">
            Retour aux biens
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = property.images && property.images.length > 0 
    ? property.images.map(i => i.imageUrl) 
    : [property.primaryImage || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'];

  const whatsappUrl = generatePropertyWhatsAppLink(
    property.agentWhatsapp || '221776543210', 
    property.title, 
    property.reference
  );

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-orange-600">Accueil</Link>
            <span>/</span>
            <Link href="/biens" className="hover:text-orange-600">Biens</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-xs">{property.title}</span>
          </div>

          {/* Main Title & Action Buttons Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-3 py-1 text-xs font-extrabold rounded-lg bg-orange-100 text-orange-800 border border-orange-200">
                  Réf: {property.reference}
                </span>
                <span className="px-3 py-1 text-xs font-extrabold rounded-lg bg-slate-900 text-white">
                  {property.transactionType}
                </span>
                <span className="px-3 py-1 text-xs font-extrabold rounded-lg bg-emerald-100 text-emerald-800">
                  {property.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{property.address}, {property.neighborhood}, {property.city}</span>
              </div>
            </div>

            <div className="text-left md:text-right space-y-3">
              <p className="text-3xl font-black text-orange-600">
                {formatPrice(property.price, property.currency)}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={generatePhoneLink(property.agentPhone || '+221 77 654 32 10')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          </div>

          {/* Photo Gallery Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
            <div className="relative h-[350px] sm:h-[500px] rounded-xl overflow-hidden bg-slate-900">
              <img
                src={allImages[selectedImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => setFullscreenOpen(true)}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/80 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
                title="Plein écran"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((selectedImageIndex - 1 + allImages.length) % allImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % allImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-24 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === idx ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid Layout: Main Info & Inquiry Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Specifications */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Caractéristiques Principales</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-slate-400 text-xs">Type</span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">{property.propertyType}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-slate-400 text-xs">Surface</span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">{property.surface} m²</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-slate-400 text-xs">Chambres</span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">{property.rooms}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="block text-slate-400 text-xs">Salles de Bain</span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">{property.bathrooms}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Description du Bien</h2>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Equipments & Features */}
              {property.features && property.features.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-slate-900">Équipements & Prestations</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar: Agency & Visit Inquiry Form */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Agency Box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Proposé par</span>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg border border-orange-200">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{property.organizationName}</h4>
                    <p className="text-xs text-slate-500">Agent responsable : {property.agentName || 'Équipe Commerciale'}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Direct</span>
                  </a>

                  <a
                    href={generatePhoneLink(property.agentPhone || '+221 77 654 32 10')}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-4 h-4 text-orange-400" />
                    <span>Appeler {property.agentPhone || '+221 77 654 32 10'}</span>
                  </a>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Demander une Visite</h3>
                
                {inquirySubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="font-bold">Demande envoyée avec succès !</p>
                    <p className="text-slate-600">L'agent responsable vous recontactera sous peu pour confirmer le rendez-vous.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet</label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={e => setInquiryName(e.target.value)}
                        placeholder="Ex: Amadou Ba"
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone</label>
                      <input
                        type="tel"
                        required
                        value={inquiryPhone}
                        onChange={e => setInquiryPhone(e.target.value)}
                        placeholder="+221 77 000 00 00"
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date souhaitée</label>
                      <input
                        type="date"
                        required
                        value={inquiryDate}
                        onChange={e => setInquiryDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Message (optionnel)</label>
                      <textarea
                        rows={2}
                        value={inquiryMessage}
                        onChange={e => setInquiryMessage(e.target.value)}
                        placeholder="Précisez votre disponibilité..."
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-600/20 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer la Demande</span>
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/40"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={allImages[selectedImageIndex]}
            alt={property.title}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
