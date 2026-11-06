import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@sanity/client';
import { getProducts, writeLocalCmsProducts } from '@/lib/data';
import { INITIAL_PRODUCTS } from '@/data/seed-data';
import { Product } from '@/types/geesthart';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'a2ie5vo6';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_WRITE_TOKEN =
  process.env.SANITY_API_WRITE_TOKEN ||
  'sk0bElarDElBthbYXhn4mbIUkXnmZeJZuA6QeEpDLvpFmg0HtsfUENpfjSX537Awhe3YeM0VbK453DqwoFZijXCXBFUFbzmDCQJTVh2ASkI5msn3JEoeb7nJmoXHiDw89dYWUct7s6uCiqSgzqF37atBQfDHLaTFO1sZzk3sOpRIAIkDWowj';

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(
    {
      products,
      sanityProjectId: SANITY_PROJECT_ID,
      sanityDataset: SANITY_DATASET,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { products, sanityToken } = body as {
      products: Product[];
      sanityToken?: string;
    };

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Format data produk tidak valid' },
        { status: 400 }
      );
    }

    // 1. Try local cache write (safely ignored on Vercel read-only filesystem)
    try {
      await writeLocalCmsProducts(products);
    } catch {
      // Ignore EROFS on serverless environment
    }

    // 2. Persist directly to Sanity Cloud (Primary Source of Truth on Vercel)
    const tokenToUse = sanityToken || SANITY_WRITE_TOKEN;
    let sanitySynced = false;
    let sanityMessage = '';

    if (tokenToUse && SANITY_PROJECT_ID) {
      try {
        const writeClient = createClient({
          projectId: SANITY_PROJECT_ID,
          dataset: SANITY_DATASET,
          apiVersion: '2025-02-01',
          token: tokenToUse,
          useCdn: false,
        });

        const transaction = writeClient.transaction();

        for (const prod of products) {
          const docId = prod.id.replace(/[^a-zA-Z0-9_-]/g, '-');
          transaction.createOrReplace({
            _id: docId,
            _type: 'product',
            name: prod.name,
            slug: { _type: 'slug', current: prod.slug },
            category: prod.category,
            genderType: prod.genderType,
            collection: prod.collection,
            price: prod.price,
            status: prod.status,
            shortDescription: prod.shortDescription,
            description: prod.description,
            materialSpecs: prod.materialSpecs,
            features: prod.features,
            mainImageUrl: prod.mainImage,
            galleryUrls: prod.gallery,
            colors: prod.colors.map((c, idx) => ({
              _key: `color-${idx}`,
              name: c.name,
              hex: c.hex,
              imageUrl: c.image,
            })),
            sizeChart: prod.sizeChart.map((s, idx) => ({
              _key: `size-${idx}`,
              ...s,
            })),
            marketplaceLinks: prod.marketplaceLinks.map((m, idx) => ({
              _key: `mp-${idx}`,
              ...m,
            })),
            order: prod.order,
          });
        }

        await transaction.commit();
        sanitySynced = true;
        sanityMessage = `Produk berhasil disimpan ke Sanity Cloud (${SANITY_PROJECT_ID}/${SANITY_DATASET})!`;
      } catch (sanityErr: any) {
        console.error('Sanity write error:', sanityErr);
        sanityMessage = `Catatan Sanity: ${sanityErr?.message || 'Gagal sinkron'}`;
      }
    }

    // Revalidate Next.js cache so the public site updates immediately
    revalidatePath('/');
    revalidatePath('/catalog');
    revalidatePath('/lookbook');
    products.forEach((p) => revalidatePath(`/product/${p.slug}`));

    return NextResponse.json({
      ok: true,
      products,
      sanitySynced,
      sanityMessage,
    });
  } catch (error: any) {
    console.error('Save product error:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menyimpan produk' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.action === 'reset') {
      try {
        await writeLocalCmsProducts(INITIAL_PRODUCTS);
      } catch {
        // ignore
      }
      revalidatePath('/');
      revalidatePath('/catalog');
      return NextResponse.json({ ok: true, products: INITIAL_PRODUCTS });
    }
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Gagal mereset data' },
      { status: 500 }
    );
  }
}
