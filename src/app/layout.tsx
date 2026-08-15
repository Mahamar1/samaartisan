import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SamaBot } from '@/components/ai/SamaBot';

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sama Artisan - Trouver un Artisan & Prestataire Vérifié à Dakar (Sénégal)',
  description: 'Plombiers, électriciens, climaticiens, serruriers, peintres et menuisiers qualifiés à proximité de chez vous à Dakar. Contact direct WhatsApp, devis instantané et profils 100% vérifiés sur Sama Artisan.',
  keywords: [
    'Sama Artisan',
    'Artisans Dakar', 
    'Plombier Dakar', 
    'Électricien Dakar', 
    'Climatisation Sénégal', 
    'Serrurier urgence Dakar', 
    'Artisans Almadies', 
    'Dépannage à domicile Sénégal',
    'SamaArtisan Sénégal'
  ],
  openGraph: {
    title: 'Sama Artisan - Les Meilleurs Artisans Vérifiés à Dakar',
    description: 'Trouvez et contactez un artisan qualifié en moins de 2 minutes sur WhatsApp avec Sama Artisan.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${fontSans.variable} font-sans bg-slate-50 text-slate-900 antialiased selection:bg-sama-500 selection:text-white flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <SamaBot />
      </body>
    </html>
  );
}
