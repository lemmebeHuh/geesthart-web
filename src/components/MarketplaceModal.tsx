'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowUpRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { Product } from '@/types/geesthart';
import { buildWhatsAppOrderUrl, formatRupiah } from '@/lib/format';
import { SITE_CONFIG } from '@/data/seed-data';
import { trackStoreClick } from '@/components/AnalyticsTracker';

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
      role="dialog"
      aria-modal="true"
      aria-labelledby="marketplace-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#F7F7F4] border-t-2 sm:border-2 border-[#141517] shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="bg-[#141517] text-white px-5 py-4 flex items-center justify-between gap-4 shrink-0">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#B8CCA0]">
              Kanal Pembelian Resmi Geesthart
            </p>
            <h3
              id="marketplace-modal-title"
              className="text-sm font-extrabold uppercase tracking-[0.08em] mt-0.5"
            >
              Pilih Toko untuk Melanjutkan Pesanan
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] -mr-2 inline-flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
            aria-label="Tutup pilihan toko"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Selected Product Summary */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#DCDCD4] flex items-center gap-4">
            <div className="relative w-18 h-22 bg-[#EFEFEA] border border-[#DCDCD4] shrink-0 overflow-hidden">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 bg-[#EFEFEA] text-[#3F4734] mb-1">
                Seri {product.collection}
              </span>
              <h4 className="text-sm font-extrabold text-[#141517] truncate">
                {product.name}
              </h4>
              <p className="text-base font-extrabold text-[#141517] mt-0.5 tabular-nums">
                {formatRupiah(product.price)}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[#4A4D52]">
                {selectedColor && (
                  <span className="px-2 py-0.5 bg-[#F7F7F4] border border-[#DCDCD4]">
                    Warna: <strong className="text-[#141517]">{selectedColor}</strong>
                  </span>
                )}
                {selectedSize && (
                  <span className="px-2 py-0.5 bg-[#F7F7F4] border border-[#DCDCD4]">
                    Ukuran: <strong className="text-[#141517]">{selectedSize}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Channel Options */}
          <div className="p-4 sm:p-5 space-y-2.5">
            {/* Option 1: Shopee Official */}
            <a
              href={shopeeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackStoreClick('Shopee', product.slug)}
              className="group min-h-[64px] flex items-center justify-between p-3.5 sm:p-4 bg-white border border-[#C8C8C0] hover:border-[#D9381E] active:bg-[#EFEFEA] transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 bg-[#D9381E] text-white flex items-center justify-center font-extrabold text-xs tracking-wider shrink-0">
                  SHP
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold text-[#141517] group-hover:text-[#D9381E] transition-colors">
                      Shopee Official Store
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#FDF2F0] text-[#B32810] border border-[#F5C6BE]">
                      Voucher &amp; COD
                    </span>
                  </div>
                  <p className="text-xs text-[#4A4D52] mt-0.5 truncate">
                    shopee.co.id/geesthart • Pengiriman reguler &amp; instan
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#4A4D52] group-hover:text-[#D9381E] shrink-0 ml-2" aria-hidden="true" />
            </a>

            {/* Option 2: TikTok Shop */}
            <a
              href={tiktokLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackStoreClick('TikTok Shop', product.slug)}
              className="group min-h-[64px] flex items-center justify-between p-3.5 sm:p-4 bg-white border border-[#C8C8C0] hover:border-[#141517] active:bg-[#EFEFEA] transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 bg-[#141517] text-white flex items-center justify-center font-extrabold text-xs tracking-wider shrink-0">
                  TT
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold text-[#141517]">
                      TikTok Shop (@geesthart_)
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#EFEFEA] text-[#141517] border border-[#DCDCD4]">
                      Video &amp; Live
                    </span>
                  </div>
                  <p className="text-xs text-[#4A4D52] mt-0.5 truncate">
                    Lihat video detail bahan &amp; promo sesi live
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#4A4D52] group-hover:text-[#141517] shrink-0 ml-2" aria-hidden="true" />
            </a>

            {/* Option 3: Tokopedia (if available) */}
            {tokopediaLink && (
              <a
                href={tokopediaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackStoreClick('Tokopedia', product.slug)}
                className="group min-h-[64px] flex items-center justify-between p-3.5 sm:p-4 bg-white border border-[#C8C8C0] hover:border-[#038B0C] active:bg-[#EFEFEA] transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 bg-[#038B0C] text-white flex items-center justify-center font-extrabold text-xs tracking-wider shrink-0">
                    TKP
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-extrabold text-[#141517]">
                      Tokopedia Official
                    </span>
                    <p className="text-xs text-[#4A4D52] mt-0.5 truncate">
                      Pesanan resmi melalui Tokopedia
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#4A4D52] shrink-0 ml-2" aria-hidden="true" />
              </a>
            )}

            {/* Option 4: WhatsApp Direct CS */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackStoreClick('WhatsApp', product.slug)}
              className="group min-h-[64px] flex items-center justify-between p-3.5 sm:p-4 bg-[#3F4734] text-white hover:bg-[#2F3627] active:bg-[#242A1E] transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 bg-white/15 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold">
                      Pesan / Konsultasi via WhatsApp
                    </span>
                  </div>
                  <p className="text-xs text-white/90 mt-0.5 truncate">
                    Admin Bandung ({SITE_CONFIG.whatsappDisplay}) • Tanya ukuran &amp; stok
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white shrink-0 ml-2" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-5 py-3 bg-[#EFEFEA] border-t border-[#DCDCD4] flex items-center justify-between text-xs text-[#4A4D52] shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#3F4734] shrink-0" aria-hidden="true" />
            <span>Produk Resmi Geesthart Bandung</span>
          </div>
          <span className="text-[11px] font-medium">
            Harga sesuai toko resmi
          </span>
        </div>
      </div>
    </div>
  );
}
