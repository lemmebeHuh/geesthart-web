import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getProducts } from '@/lib/data';
import { CatalogClient } from '@/components/CatalogClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Katalog Produk & Size Chart',
  description:
    'Katalog lengkap jaket teknikal, celana panjang trackpants, celana pendek, dan skort Geesthart beserta filter ukuran dan warna.',
};

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div>
      {/* Editorial Header */}
      <section className="bg-white border-b border-[#E2E2DC] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555D47]">
            GEESTHART TECHNICAL ARCHIVE // ALL DROPS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
            KATALOG PRODUK
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-2xl leading-relaxed">
            Gunakan filter di samping untuk menyaring berdasarkan Seri Koleksi (Nimble X, Litefield, Fieldlite), Kategori, Gender, Warna, Status Stok, maupun Ukuran Lebar Pinggang.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 text-xs uppercase tracking-widest text-neutral-500">
            Memuat katalog Geesthart...
          </div>
        }
      >
        <CatalogClient products={products} />
      </Suspense>
    </div>
  );
}

