import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(price) + ' FCFA';
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num);
}

export function generateWhatsAppLink(phone: string, serviceTitle?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  let message = `Bonjour Sama Artisan, je suis intéressé par votre service.`;
  if (serviceTitle) {
    message = `Bonjour, je suis intéressé par votre prestation "${serviceTitle}" vue sur Sama Artisan. Êtes-vous disponible ?`;
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generatePhoneLink(phone: string): string {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  return `tel:${cleanPhone}`;
}

export function getPropertyTypeLabel(type: string): string {
  const map: Record<string, string> = {
    appartement: 'Appartement',
    villa: 'Villa',
    studio: 'Studio',
    maison: 'Maison',
    bureau: 'Bureau',
    terrain: 'Terrain',
    immeuble: 'Immeuble',
  };
  return map[type] || type;
}

export function getTransactionLabel(tx: string): string {
  return tx === 'location' ? 'À Louer' : 'À Vendre';
}
