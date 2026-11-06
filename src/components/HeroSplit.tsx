'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trees, Building2, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

type ActiveRealm = 'neutral' | 'forest' | 'city';
type MobileTab = 'forest' | 'city';

export function HeroSplit() {
  const [activeRealm, setActiveRealm] = useState<ActiveRealm>('neutral');
  const [mobileTab, setMobileTab] = useState<MobileTab>('forest');

  const forestBasis =
    activeRealm === 'forest'
      ? 'lg:w-[62%]'
      : activeRealm === 'city'
      ? 'lg:w-[38%]'
      : 'lg:w-1/2';

  const cityBasis =
    activeRealm === 'city'
      ? 'lg:w-[62%]'
      : activeRealm === 'forest'
      ? 'lg:w-[38%]'
      : 'lg:w-1/2';

  return (
    <section
      aria-label="Dua Medan Geesthart: Hutan Pinus dan Jalanan Kota"
      className="relative w-full border-b border-[#DCDCD4] bg-[#141517] overflow-hidden"
    >
      {/* MOBILE & TABLET INTRO HEADER (< lg): Reflowed first so mobile users immediately see brand identity & CTAs */}
      <div className="lg:hidden bg-[#F7F7F4] border-b border-[#DCDCD4] px-4 sm:px-8 py-6">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo variant="dark" size="md" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-[#EFEFEA] text-[#3F4734] border border-[#DCDCD4]">
              Bandung • Est. 2024
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#141517] mt-3 leading-tight">
            Own Your Path: Dari Kanopi Hutan ke Aspal Kota.
          </h1>
          <p className="text-xs sm:text-sm text-[#4A4D52] mt-2 leading-relaxed">
            Pakaian luar ruang dan streetwear teknis yang diuji di dua medan Bandung. Pilih medan di bawah untuk melihat seri koleksi yang sesuai.
          </p>

          {/* Mobile 2-Button Realm Switcher (>= 44px touch targets, md tablet shows both side-by-side) */}
          <div
            role="tablist"
            aria-label="Pilih medan pemakaian"
            className="mt-4 grid grid-cols-2 gap-2 md:hidden"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === 'forest'}
              onClick={() => setMobileTab('forest')}
              className={`min-h-[44px] px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-colors ${
                mobileTab === 'forest'
                  ? 'bg-[#3F4734] text-white border-[#3F4734]'
                  : 'bg-white text-[#141517] border-[#C8C8C0]'
              }`}
            >
              <Trees className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>01. Hutan Pinus</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === 'city'}
              onClick={() => setMobileTab('city')}
              className={`min-h-[44px] px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-colors ${
                mobileTab === 'city'
                  ? 'bg-[#141517] text-white border-[#141517]'
                  : 'bg-white text-[#141517] border-[#C8C8C0]'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>02. Jalan Kota</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN SPLIT CONTAINER:
          - Mobile (< md): single active tab panel (compact 420px height, no giant vertical stack)
          - Tablet (md to lg): 2 equal columns side by side
          - Desktop (lg+): interactive hover/focus expanding 50:50 -> 62:38 split */}
      <div
        className="relative flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row w-full lg:min-h-[640px] lg:h-[78dvh] lg:max-h-[820px]"
        onMouseLeave={() => setActiveRealm('neutral')}
      >
        {/* LEFT REALM: PINE FOREST (OUTDOOR) */}
        <div
          onMouseEnter={() => setActiveRealm('forest')}
          onFocusCapture={() => setActiveRealm('forest')}
          className={`relative w-full ${forestBasis} ${
            mobileTab === 'forest' ? 'block' : 'hidden md:block'
          } min-h-[400px] sm:min-h-[440px] lg:min-h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden group md:border-r border-white/15`}
        >
          <Image
            src="/images/products/nimble-x-jacket-green-olive.jpg"
            alt="Model mengenakan Fieldcore Jacket Nimble X Series warna Green Olive di hutan pinus Bandung"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 62vw"
            className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* High-contrast scrim for WCAG AA text legibility (R-25) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/35" />

          {/* Top Coordinates & Tag */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#141517]/90 border border-white/20 text-[11px] font-bold uppercase tracking-[0.14em]">
              <Trees className="w-3.5 h-3.5 text-[#B8CCA0]" aria-hidden="true" />
              <span>Medan 01: Hutan Pinus</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-wider text-white bg-[#141517]/85 px-2.5 py-1">
              06°48&apos;LS 107°36&apos;BT
            </span>
          </div>

          {/* Bottom Content Card */}
          <div className="absolute bottom-5 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-10 text-white max-w-md">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B8CCA0] mb-1">
              Seri Nimble X • Pakaian Luar Ruang
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-tight">
              Tahan Angin di Bawah Kanopi Pinus.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-200 mt-2 leading-relaxed">
              Jaket parachute crinkle dengan 6 saku penyimpanan dan tudung storm hood untuk menahan udara lembap dataran tinggi.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Link
                href="/catalog?collection=Nimble+X"
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 bg-[#3F4734] hover:bg-[#4F5942] active:bg-[#2F3627] text-white text-xs font-bold uppercase tracking-[0.12em] transition-colors"
              >
                <span>Lihat Seri Nimble X</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/product/fieldcore-jacket-nimble-x-series"
                className="min-h-[44px] inline-flex items-center px-3.5 py-2.5 bg-[#141517]/90 hover:bg-[#141517] border border-white/30 text-white text-xs font-bold uppercase tracking-[0.1em] transition-colors"
              >
                <span>Detail Jaket</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT REALM: URBAN STREET (CITY) */}
        <div
          onMouseEnter={() => setActiveRealm('city')}
          onFocusCapture={() => setActiveRealm('city')}
          className={`relative w-full ${cityBasis} ${
            mobileTab === 'city' ? 'block' : 'hidden md:block'
          } min-h-[400px] sm:min-h-[440px] lg:min-h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden group`}
        >
          <Image
            src="/images/products/litefield-pants-black-1.jpg"
            alt="Model mengenakan Geesthart Litefield Trackpants warna Black di jalanan kota Bandung"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 62vw"
            className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* High-contrast scrim for WCAG AA text legibility (R-25) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/35" />

          {/* Top Coordinates & Tag */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#141517]/90 border border-white/20 text-[11px] font-bold uppercase tracking-[0.14em]">
              <Building2 className="w-3.5 h-3.5 text-[#B8CCA0]" aria-hidden="true" />
              <span>Medan 02: Jalanan Kota</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono tracking-wider text-white bg-[#141517]/85 px-2.5 py-1">
              06°54&apos;LS 107°36&apos;BT
            </span>
          </div>

          {/* Bottom Content Card */}
          <div className="absolute bottom-5 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-10 text-white max-w-md">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#B8CCA0] mb-1">
              Seri Litefield • Utilitas Harian Kota
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-tight">
              Potongan Longgar untuk Gerak Harian.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-200 mt-2 leading-relaxed">
              Trackpants unisex dengan stopper di mata kaki dan active skort wanita yang nyaman dipakai dari jalan raya hingga lapangan padel.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Link
                href="/catalog?collection=Litefield"
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#EFEFEA] text-[#141517] text-xs font-extrabold uppercase tracking-[0.12em] transition-colors"
              >
                <span>Lihat Seri Litefield</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/product/geesthart-litefield-trackpants"
                className="min-h-[44px] inline-flex items-center px-3.5 py-2.5 bg-[#141517]/90 hover:bg-[#141517] border border-white/30 text-white text-xs font-bold uppercase tracking-[0.1em] transition-colors"
              >
                <span>Detail Trackpants</span>
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP CENTER FLOATING IDENTITY CARD (lg+ only) */}
        <div className="hidden lg:flex lg:
          absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 pointer-events-none items-center justify-center p-5 bg-[#F7F7F4] border-2 border-[#141517] shadow-2xl">
          <div className="pointer-events-auto text-center px-6 py-4 max-w-xs">
            <div className="flex justify-center mb-1">
              <BrandLogo variant="dark" size="lg" />
            </div>
            <h1 className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#141517] mt-1">
              Own Your Path
            </h1>
            <p className="text-xs text-[#4A4D52] mt-1.5 leading-relaxed">
              Arahkan kursor ke kiri untuk koleksi Hutan Pinus, atau ke kanan untuk koleksi Jalanan Kota Bandung.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Link
                href="/catalog"
                className="min-h-[44px] px-4 py-2 bg-[#141517] text-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#3F4734] transition-colors inline-flex items-center"
              >
                Semua Katalog
              </Link>
              <Link
                href="/lookbook"
                className="min-h-[44px] px-4 py-2 bg-white border border-[#141517] text-[#141517] text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#EFEFEA] transition-colors inline-flex items-center"
              >
                Lookbook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
