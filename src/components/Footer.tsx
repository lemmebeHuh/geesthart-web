import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone, Instagram } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '@/data/seed-data';

export function Footer() {
  return (
    <footer className="bg-[#141517] text-[#F7F7F4] border-t border-neutral-800">
      {/* Top Direct Store Banner */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8CCA0] mb-1.5">
              Geesthart Bandung • Own Your Path
            </p>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
              Dari Hutan Pinus Bandung Utara hingga Jalanan Aspal Kota.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href={SITE_CONFIG.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 bg-white text-[#141517] text-xs font-extrabold uppercase tracking-[0.12em] hover:bg-[#B8CCA0] active:bg-[#9CAF84] transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Beli di Shopee</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 border border-neutral-600 text-white text-xs font-extrabold uppercase tracking-[0.12em] hover:border-white active:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>Tanya Ukuran via WA</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Asymmetric 3-Block Footer (Avoids generic 4-column SaaS template per R-05) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Block 1: Brand Identity & Bandung Workshop Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <BrandLogo variant="light" size="md" />
          <p className="text-sm text-neutral-300 leading-relaxed max-w-md">
            Geesthart berdiri di Bandung sejak {SITE_CONFIG.foundedYear}. Kami memproduksi jaket parachute crinkle, celana panjang taslan, dan celana pendek aktif dengan panduan ukuran yang transparan untuk pemakaian luar ruang maupun harian.
          </p>
          <div className="pt-2 space-y-2.5 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#B8CCA0] shrink-0" aria-hidden="true" />
              <span>Bandung, Jawa Barat, Indonesia (Pengiriman Senin s/d Sabtu)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#B8CCA0] shrink-0" aria-hidden="true" />
              <span>WhatsApp Admin: {SITE_CONFIG.whatsappDisplay}</span>
            </div>
          </div>
        </div>

        {/* Block 2: Navigasi Katalog & Seri Koleksi (4 cols) */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#B8CCA0] mb-3">
              Seri Koleksi
            </h3>
            <ul className="space-y-1 text-xs text-neutral-300">
              <li>
                <Link
                  href="/catalog?collection=Nimble+X"
                  className="min-h-[40px] inline-flex items-center hover:text-white transition-colors"
                >
                  Nimble X (Jaket)
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?collection=Litefield"
                  className="min-h-[40px] inline-flex items-center hover:text-white transition-colors"
                >
                  Litefield (Track &amp; Skort)
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?collection=Fieldlite"
                  className="min-h-[40px] inline-flex items-center hover:text-white transition-colors"
                >
                  Fieldlite (Packable)
                </Link>
              </li>
              <li>
                <Link
                  href="/lookbook"
                  className="min-h-[40px] inline-flex items-center hover:text-white transition-colors"
                >
                  Galeri Lookbook
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#B8CCA0] mb-3">
              Kategori
            </h3>
            <ul className="space-y-1 text-xs text-neutral-300">
              <li>
                <Link
                  href="/catalog?category=jaket"
                  className="min-h-[40px] inline-flex items-center hover:text-white transition-colors"
                >
                  Jaket Unisex
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=celana-panjang"
                  className="min-h-[40px] inline-flex items-center hover:text-white transition-colors"
                >
                  Trackpants
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=celana-pendek"
                  className="min-h-[40px] inline-flex items-center hover:text-white transition-colors"
                >
                  Shortpants &amp; Skort
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="min-h-[40px] inline-flex items-center hover:text-white transition-colors"
                >
                  Tentang Geesthart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Block 3: Kanal Pembelian & Sosial Media Resmi (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#B8CCA0]">
            Kanal Resmi
          </h3>
          <div className="flex flex-col space-y-2 text-xs">
            <a
              href={SITE_CONFIG.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-200 hover:text-white flex items-center justify-between transition-colors"
            >
              <span>Shopee (geesthart)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B8CCA0]" aria-hidden="true" />
            </a>
            <a
              href={SITE_CONFIG.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-200 hover:text-white flex items-center justify-between transition-colors"
            >
              <span>TikTok ({SITE_CONFIG.tiktokHandle})</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B8CCA0]" aria-hidden="true" />
            </a>
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-200 hover:text-white flex items-center justify-between transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#B8CCA0]" aria-hidden="true" />
                <span>Instagram ({SITE_CONFIG.instagramHandle})</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B8CCA0]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 py-5 px-4 sm:px-8 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Geesthart Bandung. Seluruh hak cipta dilindungi.</p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/contact" className="hover:text-white transition-colors py-1">
              Pemesanan Grosir &amp; Komunitas
            </Link>
            <Link href="/studio" className="hover:text-white transition-colors py-1">
              Panel Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
