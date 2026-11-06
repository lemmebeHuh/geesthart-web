'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trees, Building2, ArrowRight, Compass, Layers } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

type ActiveRealm = 'neutral' | 'forest' | 'city';

export function HeroSplit() {
  const [activeRealm, setActiveRealm] = useState<ActiveRealm>('neutral');

  // Calculate flex width proportions based on hover/selection
  const forestBasis =
    activeRealm === 'forest'
      ? 'lg:w-[64%]'
      : activeRealm === 'city'
      ? 'lg:w-[36%]'
      : 'lg:w-1/2';

  const cityBasis =
    activeRealm === 'city'
      ? 'lg:w-[64%]'
      : activeRealm === 'forest'
      ? 'lg:w-[36%]'
      : 'lg:w-1/2';

  return (
    <section className="relative w-full border-b border-[#E2E2DC] bg-[#141517] overflow-hidden">
      {/* Mobile Realm Switcher Control */}
      <div className="lg:hidden bg-[#141517] border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
          REALM VIEW:
        </span>
        <div className="inline-flex border border-neutral-700 bg-neutral-900 p-0.5">
          <button
            type="button"
            onClick={() => setActiveRealm('forest')}
            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              activeRealm === 'forest'
                ? 'bg-[#555D47] text-white'
                : 'text-neutral-400'
            }`}
          >
            01. Forest
          </button>
          <button
            type="button"
            onClick={() => setActiveRealm('neutral')}
            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              activeRealm === 'neutral'
                ? 'bg-white text-[#141517]'
                : 'text-neutral-400'
            }`}
          >
            50:50
          </button>
          <button
            type="button"
            onClick={() => setActiveRealm('city')}
            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              activeRealm === 'city'
                ? 'bg-[#283A66] text-white'
                : 'text-neutral-400'
            }`}
          >
            02. City
          </button>
        </div>
      </div>

      {/* Main Split Container */}
      <div
        className="relative flex flex-col lg:flex-row w-full min-h-[680px] lg:h-[84vh] lg:max-h-[860px]"
        onMouseLeave={() => setActiveRealm('neutral')}
      >
        {/* LEFT REALM: PINE FOREST (OUTDOOR) */}
        <div
          onMouseEnter={() => setActiveRealm('forest')}
          onClick={() => setActiveRealm('forest')}
          className={`relative w-full ${forestBasis} ${
            activeRealm === 'city'
              ? 'min-h-[260px] lg:min-h-full'
              : 'min-h-[380px] lg:min-h-full'
          } transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden group cursor-pointer border-b lg:border-b-0 lg:border-r border-white/15`}
        >
          <Image
            src="/images/products/nimble-x-jacket-green-olive.jpg"
            alt="Geesthart Outdoor Forest — Fieldcore Nimble X Series in Pine Woods"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeRealm === 'forest'
                ? 'bg-gradient-to-t from-black/80 via-black/25 to-black/30'
                : 'bg-gradient-to-t from-black/85 via-black/45 to-black/40'
            }`}
          />

          {/* Top Left Coordinates & Tag */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/90 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/55 backdrop-blur-xs border border-white/15 text-[11px] font-bold uppercase tracking-[0.18em]">
              <Trees className="w-3.5 h-3.5 text-[#A5B88C]" />
              <span>REALM 01 // PINE FOREST</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-[0.16em] text-white/75 bg-black/40 px-2.5 py-1">
              06°48&apos;S 107°36&apos;E • HIGHLAND WOODS
            </span>
          </div>

          {/* Bottom Left Content */}
          <div className="absolute bottom-7 left-6 right-6 sm:left-8 sm:right-8 z-10 text-white max-w-md">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#B8CCA0] mb-1.5">
              OUTDOOR TECHNICAL SERIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-tight">
              INTO THE HIGHLAND CANOPY.
            </h2>
            <p
              className={`text-xs sm:text-sm text-neutral-200 mt-2 leading-relaxed transition-all duration-500 ${
                activeRealm === 'city' ? 'lg:opacity-60 lg:line-clamp-1' : 'opacity-100'
              }`}
            >
              Jaket parachute windproof dengan 6 saku fungsional dan konstruksi tahan cuaca lembap hutan pinus Bandung.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/catalog?collection=Nimble+X"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#555D47] hover:bg-[#667056] text-white text-[11px] font-bold uppercase tracking-[0.15em] transition-colors"
              >
                <span>Explore Nimble X</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/product/fieldcore-jacket-nimble-x-series"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-black/50 hover:bg-black/75 border border-white/25 text-white text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors"
              >
                <span>Lihat Fieldcore Jacket</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT REALM: URBAN STREET (CITY) */}
        <div
          onMouseEnter={() => setActiveRealm('city')}
          onClick={() => setActiveRealm('city')}
          className={`relative w-full ${cityBasis} ${
            activeRealm === 'forest'
              ? 'min-h-[260px] lg:min-h-full'
              : 'min-h-[380px] lg:min-h-full'
          } transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden group cursor-pointer`}
        >
          <Image
            src="/images/products/litefield-pants-black-1.jpg"
            alt="Geesthart Urban Streetwear — Litefield Trackpants in Bandung City"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 65vw"
            className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeRealm === 'city'
                ? 'bg-gradient-to-t from-black/80 via-black/25 to-black/30'
                : 'bg-gradient-to-t from-black/85 via-black/45 to-black/40'
            }`}
          />

          {/* Top Right Coordinates & Tag */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/90 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/55 backdrop-blur-xs border border-white/15 text-[11px] font-bold uppercase tracking-[0.18em]">
              <Building2 className="w-3.5 h-3.5 text-[#8CA6DB]" />
              <span>REALM 02 // URBAN GRID</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-[0.16em] text-white/75 bg-black/40 px-2.5 py-1">
              06°54&apos;S 107°36&apos;E • BANDUNG STREET
            </span>
          </div>

          {/* Bottom Right Content */}
          <div className="absolute bottom-7 left-6 right-6 sm:left-8 sm:right-8 z-10 text-white max-w-md">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#9EB7E5] mb-1.5">
              DAILY URBAN UTILITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-tight">
              BUILT FOR CONCRETE MOTION.
            </h2>
            <p
              className={`text-xs sm:text-sm text-neutral-200 mt-2 leading-relaxed transition-all duration-500 ${
                activeRealm === 'forest' ? 'lg:opacity-60 lg:line-clamp-1' : 'opacity-100'
              }`}
            >
              Trackpants &amp; active skort bersiluet gorpcore modern untuk mobilitas harian dari jalanan aspal hingga lapangan aktif.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/catalog?collection=Litefield"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#283A66] hover:bg-[#32487E] text-white text-[11px] font-bold uppercase tracking-[0.15em] transition-colors"
              >
                <span>Explore Litefield</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/product/geesthart-litefield-trackpants"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-black/50 hover:bg-black/75 border border-white/25 text-white text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors"
              >
                <span>Lihat Trackpants</span>
              </Link>
            </div>
          </div>
        </div>

        {/* CENTER FLOATING BRAND STATEMENT BADGE (Desktop & Tablet) */}
        <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 pointer-events-none flex items-center justify-center p-4 bg-[#F7F7F4] lg:bg-[#F7F7F4]/95 lg:backdrop-blur-md border-y lg:border border-[#141517] shadow-2xl">
          <div className="pointer-events-auto text-center px-4 py-3 sm:px-7 sm:py-5 max-w-xs sm:max-w-sm">
            <div className="flex justify-center mb-1">
              <BrandLogo variant="dark" size="lg" />
            </div>
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.28em] text-[#141517] mt-1">
              &ldquo;OWN YOUR PATH&rdquo;
            </p>
            <p className="text-[11px] text-neutral-600 mt-1.5 leading-relaxed">
              Dua dunia dalam satu identitas. Hover sisi kiri untuk Hutan Pinus, atau sisi kanan untuk Kota Bandung.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Link
                href="/catalog"
                className="px-4 py-2 bg-[#141517] text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#555D47] transition-colors inline-flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Katalog Lengkap</span>
              </Link>
              <Link
                href="/lookbook"
                className="px-3.5 py-2 bg-white border border-[#141517] text-[#141517] text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-neutral-100 transition-colors inline-flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Lookbook</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

