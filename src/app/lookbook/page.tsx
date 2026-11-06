import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { getLookbooks, getProducts } from '@/lib/data';
import { formatRupiah } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Galeri Lookbook: Hutan Pinus, Jalanan Kota & Lapangan',
  description:
    'Dokumentasi foto koleksi Geesthart Bandung: Seri Nimble X di Hutan Pinus Bandung Utara, Seri Litefield Trackpants di jalanan kota, dan Active Skort di lapangan.',
};

export default async function LookbookPage() {
  const lookbooks = await getLookbooks();
  const products = await getProducts();

  return (
    <div>
      {/* Header */}
      <section className="bg-white border-b border-[#DCDCD4] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3F4734]">
            Dokumentasi Pemakaian • Bandung
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
            Lookbook Koleksi Geesthart
          </h1>
          <p className="text-xs sm:text-sm text-[#4A4D52] mt-2 max-w-2xl leading-relaxed">
            Setiap seri dipotret langsung di lokasi pemakaiannya: dari kanopi hutan pinus dataran tinggi hingga jalanan kota dan lapangan olahraga di Bandung.
          </p>
        </div>
      </section>

      {/* Lookbook Entries */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
        {lookbooks.map((entry, idx) => {
          const linkedProducts = products.filter((p) =>
            entry.featuredProductSlugs.includes(p.slug)
          );

          return (
            <section
              key={entry.id}
              className="bg-white border border-[#DCDCD4] p-5 sm:p-10"
            >
              {/* Entry Top Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-[#DCDCD4]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="px-2.5 py-1 bg-[#141517] text-white text-[11px] font-bold uppercase tracking-[0.14em]">
                      Seri {entry.collection}
                    </span>
                    <span className="px-2.5 py-1 bg-[#F7F7F4] border border-[#DCDCD4] text-[11px] font-semibold text-[#141517] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#3F4734]" aria-hidden="true" />
                      <span>{entry.location}</span>
                    </span>
                    <span className="text-xs font-mono text-[#4A4D52]">
                      {entry.season}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#141517]">
                    {entry.title}: {entry.subtitle}
                  </h2>
                </div>

                <Link
                  href={`/catalog?collection=${encodeURIComponent(entry.collection)}`}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#141517] text-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#3F4734] transition-colors shrink-0"
                >
                  <span>Buka Katalog {entry.collection}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-[#4A4D52] mt-5 max-w-3xl leading-relaxed">
                {entry.description}
              </p>

              {/* Editorial Photo Grid */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {entry.gallery.map((photoUrl, photoIdx) => (
                  <div
                    key={`${entry.id}-photo-${photoIdx}`}
                    className={`relative bg-[#EFEFEA] border border-[#DCDCD4] overflow-hidden group ${
                      photoIdx === 0 && entry.gallery.length === 3
                        ? 'md:col-span-2 lg:col-span-1 aspect-[4/5]'
                        : 'aspect-[4/5]'
                    }`}
                  >
                    <Image
                      src={photoUrl}
                      alt={`${entry.title} foto ke-${photoIdx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#141517]/90 text-white text-[11px] font-mono uppercase tracking-wider">
                      Foto 0{idx + 1}.0{photoIdx + 1} • {entry.collection}
                    </div>
                  </div>
                ))}
              </div>

              {/* Linked Products Bar */}
              {linkedProducts.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#EFEFEA]">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517] mb-3.5">
                    Pakaian yang Digunakan dalam Sesi Ini:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {linkedProducts.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/product/${prod.slug}`}
                        className="group min-h-[72px] flex items-center justify-between p-3 bg-[#F7F7F4] border border-[#DCDCD4] hover:border-[#141517] transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-14 h-16 bg-white border border-[#DCDCD4] shrink-0 overflow-hidden">
                            <Image
                              src={prod.mainImage}
                              alt={prod.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F4734]">
                              Seri {prod.collection}
                            </span>
                            <h4 className="text-xs font-extrabold text-[#141517] truncate group-hover:underline">
                              {prod.name}
                            </h4>
                            <p className="text-xs font-extrabold text-[#141517] mt-0.5 tabular-nums">
                              {formatRupiah(prod.price)}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#4A4D52] group-hover:text-[#141517] shrink-0 ml-2" aria-hidden="true" />
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
