import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Trees, Building2, ArrowRight } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

export const metadata: Metadata = {
  title: 'Tentang Geesthart: Cerita Brand & Konstruksi Pakaian Bandung',
  description:
    'Kenali latar belakang berdirinya Geesthart di Bandung pada 2024, arti nama Geesthart, serta pemilihan bahan crinkle nylon dan taslan untuk medan hutan dan kota.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-white border-b border-[#DCDCD4] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block px-3 py-1 bg-[#141517] text-white text-[11px] font-bold uppercase tracking-[0.16em]">
              Bandung, Jawa Barat • Berdiri 2024
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#141517] leading-[1.08]">
              Lahir dari Iklim Dataran Tinggi dan Jalanan Bandung.
            </h1>
            <p className="text-xs sm:text-base text-[#4A4D52] leading-relaxed max-w-2xl">
              Geesthart dimulai pada tahun 2024 di Bandung, kota yang dikelilingi jalur pegunungan dan hutan pinus namun bergerak cepat dengan aktivitas jalanan kota. Kami merancang pakaian yang nyaman dipakai di kedua tempat tersebut tanpa perlu berganti kostum.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F7F7F4] border border-[#DCDCD4]">
            <BrandLogo variant="dark" size="xl" />
            <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.26em] text-[#3F4734]">
              Own Your Path
            </p>
          </div>
        </div>
      </section>

      {/* Makna Nama & Dua Medan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3F4734]">
                Asal Kata &amp; Identitas
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
                Arti Nama Geesthart
              </h2>
            </div>

            <div className="bg-white border border-[#DCDCD4] p-5 sm:p-6 space-y-5">
              <div className="pb-5 border-b border-[#EFEFEA]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3F4734]">
                  01. Geest (Jiwa / Semangat)
                </span>
                <h3 className="text-sm font-extrabold text-[#141517] mt-1">
                  Dorongan untuk Menjelajah
                </h3>
                <p className="text-xs text-[#4A4D52] mt-1 leading-relaxed">
                  Mewakili kemauan untuk keluar mencari jalur baru, baik saat menembus kabut pagi di Bandung Utara maupun menjalani kesibukan harian di tengah kota.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1D2B4D]">
                  02. Hart (Inti / Ketahanan)
                </span>
                <h3 className="text-sm font-extrabold text-[#141517] mt-1">
                  Daya Tahan Pakaian &amp; Pemakainya
                </h3>
                <p className="text-xs text-[#4A4D52] mt-1 leading-relaxed">
                  Melambangkan kekuatan jahitan, pilihan kain nilon yang awet, serta keberanian menentukan langkah sendiri sesuai semboyan <em>Own your path</em>.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="bg-white border border-[#DCDCD4] p-4">
              <div className="relative aspect-[4/5] w-full bg-[#EFEFEA] overflow-hidden mb-4">
                <Image
                  src="/images/products/nimble-x-jacket-green-olive.jpg"
                  alt="Pemakaian jaket Geesthart di Hutan Pinus Bandung"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#3F4734]">
                <Trees className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Medan Pertama: Hutan Pinus</span>
              </div>
              <p className="text-xs text-[#4A4D52] mt-1.5 leading-relaxed">
                Mengutamakan perlindungan terhadap angin lembap, bobot kain yang ringan di pundak, serta 6 saku berpenutup untuk menyimpan barang penting.
              </p>
            </div>

            <div className="bg-white border border-[#DCDCD4] p-4">
              <div className="relative aspect-[4/5] w-full bg-[#EFEFEA] overflow-hidden mb-4">
                <Image
                  src="/images/products/litefield-pants-olive-1.jpg"
                  alt="Pemakaian celana panjang Geesthart di jalanan kota"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#141517]">
                <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Medan Kedua: Jalanan Kota</span>
              </div>
              <p className="text-xs text-[#4A4D52] mt-1.5 leading-relaxed">
                Potongan boxy pada jaket dan pipa loose-straight pada celana memberi proporsi rapi untuk berkendara, bekerja, maupun berolahraga di lapangan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Standar Konstruksi & CTA */}
      <section className="bg-white border-t border-[#DCDCD4] py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="p-6 sm:p-10 bg-[#141517] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B8CCA0] mb-1">
                Katalog &amp; Tabel Ukuran Resmi
              </p>
              <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight">
                Lihat Spesifikasi Lengkap Tiap Artikel
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed">
                Bandingkan ukuran lebar dada, lebar pinggang, dan panjang celana secara akurat di halaman katalog kami.
              </p>
            </div>
            <Link
              href="/catalog"
              className="min-h-[48px] px-6 py-3 bg-[#3F4734] hover:bg-[#4F5942] text-white text-xs font-extrabold uppercase tracking-[0.14em] transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>Buka Katalog Geesthart</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
