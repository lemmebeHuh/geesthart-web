export type ProductCategory = 'jaket' | 'celana-panjang' | 'celana-pendek';

export type ProductGender = 'unisex' | 'wanita';

export type ProductCollection = 'Fieldlite' | 'Litefield' | 'Nimble X';

export type ProductStatus = 'tersedia' | 'segera-hadir' | 'habis';

export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
}

export interface SizeRow {
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  // Jaket fields
  lebar?: number;
  panjang?: number;
  panjangLengan?: number;
  // Celana fields
  pinggangMin?: number;
  pinggangMax?: number;
  lebarPaha?: number;
  tinggiCelana?: number;
  lingkarKaki?: number | null;
}

export interface MarketplaceLink {
  platform: 'Shopee' | 'Tokopedia' | 'TikTok Shop' | 'WhatsApp';
  url: string;
  label?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  genderType: ProductGender;
  collection: ProductCollection;
  price: number;
  status: ProductStatus;
  shortDescription: string;
  description: string;
  materialSpecs: string[];
  features: string[];
  mainImage: string;
  hoverImage?: string;
  gallery: string[];
  colors: ColorVariant[];
  sizeChart: SizeRow[];
  sizeChartImage: string;
  marketplaceLinks: MarketplaceLink[];
  order: number;
  isFeatured?: boolean;
}

export interface LookbookEntry {
  id: string;
  title: string;
  subtitle: string;
  collection: ProductCollection;
  realm: 'forest' | 'city' | 'court';
  location: string;
  season: string;
  coverImage: string;
  gallery: string[];
  description: string;
  featuredProductSlugs: string[];
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  foundedYear: number;
  originCity: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  shopeeUrl: string;
  tokopediaUrl?: string;
  instagramUrl: string;
  instagramHandle: string;
  tiktokUrl: string;
  tiktokHandle: string;
}

