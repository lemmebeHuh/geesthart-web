import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Ruler } from 'lucide-react';
import { HeroSplit } from '@/components/HeroSplit';
import { ProductCard } from '@/components/ProductCard';
import { VideoReelCard } from '@/components/VideoReelCard';
import { getLookbooks, getProducts } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const products = await getProducts();
  const lookbooks = await getLookbooks();

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* 1. Interactive Split Hero: Forest vs City */}
      <HeroSplit />

      {/* 2. Featured Catalog (2 cols on mobile -> 4 cols on desktop) */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-8 py-8 sm:py-16">
        <div className="flex items-end justify-between gap-3 pb-4 sm:pb-6 border-b border-[#DCDCD4]">
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#3F4734]">
              Katalog Rilisan Aktif
            </p>
            <h2 className="text-lg sm:text-3xl font-extrabold uppercase tracking-tight text-[#141517] mt-0.5">
              Koleksi Pilihan
            </h2>
          </div>
          <Link
            href="/catalog"
            className="min-h-[38px] inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.1em] text-[#141517] hover:text-[#3F4734] transition-colors shrink-0"
          >
            <span>Semua ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-4 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Asymmetric Collection Hierarchy (Flagship full-width on mobile + 2-col supporting series below) */}
      <section className="bg-white border-y border-[#DCDCD4] py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-8">
          <div className="max-w-2xl mb-5 sm:mb-8">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#3F4734]">
              Tiga Seri Koleksi
            </p>
            <h2 className="text-lg sm:text-3xl font-extrabold uppercase tracking-tight text-[#141517] mt-0.5">
              Pilih Sesuai Medan Pemakaian
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6">
            {/* Flagship Series: Nimble X (7 cols on desktop) */}
            <Link
              href="/catalog?collection=Nimble+X"
              className="lg:col-span-7 group relative min-h-[250px] sm:min-h-[460px] bg-[#141517] overflow-hidden border border-[#141517] flex flex-col justify-end p-4 sm:p-8"
            >
              <Image
                src="/images/products/nimble-x-jacket-black.jpg"
                alt="Jaket Fieldcore Nimble X Series warna Hitam"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover opacity-85 group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
              <div className="relative z-10 text-white max-w-lg">
                <span className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#3F4734] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em]">
                  Seri Utama • Nimble X
                </span>
                <h3 className="text-lg sm:text-3xl font-extrabold uppercase tracking-tight mt-2">
                  Fieldcore Outerwear (6 Saku)
                </h3>
                <p className="text-[11px] sm:text-sm text-neutral-200 mt-1 sm:mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Jaket parachute crinkle dengan storm hood dan 6 saku berpenutup untuk menyimpan perlengkapan tanpa membawa tas tambahan.
                </p>
                <span className="mt-2.5 sm:mt-4 inline-flex items-center gap-1 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.1em] text-[#B8CCA0] group-hover:underline">
                  <span>Buka Seri Nimble X</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>

            {/* Supporting Series Stack: 2 cols side-by-side on mobile & tablet, stacked on desktop */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-6">
              {/* Litefield */}
              <Link
                href="/catalog?collection=Litefield"
                className="group relative min-h-[190px] sm:min-h-[220px] bg-[#141517] overflow-hidden border border-[#141517] flex flex-col justify-end p-3 sm:p-6"
              >
                <Image
                  src="/images/products/litefield-pants-olive-1.jpg"
                  alt="Celana panjang Geesthart Litefield Trackpants warna Green Olive"
                  fill
                  sizes="(max-width: 1024px) 50vw, 42vw"
                  className="object-cover opacity-85 group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="inline-block px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-white text-[#141517] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.1em]">
                    Litefield
                  </span>
                  <h3 className="text-xs sm:text-xl font-extrabold uppercase tracking-tight mt-1.5 sm:mt-2 leading-snug">
                    Trackpants &amp; Active Skort
                  </h3>
                  <p className="hidden sm:block text-xs text-neutral-200 mt-1 leading-relaxed">
                    Celana panjang serut, shortpants, dan rok celana olahraga wanita.
                  </p>
                  <span className="mt-1.5 sm:mt-3 inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B8CCA0]">
                    <span>Lihat Seri</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>

              {/* Fieldlite */}
              <Link
                href="/catalog?collection=Fieldlite"
                className="group relative min-h-[190px] sm:min-h-[220px] bg-[#141517] overflow-hidden border border-[#141517] flex flex-col justify-end p-3 sm:p-6"
              >
                <Image
                  src="/images/products/nimble-x-jacket-blue-oxford.jpg"
                  alt="Koleksi Fieldlite warna Blue Oxford"
                  fill
                  sizes="(max-width: 1024px) 50vw, 42vw"
                  className="object-cover opacity-85 group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="inline-block px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-neutral-900 border border-white/30 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em]">
                    Fieldlite
                  </span>
                  <h3 className="text-xs sm:text-xl font-extrabold uppercase tracking-tight mt-1.5 sm:mt-2 leading-snug">
                    Packable Anorak &amp; Cargo
                  </h3>
                  <p className="hidden sm:block text-xs text-neutral-200 mt-1 leading-relaxed">
                    Bahan nilon ripstop ringan yang dapat dilipat ringkas ke saku.
                  </p>
                  <span className="mt-1.5 sm:mt-3 inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                    <span>Lihat Seri</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Asymmetric Material & Sizing Spec Section (2x2 compact grid on mobile) */}
      <section className="bg-[#F7F7F4] border-b border-[#DCDCD4] py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#3F4734]">
              Standar Konstruksi Bandung
            </p>
            <h2 className="text-lg sm:text-3xl font-extrabold uppercase tracking-tight text-[#141517] leading-snug">
              Dirancang untuk Cuaca Lembap Hutan dan Jalanan Kota.
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4D52] leading-relaxed">
              Setiap artikel memiliki panduan ukuran dalam sentimeter agar Anda dapat mencocokkan lebar dada dan pinggang sebelum memesan.
            </p>
            <div className="pt-1">
              <Link
                href="/catalog"
                className="min-h-[40px] inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#141517] text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#141517] hover:bg-[#141517] hover:text-white transition-colors"
              >
                <Ruler className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Filter Lebar Pinggang &amp; Ukuran</span>
              </Link>
            </div>
          </div>

          <dl className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-4">
            <div className="p-3 sm:p-5 bg-white border border-[#DCDCD4]">
              <dt className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#141517]">
                01. Crinkle &amp; Taslan
              </dt>
              <dd className="text-[11px] sm:text-xs text-[#4A4D52] mt-1 leading-relaxed">
                Kain nilon ringan penahan angin yang cepat kering setelah terkena gerimis.
              </dd>
            </div>

            <div className="p-3 sm:p-5 bg-white border border-[#DCDCD4]">
              <dt className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#141517]">
                02. Potongan Boxy
              </dt>
              <dd className="text-[11px] sm:text-xs text-[#4A4D52] mt-1 leading-relaxed">
                Lebar dada 56 s/d 64 cm dan celana pipa longgar dengan tali serut stopper.
              </dd>
            </div>

            <div className="p-3 sm:p-5 bg-white border border-[#DCDCD4]">
              <dt className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#141517]">
                03. Ukuran Akurat
              </dt>
              <dd className="text-[11px] sm:text-xs text-[#4A4D52] mt-1 leading-relaxed">
                Tabel ukuran terpisah untuk jaket unisex, trackpants, dan active skort wanita.
              </dd>
            </div>

            <div className="p-3 sm:p-5 bg-white border border-[#DCDCD4]">
              <dt className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#141517]">
                04. Toko Resmi
              </dt>
              <dd className="text-[11px] sm:text-xs text-[#4A4D52] mt-1 leading-relaxed">
                Pesan aman melalui Shopee Official, TikTok Shop, atau WhatsApp Admin Bandung.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 5. Editorial Lookbook + Motion Video Reel */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Editorial Copy + 3-Col Compact Lookbook Row on Mobile */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#3F4734]">
                Arsip Dokumentasi Bandung
              </p>
              <h2 className="text-lg sm:text-4xl font-extrabold uppercase tracking-tight text-[#141517] mt-0.5 leading-tight">
                Diuji di Hutan Pinus dan Aspal Kota.
              </h2>
              <p className="text-xs sm:text-sm text-[#4A4D52] mt-1.5 leading-relaxed max-w-xl">
                Dokumentasi pemakaian koleksi Geesthart di jalur pohon pinus Bandung Utara, jalan raya kota, dan lapangan olahraga.
              </p>
            </div>

            {/* 3 columns side-by-side even on mobile so it looks like a sleek gallery strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {lookbooks.map((lb) => (
                <Link
                  key={lb.id}
                  href="/lookbook"
                  className="group block bg-white border border-[#DCDCD4] p-1.5 sm:p-2.5 hover:border-[#141517] transition-colors"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EFEFEA] mb-1.5 sm:mb-2">
                    <Image
                      src={lb.coverImage}
                      alt={`${lb.title} - ${lb.collection}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 25vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <span className="block text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#3F4734] truncate">
                    {lb.collection}
                  </span>
                  <h3 className="text-[10px] sm:text-xs font-extrabold text-[#141517] truncate">
                    {lb.title}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <Link
                href="/lookbook"
                className="min-h-[40px] px-4 py-2 bg-[#141517] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[#3F4734] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Galeri Lookbook</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="min-h-[40px] px-4 py-2 bg-white border border-[#141517] text-[#141517] text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[#EFEFEA] transition-colors inline-flex items-center"
              >
                Cerita Brand
              </Link>
            </div>
          </div>

          {/* Right: Official Motion Video Reel */}
          <div className="lg:col-span-5">
            <VideoReelCard />
          </div>
        </div>
      </section>
    </div>
  );
}
