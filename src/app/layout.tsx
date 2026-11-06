import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

export const metadata: Metadata = {
  title: {
    default: 'GEESTHART — Own Your Path | Streetwear & Outdoor Bandung',
    template: '%s | GEESTHART BANDUNG',
  },
  description:
    'Brand streetwear dan outdoor dari Bandung sejak 2024. Jelajahi koleksi Fieldcore Jacket Nimble X, Litefield Trackpants, dan Active Skort.',
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
    title: 'GEESTHART — Own Your Path | Streetwear & Outdoor Bandung',
    description:
      'Dua dunia dalam satu identitas: dari kanopi hutan pinus hingga jalanan kota Bandung. Lihat katalog resmi & size chart Geesthart.',
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
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-[#555D47] selection:text-white">
        <AnalyticsTracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
