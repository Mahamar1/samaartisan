import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = 'FCFA'): string {
  const formatted = new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(price);
  
  if (currency === 'EUR') return `${formatted} €`;
  if (currency === 'USD') return `$${formatted}`;
  return `${formatted} FCFA`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num);
}

export function generatePropertyWhatsAppLink(phone: string, title: string, reference: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = `Bonjour, je suis intéressé(e) par le bien ${title} référencé ${reference}.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateProjectWhatsAppLink(phone: string, title: string, reference: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = `Bonjour, je souhaite obtenir des informations sur le projet BTP ${title} (Réf: ${reference}).`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generatePhoneLink(phone: string): string {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  return `tel:${cleanPhone}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}
