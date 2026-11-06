'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, SlidersHorizontal, Compass } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F7F4]/95 backdrop-blur-md border-b border-[#E2E2DC]">
      {/* Top Technical Utility Strip */}
      <div className="bg-[#141517] text-[#F7F7F4] text-[11px] tracking-[0.16em] uppercase py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#8FA377]" />
            <span>BANDUNG, ID // EST. 2024 — &ldquo;OWN YOUR PATH&rdquo;</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-neutral-300">
            <span>OUTDOOR &amp; URBAN TECHNICAL APPAREL</span>
            <span className="text-neutral-600">|</span>
            <a
              href={SITE_CONFIG.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#A8BC8F] transition-colors inline-flex items-center gap-1"
            >
              SHOPEE OFFICIAL <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Desktop Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.15em] font-semibold transition-colors relative py-1 ${
                  isActive
                    ? 'text-[#141517]'
                    : 'text-neutral-500 hover:text-[#141517]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#555D47]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 -ml-2 text-[#141517] hover:bg-neutral-200/60 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Center: Official Geesthart Wordmark */}
        <Link
          href="/"
          className="flex items-center justify-center focus:outline-none"
          aria-label="Geesthart Home"
        >
          <BrandLogo variant="dark" size="md" />
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] border border-[#D5D5CE] text-neutral-700 hover:border-[#141517] hover:text-[#141517] transition-colors bg-white"
            title="Panel Admin CMS Sanity"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#555D47]" />
            <span>CMS Panel</span>
          </Link>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] bg-[#141517] text-white hover:bg-[#555D47] transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Katalog</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E2DC] bg-[#F7F7F4] px-4 pt-4 pb-6 space-y-4">
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
                  className={`px-3 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold border-l-2 transition-colors ${
                    isActive
                      ? 'border-[#555D47] bg-white text-[#141517]'
                      : 'border-transparent text-neutral-600 hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold border-l-2 border-transparent text-[#555D47] hover:bg-white/60 flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>CMS Panel (Owner)</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-[#E2E2DC] grid grid-cols-2 gap-2">
            <a
              href={SITE_CONFIG.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[#E2E2DC] text-[11px] font-semibold uppercase tracking-wider text-[#141517]"
            >
              <span>Shopee</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#555D47] text-[11px] font-semibold uppercase tracking-wider text-white"
            >
              <span>WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

