'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
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

  const handleColorHoverOrClick = (colorName: string, image: string) => {
    setSelectedColor(colorName);
    if (image) {
      setActiveImage(image);
    }
  };

  return (
    <>
      <article className="group bg-white border border-[#E2E2DC] hover:border-[#141517] transition-all duration-300 flex flex-col justify-between">
        <div>
          {/* Image Container */}
          <div className="relative aspect-[4/5] w-full bg-[#EFEFEA] overflow-hidden border-b border-[#E2E2DC]">
            <Link href={`/product/${product.slug}`} className="block w-full h-full">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                  product.status === 'habis' ? 'grayscale-[45%] opacity-85' : ''
                }`}
              />
            </Link>

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] bg-[#141517] text-white">
                {product.collection}
              </span>

              <span
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] border backdrop-blur-xs flex items-center gap-1.5 bg-white/95 ${badge.className}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${badge.dotColor}`} />
                {badge.label}
              </span>
            </div>

            {/* Gender / Category Pill Bottom Left */}
            <div className="absolute bottom-3 left-3 pointer-events-none">
              <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] bg-white/90 text-[#141517] border border-[#E2E2DC]">
                {getCategoryLabel(product.category)} •{' '}
                {product.genderType === 'wanita' ? 'Women' : 'Unisex'}
              </span>
            </div>
          </div>

          {/* Content Details */}
          <div className="p-4 sm:p-5">
            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-1.5">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => handleColorHoverOrClick(c.name, c.image)}
                        onMouseEnter={() => handleColorHoverOrClick(c.name, c.image)}
                        title={c.name}
                        className={`w-4 h-4 rounded-full border transition-transform ${
                          isSelected
                            ? 'ring-2 ring-offset-1 ring-[#141517] scale-110 border-white'
                            : 'border-neutral-400 hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={`Pilih warna ${c.name}`}
                      />
                    );
                  })}
                </div>
                <span className="text-[11px] text-neutral-500 font-medium">
                  {selectedColor}
                </span>
              </div>
            )}

            {/* Title */}
            <Link href={`/product/${product.slug}`} className="block">
              <h3 className="text-base font-bold text-[#141517] group-hover:text-[#555D47] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Short Desc */}
            <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Available Sizes Preview */}
            <div className="mt-3 flex flex-wrap items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 mr-1">
                Size:
              </span>
              {product.sizeChart.map((row) => (
                <span
                  key={row.size}
                  className="text-[10px] font-semibold px-1.5 py-0.5 bg-[#F7F7F4] border border-[#E2E2DC] text-neutral-700"
                >
                  {row.size}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer: Price + Actions */}
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-[#EFEFEA] flex items-center justify-between gap-2">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
              Harga Katalog
            </span>
            <span className="text-base font-extrabold text-[#141517]">
              {formatRupiah(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {product.status === 'tersedia' ? (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-3 py-2 bg-[#141517] text-white text-[11px] font-bold uppercase tracking-[0.12em] hover:bg-[#555D47] transition-colors inline-flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Beli</span>
              </button>
            ) : (
              <span className="px-2.5 py-1.5 bg-neutral-100 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.12em]">
                {product.status === 'habis' ? 'Sold Out' : 'Coming Soon'}
              </span>
            )}

            <Link
              href={`/product/${product.slug}`}
              className="p-2 border border-[#D5D5CE] text-[#141517] hover:border-[#141517] hover:bg-[#F7F7F4] transition-colors"
              title="Lihat Detail & Size Chart"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
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

