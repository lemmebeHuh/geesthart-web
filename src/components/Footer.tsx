import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone, Instagram } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '@/data/seed-data';

export function Footer() {
  return (
    <footer className="bg-[#141517] text-[#F7F7F4] border-t border-neutral-800">
      {/* Top Manifesto Strip */}
      <div className="border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#9CAF84] mb-2">
              DUAL REALM TECHNICAL APPAREL // FOREST &amp; CITY
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              OWN YOUR PATH — FROM PINE TRAILS TO CONCRETE STREETS.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SITE_CONFIG.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white text-[#141517] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#9CAF84] hover:text-[#141517] transition-colors inline-flex items-center gap-2"
            >
              <span>Shopee Official</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-neutral-700 text-white text-xs font-bold uppercase tracking-[0.14em] hover:border-white transition-colors inline-flex items-center gap-2"
            >
              <span>Chat WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Col 1: Brand Info (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <BrandLogo variant="light" size="md" />
          <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
            Brand streetwear dan outdoor asal Bandung yang berdiri sejak {SITE_CONFIG.foundedYear}. Dirancang dengan material ringan, fungsional, dan tangguh untuk menjembatani petualangan alam dan ritme kota.
          </p>
          <div className="pt-2 space-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9CAF84] shrink-0" />
              <span>Bandung, Jawa Barat, Indonesia</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#9CAF84] shrink-0" />
              <span>WhatsApp CS: {SITE_CONFIG.whatsappDisplay}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Koleksi (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Seri Koleksi
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-300">
            <li>
              <Link href="/catalog?collection=Nimble+X" className="hover:text-white transition-colors">
                Nimble X Series
              </Link>
            </li>
            <li>
              <Link href="/catalog?collection=Litefield" className="hover:text-white transition-colors">
                Litefield Series
              </Link>
            </li>
            <li>
              <Link href="/catalog?collection=Fieldlite" className="hover:text-white transition-colors">
                Fieldlite Series
              </Link>
            </li>
            <li>
              <Link href="/lookbook" className="hover:text-white transition-colors">
                Editorial Lookbook
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Kategori (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Kategori Produk
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-300">
            <li>
              <Link href="/catalog?category=jaket" className="hover:text-white transition-colors">
                Jaket Technical Unisex
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=celana-panjang" className="hover:text-white transition-colors">
                Celana Panjang / Trackpants
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=celana-pendek" className="hover:text-white transition-colors">
                Celana Pendek &amp; Active Skort
              </Link>
            </li>
            <li>
              <Link href="/catalog?gender=wanita" className="hover:text-white transition-colors">
                Koleksi Wanita (Skort Series)
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Official Channels & Admin (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Official Channels
          </h3>
          <ul className="space-y-2.5 text-xs text-neutral-300">
            <li>
              <a
                href={SITE_CONFIG.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#9CAF84] transition-colors"
              >
                <span>Shopee (shopee.co.id/geesthart)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#9CAF84] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram ({SITE_CONFIG.instagramHandle})</span>
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#9CAF84] transition-colors"
              >
                <span>TikTok ({SITE_CONFIG.tiktokHandle})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li className="pt-2 border-t border-neutral-800">
              <Link
                href="/studio"
                className="text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>Owner CMS Studio</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-neutral-800/80 py-6 px-4 sm:px-8 text-[11px] text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} GEESTHART BANDUNG. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-neutral-300 transition-colors">
              Cerita Brand
            </Link>
            <Link href="/contact" className="hover:text-neutral-300 transition-colors">
              Wholesale &amp; Kolaborasi
            </Link>
            <Link href="/studio" className="hover:text-neutral-300 transition-colors">
              Sanity CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

