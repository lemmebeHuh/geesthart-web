'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string>('');

  useEffect(() => {
    // Avoid double logging on initial mount or identical paths, and don't count owner studio visits
    if (pathname && pathname !== lastPath.current && !pathname.startsWith('/studio') && !pathname.startsWith('/api')) {
      lastPath.current = pathname;

      try {
        const referrer = typeof document !== 'undefined' ? document.referrer : '';
        const isProduct = pathname.startsWith('/product/');
        const productSlug = isProduct ? pathname.replace('/product/', '') : undefined;

        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          cache: 'no-store',
          body: JSON.stringify({
            type: 'pageview',
            path: pathname,
            referrer,
            productSlug,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {});
      } catch {
        // Analytics failures shouldn't break UI
      }
    }
  }, [pathname]);

  return null;
}

export function trackStoreClick(platform: 'Shopee' | 'WhatsApp' | 'TikTok Shop' | 'Tokopedia', productSlug?: string) {
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      cache: 'no-store',
      body: JSON.stringify({
        type: 'click_store',
        path: typeof window !== 'undefined' ? window.location.pathname : '',
        platform,
        productSlug,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  } catch {
    // ignore
  }
}

