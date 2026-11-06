export const productSchema = {
  name: 'product',
  title: 'Produk Geesthart',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nama Produk',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori Produk',
      type: 'string',
      options: {
        list: [
          { title: 'Jaket (Unisex)', value: 'jaket' },
          { title: 'Celana Panjang / Trackpants (Unisex)', value: 'celana-panjang' },
          { title: 'Celana Pendek / Skort', value: 'celana-pendek' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'genderType',
      title: 'Gender / Tipe',
      type: 'string',
      options: {
        list: [
          { title: 'Unisex', value: 'unisex' },
          { title: 'Wanita (Skort / Women Series)', value: 'wanita' },
        ],
        layout: 'radio',
      },
      initialValue: 'unisex',
    },
    {
      name: 'collection',
      title: 'Seri Koleksi',
      type: 'string',
      options: {
        list: [
          { title: 'Fieldlite', value: 'Fieldlite' },
          { title: 'Litefield', value: 'Litefield' },
          { title: 'Nimble X', value: 'Nimble X' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Harga (Rupiah)',
      type: 'number',
      description: 'Contoh: 320699 untuk Rp320.699',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'status',
      title: 'Status Ketersediaan',
      type: 'string',
      options: {
        list: [
          { title: 'Tersedia', value: 'tersedia' },
          { title: 'Segera Hadir (Coming Soon)', value: 'segera-hadir' },
          { title: 'Habis (Sold Out)', value: 'habis' },
        ],
        layout: 'radio',
      },
      initialValue: 'tersedia',
    },
    {
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
      initialValue: 1,
    },
    {
      name: 'shortDescription',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 2,
    },
    {
      name: 'description',
      title: 'Deskripsi Lengkap',
      type: 'text',
      rows: 5,
    },
    {
      name: 'mainImage',
      title: 'Foto Utama',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'gallery',
      title: 'Galeri Foto',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'colors',
      title: 'Varian Warna',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'colorVariant',
          fields: [
            { name: 'name', title: 'Nama Warna (mis: Green Olive)', type: 'string' },
            { name: 'hex', title: 'Kode Hex Warna (mis: #555D47)', type: 'string' },
            { name: 'image', title: 'Foto Varian Warna', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    },
    {
      name: 'features',
      title: 'Fitur Produk',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Contoh: Hoodie adjustable, 6 saku fungsional, Windproof material',
    },
    {
      name: 'sizeChart',
      title: 'Tabel Ukuran (Size Chart dalam cm)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sizeRow',
          fields: [
            {
              name: 'size',
              title: 'Ukuran',
              type: 'string',
              options: { list: ['S', 'M', 'L', 'XL', 'XXL'] },
            },
            { name: 'lebar', title: 'Lebar Dada (Jaket - cm)', type: 'number' },
            { name: 'panjang', title: 'Panjang Badan (Jaket - cm)', type: 'number' },
            { name: 'panjangLengan', title: 'Panjang Lengan (Jaket - cm)', type: 'number' },
            { name: 'pinggangMin', title: 'Pinggang Min (Celana - cm)', type: 'number' },
            { name: 'pinggangMax', title: 'Pinggang Max (Celana - cm)', type: 'number' },
            { name: 'lebarPaha', title: 'Lebar / Lingkar Paha (Celana - cm)', type: 'number' },
            { name: 'tinggiCelana', title: 'Tinggi / Panjang Celana (cm)', type: 'number' },
            { name: 'lingkarKaki', title: 'Lingkar Kaki (Trackpants - opsional cm)', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'marketplaceLinks',
      title: 'Link Marketplace Produk',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'marketplaceLink',
          fields: [
            {
              name: 'platform',
              title: 'Nama Marketplace',
              type: 'string',
              options: { list: ['Shopee', 'Tokopedia', 'TikTok Shop', 'WhatsApp'] },
            },
            { name: 'url', title: 'URL Produk', type: 'url' },
            { name: 'label', title: 'Label Tombol', type: 'string' },
          ],
        },
      ],
    },
  ],
};

