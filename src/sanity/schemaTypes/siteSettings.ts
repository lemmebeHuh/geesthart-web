export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Pengaturan Website & Brand',
  type: 'document',
  fields: [
    { name: 'brandName', title: 'Nama Brand', type: 'string', initialValue: 'GEESTHART' },
    { name: 'tagline', title: 'Tagline Utama', type: 'string', initialValue: 'Own your path' },
    { name: 'whatsappNumber', title: 'Nomor WhatsApp (Awali 62)', type: 'string', initialValue: '6285798039277' },
    { name: 'shopeeUrl', title: 'Link Shopee Resmi', type: 'url', initialValue: 'https://shopee.co.id/geesthart' },
    { name: 'tokopediaUrl', title: 'Link Tokopedia Resmi (Opsional)', type: 'url' },
    { name: 'instagramUrl', title: 'Link Instagram', type: 'url', initialValue: 'https://www.instagram.com/geesthart/' },
    { name: 'tiktokUrl', title: 'Link TikTok', type: 'url', initialValue: 'https://www.tiktok.com/@geesthart_' },
    { name: 'brandStory', title: 'Cerita Halaman Tentang', type: 'text', rows: 6 },
  ],
};

