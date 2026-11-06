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
  CheckCircle2,
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/seed-data';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [brandOrCompany, setBrandOrCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('Pemesanan Grosir / Stokis');
  const [message, setMessage] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedNotice(true);
    const text = `Halo Tim Geesthart Bandung,\n\nSaya ingin menghubungi terkait *${inquiryType}*:\n- Nama: ${name}\n- Toko/Komunitas: ${
      brandOrCompany || '-'
    }\n- Pesan: ${message}\n\nTerima kasih.`;
    const url = `https://wa.me/${
      SITE_CONFIG.whatsappNumber
    }?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-white border-b border-[#DCDCD4] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3F4734]">
            Layanan Pelanggan &amp; Kemitraan • Bandung
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#141517] mt-1">
            Kontak &amp; Kerja Sama
          </h1>
          <p className="text-xs sm:text-sm text-[#4A4D52] mt-2 max-w-2xl leading-relaxed">
            Hubungi tim kami di Bandung untuk konsultasi ukuran pakaian, pemesanan jumlah besar (komunitas atau stokis), maupun kerja sama kreatif.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left: Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517] mb-2">
            Kanal Komunikasi Resmi
          </h2>

          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group min-h-[72px] flex items-center justify-between p-4 sm:p-5 bg-white border border-[#DCDCD4] hover:border-[#3F4734] transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-[#3F4734] text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#3F4734]">
                  Admin CS &amp; Grosir
                </span>
                <h3 className="text-sm font-extrabold text-[#141517]">
                  WhatsApp: {SITE_CONFIG.whatsappDisplay}
                </h3>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#4A4D52] group-hover:text-[#3F4734] shrink-0" aria-hidden="true" />
          </a>

          {/* Shopee Card */}
          <a
            href={SITE_CONFIG.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group min-h-[72px] flex items-center justify-between p-4 sm:p-5 bg-white border border-[#DCDCD4] hover:border-[#D9381E] transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-[#D9381E] text-white flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B32810]">
                  Toko Marketplace Resmi
                </span>
                <h3 className="text-sm font-extrabold text-[#141517]">
                  Shopee: shopee.co.id/geesthart
                </h3>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#4A4D52] group-hover:text-[#D9381E] shrink-0" aria-hidden="true" />
          </a>

          {/* Instagram Card */}
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group min-h-[72px] flex items-center justify-between p-4 sm:p-5 bg-white border border-[#DCDCD4] hover:border-[#141517] transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-[#141517] text-white flex items-center justify-center shrink-0">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#4A4D52]">
                  Katalog Visual &amp; Info Rilisan
                </span>
                <h3 className="text-sm font-extrabold text-[#141517]">
                  Instagram: {SITE_CONFIG.instagramHandle}
                </h3>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#4A4D52] group-hover:text-[#141517] shrink-0" aria-hidden="true" />
          </a>

          {/* TikTok Card */}
          <a
            href={SITE_CONFIG.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group min-h-[72px] flex items-center justify-between p-4 sm:p-5 bg-white border border-[#DCDCD4] hover:border-[#141517] transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-[#1D2B4D] text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                TT
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1D2B4D]">
                  Video Pemakaian &amp; TikTok Shop
                </span>
                <h3 className="text-sm font-extrabold text-[#141517]">
                  TikTok: {SITE_CONFIG.tiktokHandle}
                </h3>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#4A4D52] group-hover:text-[#141517] shrink-0" aria-hidden="true" />
          </a>

          {/* Origin Info */}
          <div className="p-4 sm:p-5 bg-[#EFEFEA] border border-[#DCDCD4] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#3F4734] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs text-[#4A4D52] leading-relaxed">
              <strong className="text-[#141517] block uppercase tracking-wider mb-0.5">
                Lokasi Pengiriman
              </strong>
              Bandung, Jawa Barat. Pesanan dikirim setiap hari Senin sampai Sabtu melalui ekspedisi marketplace resmi maupun kurir instan area Bandung.
            </div>
          </div>
        </div>

        {/* Right: Wholesale & Collaboration Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#DCDCD4] p-5 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#3F4734] mb-1">
              <Handshake className="w-4 h-4" aria-hidden="true" />
              <span>Formulir Pesan Langsung</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#141517]">
              Kirim Pesan ke Tim Geesthart
            </h2>
            <p className="text-xs text-[#4A4D52] mt-1 mb-6 leading-relaxed">
              Lengkapi data di bawah ini untuk menyusun pesan otomatis yang langsung terhubung ke nomor WhatsApp Admin Geesthart Bandung.
            </p>

            {submittedNotice && (
              <div
                role="status"
                aria-live="polite"
                className="mb-5 p-4 bg-[#EFF2EC] border border-[#3F4734] text-xs text-[#141517] flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#3F4734] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block font-extrabold">
                    Format pesan telah disiapkan ke WhatsApp.
                  </strong>
                  <span>
                    Jika jendela WhatsApp belum terbuka otomatis, silakan klik tombol WhatsApp di samping kiri ({SITE_CONFIG.whatsappDisplay}).
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[#141517] mb-1.5"
                  >
                    Nama Lengkap *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="min-h-[44px] w-full px-3.5 py-2.5 text-xs font-medium bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] placeholder:text-[#686B70] focus:border-[#141517]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-org"
                    className="block text-xs font-bold uppercase tracking-wider text-[#141517] mb-1.5"
                  >
                    Nama Toko / Komunitas (Opsional)
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    value={brandOrCompany}
                    onChange={(e) => setBrandOrCompany(e.target.value)}
                    placeholder="Kosongkan jika perorangan"
                    className="min-h-[44px] w-full px-3.5 py-2.5 text-xs font-medium bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] placeholder:text-[#686B70] focus:border-[#141517]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-type"
                  className="block text-xs font-bold uppercase tracking-wider text-[#141517] mb-1.5"
                >
                  Keperluan *
                </label>
                <select
                  id="contact-type"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="min-h-[44px] w-full px-3.5 py-2.5 text-xs font-semibold bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] focus:border-[#141517]"
                >
                  <option value="Pemesanan Grosir / Stokis">
                    Pemesanan Grosir &amp; Kemitraan Stokis
                  </option>
                  <option value="Pesanan Komunitas Olahraga / Outdoor">
                    Pesanan Komunitas Olahraga / Outdoor
                  </option>
                  <option value="Kolaborasi Brand / Media">
                    Kolaborasi Brand, Acara, atau Media
                  </option>
                  <option value="Konsultasi Produk & Ukuran">
                    Konsultasi Produk &amp; Ukuran Pakaian
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold uppercase tracking-wider text-[#141517] mb-1.5"
                >
                  Rincian Pesan *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan artikel yang diminati, perkiraan jumlah pesanan, atau pertanyaan ukuran Anda..."
                  className="w-full p-3.5 text-xs font-medium bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] placeholder:text-[#686B70] focus:border-[#141517]"
                />
              </div>

              <button
                type="submit"
                className="min-h-[48px] w-full sm:w-auto px-6 py-3 bg-[#141517] hover:bg-[#3F4734] active:bg-[#2F3627] text-white text-xs font-extrabold uppercase tracking-[0.14em] transition-colors inline-flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kirim lewat WhatsApp Resmi</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
