'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types/geesthart';
import { formatRupiah, getCategoryLabel, getStatusBadge } from '@/lib/format';
import { MarketplaceModal } from './MarketplaceModal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || ''
  );
  const [activeImage, setActiveImage] = useState<string>(product.mainImage);
  const [modalOpen, setModalOpen] = useState(false);

  const badge = getStatusBadge(product.status);

  const handleColorSelect = (colorName: string, image: string) => {
    setSelectedColor(colorName);
    if (image) {
      setActiveImage(image);
    }
  };

  return (
    <>
      <article className="group bg-white border border-[#DCDCD4] hover:border-[#141517] transition-colors duration-200 flex flex-col justify-between">
        <div>
          {/* Image Container with Intrinsic Aspect Ratio (R-40) */}
          <div className="relative aspect-[4/5] w-full bg-[#EFEFEA] overflow-hidden border-b border-[#DCDCD4]">
            <Link
              href={`/product/${product.slug}`}
              className="block w-full h-full"
              aria-label={`Lihat detail dan tabel ukuran ${product.name}`}
            >
              <Image
                src={activeImage}
                alt={`${product.name} warna ${selectedColor}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-103 ${
                  product.status === 'habis' ? 'grayscale-[40%] opacity-85' : ''
                }`}
              />
            </Link>

            {/* Top Functional Status Badges (R-09: real status & collection labels) */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] bg-[#141517] text-white">
                {product.collection}
              </span>

              <span
                className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] border flex items-center gap-1.5 ${badge.className}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${badge.dotColor}`} aria-hidden="true" />
                {badge.label}
              </span>
            </div>

            {/* Category & Gender Tag */}
            <div className="absolute bottom-3 left-3 pointer-events-none">
              <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] bg-white/95 text-[#141517] border border-[#DCDCD4]">
                {getCategoryLabel(product.category)} •{' '}
                {product.genderType === 'wanita' ? 'Wanita' : 'Unisex'}
              </span>
            </div>
          </div>

          {/* Content Details */}
          <div className="p-4 sm:p-5">
            {/* Touch-Friendly Color Selector Pills (R-03: easy thumb tap on mobile) */}
            {product.colors.length > 0 && (
              <div className="mb-3">
                <span className="block text-[11px] text-[#4A4D52] font-medium mb-1.5">
                  Warna: <strong className="text-[#141517]">{selectedColor}</strong>
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => handleColorSelect(c.name, c.image)}
                        onMouseEnter={() => handleColorSelect(c.name, c.image)}
                        aria-pressed={isSelected}
                        aria-label={`Pilih warna ${c.name}`}
                        className={`min-h-[34px] px-2.5 py-1 inline-flex items-center gap-1.5 text-[11px] font-semibold border transition-colors ${
                          isSelected
                            ? 'border-[#141517] bg-[#141517] text-white'
                            : 'border-[#C8C8C0] bg-[#F7F7F4] text-[#141517] hover:border-[#141517]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: c.hex }}
                          aria-hidden="true"
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Title */}
            <Link href={`/product/${product.slug}`} className="block">
              <h3 className="text-base font-extrabold text-[#141517] group-hover:text-[#3F4734] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Short Desc */}
            <p className="text-xs text-[#4A4D52] mt-1.5 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Available Sizes Preview */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium text-[#4A4D52] mr-0.5">
                Ukuran:
              </span>
              {product.sizeChart.map((row) => (
                <span
                  key={row.size}
                  className="text-[11px] font-bold px-2 py-0.5 bg-[#F7F7F4] border border-[#DCDCD4] text-[#141517]"
                >
                  {row.size}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer: Price + Actions (>= 44px touch targets with gap per R-03) */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3.5 border-t border-[#EFEFEA] flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#4A4D52]">
              Harga Katalog
            </span>
            <span className="text-base font-extrabold text-[#141517] tabular-nums">
              {formatRupiah(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="min-h-[44px] px-3 inline-flex items-center justify-center border border-[#C8C8C0] text-xs font-bold uppercase tracking-wider text-[#141517] hover:border-[#141517] hover:bg-[#F7F7F4] active:bg-[#EFEFEA] transition-colors"
            >
              Detail
            </Link>

            {product.status === 'tersedia' ? (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="min-h-[44px] px-3.5 bg-[#141517] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3F4734] active:bg-[#2F3627] transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Beli</span>
              </button>
            ) : (
              <Link
                href={`/product/${product.slug}`}
                className="min-h-[44px] px-3 bg-[#EFEFEA] text-[#4A4D52] text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center"
              >
                {product.status === 'habis' ? 'Habis' : 'Segera'}
              </Link>
            )}
          </div>
        </div>
      </article>

      <MarketplaceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        selectedColor={selectedColor}
      />
    </>
  );
}
