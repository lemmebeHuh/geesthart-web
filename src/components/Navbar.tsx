'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowUpRight,
  SlidersHorizontal,
  Home,
  Grid,
  Camera,
  MessageSquare,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '@/data/seed-data';

const NAV_LINKS = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/catalog', label: 'Katalog', icon: Grid },
  { href: '/lookbook', label: 'Lookbook', icon: Camera },
  { href: '/about', label: 'Tentang', icon: null },
  { href: '/contact', label: 'Kontak', icon: MessageSquare },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide bottom tab bar on product detail pages because ProductDetailClient has its own sticky buy bar
  const isProductDetailPage = pathname.startsWith('/product/');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F7F7F4] border-b border-[#DCDCD4]">
        {/* Top Strip: Clean single line on mobile, full info on desktop */}
        <div className="bg-[#141517] text-[#F7F7F4] text-[10px] sm:text-[11px] tracking-[0.14em] uppercase py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between gap-4">
            <p className="truncate font-medium text-center md:text-left">
              Geesthart Bandung • Own Your Path
            </p>
            <div className="hidden md:flex items-center gap-5 text-neutral-300">
              <span>Outdoor &amp; Streetwear Apparel</span>
              <span className="text-neutral-600" aria-hidden="true">|</span>
              <a
                href={SITE_CONFIG.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#B8CCA0] transition-colors inline-flex items-center gap-1 font-semibold"
              >
                <span>Shopee Resmi</span>
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Bar:
            - Mobile: Left Logo + Right [Katalog + Menu] (No 3-column squeeze!)
            - Desktop: Left Nav + Center Logo + Right Actions */}
        <div className="max-w-7xl mx-auto px-3.5 sm:px-8 h-14 sm:h-18 flex items-center justify-between gap-2">
          {/* Desktop Left Navigation */}
          <nav aria-label="Navigasi Utama" className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.14em] font-bold transition-colors relative py-2 ${
                    isActive
                      ? 'text-[#141517]'
                      : 'text-[#4A4D52] hover:text-[#141517]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3F4734]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Brand Logo: Left-aligned on mobile for clean balance, centered on desktop */}
          <Link
            href="/"
            className="flex items-center min-h-[44px] shrink-0"
            aria-label="Beranda Geesthart Bandung"
          >
            <BrandLogo variant="dark" size="sm" className="sm:hidden" />
            <BrandLogo variant="dark" size="md" className="hidden sm:inline-flex" />
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              href="/studio"
              className="hidden sm:inline-flex items-center gap-1.5 min-h-[42px] px-3.5 text-xs font-bold uppercase tracking-[0.1em] border border-[#C8C8C0] text-[#141517] hover:border-[#141517] hover:bg-white transition-colors bg-[#F7F7F4]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#3F4734]" aria-hidden="true" />
              <span>Panel CMS</span>
            </Link>

            <Link
              href="/catalog"
              className="hidden sm:inline-flex items-center justify-center min-h-[42px] px-4 sm:px-5 text-xs font-bold uppercase tracking-[0.12em] bg-[#141517] text-white hover:bg-[#3F4734] transition-colors"
            >
              <span>Lihat Katalog</span>
            </Link>

            {/* Mobile Menu Button (>= 44x44px touch target with visible label) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="lg:hidden min-h-[44px] px-3 inline-flex items-center gap-1.5 bg-white border border-[#DCDCD4] text-[#141517] active:bg-[#EFEFEA] transition-colors text-xs font-bold uppercase tracking-wider"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4" aria-hidden="true" />
                  <span>Tutup</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4" aria-hidden="true" />
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-drawer"
            aria-label="Menu Lengkap Mobile"
            className="lg:hidden border-t border-[#DCDCD4] bg-white px-4 pt-3 pb-5 space-y-3 shadow-xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[44px] px-3.5 flex items-center justify-between text-xs uppercase tracking-wider font-bold border transition-colors ${
                      isActive
                        ? 'border-[#141517] bg-[#141517] text-white'
                        : 'border-[#DCDCD4] bg-[#F7F7F4] text-[#141517]'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/studio"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-3.5 flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold border border-[#DCDCD4] bg-[#EFF2EC] text-[#28301F]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Admin CMS</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-[#EFEFEA] grid grid-cols-2 gap-2">
              <a
                href={SITE_CONFIG.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 bg-[#F7F7F4] border border-[#141517] text-xs font-bold uppercase tracking-wider text-[#141517]"
              >
                <span>Shopee Resmi</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 bg-[#3F4734] text-xs font-bold uppercase tracking-wider text-white"
              >
                <span>Chat WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Mobile Bottom App Navigation Bar (Hidden on product detail page where Sticky Buy Bar lives) */}
      {!isProductDetailPage && (
        <nav
          aria-label="Navigasi Cepat Bawah"
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#DCDCD4] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] grid grid-cols-4 h-15"
        >
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              pathname === '/' ? 'text-[#141517] bg-[#F7F7F4]' : 'text-[#4A4D52]'
            }`}
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Beranda</span>
          </Link>

          <Link
            href="/catalog"
            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              pathname.startsWith('/catalog')
                ? 'text-[#141517] bg-[#F7F7F4]'
                : 'text-[#4A4D52]'
            }`}
          >
            <Grid className="w-4 h-4" aria-hidden="true" />
            <span>Katalog</span>
          </Link>

          <Link
            href="/lookbook"
            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              pathname.startsWith('/lookbook')
                ? 'text-[#141517] bg-[#F7F7F4]'
                : 'text-[#4A4D52]'
            }`}
          >
            <Camera className="w-4 h-4" aria-hidden="true" />
            <span>Lookbook</span>
          </Link>

          <Link
            href="/contact"
            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              pathname.startsWith('/contact')
                ? 'text-[#141517] bg-[#F7F7F4]'
                : 'text-[#4A4D52]'
            }`}
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>Kontak</span>
          </Link>
        </nav>
      )}
    </>
  );
}
