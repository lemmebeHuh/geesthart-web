'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  Ruler,
  CheckCircle2,
  Shield,
  Sparkles,
  Eye,
  X,
} from 'lucide-react';
import { Product } from '@/types/geesthart';
import {
  buildWhatsAppOrderUrl,
  formatRupiah,
  getCategoryLabel,
  getStatusBadge,
} from '@/lib/format';
import { MarketplaceModal } from './MarketplaceModal';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizeChart[0]?.size || ''
  );
  const [activeImage, setActiveImage] = useState<string>(product.mainImage);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [sizeDiagramOpen, setSizeDiagramOpen] = useState<boolean>(false);

  const badge = getStatusBadge(product.status);

  // Combine mainImage, color images, and gallery into unique list
  const allImages = Array.from(
    new Set([
      product.mainImage,
      ...product.colors.map((c) => c.image),
      ...product.gallery,
    ].filter(Boolean))
  );

  const handleSelectColor = (colorName: string, colorImg: string) => {
    setSelectedColor(colorName);
    if (colorImg) {
      setActiveImage(colorImg);
    }
  };

  const selectedSizeRow = product.sizeChart.find(
    (r) => r.size === selectedSize
  );

  const hasLingkarKaki = product.sizeChart.some(
    (r) => r.lingkarKaki !== undefined && r.lingkarKaki !== null
  );

  const waDirectUrl = buildWhatsAppOrderUrl({
    product,
    selectedColor,
    selectedSize,
    isInquiry: product.status !== 'tersedia',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E2E2DC]">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 font-semibold text-[#141517] hover:text-[#555D47] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog</span>
          </Link>
          <span>/</span>
          <Link
            href={`/catalog?collection=${encodeURIComponent(product.collection)}`}
            className="hover:text-[#141517]"
          >
            {product.collection}
          </Link>
          <span>/</span>
          <span className="text-neutral-800 font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-500">
          SKU // {product.id.toUpperCase()}
        </span>
      </div>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left: Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] w-full bg-white border border-[#E2E2DC] overflow-hidden">
            <Image
              src={activeImage}
              alt={`${product.name} - ${selectedColor}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-[#141517] text-white text-[11px] font-bold uppercase tracking-[0.16em]">
                {product.collection}
              </span>
              <span
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] border bg-white/95 flex items-center gap-1.5 ${badge.className}`}
              >
                <span className={`w-2 h-2 rounded-full ${badge.dotColor}`} />
                {badge.label}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {allImages.map((imgUrl, index) => {
                const isActive = activeImage === imgUrl;
                return (
                  <button
                    key={`${imgUrl}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative aspect-square bg-white border overflow-hidden transition-all ${
                      isActive
                        ? 'border-[#141517] ring-2 ring-[#141517]/20'
                        : 'border-[#E2E2DC] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.name} angle ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Product Info, Swatches, Size Chart, CTA (5 cols) */}
        <div className="lg:col-span-5 space-y-7">
          {/* Header & Price */}
          <div className="border-b border-[#E2E2DC] pb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#555D47] mb-2">
              <span>{getCategoryLabel(product.category)}</span>
              <span>•</span>
              <span>{product.genderType === 'wanita' ? 'Women Series' : 'Unisex Fit'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141517] tracking-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#141517]">
                {formatRupiah(product.price)}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500">
                Harga mengikuti marketplace resmi
              </span>
            </div>

            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 1. Color Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#141517]">
                Pilih Warna:{' '}
                <span className="text-[#555D47]">{selectedColor}</span>
              </span>
              <span className="text-[11px] text-neutral-500">
                Klik warna untuk ganti foto
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleSelectColor(color.name, color.image)}
                    className={`flex items-center gap-2 px-3.5 py-2 border text-xs font-semibold transition-all ${
                      isSelected
                        ? 'border-[#141517] bg-[#141517] text-white shadow-xs'
                        : 'border-[#D5D5CE] bg-white text-[#141517] hover:border-[#141517]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/40"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Size Selector + Live Spec Readout */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#141517]">
                Pilih Ukuran:{' '}
                <span className="text-[#555D47]">{selectedSize}</span>
              </span>
              <button
                type="button"
                onClick={() => setSizeDiagramOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#283A66] hover:underline"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Gambar Diagram Ukur</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizeChart.map((row) => {
                const isSelected = selectedSize === row.size;
                return (
                  <button
                    key={row.size}
                    type="button"
                    onClick={() => setSelectedSize(row.size)}
                    className={`py-2.5 text-xs font-extrabold uppercase border transition-all ${
                      isSelected
                        ? 'bg-[#555D47] text-white border-[#555D47]'
                        : 'bg-white text-[#141517] border-[#D5D5CE] hover:border-[#141517]'
                    }`}
                  >
                    {row.size}
                  </button>
                );
              })}
            </div>

            {/* Selected Size Instant Detail Box */}
            {selectedSizeRow && (
              <div className="mt-3 p-3 bg-white border border-[#E2E2DC] text-xs text-neutral-700 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-bold text-[#141517]">
                  Detail Size {selectedSizeRow.size}:
                </span>
                {product.category === 'jaket' ? (
                  <>
                    <span>Lebar Dada: <strong>{selectedSizeRow.lebar} cm</strong></span>
                    <span>Panjang: <strong>{selectedSizeRow.panjang} cm</strong></span>
                    <span>P. Lengan: <strong>{selectedSizeRow.panjangLengan} cm</strong></span>
                  </>
                ) : (
                  <>
                    <span>
                      Lebar Pinggang:{' '}
                      <strong>
                        {selectedSizeRow.pinggangMin}–{selectedSizeRow.pinggangMax} cm
                      </strong>
                    </span>
                    <span>Lebar Paha: <strong>{selectedSizeRow.lebarPaha} cm</strong></span>
                    <span>Tinggi Celana: <strong>{selectedSizeRow.tinggiCelana} cm</strong></span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 3. CTA Action Section (Conditional by Status per Brief #10) */}
          <div className="pt-2 space-y-3">
            {product.status === 'tersedia' ? (
              <>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full py-4 px-6 bg-[#141517] hover:bg-[#555D47] text-white text-xs font-extrabold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2.5 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Beli Sekarang — Pilih Marketplace / WA</span>
                </button>

                <a
                  href={waDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 bg-white border border-[#141517] text-[#141517] hover:bg-[#EFEFEA] text-xs font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#555D47]" />
                  <span>Order / Tanya Size via WhatsApp</span>
                </a>
              </>
            ) : (
              <div className="p-5 bg-white border border-[#D5D5CE] space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#283A66]" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#141517]">
                    {product.status === 'habis'
                      ? 'Produk Sedang Habis Terjual (Sold Out)'
                      : 'Produk Segera Hadir (Coming Soon Drop)'}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {product.status === 'habis'
                    ? 'Batch ini telah habis terjual. Hubungi tim Geesthart via WhatsApp untuk informasi jadwal restock berikutnya.'
                    : 'Koleksi ini sedang dalam tahap rilis akhir. Daftar waiting list via WhatsApp agar tidak kehabisan saat drop dibuka.'}
                </p>
                <a
                  href={waDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#555D47] text-white text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#444B38] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Tanya Info Restock / Waiting List via WA</span>
                </a>
              </div>
            )}
          </div>

          {/* 4. Dynamic Size Chart Table */}
          <div className="pt-4 border-t border-[#E2E2DC]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517] flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#555D47]" />
                <span>Tabel Ukuran ({getCategoryLabel(product.category)} — cm)</span>
              </h2>
              <span className="text-[11px] text-neutral-500">Satuan: Centimeter</span>
            </div>

            <div className="overflow-x-auto bg-white border border-[#E2E2DC]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#141517] text-white uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3 border-r border-neutral-700">Size</th>
                    {product.category === 'jaket' ? (
                      <>
                        <th className="py-2.5 px-3 border-r border-neutral-700">Lebar Dada</th>
                        <th className="py-2.5 px-3 border-r border-neutral-700">Panjang</th>
                        <th className="py-2.5 px-3">P. Lengan</th>
                      </>
                    ) : (
                      <>
                        <th className="py-2.5 px-3 border-r border-neutral-700">
                          Lebar Pinggang
                        </th>
                        <th className="py-2.5 px-3 border-r border-neutral-700">
                          Lebar Paha
                        </th>
                        <th className="py-2.5 px-3 border-r border-neutral-700">
                          Tinggi Celana
                        </th>
                        {product.category === 'celana-panjang' && hasLingkarKaki && (
                          <th className="py-2.5 px-3">Lingkar Kaki</th>
                        )}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DC]">
                  {product.sizeChart.map((row) => {
                    const isHighlighted = selectedSize === row.size;
                    return (
                      <tr
                        key={row.size}
                        onClick={() => setSelectedSize(row.size)}
                        className={`cursor-pointer transition-colors ${
                          isHighlighted
                            ? 'bg-[#555D47]/15 font-bold text-[#141517]'
                            : 'hover:bg-[#F7F7F4] text-neutral-700'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-extrabold border-r border-[#E2E2DC]">
                          {row.size}
                        </td>
                        {product.category === 'jaket' ? (
                          <>
                            <td className="py-2.5 px-3 border-r border-[#E2E2DC]">
                              {row.lebar} cm
                            </td>
                            <td className="py-2.5 px-3 border-r border-[#E2E2DC]">
                              {row.panjang} cm
                            </td>
                            <td className="py-2.5 px-3">{row.panjangLengan} cm</td>
                          </>
                        ) : (
                          <>
                            <td className="py-2.5 px-3 border-r border-[#E2E2DC]">
                              {row.pinggangMin}–{row.pinggangMax} cm
                            </td>
                            <td className="py-2.5 px-3 border-r border-[#E2E2DC]">
                              {row.lebarPaha} cm
                            </td>
                            <td className="py-2.5 px-3 border-r border-[#E2E2DC]">
                              {row.tinggiCelana} cm
                            </td>
                            {product.category === 'celana-panjang' && hasLingkarKaki && (
                              <td className="py-2.5 px-3">
                                {row.lingkarKaki ? `${row.lingkarKaki} cm` : '-'}
                              </td>
                            )}
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Features & Material Specs */}
          <div className="pt-4 border-t border-[#E2E2DC] grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#141517] mb-2.5">
                Fitur Utama
              </h3>
              <ul className="space-y-2 text-xs text-neutral-700">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#555D47] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#141517] mb-2.5">
                Spesifikasi Material
              </h3>
              <ul className="space-y-2 text-xs text-neutral-700">
                {product.materialSpecs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#283A66] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Official Size Chart Visual Diagram Modal */}
      {sizeDiagramOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setSizeDiagramOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-white border border-[#141517] p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E2DC]">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517]">
                Panduan Ukur Resmi — {product.name}
              </h3>
              <button
                type="button"
                onClick={() => setSizeDiagramOpen(false)}
                className="p-1 text-neutral-500 hover:text-[#141517]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-square w-full bg-white overflow-hidden">
              <Image
                src={product.sizeChartImage}
                alt={`Size Chart ${product.name}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Store Picker Modal */}
      <MarketplaceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </div>
  );
}

