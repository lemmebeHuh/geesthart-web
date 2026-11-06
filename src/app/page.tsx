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

      {/* 2. Asymmetric Material & Sizing Spec Section (Breaks uniform 3-card template per R-05 & R-14) */}
      <section className="bg-white border-b border-[#DCDCD4] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3F4734]">
              Standar Konstruksi Bandung
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#141517] leading-tight">
              Dibuat untuk Cuaca Lembap Hutan dan Gerak Cepat di Kota.
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4D52] leading-relaxed">
              Setiap jaket, trackpants, dan skort Geesthart dirancang berdasarkan ukuran tubuh dan iklim tropis dataran tinggi. Cek detail potongan dan tabel ukuran dalam satuan sentimeter sebelum memesan.
            </p>
            <div className="pt-2">
              <Link
                href="/catalog"
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 bg-[#F7F7F4] border border-[#141517] text-xs font-bold uppercase tracking-wider text-[#141517] hover:bg-[#141517] hover:text-white transition-colors"
              >
                <Ruler className="w-4 h-4" aria-hidden="true" />
                <span>Cek Filter Lebar Pinggang &amp; Ukuran</span>
              </Link>
            </div>
          </div>

          <dl className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 bg-[#F7F7F4] border border-[#DCDCD4]">
              <dt className="text-xs font-extrabold uppercase tracking-wider text-[#141517]">
                01. Parachute Crinkle &amp; Taslan
              </dt>
              <dd className="text-xs text-[#4A4D52] mt-1.5 leading-relaxed">
                Kain nilon bertekstur crinkle yang ringan di badan, menahan angin dingin, dan cepat kering setelah terkena gerimis.
              </dd>
            </div>

            <div className="p-4 sm:p-5 bg-[#F7F7F4] border border-[#DCDCD4]">
              <dt className="text-xs font-extrabold uppercase tracking-wider text-[#141517]">
                02. Potongan Boxy &amp; Loose-Straight
              </dt>
              <dd className="text-xs text-[#4A4D52] mt-1.5 leading-relaxed">
                Jaket berpotongan boxy (lebar dada 56 s/d 64 cm) dan trackpants berpipa lega dengan tali serut stopper di mata kaki.
              </dd>
            </div>

            <div className="p-4 sm:p-5 bg-[#F7F7F4] border border-[#DCDCD4]">
              <dt className="text-xs font-extrabold uppercase tracking-wider text-[#141517]">
                03. Panduan Ukuran Spesifik per Kategori
              </dt>
              <dd className="text-xs text-[#4A4D52] mt-1.5 leading-relaxed">
                Tabel ukuran terpisah untuk jaket unisex, celana panjang trackpants, serta celana pendek dan skort wanita.
              </dd>
            </div>

            <div className="p-4 sm:p-5 bg-[#F7F7F4] border border-[#DCDCD4]">
              <dt className="text-xs font-extrabold uppercase tracking-wider text-[#141517]">
                04. Pesan Lewat Toko Resmi
              </dt>
              <dd className="text-xs text-[#4A4D52] mt-1.5 leading-relaxed">
                Pilih warna dan ukuran di web ini, lalu lanjutkan transaksi melalui Shopee Official, TikTok Shop, atau WhatsApp Admin Bandung.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 3. Featured Catalog (3-state responsive grid: 1 col mobile -> 2 col tablet -> 4 col desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#DCDCD4]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3F4734]">
              Katalog Rilisan Aktif
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
              Koleksi Pilihan Geesthart
            </h2>
          </div>
          <Link
            href="/catalog"
            className="min-h-[44px] inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517] hover:text-[#3F4734] transition-colors"
          >
            <span>Lihat Seluruh Katalog ({products.length} Produk)</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Asymmetric Collection Hierarchy (R-14: Flagship Nimble X gets 7 cols, Litefield & Fieldlite stack in 5 cols) */}
      <section className="bg-white border-y border-[#DCDCD4] py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3F4734]">
              Tiga Seri Koleksi
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
              Dirancang Sesuai Medan Pemakaian
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4D52] mt-2 leading-relaxed">
              Setiap lini produk memiliki fungsi utama yang berbeda: perlindungan cuaca untuk jaket luar ruang, potongan longgar untuk celana harian, dan konstruksi lipat ringkas untuk perjalanan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Flagship Series: Nimble X (7 cols on desktop) */}
            <Link
              href="/catalog?collection=Nimble+X"
              className="lg:col-span-7 group relative min-h-[380px] sm:min-h-[480px] bg-[#141517] overflow-hidden border border-[#141517] flex flex-col justify-end p-5 sm:p-8"
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
                <span className="inline-block px-2.5 py-1 bg-[#3F4734] text-white text-[11px] font-bold uppercase tracking-[0.14em]">
                  Seri Utama • Nimble X
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mt-3">
                  Fieldcore Outerwear (6 Saku Taktis)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 mt-2 leading-relaxed">
                  Jaket parachute crinkle dengan tudung storm hood dan 6 saku berpenutup untuk menyimpan perlengkapan tanpa perlu membawa tas tambahan. Tersedia dalam warna Black, Green Olive, dan Blue Oxford.
                </p>
                <span className="mt-4 min-h-[40px] inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#B8CCA0] group-hover:underline">
                  <span>Buka Koleksi Nimble X</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>

            {/* Supporting Series Stack: Litefield & Fieldlite (5 cols on desktop, 2 cols on tablet) */}
            <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6">
              {/* Litefield */}
              <Link
                href="/catalog?collection=Litefield"
                className="group relative min-h-[260px] sm:min-h-[280px] bg-[#141517] overflow-hidden border border-[#141517] flex flex-col justify-end p-5 sm:p-6"
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
                  <span className="inline-block px-2.5 py-1 bg-white text-[#141517] text-[10px] font-extrabold uppercase tracking-[0.14em]">
                    Seri 02 • Litefield
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight mt-2.5">
                    Trackpants, Shortpants &amp; Active Skort
                  </h3>
                  <p className="text-xs text-neutral-200 mt-1 leading-relaxed">
                    Celana panjang serut, celana pendek di atas lutut, dan rok celana olahraga wanita untuk mobilitas harian.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#B8CCA0] group-hover:underline">
                    <span>Filter Seri Litefield</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>

              {/* Fieldlite */}
              <Link
                href="/catalog?collection=Fieldlite"
                className="group relative min-h-[240px] sm:min-h-[260px] bg-[#141517] overflow-hidden border border-[#141517] flex flex-col justify-end p-5 sm:p-6"
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
                  <span className="inline-block px-2.5 py-1 bg-neutral-900 border border-white/30 text-white text-[10px] font-bold uppercase tracking-[0.14em]">
                    Seri 03 • Fieldlite
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight mt-2.5">
                    Packable Anorak &amp; Cargo
                  </h3>
                  <p className="text-xs text-neutral-200 mt-1 leading-relaxed">
                    Eksplorasi bahan nilon ripstop ringan yang dapat dilipat ringkas ke dalam saku.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white group-hover:underline">
                    <span>Lihat Seri Fieldlite</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Editorial Lookbook + Motion Video Reel (with Pause/Play control per R-39) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Editorial Copy + Lookbook Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3F4734]">
              Arsip Dokumentasi Bandung
            </p>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#141517] leading-[1.08]">
              Diuji Langsung di Hutan Pinus dan Aspal Kota.
            </h2>

            <p className="text-xs sm:text-sm text-[#4A4D52] leading-relaxed max-w-xl">
              Kami memotret dan menguji setiap rilisan Geesthart di tempat pakaian tersebut benar-benar digunakan: jalur pohon pinus Bandung Utara saat pagi berkabut, trotoar jalan raya, hingga lapangan olahraga.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {lookbooks.map((lb) => (
                <Link
                  key={lb.id}
                  href="/lookbook"
                  className="group block bg-white border border-[#DCDCD4] p-2.5 hover:border-[#141517] transition-colors"
                >
                  <div className="relative aspect-[4/3] sm:aspect-[3/4] w-full overflow-hidden bg-[#EFEFEA] mb-2.5">
                    <Image
                      src={lb.coverImage}
                      alt={`${lb.title} - ${lb.collection}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#3F4734]">
                    Seri {lb.collection}
                  </span>
                  <h3 className="text-xs font-extrabold text-[#141517] truncate mt-0.5">
                    {lb.title}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/lookbook"
                className="min-h-[44px] px-5 py-2.5 bg-[#141517] text-white text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#3F4734] active:bg-[#2F3627] transition-colors inline-flex items-center gap-2"
              >
                <span>Buka Galeri Lookbook</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="min-h-[44px] px-5 py-2.5 bg-white border border-[#141517] text-[#141517] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#EFEFEA] transition-colors inline-flex items-center"
              >
                Cerita Brand Geesthart
              </Link>
            </div>
          </div>

          {/* Right: Official Motion Video Reel with Pause/Play Control (5 cols) */}
          <div className="lg:col-span-5">
            <VideoReelCard />
          </div>
        </div>
      </section>
    </div>
  );
}
