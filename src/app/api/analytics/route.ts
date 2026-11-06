import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { AnalyticsEvent, AnalyticsSummary } from '@/types/analytics';

const ANALYTICS_STORE_PATH = path.join(
  process.cwd(),
  'src',
  'data',
  'analytics-store.json'
);

async function getAnalyticsData(): Promise<AnalyticsSummary> {
  try {
    const raw = await fs.readFile(ANALYTICS_STORE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {
      totalPageViews: 0,
      uniqueVisitors: 0,
      todayViews: 0,
      referrers: [],
      popularPages: [],
      popularProducts: [],
      storeClicks: [],
    };
  }
}

async function saveAnalyticsData(data: AnalyticsSummary): Promise<void> {
  try {
    await fs.mkdir(path.dirname(ANALYTICS_STORE_PATH), { recursive: true });
    await fs.writeFile(
      ANALYTICS_STORE_PATH,
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  } catch (err) {
    console.error('Failed to save analytics:', err);
  }
}

export async function GET() {
  const data = await getAnalyticsData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const event = (await request.json()) as AnalyticsEvent;
    const data = await getAnalyticsData();

    if (event.type === 'pageview') {
      data.totalPageViews += 1;
      data.todayViews += 1;

      // Track page
      const foundPage = data.popularPages.find((p) => p.path === event.path);
      if (foundPage) {
        foundPage.views += 1;
      } else {
        data.popularPages.push({
          path: event.path,
          label: event.path,
          views: 1,
        });
      }

      // Track product view if on product page
      if (event.productSlug) {
        const foundProd = data.popularProducts.find(
          (p) => p.slug === event.productSlug
        );
        if (foundProd) {
          foundProd.views += 1;
        } else {
          data.popularProducts.push({
            slug: event.productSlug,
            name: event.productName || event.productSlug,
            views: 1,
          });
        }
      }

      // Track referrer
      if (event.referrer) {
        let refCategory = 'Direct / Link in Bio';
        const refLower = event.referrer.toLowerCase();
        if (refLower.includes('instagram')) refCategory = 'Instagram (@geesthart)';
        else if (refLower.includes('tiktok')) refCategory = 'TikTok (@geesthart_)';
        else if (refLower.includes('google')) refCategory = 'Google Search';
        else if (refLower.includes('whatsapp')) refCategory = 'WhatsApp Share';

        const foundRef = data.referrers.find((r) => r.source === refCategory);
        if (foundRef) {
          foundRef.count += 1;
        } else {
          data.referrers.push({ source: refCategory, count: 1 });
        }
      }
    } else if (event.type === 'click_store' && event.platform) {
      const foundStore = data.storeClicks.find(
        (s) => s.platform === event.platform
      );
      if (foundStore) {
        foundStore.clicks += 1;
      } else {
        data.storeClicks.push({ platform: event.platform, clicks: 1 });
      }
    }

    await saveAnalyticsData(data);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
