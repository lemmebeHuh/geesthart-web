import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import { AnalyticsEvent, AnalyticsSummary } from '@/types/analytics';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a2ie5vo6';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_WRITE_TOKEN =
  process.env.SANITY_API_WRITE_TOKEN ||
  'sk0bElarDElBthbYXhn4mbIUkXnmZeJZuA6QeEpDLvpFmg0HtsfUENpfjSX537Awhe3YeM0VbK453DqwoFZijXCXBFUFbzmDCQJTVh2ASkI5msn3JEoeb7nJmoXHiDw89dYWUct7s6uCiqSgzqF37atBQfDHLaTFO1sZzk3sOpRIAIkDWowj';

function getSanityClient() {
  return createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: '2025-02-01',
    token: SANITY_WRITE_TOKEN,
    useCdn: false,
  });
}

const DEFAULT_SUMMARY: AnalyticsSummary = {
  totalPageViews: 0,
  uniqueVisitors: 0,
  todayViews: 0,
  referrers: [],
  popularPages: [],
  popularProducts: [],
  storeClicks: [
    { platform: 'Shopee', clicks: 0 },
    { platform: 'WhatsApp', clicks: 0 },
    { platform: 'TikTok Shop', clicks: 0 },
    { platform: 'Tokopedia', clicks: 0 },
  ],
};

export async function GET() {
  try {
    const client = getSanityClient();
    const doc = await client.fetch(
      `*[_id == "geesthart_analytics"][0]{
        totalPageViews,
        uniqueVisitors,
        todayViews,
        lastUpdatedDate,
        shopeeClicks,
        whatsappClicks,
        tiktokClicks,
        tokopediaClicks,
        referrers,
        popularPages,
        popularProducts
      }`,
      {},
      { cache: 'no-store' }
    );

    if (!doc) {
      return NextResponse.json(DEFAULT_SUMMARY, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    const todayViews =
      doc.lastUpdatedDate === todayStr ? doc.todayViews || 0 : 0;

    const summary: AnalyticsSummary = {
      totalPageViews: doc.totalPageViews || 0,
      uniqueVisitors:
        doc.uniqueVisitors ||
        Math.max(1, Math.round((doc.totalPageViews || 0) * 0.75)),
      todayViews,
      referrers: Array.isArray(doc.referrers) ? doc.referrers : [],
      popularPages: Array.isArray(doc.popularPages) ? doc.popularPages : [],
      popularProducts: Array.isArray(doc.popularProducts)
        ? doc.popularProducts
        : [],
      storeClicks: [
        { platform: 'Shopee', clicks: doc.shopeeClicks || 0 },
        { platform: 'WhatsApp', clicks: doc.whatsappClicks || 0 },
        { platform: 'TikTok Shop', clicks: doc.tiktokClicks || 0 },
        { platform: 'Tokopedia', clicks: doc.tokopediaClicks || 0 },
      ],
    };

    return NextResponse.json(summary, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Failed to fetch analytics from Sanity:', error);
    return NextResponse.json(DEFAULT_SUMMARY);
  }
}

export async function POST(request: Request) {
  try {
    const event = (await request.json()) as AnalyticsEvent;
    const client = getSanityClient();
    const todayStr = new Date().toISOString().slice(0, 10);

    // 1. Ensure initial document exists with all counters
    await client.createIfNotExists({
      _id: 'geesthart_analytics',
      _type: 'siteAnalytics',
      totalPageViews: 0,
      uniqueVisitors: 0,
      todayViews: 0,
      lastUpdatedDate: todayStr,
      shopeeClicks: 0,
      whatsappClicks: 0,
      tiktokClicks: 0,
      tokopediaClicks: 0,
      referrers: [],
      popularPages: [],
      popularProducts: [],
    });

    if (event.type === 'pageview') {
      const patch = client
        .patch('geesthart_analytics')
        .setIfMissing({
          todayViews: 0,
          totalPageViews: 0,
          uniqueVisitors: 0,
          referrers: [],
          popularPages: [],
          popularProducts: [],
        })
        .inc({ totalPageViews: 1, todayViews: 1 })
        .set({ lastUpdatedDate: todayStr });

      await patch.commit();
    } else if (event.type === 'click_store' && event.platform) {
      let fieldToInc: string | null = null;
      if (event.platform === 'Shopee') fieldToInc = 'shopeeClicks';
      else if (event.platform === 'WhatsApp') fieldToInc = 'whatsappClicks';
      else if (event.platform === 'TikTok Shop') fieldToInc = 'tiktokClicks';
      else if (event.platform === 'Tokopedia') fieldToInc = 'tokopediaClicks';

      if (fieldToInc) {
        await client
          .patch('geesthart_analytics')
          .setIfMissing({
            shopeeClicks: 0,
            whatsappClicks: 0,
            tiktokClicks: 0,
            tokopediaClicks: 0,
          })
          .inc({ [fieldToInc]: 1 })
          .commit();
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Failed to update analytics event:', error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
