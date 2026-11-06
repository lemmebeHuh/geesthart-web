import fs from 'fs/promises';
import path from 'path';
import { INITIAL_LOOKBOOKS, INITIAL_PRODUCTS } from '@/data/seed-data';
import { isSanityConfigured, sanityClient, urlFor } from '@/sanity/client';
import { LookbookEntry, Product } from '@/types/geesthart';

const CMS_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'cms-store.json');

const PRODUCTS_QUERY = `*[_type == "product"] | order(order asc) {
  "id": _id,
  name,
  "slug": slug.current,
  category,
  genderType,
  collection,
  price,
  status,
  shortDescription,
  description,
  materialSpecs,
  features,
  mainImage,
  mainImageUrl,
  gallery,
  galleryUrls,
  colors,
  sizeChart,
  marketplaceLinks,
  order
}`;

export async function readLocalCmsProducts(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(CMS_STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Safe fallback in serverless or before file creation
  }
  return INITIAL_PRODUCTS;
}

export async function writeLocalCmsProducts(products: Product[]): Promise<void> {
  // On Vercel / Lambda, filesystem is read-only (/var/task).
  // Always wrap in try/catch so EROFS is safely ignored without crashing the API.
  try {
    await fs.mkdir(path.dirname(CMS_STORE_PATH), { recursive: true });
    await fs.writeFile(CMS_STORE_PATH, JSON.stringify(products, null, 2), 'utf-8');
  } catch {
    // Expected in serverless read-only environments; data is stored in Sanity Cloud.
  }
}

export async function getProducts(): Promise<Product[]> {
  // 1. Prioritize live data from Sanity Cloud if configured
  if (isSanityConfigured && sanityClient) {
    try {
      const raw = await sanityClient.fetch(PRODUCTS_QUERY, {}, { cache: 'no-store' });
      if (Array.isArray(raw) && raw.length > 0) {
        return raw.map((item: any, idx: number) => {
          const resolvedMainImg =
            item.mainImageUrl ||
            (item.mainImage ? urlFor(item.mainImage)?.url() : '') ||
            '/images/products/nimble-x-jacket-black.jpg';

          const resolvedGallery =
            Array.isArray(item.galleryUrls) && item.galleryUrls.length > 0
              ? item.galleryUrls
              : Array.isArray(item.gallery)
              ? item.gallery
                  .map((g: any) => urlFor(g)?.url() || '')
                  .filter(Boolean)
              : [resolvedMainImg];

          return {
            id: item.id || `sanity-${idx}`,
            name: item.name,
            slug: item.slug,
            category: item.category || 'jaket',
            genderType: item.genderType || 'unisex',
            collection: item.collection || 'Litefield',
            price: item.price || 0,
            status: item.status || 'tersedia',
            shortDescription: item.shortDescription || '',
            description: item.description || '',
            materialSpecs: item.materialSpecs || ['Technical Outdoor Fabric'],
            features: item.features || [],
            mainImage: resolvedMainImg,
            gallery: resolvedGallery,
            colors: Array.isArray(item.colors)
              ? item.colors.map((c: any) => ({
                  name: c.name,
                  hex: c.hex || '#18191B',
                  image:
                    c.imageUrl ||
                    (c.image ? urlFor(c.image)?.url() || '' : '') ||
                    resolvedMainImg,
                }))
              : [],
            sizeChart: Array.isArray(item.sizeChart) ? item.sizeChart : [],
            sizeChartImage:
              item.category === 'jaket'
                ? '/images/sizecharts/sizechart-jacket.png'
                : item.category === 'celana-panjang'
                ? '/images/sizecharts/sizechart-trackpants.png'
                : '/images/sizecharts/sizechart-skort.jpg',
            marketplaceLinks: Array.isArray(item.marketplaceLinks)
              ? item.marketplaceLinks
              : [],
            order: item.order ?? idx + 1,
            isFeatured: true,
          };
        });
      }
    } catch (error) {
      console.warn('Sanity fetch fallback to local data:', error);
    }
  }

  // 2. Fallback to local store or initial seed
  return readLocalCmsProducts();
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getLookbooks(): Promise<LookbookEntry[]> {
  return INITIAL_LOOKBOOKS;
}
