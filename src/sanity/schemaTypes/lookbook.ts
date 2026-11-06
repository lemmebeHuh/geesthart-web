export const lookbookSchema = {
  name: 'lookbook',
  title: 'Lookbook Koleksi',
  type: 'document',
  fields: [
    { name: 'title', title: 'Judul Lookbook', type: 'string' },
    { name: 'subtitle', title: 'Subjudul', type: 'string' },
    {
      name: 'collection',
      title: 'Koleksi Terkait',
      type: 'string',
      options: { list: ['Fieldlite', 'Litefield', 'Nimble X'] },
    },
    {
      name: 'realm',
      title: 'Konsep Dunia (Realm)',
      type: 'string',
      options: {
        list: [
          { title: 'Hutan (Outdoor Forest)', value: 'forest' },
          { title: 'Kota (Urban Street)', value: 'city' },
          { title: 'Lapangan Aktif (Active Court)', value: 'court' },
        ],
      },
    },
    { name: 'location', title: 'Lokasi Pemotretan', type: 'string' },
    { name: 'season', title: 'Musim / Drop', type: 'string' },
    { name: 'coverImage', title: 'Foto Sampul', type: 'image', options: { hotspot: true } },
    {
      name: 'gallery',
      title: 'Foto-foto Lookbook',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    { name: 'description', title: 'Cerita Koleksi', type: 'text', rows: 4 },
  ],
};

