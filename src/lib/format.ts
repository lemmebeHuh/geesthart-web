import { Product, ProductCategory, ProductStatus } from '@/types/geesthart';
import { SITE_CONFIG } from '@/data/seed-data';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s+/g, '');
}

export function getCategoryLabel(category: ProductCategory): string {
  switch (category) {
    case 'jaket':
      return 'Jaket';
    case 'celana-panjang':
      return 'Celana Panjang';
    case 'celana-pendek':
      return 'Celana Pendek & Skort';
    default:
      return category;
  }
}

export function getStatusBadge(status: ProductStatus): {
  label: string;
  className: string;
  dotColor: string;
} {
  switch (status) {
    case 'tersedia':
      return {
        label: 'Tersedia',
        className: 'bg-[#555D47]/10 text-[#3B4230] border-[#555D47]/25',
        dotColor: 'bg-[#555D47]',
      };
    case 'segera-hadir':
      return {
        label: 'Segera Hadir',
        className: 'bg-[#283A66]/10 text-[#283A66] border-[#283A66]/25',
        dotColor: 'bg-[#283A66]',
      };
    case 'habis':
      return {
        label: 'Habis Terjual',
        className: 'bg-neutral-200 text-neutral-600 border-neutral-300',
        dotColor: 'bg-neutral-400',
      };
  }
}

export function buildWhatsAppOrderUrl(params: {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  isInquiry?: boolean;
}): string {
  const { product, selectedColor, selectedSize, isInquiry } = params;
  const phone = SITE_CONFIG.whatsappNumber;

  if (isInquiry || product.status !== 'tersedia') {
    const text = `Halo Admin Geesthart! Saya tertarik dengan produk *${product.name}* (${product.collection}). Boleh info kapan produk ini tersedia kembali / pre-order?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  const colorText = selectedColor ? ` - Warna: *${selectedColor}*` : '';
  const sizeText = selectedSize ? ` - Ukuran: *${selectedSize}*` : '';
  const priceText = formatRupiah(product.price);

  const text = `Halo Admin Geesthart! Saya ingin memesan:\n\n• Produk: *${product.name}*\n• Koleksi: ${product.collection}${colorText}${sizeText}\n• Harga Katalog: ${priceText}\n\nApakah stoknya masih tersedia? Terima kasih!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

