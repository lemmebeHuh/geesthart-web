'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SITE_CONFIG } from '@/data/seed-data';

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/catalog', label: 'Katalog' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/about', label: 'Tentang' },
  { href: '/contact', label: 'Kontak' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // R-26 / R-32: Close mobile menu with Escape key
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
    <header className="sticky top-0 z-40 w-full bg-[#F7F7F4] border-b border-[#DCDCD4]">
      {/* Top Identity Strip */}
      <div className="bg-[#141517] text-[#F7F7F4] text-[11px] tracking-[0.12em] uppercase py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <p className="truncate font-medium">
            Bandung, Indonesia (Est. 2024) • Own Your Path
          </p>
          <div className="hidden md:flex items-center gap-5 text-neutral-300">
            <span>Pakaian Outdoor &amp; Streetwear Harian</span>
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

      {/* Main Navigation Bar (Compact on mobile per antislop-layoutmobile) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 sm:h-18 flex items-center justify-between gap-2">
        {/* Left: Desktop Links */}
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

        {/* Mobile Labeled Menu Button ( >= 44x44px touch target, labeled per antislop-layoutmobile) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          className="lg:hidden min-h-[44px] px-3 -ml-2 inline-flex items-center gap-2 text-[#141517] hover:bg-[#EFEFEA] active:bg-[#E2E2DC] transition-colors text-xs font-bold uppercase tracking-wider"
        >
          {mobileMenuOpen ? (
            <>
              <X className="w-5 h-5" aria-hidden="true" />
              <span>Tutup</span>
            </>
          ) : (
            <>
              <Menu className="w-5 h-5" aria-hidden="true" />
              <span>Menu</span>
            </>
          )}
        </button>

        {/* Center: Official Geesthart Wordmark */}
        <Link
          href="/"
          className="flex items-center justify-center min-h-[44px] px-1"
          aria-label="Beranda Geesthart Bandung"
        >
          <BrandLogo variant="dark" size="sm" className="sm:hidden" />
          <BrandLogo variant="dark" size="md" className="hidden sm:inline-flex" />
        </Link>

        {/* Right: Primary Actions (>= 44px touch targets) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center gap-1.5 min-h-[44px] px-3.5 text-xs font-bold uppercase tracking-[0.1em] border border-[#C8C8C0] text-[#141517] hover:border-[#141517] hover:bg-white active:bg-[#EFEFEA] transition-colors bg-[#F7F7F4]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#3F4734]" aria-hidden="true" />
            <span>Panel CMS</span>
          </Link>

          <Link
            href="/catalog"
            className="inline-flex items-center justify-center min-h-[44px] px-3.5 sm:px-5 text-xs font-bold uppercase tracking-[0.12em] bg-[#141517] text-white hover:bg-[#3F4734] active:bg-[#2F3627] transition-colors"
          >
            <span>Lihat Katalog</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Menu Mobile"
          className="lg:hidden border-t border-[#DCDCD4] bg-[#F7F7F4] px-4 pt-3 pb-6 space-y-4 shadow-lg"
        >
          <div className="flex flex-col space-y-1">
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
                  className={`min-h-[44px] px-3.5 flex items-center justify-between text-xs uppercase tracking-[0.14em] font-bold border-l-2 transition-colors ${
                    isActive
                      ? 'border-[#3F4734] bg-white text-[#141517]'
                      : 'border-transparent text-[#4A4D52] hover:bg-white/70 hover:text-[#141517]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="text-[10px] font-mono text-[#3F4734]">Aktif</span>
                  )}
                </Link>
              );
            })}
            <Link
              href="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] px-3.5 flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-bold border-l-2 border-transparent text-[#3F4734] hover:bg-white/70"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>Panel Admin &amp; Statistik</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-[#DCDCD4] grid grid-cols-2 gap-2.5">
            <a
              href={SITE_CONFIG.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 bg-white border border-[#141517] text-xs font-bold uppercase tracking-wider text-[#141517] active:bg-[#EFEFEA]"
            >
              <span>Toko Shopee</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 bg-[#3F4734] text-xs font-bold uppercase tracking-wider text-white active:bg-[#2F3627]"
            >
              <span>Chat WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
