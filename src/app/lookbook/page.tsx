import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Layers } from 'lucide-react';
import { getLookbooks, getProducts } from '@/lib/data';
import { formatRupiah } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Lookbook Koleksi — Forest, City & Court',
  description:
    'Dokumentasi visual lookbook Geesthart per koleksi: Nimble X Series di Hutan Pinus, Litefield Trackpants di Kota Bandung, dan Active Skort di lapangan.',
};

export default async function LookbookPage() {
  const lookbooks = await getLookbooks();
  const products = await getProducts();

  return (
    <div>
      {/* Header */}
      <section className="bg-white border-b border-[#E2E2DC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555D47]">
            VISUAL ARCHIVE // FIELD &amp; STREET DOCUMENTATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
            LOOKBOOK KOLEKSI
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-2xl leading-relaxed">
            Setiap foto dikelompokkan berdasarkan seri koleksi dan medan pengujian: dari kanopi hutan pinus dataran tinggi hingga struktur beton perkotaan Bandung.
          </p>
        </div>
      </section>

      {/* Lookbook Entries */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-20">
        {lookbooks.map((entry, idx) => {
          const linkedProducts = products.filter((p) =>
            entry.featuredProductSlugs.includes(p.slug)
          );

          return (
            <section
              key={entry.id}
              className="bg-white border border-[#E2E2DC] p-6 sm:p-10"
            >
              {/* Entry Top Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E2E2DC]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-[#141517] text-white text-[10px] font-bold uppercase tracking-[0.18em]">
                      {entry.collection}
                    </span>
                    <span className="px-2.5 py-1 bg-[#F7F7F4] border border-[#E2E2DC] text-[10px] font-mono uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#555D47]" />
                      {entry.location}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {entry.season}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#141517]">
                    {entry.title} — {entry.subtitle}
                  </h2>
                </div>

                <Link
                  href={`/catalog?collection=${encodeURIComponent(entry.collection)}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#141517] text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#555D47] transition-colors shrink-0"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Lihat Semua {entry.collection}</span>
                </Link>
              </div>

              <p className="text-sm text-neutral-600 mt-6 max-w-3xl leading-relaxed">
                {entry.description}
              </p>

              {/* Editorial Photo Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {entry.gallery.map((photoUrl, photoIdx) => (
                  <div
                    key={`${entry.id}-photo-${photoIdx}`}
                    className={`relative bg-[#EFEFEA] border border-[#E2E2DC] overflow-hidden group ${
                      photoIdx === 0 && entry.gallery.length === 3
                        ? 'md:col-span-2 lg:col-span-1 aspect-[4/5]'
                        : 'aspect-[4/5]'
                    }`}
                  >
                    <Image
                      src={photoUrl}
                      alt={`${entry.title} look ${photoIdx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/65 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-widest">
                      LOOK #{idx + 1}.0{photoIdx + 1} // {entry.collection}
                    </div>
                  </div>
                ))}
              </div>

              {/* Shop the Look Bar */}
              {linkedProducts.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#EFEFEA]">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-neutral-500 mb-4">
                    Produk dalam Lookbook Ini (Shop The Look):
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {linkedProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/product/${prod.slug}`}
                        className="group flex items-center justify-between p-3 bg-[#F7F7F4] border border-[#E2E2DC] hover:border-[#141517] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-14 h-16 bg-white border border-[#E2E2DC] shrink-0 overflow-hidden">
                            <Image
                              src={prod.mainImage}
                              alt={prod.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#555D47]">
                              {prod.collection}
                            </span>
                            <h4 className="text-xs font-bold text-[#141517] truncate group-hover:underline">
                              {prod.name}
                            </h4>
                            <p className="text-xs font-extrabold text-[#141517] mt-0.5">
                              {formatRupiah(prod.price)}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#141517] shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

