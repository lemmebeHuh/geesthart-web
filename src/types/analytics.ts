export interface AnalyticsEvent {
  type: 'pageview' | 'click_store' | 'view_sizechart';
  path: string;
  referrer?: string;
  platform?: 'Shopee' | 'WhatsApp' | 'TikTok Shop' | 'Tokopedia';
  productSlug?: string;
  productName?: string;
  timestamp: string;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  todayViews: number;
  referrers: { source: string; count: number }[];
  popularPages: { path: string; label: string; views: number }[];
  popularProducts: { slug: string; name: string; views: number }[];
  storeClicks: {
    platform: 'Shopee' | 'WhatsApp' | 'TikTok Shop' | 'Tokopedia';
    clicks: number;
  }[];
}

