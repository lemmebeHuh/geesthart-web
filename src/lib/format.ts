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
        className: 'bg-[#EFF2EC] text-[#28301F] border-[#B8C2AE]',
        dotColor: 'bg-[#3F4734]',
      };
    case 'segera-hadir':
      return {
        label: 'Segera Hadir',
        className: 'bg-[#EDF1F7] text-[#1D2B4D] border-[#B4C2DC]',
        dotColor: 'bg-[#1D2B4D]',
      };
    case 'habis':
      return {
        label: 'Habis Terjual',
        className: 'bg-[#EFEFEA] text-[#45474B] border-[#C8C8C0]',
        dotColor: 'bg-[#686B70]',
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
    const text = `Halo Admin Geesthart, saya ingin menanyakan jadwal restock / pre-order untuk produk *${product.name}* (Seri ${product.collection}). Apakah sudah ada estimasi tanggal rilisnya?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  const colorText = selectedColor ? `, warna *${selectedColor}*` : '';
  const sizeText = selectedSize ? `, ukuran *${selectedSize}*` : '';
  const priceText = formatRupiah(product.price);

  const text = `Halo Admin Geesthart, saya ingin memesan:\n\n- Produk: *${product.name}*\n- Koleksi: ${product.collection}${colorText}${sizeText}\n- Harga Katalog: ${priceText}\n\nApakah ukuran tersebut masih tersedia? Terima kasih.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
