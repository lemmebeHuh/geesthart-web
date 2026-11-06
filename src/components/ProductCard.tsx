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
      <article className="group bg-white border border-[#DCDCD4] hover:border-[#141517] transition-colors duration-200 flex flex-col justify-between overflow-hidden">
        <div>
          {/* Image Container with Intrinsic Aspect Ratio (R-40) */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full bg-[#EFEFEA] overflow-hidden border-b border-[#DCDCD4]">
            <Link
              href={`/product/${product.slug}`}
              className="block w-full h-full"
              aria-label={`Lihat detail dan tabel ukuran ${product.name}`}
            >
              <Image
                src={activeImage}
                alt={`${product.name} warna ${selectedColor}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-103 ${
                  product.status === 'habis' ? 'grayscale-[40%] opacity-85' : ''
                }`}
              />
            </Link>

            {/* Top Functional Badges - Compact on 2-col mobile */}
            <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-start justify-between gap-1.5 pointer-events-none">
              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em] bg-[#141517]/90 text-white backdrop-blur-xs">
                {product.collection}
              </span>

              <span
                className={`px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.06em] sm:tracking-[0.1em] border flex items-center gap-1 ${badge.className}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${badge.dotColor}`}
                  aria-hidden="true"
                />
                <span className="truncate">{badge.label}</span>
              </span>
            </div>

            {/* Category & Gender Tag */}
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 pointer-events-none">
              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.06em] bg-white/95 text-[#141517] border border-[#DCDCD4]">
                {getCategoryLabel(product.category)}
                <span className="hidden sm:inline">
                  {' '}
                  • {product.genderType === 'wanita' ? 'Wanita' : 'Unisex'}
                </span>
              </span>
            </div>
          </div>

          {/* Content Details */}
          <div className="p-2.5 sm:p-4">
            {/* Compact Color Swatches Row */}
            {product.colors.length > 0 && (
              <div className="mb-2 sm:mb-3">
                <div className="flex items-center flex-wrap gap-1.5">
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
                        title={c.name}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'border-[#141517] ring-1 ring-[#141517] ring-offset-1 bg-white'
                            : 'border-[#C8C8C0] bg-transparent hover:border-[#141517]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: c.hex }}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="block text-[10px] sm:text-[11px] text-[#4A4D52] font-medium mt-1 truncate">
                  {selectedColor}
                </span>
              </div>
            )}

            {/* Title */}
            <Link href={`/product/${product.slug}`} className="block">
              <h3 className="text-xs sm:text-base font-extrabold text-[#141517] group-hover:text-[#3F4734] transition-colors line-clamp-1 leading-snug">
                {product.name}
              </h3>
            </Link>

            {/* Short Desc - Desktop/Tablet only to keep 2-col mobile grid clean */}
            <p className="hidden sm:line-clamp-2 text-xs text-[#4A4D52] mt-1 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Available Sizes Preview */}
            <div className="mt-1.5 sm:mt-2.5 flex flex-wrap items-center gap-1">
              <span className="text-[10px] sm:text-[11px] font-medium text-[#4A4D52]">
                Size:
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#141517] truncate">
                {product.sizeChart.map((row) => row.size).join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Price + Actions */}
        <div className="px-2.5 pb-2.5 pt-2 sm:px-4 sm:pb-4 sm:pt-3 border-t border-[#EFEFEA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div>
            <span className="hidden sm:block text-[10px] uppercase tracking-wider font-semibold text-[#4A4D52]">
              Harga Katalog
            </span>
            <span className="text-xs sm:text-base font-extrabold text-[#141517] tabular-nums block">
              {formatRupiah(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <Link
              href={`/product/${product.slug}`}
              className="hidden sm:inline-flex min-h-[40px] px-3 items-center justify-center border border-[#C8C8C0] text-xs font-bold uppercase tracking-wider text-[#141517] hover:border-[#141517] hover:bg-[#F7F7F4] transition-colors"
            >
              Detail
            </Link>

            {product.status === 'tersedia' ? (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto min-h-[38px] sm:min-h-[40px] px-2.5 sm:px-3.5 bg-[#141517] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[#3F4734] active:bg-[#2F3627] transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Beli</span>
              </button>
            ) : (
              <Link
                href={`/product/${product.slug}`}
                className="w-full sm:w-auto min-h-[38px] sm:min-h-[40px] px-2.5 sm:px-3 bg-[#EFEFEA] text-[#4A4D52] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider inline-flex items-center justify-center"
              >
                {product.status === 'habis' ? 'Stok Habis' : 'Segera Hadir'}
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
