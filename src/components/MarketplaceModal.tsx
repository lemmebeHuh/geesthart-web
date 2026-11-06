'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowUpRight, MessageCircle, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '@/types/geesthart';
import { buildWhatsAppOrderUrl, formatRupiah } from '@/lib/format';
import { SITE_CONFIG } from '@/data/seed-data';

interface MarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
}

export function MarketplaceModal({
  isOpen,
  onClose,
  product,
  selectedColor,
  selectedSize,
}: MarketplaceModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shopeeLink =
    product.marketplaceLinks.find((m) => m.platform === 'Shopee')?.url ||
    SITE_CONFIG.shopeeUrl;

  const tiktokLink =
    product.marketplaceLinks.find((m) => m.platform === 'TikTok Shop')?.url ||
    SITE_CONFIG.tiktokUrl;

  const tokopediaLink = product.marketplaceLinks.find(
    (m) => m.platform === 'Tokopedia'
  )?.url;

  const waUrl = buildWhatsAppOrderUrl({
    product,
    selectedColor,
    selectedSize,
  });

  const activeImage =
    product.colors.find((c) => c.name === selectedColor)?.image ||
    product.mainImage;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#F7F7F4] border border-[#141517] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="bg-[#141517] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9CAF84]">
              GEESTHART OFFICIAL STORE PICKER
            </p>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] mt-0.5">
              Pilih Channel Pembelian Resmi
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Product Summary */}
        <div className="p-6 bg-white border-b border-[#E2E2DC] flex items-center gap-4">
          <div className="relative w-20 h-24 bg-[#EFEFEA] border border-[#E2E2DC] shrink-0 overflow-hidden">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 bg-[#EFEFEA] text-[#555D47] mb-1">
              {product.collection}
            </span>
            <h4 className="text-sm font-bold text-[#141517] truncate">
              {product.name}
            </h4>
            <p className="text-base font-extrabold text-[#141517] mt-0.5">
              {formatRupiah(product.price)}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-neutral-600">
              {selectedColor && (
                <span className="px-2 py-0.5 bg-[#F7F7F4] border border-[#E2E2DC]">
                  Warna: <strong className="text-[#141517]">{selectedColor}</strong>
                </span>
              )}
              {selectedSize && (
                <span className="px-2 py-0.5 bg-[#F7F7F4] border border-[#E2E2DC]">
                  Ukuran: <strong className="text-[#141517]">{selectedSize}</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Channel Options */}
        <div className="p-6 space-y-3">
          {/* Option 1: Shopee Official */}
          <a
            href={shopeeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-white border border-[#D5D5CE] hover:border-[#EE4D2D] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-[#EE4D2D] text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0">
                SHP
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#141517] group-hover:text-[#EE4D2D] transition-colors">
                    Shopee Official Store
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-[#EE4D2D]/10 text-[#EE4D2D]">
                    Gratis Ongkir / Voucher
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  shopee.co.id/geesthart — Checkout instan &amp; pembayaran lengkap
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#EE4D2D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>

          {/* Option 2: TikTok Shop */}
          <a
            href={tiktokLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-white border border-[#D5D5CE] hover:border-[#141517] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-[#141517] text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0">
                TT
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#141517]">
                    TikTok Shop (@geesthart_)
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-neutral-100 text-neutral-700 inline-flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Video Showcase
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Lihat review video pemakaian &amp; promo live Geesthart
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#141517] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>

          {/* Option 3: Tokopedia (if available) */}
          {tokopediaLink && (
            <a
              href={tokopediaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 bg-white border border-[#D5D5CE] hover:border-[#03AC0E] transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-[#03AC0E] text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0">
                  TKP
                </div>
                <div>
                  <span className="text-sm font-bold text-[#141517] group-hover:text-[#03AC0E] transition-colors">
                    Tokopedia Official
                  </span>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Transaksi aman melalui Tokopedia
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#03AC0E] transition-transform shrink-0" />
            </a>
          )}

          {/* Option 4: WhatsApp Direct CS */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 bg-[#555D47] text-white hover:bg-[#444B38] transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-white/15 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">
                    Order / Konsultasi via WhatsApp
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-white/20 text-white">
                    Fast Response
                  </span>
                </div>
                <p className="text-xs text-white/80 mt-0.5">
                  Admin Bandung ({SITE_CONFIG.whatsappDisplay}) — Konsultasi size &amp; stok langsung
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3.5 bg-[#EFEFEA] border-t border-[#E2E2DC] flex items-center justify-between text-[11px] text-neutral-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#555D47]" />
            <span>100% Original Geesthart Bandung Product Guarantee</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">
            Harga mengikuti marketplace
          </span>
        </div>
      </div>
    </div>
  );
}

