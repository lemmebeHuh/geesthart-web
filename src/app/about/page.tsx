import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Trees, Building2, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export const metadata: Metadata = {
  title: 'Tentang Geesthart — Cerita Brand & Filosofi Own Your Path',
  description:
    'Kenali sejarah berdirinya Geesthart di Bandung sejak 2024, makna nama Geesthart, dan filosofi desain dua dunia: Hutan Pinus & Kota.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-white border-b border-[#E2E2DC] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-block px-3 py-1 bg-[#141517] text-white text-[11px] font-bold uppercase tracking-[0.2em]">
              BANDUNG, INDONESIA // EST. 2024
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#141517] leading-[1.08]">
              MENJEMBATANI HUTAN DAN JALANAN KOTA.
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
              Geesthart lahir pada tahun 2024 di Bandung—sebuah kota yang dikelilingi pegunungan dan hutan pinus, namun berdenyut dengan kultur jalanan (streetwear) yang kreatif dan dinamis.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#F7F7F4] border border-[#E2E2DC]">
            <BrandLogo variant="dark" size="xl" />
            <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.3em] text-[#555D47]">
              &ldquo;OWN YOUR PATH&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Makna Nama & Filosofi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555D47]">
                ETYMOLOGY &amp; IDENTITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
                MAKNA NAMA GEESTHART
              </h2>
            </div>

            <div className="bg-white border border-[#E2E2DC] p-6 space-y-4">
              <div className="pb-4 border-b border-[#EFEFEA]">
                <span className="text-xs font-mono uppercase tracking-widest text-[#555D47]">
                  01 // GEEST (SPIRIT / SOUL)
                </span>
                <p className="text-sm font-bold text-[#141517] mt-1">
                  Jiwa Eksplorasi Tanpa Batas
                </p>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Melambangkan semangat kebebasan untuk terus bergerak, menjelajah jalur baru, dan tidak terpaku pada satu medan saja.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#283A66]">
                  02 // HART (HEART / RESILIENCE)
                </span>
                <p className="text-sm font-bold text-[#141517] mt-1">
                  Inti Ketangguhan &amp; Keberanian
                </p>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Melambangkan daya tahan material serta keteguhan hati pemakainya dalam menentukan jalannya sendiri—<em>&ldquo;Own your path&rdquo;</em>.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E2E2DC] p-4">
              <div className="relative aspect-[4/5] w-full bg-[#EFEFEA] overflow-hidden mb-4">
                <Image
                  src="/images/products/nimble-x-jacket-green-olive.jpg"
                  alt="Geesthart di Hutan Pinus"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#555D47]">
                <Trees className="w-4 h-4" />
                <span>Dunia Pertama: Hutan (Outdoor)</span>
              </div>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Diuji di bawah kanopi pinus Bandung Utara. Mengutamakan ketahanan angin, bobot ringan, dan saku fungsional yang mudah dijangkau.
              </p>
            </div>

            <div className="bg-white border border-[#E2E2DC] p-4">
              <div className="relative aspect-[4/5] w-full bg-[#EFEFEA] overflow-hidden mb-4">
                <Image
                  src="/images/products/litefield-pants-olive-1.jpg"
                  alt="Geesthart di Perkotaan"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#283A66]">
                <Building2 className="w-4 h-4" />
                <span>Dunia Kedua: Kota (Urban)</span>
              </div>
              <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                Dirancang dengan siluet gorpcore modern agar tetap tajam dan relevan saat dipakai di kafe, studio, lapangan padel, maupun jalan raya kota.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proses & Standar Kualitas */}
      <section className="bg-white border-t border-[#E2E2DC] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555D47]">
              CRAFTED IN BANDUNG // PROCESS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
              STANDAR DESAIN &amp; PRODUKSI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F7F7F4] border border-[#E2E2DC] space-y-3">
              <span className="text-xs font-mono font-bold text-[#555D47]">
                STEP 01 // MATERIAL CURATION
              </span>
              <h3 className="text-base font-extrabold uppercase text-[#141517]">
                Pemilihan Kain Teknis
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Kami memilih kain crinkle parachute nylon dan taslan bergramasi ringan yang sejuk di kulit tropis Indonesia namun tetap memiliki struktur jatuh yang tegas.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F4] border border-[#E2E2DC] space-y-3">
              <span className="text-xs font-mono font-bold text-[#283A66]">
                STEP 02 // ERGONOMIC PATTERNING
              </span>
              <h3 className="text-base font-extrabold uppercase text-[#141517]">
                Pola Gerak Bebas
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Setiap potongan jaket, trackpants, dan skort memperhitungkan ruang gerak tubuh saat melangkah lebar, mengayun raket, maupun berkendara roda dua.
              </p>
            </div>

            <div className="p-6 bg-[#F7F7F4] border border-[#E2E2DC] space-y-3">
              <span className="text-xs font-mono font-bold text-[#141517]">
                STEP 03 // HARDWARE &amp; FINISHING
              </span>
              <h3 className="text-base font-extrabold uppercase text-[#141517]">
                Detail Stopper &amp; Jahitan
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Dilengkapi cord stopper di tudung kepala dan bukaan kaki celana, snap button kokoh, serta woven rubber patch GH yang menjadi identitas keaslian.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-[#141517] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-extrabold uppercase tracking-tight">
                Siap Menemukan Gear Geesthart Anda?
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                Jelajahi koleksi Nimble X, Litefield, dan Fieldlite di halaman katalog resmi kami.
              </p>
            </div>
            <Link
              href="/catalog"
              className="px-6 py-3.5 bg-[#555D47] hover:bg-[#677156] text-white text-xs font-extrabold uppercase tracking-[0.16em] transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <Compass className="w-4 h-4" />
              <span>Buka Katalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

