'use client';

import React, { useState } from 'react';
import {
  MessageCircle,
  Instagram,
  ArrowUpRight,
  MapPin,
  Send,
  Handshake,
  ShoppingBag,
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/seed-data';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [brandOrCompany, setBrandOrCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('Wholesale / Reseller');
  const [message, setMessage] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Tim Geesthart Bandung!\n\nSaya ingin menghubungi terkait *${inquiryType}*:\n• Nama: ${name}\n• Brand/Instansi: ${
      brandOrCompany || '-'
    }\n• Pesan: ${message}\n\nTerima kasih!`;
    const url = `https://wa.me/${
      SITE_CONFIG.whatsappNumber
    }?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-white border-b border-[#E2E2DC] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555D47]">
            CONNECT WITH GEESTHART // BANDUNG HQ
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
            KONTAK &amp; KERJA SAMA
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-2xl leading-relaxed">
            Hubungi kami untuk konsultasi ukuran produk, pemesanan jumlah besar (wholesale/komunitas), kolaborasi kreatif, atau kemitraan stokis.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#141517] mb-3">
            Channel Resmi Geesthart
          </h2>

          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 bg-white border border-[#E2E2DC] hover:border-[#555D47] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#555D47] text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#555D47]">
                    FAST RESPONSE CS &amp; WHOLESALE
                  </span>
                  <h3 className="text-sm font-extrabold text-[#141517]">
                    WhatsApp: {SITE_CONFIG.whatsappDisplay}
                  </h3>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#555D47]" />
            </div>
          </a>

          {/* Shopee Card */}
          <a
            href={SITE_CONFIG.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 bg-white border border-[#E2E2DC] hover:border-[#EE4D2D] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#EE4D2D] text-white flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#EE4D2D]">
                    OFFICIAL MARKETPLACE
                  </span>
                  <h3 className="text-sm font-extrabold text-[#141517]">
                    Shopee: shopee.co.id/geesthart
                  </h3>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#EE4D2D]" />
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 bg-white border border-[#E2E2DC] hover:border-[#141517] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#141517] text-white flex items-center justify-center">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    INSTAGRAM COMMUNITY (1.08K+ FOLLOWERS)
                  </span>
                  <h3 className="text-sm font-extrabold text-[#141517]">
                    {SITE_CONFIG.instagramHandle}
                  </h3>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#141517]" />
            </div>
          </a>

          {/* TikTok Card */}
          <a
            href={SITE_CONFIG.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 bg-white border border-[#E2E2DC] hover:border-[#141517] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#283A66] text-white flex items-center justify-center font-bold text-xs">
                  TT
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#283A66]">
                    TIKTOK VIDEO &amp; SHOP
                  </span>
                  <h3 className="text-sm font-extrabold text-[#141517]">
                    {SITE_CONFIG.tiktokHandle}
                  </h3>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#141517]" />
            </div>
          </a>

          {/* Origin Info */}
          <div className="p-5 bg-[#EFEFEA] border border-[#E2E2DC] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#555D47] shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-700 leading-relaxed">
              <strong className="text-[#141517] block uppercase tracking-wider mb-0.5">
                Basis Operasional &amp; Pengiriman
              </strong>
              Bandung, Jawa Barat, Indonesia. Pengiriman setiap hari Senin–Sabtu melalui ekspedisi marketplace resmi maupun pengiriman instan Bandung.
            </div>
          </div>
        </div>

        {/* Right: Wholesale & Collaboration Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#E2E2DC] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#555D47] mb-1">
              <Handshake className="w-4 h-4" />
              <span>B2B, WHOLESALE &amp; COLLABORATION INQUIRY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#141517]">
              KIRIM PESAN KERJA SAMA
            </h2>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              Isi formulir di bawah ini untuk terhubung langsung dengan tim Geesthart melalui WhatsApp dengan format pesan otomatis.
            </p>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#141517] mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F7F7F4] border border-[#D5D5CE] focus:outline-none focus:border-[#141517]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#141517] mb-1.5">
                    Nama Toko / Komunitas / Instansi
                  </label>
                  <input
                    type="text"
                    value={brandOrCompany}
                    onChange={(e) => setBrandOrCompany(e.target.value)}
                    placeholder="Opsional"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F7F7F4] border border-[#D5D5CE] focus:outline-none focus:border-[#141517]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#141517] mb-1.5">
                  Kategori Keperluan *
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F7F7F4] border border-[#D5D5CE] focus:outline-none focus:border-[#141517]"
                >
                  <option value="Wholesale / Reseller">
                    Wholesale / Pembelian Grosir &amp; Stokis
                  </option>
                  <option value="Custom Order Komunitas / Outdoor">
                    Pesanan Komunitas Olahraga / Outdoor
                  </option>
                  <option value="Kolaborasi Brand / Media">
                    Kolaborasi Brand, Event, atau Media
                  </option>
                  <option value="Konsultasi Produk & Ukuran">
                    Konsultasi Produk &amp; Ukuran
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#141517] mb-1.5">
                  Detail Pesan *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan rencana kerja sama, jumlah artikel yang dibutuhkan, atau pertanyaan Anda..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F7F7F4] border border-[#D5D5CE] focus:outline-none focus:border-[#141517]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#141517] hover:bg-[#555D47] text-white text-xs font-extrabold uppercase tracking-[0.16em] transition-colors inline-flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim ke WhatsApp Resmi Geesthart</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

