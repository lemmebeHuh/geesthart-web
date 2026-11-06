import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getProducts } from '@/lib/data';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { ProductCard } from '@/components/ProductCard';
import { formatRupiah } from '@/lib/format';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan',
    };
  }

  return {
    title: `${product.name} (${product.collection})`,
    description: `${product.shortDescription} Harga ${formatRupiah(
      product.price
    )}. Cek tabel ukuran lengkap dan pesan lewat toko resmi Geesthart.`,
    openGraph: {
      title: `${product.name} | GEESTHART BANDUNG`,
      description: product.shortDescription,
      images: [product.mainImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="pb-24 lg:pb-0">
      <ProductDetailClient product={product} />

      {/* Related Products Section */}
      <section className="border-t border-[#DCDCD4] bg-white py-12 sm:py-20 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3F4734]">
                Koleksi Lainnya
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
                Artikel Geesthart Lainnya
              </h2>
            </div>
            <Link
              href="/catalog"
              className="min-h-[44px] inline-flex items-center text-xs font-bold uppercase tracking-[0.14em] text-[#141517] hover:text-[#3F4734] underline"
            >
              Lihat Semua Katalog
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
