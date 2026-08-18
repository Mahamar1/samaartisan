import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SamaBot } from '@/components/ai/SamaBot';
import PwaInstallPrompt from '@/components/pwa/PwaInstallPrompt';

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0284c7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Sama Artisan - Trouver un Artisan & Prestataire Vérifié à Dakar (Sénégal)',
  description: 'Plombiers, électriciens, climaticiens, serruriers, peintres et menuisiers qualifiés à proximité de chez vous à Dakar. Contact direct WhatsApp, devis instantané et profils 100% vérifiés sur Sama Artisan.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Sama Artisan',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sama Artisan" />
        <meta name="application-name" content="Sama Artisan" />
      </head>
      <body className={`${fontSans.variable} font-sans bg-slate-50 text-slate-900 antialiased selection:bg-sama-500 selection:text-white flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <SamaBot />
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
