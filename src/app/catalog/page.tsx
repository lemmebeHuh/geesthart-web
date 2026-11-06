import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getProducts } from '@/lib/data';
import { CatalogClient } from '@/components/CatalogClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Katalog Produk & Tabel Ukuran',
  description:
    'Katalog lengkap jaket parachute crinkle, celana panjang trackpants, celana pendek, dan active skort Geesthart beserta filter ukuran pinggang dan warna.',
};

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div>
      {/* Header */}
      <section className="bg-white border-b border-[#DCDCD4] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3F4734]">
            Arsip Produk Resmi • Geesthart Bandung
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
            Katalog &amp; Panduan Ukuran
          </h1>
          <p className="text-xs sm:text-sm text-[#4A4D52] mt-2 max-w-2xl leading-relaxed">
            Saring koleksi berdasarkan seri (Nimble X, Litefield, Fieldlite), kategori pakaian, warna, harga, atau masukkan lebar pinggang celana dalam sentimeter.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div
            role="status"
            aria-live="polite"
            className="max-w-7xl mx-auto px-4 sm:px-8 py-16 text-xs font-bold uppercase tracking-wider text-[#4A4D52]"
          >
            Sedang memuat daftar produk dan tabel ukuran Geesthart...
          </div>
        }
      >
        <CatalogClient products={products} />
      </Suspense>
    </div>
  );
}
