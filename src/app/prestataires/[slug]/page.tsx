'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Share2, 
  Heart, 
  Briefcase, 
  Calendar, 
  Sparkles,
  ArrowLeft,
  ThumbsUp,
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import { PROVIDERS, formatFcfa } from '@/lib/data';
import { getProviderBySlug } from '@/lib/supabase/services';
import { Review, Provider } from '@/lib/types';
import RequestModal from '@/components/requests/RequestModal';
import ReviewModal from '@/components/reviews/ReviewModal';

export default function ProviderProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'portfolio' | 'reviews'>('services');
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Fetch live artisan details from Supabase or local session
  useEffect(() => {
    if (!slug) return;
    const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

    // 1. Check if logged in artisan profile in localStorage matches this slug or is the active pro
    try {
      const stored = localStorage.getItem('samapro_current_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        const pSlug = (parsed.slug || '').toLowerCase();
        const pNameSlug = (parsed.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (
          pSlug === decodedSlug || 
          parsed.id === decodedSlug || 
          pNameSlug === decodedSlug ||
          decodedSlug === 'mon-profil' ||
          decodedSlug === 'me'
        ) {
          setProvider(parsed);
          setReviews(parsed.reviews || []);
          setLoading(false);
          return;
        }
      }
    } catch (e) {}

    // 2. Check in registered accounts
    try {
      const accounts = JSON.parse(localStorage.getItem('sama_registered_accounts') || '[]');
      const matched = accounts.find((a: any) => {
        const aSlug = (a.slug || '').toLowerCase();
        const aNameSlug = (a.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return aSlug === decodedSlug || a.id === decodedSlug || aNameSlug === decodedSlug;
      });

      if (matched) {
        const proUser: Provider = {
          id: matched.id || `pro-${Date.now()}`,
          slug: matched.slug || matched.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: matched.name,
          businessName: matched.businessName || matched.name,
          phone: matched.phone,
          whatsapp: (matched.phone || '').replace(/[^0-9]/g, ''),
          headline: matched.headline || 'Artisan Qualifié',
          categorySlug: matched.categorySlug || 'plomberie',
          categoryName: matched.categoryName || 'Artisanat & Services',
          neighborhood: matched.neighborhood || 'Dakar',
          city: 'Dakar',
          latitude: 14.7167,
          longitude: -17.4677,
          interventionRadiusKm: 20,
          experienceYears: matched.yearsExperience || 5,
          subscriptionTier: 'FREE',
          isAvailable: true,
          startingPrice: 15000,
          responseTimeMinutes: 15,
          specialties: matched.specialties || ['Services & Réparations'],
          services: [],
          avatar: matched.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
          bio: matched.bio || `Artisan professionnel qualifié au Sénégal.`,
          verificationLevel: 'ID_VERIFIED',
          averageRating: 5.0,
          reviewCount: 0,
          completedJobsCount: 0,
          joinedDate: '2026-01-01',
          reviews: [],
          portfolio: matched.portfolio || []
        };
        setProvider(proUser);
        setReviews([]);
        setLoading(false);
        return;
      }
    } catch (e) {}

    // 3. Fetch from Supabase
    getProviderBySlug(decodedSlug).then((livePro) => {
      if (livePro) {
        let finalPro = livePro;
        try {
          const stored = localStorage.getItem('samapro_current_user');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.slug === livePro.slug || parsed.id === livePro.id) {
              finalPro = { ...livePro, ...parsed };
            }
          }
        } catch (e) {}
        setProvider(finalPro);
        setReviews(finalPro.reviews || []);
      } else {
        // Fallback to active logged in pro if available
        try {
          const stored = localStorage.getItem('samapro_current_user');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed && (parsed.name || parsed.phone)) {
              setProvider(parsed);
              setReviews(parsed.reviews || []);
            }
          }
        } catch (e) {}
      }
      setLoading(false);
    }).catch(() => {
      // Fallback on error
      try {
        const stored = localStorage.getItem('samapro_current_user');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.name || parsed.phone)) {
            setProvider(parsed);
            setReviews(parsed.reviews || []);
          }
        }
      } catch (e) {}
      setLoading(false);
    });
  }, [slug]);

  useEffect(() => {
    if (!provider) return;
    try {
      const favs = JSON.parse(localStorage.getItem('samapro_favorites') || '[]');
      setIsFavorite(favs.includes(provider.id));
    } catch (e) {}
  }, [provider?.id]);

  const toggleFavorite = () => {
    if (!provider) return;
    try {
      const favs = JSON.parse(localStorage.getItem('samapro_favorites') || '[]');
      let updated;
      if (favs.includes(provider.id)) {
        updated = favs.filter((id: string) => id !== provider.id);
        setIsFavorite(false);
      } else {
        updated = [...favs, provider.id];
        setIsFavorite(true);
      }
      localStorage.setItem('samapro_favorites', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleShare = () => {
    if (!provider) return;
    if (navigator.share) {
      navigator.share({
        title: `${provider.businessName} sur Sama Artisan`,
        text: `Découvrez ${provider.businessName} (${provider.categoryName}) à ${provider.neighborhood}, Dakar.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const handleReviewAdded = (newReview: Review) => {
    if (!provider) return;
    const updated = [newReview, ...reviews];
    setReviews(updated);
    
    // Recalculate average rating
    const sum = updated.reduce((acc, r) => acc + r.rating, 0);
    const newAvg = Math.round((sum / updated.length) * 100) / 100;
    
    setProvider({
      ...provider,
      reviewCount: updated.length,
      averageRating: newAvg,
    });
  };

  const handleWhatsApp = () => {
    if (!provider) return;
    const defaultMsg = encodeURIComponent(
      `Bonjour ${provider.name}, je vous contacte via Sama Artisan après avoir vu votre profil pro (${provider.categoryName}). Êtes-vous disponible pour une prestation ?`
    );
    window.open(`https://wa.me/${provider.whatsapp}?text=${defaultMsg}`, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-sama-600/20 text-sama-600 flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-700">Chargement du profil artisan...</p>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-navy-950">Profil d'Artisan Introuvable</h2>
            <p className="text-xs text-slate-500">
              Ce profil est peut-être en cours de mise à jour ou n'a pas encore été publié.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <Link
              href="/recherche"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sama-600 hover:bg-sama-700 text-white shadow-md transition-all text-center"
            >
              Parcourir les artisans
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-center"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Top Back Link & Actions */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/recherche"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-sama-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux résultats de recherche</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                isFavorite 
                  ? 'bg-rose-50 border-rose-300 text-rose-600' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Ajouter aux favoris"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden sm:inline">{isFavorite ? 'Enregistré' : 'Favoris'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1.5"
              title="Partager ce profil"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Partager</span>
            </button>
          </div>
        </div>
      </div>

      {/* Share Toast Notification */}
      {copiedToast && (
        <div className="fixed top-20 right-6 z-50 bg-navy-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          ✓ Lien copié dans le presse-papier !
        </div>
      )}

      {/* Cover Banner */}
      <div className="h-48 sm:h-72 w-full bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 relative overflow-hidden">
        {provider.coverImage && (
          <img
            src={provider.coverImage}
            alt={provider.businessName}
            className="w-full h-full object-cover opacity-30"
          />
        )}
      </div>

      {/* Main Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left / Main Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {provider.verificationLevel !== 'UNVERIFIED' && (
                    <div 
                      className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-600 text-white rounded-full shadow-lg border-2 border-white"
                      title="Artisan Vérifié Sama Artisan"
                    >
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Main Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-sama-100 text-sama-800">
                      {provider.categoryName}
                    </span>
                    {provider.isSponsored && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-white shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Pro Élite</span>
                      </span>
                    )}
                    {provider.isAvailable ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Disponible pour intervention</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Non disponible aujourd'hui</span>
                    )}
                  </div>

                  <h1 className="text-xl sm:text-3xl font-black text-navy-900 mt-2">
                    {provider.businessName}
                  </h1>
                  <p className="text-sm font-semibold text-slate-600 mt-0.5">
                    Géré par {provider.name} • {provider.experienceYears} ans d'expérience
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {provider.headline}
                  </p>

                  {/* Metadata Row */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
                    <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{provider.averageRating.toFixed(2)}</span>
                      <span className="text-slate-400 font-normal">({reviews.length} avis)</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-sama-600" />
                      <span>{provider.neighborhood}, Dakar (Rayon {provider.interventionRadiusKm} km)</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Répond en ~{provider.responseTimeMinutes} minutes</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Verified Trust Checklist */}
              {provider.documentsVerified && (
                <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">Garanties de confiance :</span>
                  {provider.documentsVerified.cni && (
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Pièce d'Identité Validée</span>
                    </span>
                  )}
                  {provider.documentsVerified.businessRegister && (
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>NINEA / Registre Pro</span>
                    </span>
                  )}
                  {provider.documentsVerified.diploma && (
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Diplôme / Formation Certifiée</span>
                    </span>
                  )}
                </div>
              )}

            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTab('services')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'services'
                    ? 'bg-sama-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                Services
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'portfolio'
                    ? 'bg-sama-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                Galerie de Réalisations ({provider.portfolio.length})
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'reviews'
                    ? 'bg-sama-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                Avis Clients ({reviews.length})
              </button>
            </div>

            {/* TAB CONTENT: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                
                {/* About Bio & Skills */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-4">
                  <h3 className="text-lg font-bold text-navy-900">À propos de l'artisan</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {provider.bio}
                  </p>
                  
                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Domaines d'expertise & Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties
                        .filter((s) => !s.toLowerCase().includes('devis'))
                        .map((s, i) => (
                        <span key={i} className="px-3.5 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
                <h3 className="text-lg font-bold text-navy-900">Photos de Chantiers Récents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {provider.portfolio.map((photo) => (
                    <div 
                      key={photo.id} 
                      onClick={() => setSelectedPhoto(photo.imageUrl)}
                      className="group relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer aspect-video border border-slate-200 shadow-sm"
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white opacity-90">
                        <p className="font-bold text-sm">{photo.title}</p>
                        {photo.description && (
                          <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{photo.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-navy-900">Notes & Commentaires des Clients</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{reviews.length} avis certifiés à Dakar</p>
                  </div>
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-4 py-2 rounded-xl font-bold bg-sama-600 hover:bg-sama-700 text-white text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Laisser un avis</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-sama-600 text-white font-bold flex items-center justify-center text-xs">
                            {rev.customerName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-navy-900">{rev.customerName}</p>
                            <p className="text-[10px] text-slate-400">{rev.customerCity || 'Dakar'} • {rev.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{rev.rating}/5</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        "{rev.comment}"
                      </p>

                      {rev.providerReply && (
                        <div className="mt-2 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600">
                          <span className="font-bold text-navy-900 block mb-0.5">Réponse du professionnel :</span>
                          {rev.providerReply}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sticky Action Card */}
          <div className="lg:sticky lg:top-24 space-y-4">
            
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200 space-y-4">
              
              {/* Action 1: Direct Call (En haut / 1er) */}
              <a
                href={`tel:${provider.phone}`}
                className="w-full py-4 rounded-2xl font-black bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/15 flex items-center justify-center gap-2.5 transition-all active:scale-95 text-sm"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Appeler au {provider.phone}</span>
              </a>

              {/* Action 2: WhatsApp Direct (En 2ème / en bas de l'appel) */}
              <button
                onClick={handleWhatsApp}
                className="w-full py-4 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2.5 transition-all active:scale-95 text-sm"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Discuter sur WhatsApp</span>
              </button>

              {/* Action 3: Request quote modal (En 3ème / en bas) */}
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="w-full py-3.5 rounded-2xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
              >
                <Briefcase className="w-4 h-4 text-sama-600" />
                <span>Envoyer une demande de devis</span>
              </button>

              {/* Reassurance pills */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sama-600" />
                  <span>Identité & compétences vérifiées</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sama-600" />
                  <span>Intervention rapide à {provider.neighborhood}</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <img src={selectedPhoto} alt="Agrandissement" className="max-w-4xl max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
        </div>
      )}

      {/* Request Modal */}
      <RequestModal
        provider={provider}
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      {/* Review Modal */}
      <ReviewModal
        provider={provider}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewAdded={handleReviewAdded}
      />

    </div>
  );
}
