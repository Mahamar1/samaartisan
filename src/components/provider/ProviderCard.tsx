'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Phone, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Provider } from '@/lib/types';
import { formatFcfa } from '@/lib/data';
import { logServiceRequest } from '@/lib/supabase/services';

interface ProviderCardProps {
  provider: Provider;
  userDistanceKm?: number;
}

export default function ProviderCard({ provider, userDistanceKm }: ProviderCardProps) {

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    logServiceRequest({
      providerId: provider.id,
      clientName: 'Visiteur Web',
      clientPhone: 'WhatsApp Direct',
      serviceType: provider.categoryName,
      channel: 'WHATSAPP'
    });

    const defaultMsg = encodeURIComponent(
      `Bonjour ${provider.name}, je vous contacte via la plateforme Sama Artisan pour une demande de service (${provider.categoryName}). Êtes-vous disponible ?`
    );
    window.open(`https://wa.me/${provider.whatsapp}?text=${defaultMsg}`, '_blank');
  };

  const handleCallClick = () => {
    logServiceRequest({
      providerId: provider.id,
      clientName: 'Visiteur Web',
      clientPhone: 'Appel Direct',
      serviceType: provider.categoryName,
      channel: 'CALL'
    });
  };

  return (
    <>
      <div className={`group bg-white rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden relative ${
        provider.isSponsored 
          ? 'border-amber-300 ring-2 ring-amber-400/20 shadow-md' 
          : 'border-slate-200/80 hover:border-sama-300'
      }`}>
        
        {/* Sponsored Ribbon if Elite */}
        {provider.isSponsored && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>En Vedette</span>
            </span>
          </div>
        )}

        <div>
          {/* Top Card Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start gap-4">
              
              {/* Avatar + Verified Ring */}
              <Link href={`/prestataires/${provider.slug}`} className="relative shrink-0 group-hover:scale-105 transition-transform">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {provider.verificationLevel !== 'UNVERIFIED' && (
                  <div 
                    className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-md" 
                    title="Identité & Compétences Vérifiées par Sama Artisan"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  </div>
                )}
              </Link>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                    {provider.categoryName}
                  </span>
                  
                  {/* Availability badge */}
                  {provider.isAvailable ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Disponible</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400">
                      Occupé actuellement
                    </span>
                  )}
                </div>

                <Link href={`/prestataires/${provider.slug}`}>
                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mt-1 hover:text-sama-600 transition-colors line-clamp-1">
                    {provider.businessName}
                  </h3>
                </Link>
                
                <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
                  {provider.headline}
                </p>

                {/* Rating & Distance */}
                <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
                  <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{provider.averageRating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({provider.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-600 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-sama-600" />
                    <span>{provider.neighborhood}, Dakar</span>
                    {userDistanceKm !== undefined && (
                      <span className="font-bold text-sama-700 bg-sama-50 px-1.5 py-0.5 rounded text-[10px]">
                        à {userDistanceKm} km
                      </span>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-slate-400 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Répond en ~{provider.responseTimeMinutes}m</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Specialties Badges */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {(provider.specialties || [])
                .filter(spec => spec && !spec.toLowerCase().includes('devis'))
                .slice(0, 3)
                .map((spec, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 text-[11px] font-medium bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-100 transition-colors"
                  >
                    ✓ {spec}
                  </span>
                ))}
              {(provider.specialties || []).filter(spec => spec && !spec.toLowerCase().includes('devis')).length > 3 && (
                <span className="px-2 py-1 text-[11px] font-medium text-slate-400">
                  +{(provider.specialties || []).filter(spec => spec && !spec.toLowerCase().includes('devis')).length - 3} autres
                </span>
              )}
            </div>

            {/* Photo Gallery preview */}
            {provider.portfolio.length > 0 && (
              <div className="mt-3.5 grid grid-cols-3 gap-2">
                {provider.portfolio.slice(0, 3).map((photo) => (
                  <div key={photo.id} className="h-16 sm:h-20 rounded-xl overflow-hidden bg-slate-100 relative group/img border border-slate-100">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.title} 
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to a placeholder gradient if external URL fails
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="p-3.5 sm:p-4 bg-slate-50/90 border-t border-slate-100 mt-2 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 w-full">
            
            {/* 1. Direct Call */}
            <a
              href={`tel:${provider.phone}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCallClick();
              }}
              className="flex-1 py-2.5 px-3 sm:px-4 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              title={`Appeler directement au ${provider.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Appeler</span>
            </a>

            {/* 2. WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 py-2.5 px-3 sm:px-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              title="Discuter directement sur WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <Link
              href={`/prestataires/${provider.slug}`}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 transition-colors shrink-0"
              title="Voir le profil complet"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
