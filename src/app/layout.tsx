import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

export const metadata: Metadata = {
  title: {
    default: 'GEESTHART | Own Your Path: Pakaian Outdoor & Streetwear Bandung',
    template: '%s | GEESTHART BANDUNG',
  },
  description:
    'Brand pakaian outdoor dan streetwear asal Bandung sejak 2024. Lihat katalog resmi Fieldcore Jacket Nimble X, Litefield Trackpants, dan Active Skort lengkap dengan panduan ukuran.',
  keywords: [
    'Geesthart',
    'Geesthart Bandung',
    'Streetwear Bandung',
    'Outdoor Apparel Indonesia',
    'Gorpcore Indonesia',
    'Nimble X Jacket',
    'Litefield Trackpants',
    'Litefield Skort',
  ],
  openGraph: {
    title: 'GEESTHART | Own Your Path: Pakaian Outdoor & Streetwear Bandung',
    description:
      'Dirancang di Bandung untuk kanopi hutan pinus hingga jalanan kota. Bandingkan tabel ukuran resmi dan pesan lewat Shopee, TikTok Shop, atau WhatsApp.',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-[#3F4734] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#141517] focus:text-white focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider"
        >
          Lewati ke konten utama
        </a>
        <AnalyticsTracker />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
