'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  Ruler,
  CheckCircle2,
  Shield,
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

  // R-26 / R-32: Close size diagram modal on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sizeDiagramOpen) {
        setSizeDiagramOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sizeDiagramOpen]);

  const badge = getStatusBadge(product.status);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 sm:mb-8 border-b border-[#DCDCD4]"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A4D52]">
          <Link
            href="/catalog"
            className="min-h-[40px] inline-flex items-center gap-1.5 font-bold text-[#141517] hover:text-[#3F4734] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Katalog</span>
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/catalog?collection=${encodeURIComponent(product.collection)}`}
            className="min-h-[40px] inline-flex items-center font-semibold hover:text-[#141517]"
          >
            Seri {product.collection}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#141517] font-bold truncate max-w-[180px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        <span className="text-[11px] font-mono uppercase tracking-wider text-[#4A4D52]">
          Kode: {product.id.toUpperCase()}
        </span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <div className="relative aspect-[4/5] w-full bg-white border border-[#DCDCD4] overflow-hidden">
            <Image
              src={activeImage}
              alt={`${product.name} warna ${selectedColor}`}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#141517] text-white text-xs font-bold uppercase tracking-[0.12em]">
                {product.collection}
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] border flex items-center gap-1.5 ${badge.className}`}
              >
                <span className={`w-2 h-2 rounded-full ${badge.dotColor}`} aria-hidden="true" />
                {badge.label}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip (>= 44x44px touch targets) */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 sm:gap-3">
              {allImages.map((imgUrl, index) => {
                const isActive = activeImage === imgUrl;
                return (
                  <button
                    key={`${imgUrl}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    aria-label={`Tampilkan foto produk ke-${index + 1}`}
                    aria-pressed={isActive}
                    className={`relative aspect-square min-h-[56px] bg-white border-2 overflow-hidden transition-all ${
                      isActive
                        ? 'border-[#141517]'
                        : 'border-[#DCDCD4] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.name} tampak ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Product Info, Swatches, Size Chart, CTA (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Price */}
          <div className="border-b border-[#DCDCD4] pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#3F4734] mb-1.5">
              <span>{getCategoryLabel(product.category)}</span>
              <span aria-hidden="true">•</span>
              <span>{product.genderType === 'wanita' ? 'Koleksi Wanita' : 'Potongan Unisex'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141517] tracking-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#141517] tabular-nums">
                {formatRupiah(product.price)}
              </span>
              <span className="text-xs text-[#4A4D52]">
                Harga resmi toko marketplace
              </span>
            </div>

            <p className="mt-4 text-sm text-[#4A4D52] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 1. Color Selector (>= 44px touch targets) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#141517]">
                1. Pilih Warna:{' '}
                <span className="text-[#3F4734]">{selectedColor}</span>
              </span>
              <span className="text-xs text-[#4A4D52]">
                Ketuk untuk ganti foto
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleSelectColor(color.name, color.image)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] flex items-center gap-2 px-3.5 py-2 border text-xs font-bold transition-colors ${
                      isSelected
                        ? 'border-[#141517] bg-[#141517] text-white'
                        : 'border-[#C8C8C0] bg-white text-[#141517] hover:border-[#141517]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Size Selector + Live Spec Readout (>= 44px touch targets) */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#141517]">
                2. Pilih Ukuran:{' '}
                <span className="text-[#3F4734]">{selectedSize}</span>
              </span>
              <button
                type="button"
                onClick={() => setSizeDiagramOpen(true)}
                className="min-h-[36px] inline-flex items-center gap-1.5 text-xs font-bold text-[#1D2B4D] hover:underline"
              >
                <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Lihat Gambar Diagram Ukuran</span>
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.sizeChart.map((row) => {
                const isSelected = selectedSize === row.size;
                return (
                  <button
                    key={row.size}
                    type="button"
                    onClick={() => setSelectedSize(row.size)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] py-2.5 text-xs font-extrabold uppercase border transition-colors ${
                      isSelected
                        ? 'bg-[#3F4734] text-white border-[#3F4734]'
                        : 'bg-white text-[#141517] border-[#C8C8C0] hover:border-[#141517]'
                    }`}
                  >
                    {row.size}
                  </button>
                );
              })}
            </div>

            {/* Selected Size Instant Detail Box */}
            {selectedSizeRow && (
              <div className="mt-3 p-3.5 bg-white border border-[#DCDCD4] text-xs text-[#4A4D52] flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span className="font-extrabold text-[#141517]">
                  Rincian Ukuran {selectedSizeRow.size}:
                </span>
                {product.category === 'jaket' ? (
                  <>
                    <span>Lebar Dada: <strong className="text-[#141517]">{selectedSizeRow.lebar} cm</strong></span>
                    <span>Panjang Baju: <strong className="text-[#141517]">{selectedSizeRow.panjang} cm</strong></span>
                    <span>Panjang Lengan: <strong className="text-[#141517]">{selectedSizeRow.panjangLengan} cm</strong></span>
                  </>
                ) : (
                  <>
                    <span>
                      Lebar Pinggang:{' '}
                      <strong className="text-[#141517]">
                        {selectedSizeRow.pinggangMin} s/d {selectedSizeRow.pinggangMax} cm
                      </strong>
                    </span>
                    <span>Lebar Paha: <strong className="text-[#141517]">{selectedSizeRow.lebarPaha} cm</strong></span>
                    <span>Tinggi Celana: <strong className="text-[#141517]">{selectedSizeRow.tinggiCelana} cm</strong></span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 3. CTA Action Section */}
          <div className="pt-1 space-y-2.5">
            {product.status === 'tersedia' ? (
              <>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="min-h-[48px] w-full py-3.5 px-6 bg-[#141517] hover:bg-[#3F4734] active:bg-[#2F3627] text-white text-xs font-extrabold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2.5"
                >
                  <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Pilih Toko Resmi (Shopee / TikTok / WA)</span>
                </button>

                <a
                  href={waDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] w-full py-3 px-6 bg-white border border-[#141517] text-[#141517] hover:bg-[#EFEFEA] text-xs font-bold uppercase tracking-[0.12em] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#3F4734] shrink-0" aria-hidden="true" />
                  <span>Pesan / Tanya Ukuran lewat WhatsApp</span>
                </a>
              </>
            ) : (
              <div className="p-5 bg-white border border-[#C8C8C0] space-y-3">
                <span className="block text-xs font-extrabold uppercase tracking-[0.12em] text-[#141517]">
                  {product.status === 'habis'
                    ? 'Stok Saat Ini Sedang Habis'
                    : 'Segera Dirilis (Coming Soon)'}
                </span>
                <p className="text-xs text-[#4A4D52] leading-relaxed">
                  {product.status === 'habis'
                    ? 'Kloter produksi saat ini sudah terjual habis. Hubungi Admin Bandung lewat WhatsApp untuk menanyakan jadwal restock berikutnya.'
                    : 'Artikel ini sedang dalam tahap produksi akhir. Hubungi WhatsApp kami untuk masuk daftar tunggu pemesanan awal.'}
                </p>
                <a
                  href={waDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] w-full py-3 px-4 bg-[#3F4734] text-white text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#2F3627] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Tanya Jadwal Restock via WhatsApp</span>
                </a>
              </div>
            )}
          </div>

          {/* 4. Dynamic Size Chart Table */}
          <div className="pt-4 border-t border-[#DCDCD4]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517] flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#3F4734]" aria-hidden="true" />
                <span>Tabel Ukuran {getCategoryLabel(product.category)} (cm)</span>
              </h2>
              <span className="text-[11px] font-medium text-[#4A4D52]">Satuan: Sentimeter</span>
            </div>

            <div className="overflow-x-auto bg-white border border-[#DCDCD4]">
              <table className="w-full text-left border-collapse text-xs tabular-nums">
                <thead>
                  <tr className="bg-[#141517] text-white uppercase tracking-wider text-[11px]">
                    <th scope="col" className="py-2.5 px-3 border-r border-neutral-700">
                      Ukuran
                    </th>
                    {product.category === 'jaket' ? (
                      <>
                        <th scope="col" className="py-2.5 px-3 border-r border-neutral-700">
                          Lebar Dada
                        </th>
                        <th scope="col" className="py-2.5 px-3 border-r border-neutral-700">
                          Panjang
                        </th>
                        <th scope="col" className="py-2.5 px-3">
                          P. Lengan
                        </th>
                      </>
                    ) : (
                      <>
                        <th scope="col" className="py-2.5 px-3 border-r border-neutral-700">
                          Lebar Pinggang
                        </th>
                        <th scope="col" className="py-2.5 px-3 border-r border-neutral-700">
                          Lebar Paha
                        </th>
                        <th scope="col" className="py-2.5 px-3 border-r border-neutral-700">
                          Tinggi Celana
                        </th>
                        {product.category === 'celana-panjang' && hasLingkarKaki && (
                          <th scope="col" className="py-2.5 px-3">
                            Lingkar Kaki
                          </th>
                        )}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCDCD4]">
                  {product.sizeChart.map((row) => {
                    const isHighlighted = selectedSize === row.size;
                    return (
                      <tr
                        key={row.size}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isHighlighted}
                        onClick={() => setSelectedSize(row.size)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedSize(row.size);
                          }
                        }}
                        className={`transition-colors ${
                          isHighlighted
                            ? 'bg-[#EFF2EC] font-bold text-[#141517]'
                            : 'hover:bg-[#F7F7F4] text-[#4A4D52]'
                        }`}
                      >
                        <td className="py-3 px-3 font-extrabold text-[#141517] border-r border-[#DCDCD4]">
                          {row.size}
                        </td>
                        {product.category === 'jaket' ? (
                          <>
                            <td className="py-3 px-3 border-r border-[#DCDCD4]">
                              {row.lebar} cm
                            </td>
                            <td className="py-3 px-3 border-r border-[#DCDCD4]">
                              {row.panjang} cm
                            </td>
                            <td className="py-3 px-3">{row.panjangLengan} cm</td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-3 border-r border-[#DCDCD4]">
                              {row.pinggangMin} s/d {row.pinggangMax} cm
                            </td>
                            <td className="py-3 px-3 border-r border-[#DCDCD4]">
                              {row.lebarPaha} cm
                            </td>
                            <td className="py-3 px-3 border-r border-[#DCDCD4]">
                              {row.tinggiCelana} cm
                            </td>
                            {product.category === 'celana-panjang' && hasLingkarKaki && (
                              <td className="py-3 px-3">
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
          <div className="pt-4 border-t border-[#DCDCD4] grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517] mb-2.5">
                Detail Konstruksi
              </h3>
              <ul className="space-y-2 text-xs text-[#4A4D52] leading-relaxed">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3F4734] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517] mb-2.5">
                Spesifikasi Bahan
              </h3>
              <ul className="space-y-2 text-xs text-[#4A4D52] leading-relaxed">
                {product.materialSpecs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#141517] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM CHECKOUT BAR (< lg, space reserved by pb-24 on page wrapper per antislop-layoutmobile) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t-2 border-[#141517] px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] text-[#4A4D52] truncate">
            {selectedColor} • Size <strong className="text-[#141517]">{selectedSize}</strong>
          </p>
          <p className="text-sm font-extrabold text-[#141517] tabular-nums">
            {formatRupiah(product.price)}
          </p>
        </div>

        {product.status === 'tersedia' ? (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="min-h-[44px] px-5 bg-[#141517] active:bg-[#3F4734] text-white text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 shrink-0"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Pilih Toko / Beli</span>
          </button>
        ) : (
          <a
            href={waDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 bg-[#3F4734] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Tanya WA</span>
          </a>
        )}
      </div>

      {/* Official Size Chart Visual Diagram Modal */}
      {sizeDiagramOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Diagram Ukuran ${product.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75"
          onClick={() => setSizeDiagramOpen(false)}
        >
          <div
            className="relative max-w-xl w-full bg-white border-2 border-[#141517] p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DCDCD4]">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517]">
                Diagram Panduan Ukur: {product.name}
              </h3>
              <button
                type="button"
                onClick={() => setSizeDiagramOpen(false)}
                aria-label="Tutup gambar diagram ukuran"
                className="min-w-[44px] min-h-[44px] -mr-2 inline-flex items-center justify-center text-[#4A4D52] hover:text-[#141517]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative aspect-square w-full bg-white overflow-hidden">
              <Image
                src={product.sizeChartImage}
                alt={`Diagram ukuran ${product.name}`}
                fill
                sizes="(max-width: 640px) 95vw, 560px"
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
