import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  ShieldCheck,
  Trees,
  Building2,
  Sparkles,
} from 'lucide-react';
import { HeroSplit } from '@/components/HeroSplit';
import { ProductCard } from '@/components/ProductCard';
import { getLookbooks, getProducts } from '@/lib/data';
import { SITE_CONFIG } from '@/data/seed-data';

export default async function HomePage() {
  const products = await getProducts();
  const lookbooks = await getLookbooks();

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* 1. Interactive Split Hero: Forest vs City */}
      <HeroSplit />

      {/* 2. Technical Brand Pillars Bar */}
      <section className="bg-white border-b border-[#E2E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E2E2DC]">
          <div className="flex items-start gap-3.5 pt-2 md:pt-0">
            <div className="p-2.5 bg-[#F7F7F4] border border-[#E2E2DC] text-[#555D47]">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517]">
                01 // Outdoor Ready Material
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Parachute crinkle &amp; taslan pilihan yang ringan, tahan angin, dan cepat kering di cuaca dataran tinggi.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
            <div className="p-2.5 bg-[#F7F7F4] border border-[#E2E2DC] text-[#283A66]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517]">
                02 // Urban Gorpcore Cut
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Potongan boxy dan loose-straight yang dirancang presisi untuk aktivitas harian di jalanan kota Bandung.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
            <div className="p-2.5 bg-[#F7F7F4] border border-[#E2E2DC] text-[#141517]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517]">
                03 // Official Marketplace Checkout
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Bandingkan size chart secara akurat di web, lalu checkout aman via Shopee, TikTok Shop, atau WhatsApp CS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Latest Drop / Featured Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E2E2DC]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555D47]">
              CURATED CATALOG // DROP TERBARU
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
              ESSENTIAL TECHNICAL GEAR
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517] hover:text-[#555D47] transition-colors"
          >
            <span>Lihat Semua Katalog ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Three Collections Matrix (Nimble X, Litefield, Fieldlite) */}
      <section className="bg-white border-y border-[#E2E2DC] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#283A66]">
              GEESTHART ARCHIVE // SERI KOLEKSI
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
              TIGA LINI KOLEKSI UTAMA
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
              Setiap koleksi Geesthart dikembangkan dengan fungsi spesifik: dari perlindungan angin di hutan pinus hingga keleluasaan gerak di lapangan dan jalan raya.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Nimble X */}
            <Link
              href="/catalog?collection=Nimble+X"
              className="group relative aspect-[4/5] bg-[#141517] overflow-hidden border border-[#E2E2DC] flex flex-col justify-end p-6 sm:p-8"
            >
              <Image
                src="/images/products/nimble-x-jacket-black.jpg"
                alt="Nimble X Series"
                fill
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="px-2.5 py-1 bg-[#555D47] text-[10px] font-bold uppercase tracking-[0.18em]">
                  01 // NIMBLE X SERIES
                </span>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight mt-3">
                  FIELDCORE OUTERWEAR
                </h3>
                <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                  Jaket teknikal multi-saku dengan storm hood yang dirancang untuk menembus angin dan cuaca tak menentu.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B8CCA0]">
                  <span>Filter Nimble X</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Litefield */}
            <Link
              href="/catalog?collection=Litefield"
              className="group relative aspect-[4/5] bg-[#141517] overflow-hidden border border-[#E2E2DC] flex flex-col justify-end p-6 sm:p-8"
            >
              <Image
                src="/images/products/litefield-pants-olive-1.jpg"
                alt="Litefield Series"
                fill
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="px-2.5 py-1 bg-[#283A66] text-[10px] font-bold uppercase tracking-[0.18em]">
                  02 // LITEFIELD SERIES
                </span>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight mt-3">
                  EVERYDAY TRACK &amp; SKORT
                </h3>
                <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                  Trackpants unisex, celana pendek, dan active skort wanita untuk mobilitas tinggi dari jalanan hingga lapangan padel.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#9EB7E5]">
                  <span>Filter Litefield</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Fieldlite */}
            <Link
              href="/catalog?collection=Fieldlite"
              className="group relative aspect-[4/5] bg-[#141517] overflow-hidden border border-[#E2E2DC] flex flex-col justify-end p-6 sm:p-8"
            >
              <Image
                src="/images/products/nimble-x-jacket-blue-oxford.jpg"
                alt="Fieldlite Series"
                fill
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="px-2.5 py-1 bg-neutral-800 border border-white/25 text-[10px] font-bold uppercase tracking-[0.18em]">
                  03 // FIELDLITE SERIES
                </span>
                <h3 className="text-2xl font-extrabold uppercase tracking-tight mt-3">
                  ULTRALIGHT PACKABLE
                </h3>
                <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                  Eksperimen konstruksi seringan mungkin untuk para pejalan yang mengutamakan efisiensi ruang dan bobot.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  <span>Filter Fieldlite</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Editorial Lookbook + Motion Reel Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Editorial Copy + Lookbook Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#555D47]/10 text-[#555D47] text-[11px] font-bold uppercase tracking-[0.18em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EDITORIAL LOOKBOOK // BANDUNG 2024–2026</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#141517] leading-[1.08]">
              DARI HUTAN PINUS KE JALANAN KOTA.
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
              Geesthart lahir di Bandung dengan filosofi sederhana: pakaian teknis tidak harus kaku di jalanan kota, dan pakaian streetwear tidak boleh menyerah saat dibawa ke alam terbuka. Setiap artikel diuji langsung di dua lanskap tersebut.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {lookbooks.map((lb) => (
                <Link
                  key={lb.id}
                  href="/lookbook"
                  className="group block bg-white border border-[#E2E2DC] p-2.5 hover:border-[#141517] transition-colors"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EFEFEA] mb-2.5">
                    <Image
                      src={lb.coverImage}
                      alt={lb.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#555D47]">
                    {lb.collection}
                  </p>
                  <h4 className="text-xs font-bold text-[#141517] truncate">
                    {lb.title}
                  </h4>
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/lookbook"
                className="px-5 py-3 bg-[#141517] text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#555D47] transition-colors inline-flex items-center gap-2"
              >
                <span>Buka Galeri Lookbook</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-5 py-3 bg-white border border-[#141517] text-[#141517] text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#EFEFEA] transition-colors"
              >
                Cerita Geesthart
              </Link>
            </div>
          </div>

          {/* Right: Official Motion Video Reel from fotoasetawal (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#141517] p-3 shadow-xl">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E2E2DC] text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-500">
                <span>FIELD ARCHIVE // MOTION REEL</span>
                <span className="text-[#555D47] font-bold">● REC BANDUNG</span>
              </div>
              <div className="relative aspect-[9/14] w-full bg-[#141517] overflow-hidden">
                <video
                  src="/videos/geesthart-reel.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 flex items-center justify-between text-xs">
                <span className="font-bold text-[#141517]">
                  @geesthart — In Motion
                </span>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555D47] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

