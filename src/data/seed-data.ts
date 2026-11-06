import { Product, LookbookEntry, SiteConfig } from '@/types/geesthart';

export const SITE_CONFIG: SiteConfig = {
  brandName: 'GEESTHART',
  tagline: 'Own your path',
  foundedYear: 2024,
  originCity: 'Bandung, Indonesia',
  whatsappNumber: '6285798039277',
  whatsappDisplay: '0857-9803-9277',
  email: 'hello@geesthart.com',
  shopeeUrl: 'https://shopee.co.id/geesthart',
  instagramUrl: 'https://www.instagram.com/geesthart/',
  instagramHandle: '@geesthart',
  tiktokUrl: 'https://www.tiktok.com/@geesthart_',
  tiktokHandle: '@geesthart_',
};

export const JACKET_SIZE_CHART = [
  { size: 'S' as const, lebar: 56, panjang: 62, panjangLengan: 56 },
  { size: 'M' as const, lebar: 58, panjang: 64, panjangLengan: 59 },
  { size: 'L' as const, lebar: 61, panjang: 72, panjangLengan: 63 },
  { size: 'XL' as const, lebar: 62, panjang: 73, panjangLengan: 63 },
  { size: 'XXL' as const, lebar: 64, panjang: 73, panjangLengan: 64 },
];

export const TRACKPANTS_SIZE_CHART = [
  { size: 'M' as const, pinggangMin: 28, pinggangMax: 34, lebarPaha: 31, tinggiCelana: 90, lingkarKaki: 21 },
  { size: 'L' as const, pinggangMin: 32, pinggangMax: 37, lebarPaha: 34, tinggiCelana: 100, lingkarKaki: 22 },
  { size: 'XL' as const, pinggangMin: 34, pinggangMax: 39, lebarPaha: 37, tinggiCelana: 100, lingkarKaki: 23 },
  { size: 'XXL' as const, pinggangMin: 36, pinggangMax: 41, lebarPaha: 40, tinggiCelana: 102, lingkarKaki: 24 },
];

export const SHORTPANTS_SIZE_CHART = [
  { size: 'S' as const, pinggangMin: 30, pinggangMax: 35, lebarPaha: 61, tinggiCelana: 42 },
  { size: 'M' as const, pinggangMin: 32, pinggangMax: 37, lebarPaha: 62, tinggiCelana: 43 },
  { size: 'L' as const, pinggangMin: 34, pinggangMax: 39, lebarPaha: 62, tinggiCelana: 44 },
  { size: 'XL' as const, pinggangMin: 36, pinggangMax: 41, lebarPaha: 63, tinggiCelana: 45 },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-nimble-x-jacket',
    name: 'Fieldcore Jacket Nimble X Series',
    slug: 'fieldcore-jacket-nimble-x-series',
    category: 'jaket',
    genderType: 'unisex',
    collection: 'Nimble X',
    price: 320699,
    status: 'tersedia',
    shortDescription:
      'Jaket parachute crinkle tahan angin dengan 6 saku fungsional dan tudung storm hood untuk cuaca dataran tinggi maupun berkendara di kota.',
    description:
      'Dibuat di Bandung untuk menghadapi udara dingin hutan pinus sekaligus ritme harian di jalanan kota. Fieldcore Jacket Nimble X menggunakan kain crinkle nylon ringan yang menahan angin dan cipratan air hujan ringan. Tudung kepala dilengkapi brim pendek dan tali stopper elastis, dipadukan dengan enam saku di bagian dada, samping, dan lengan kiri.',
    materialSpecs: [
      'Kain utama crinkle parachute nylon ringan',
      'Lapisan penahan angin dan cipratan air ringan',
      'Furing jaring (mesh) di bagian dalam agar tidak gerah',
      'Kancing tekan logam dan ritsleting utama tahan karat',
    ],
    features: [
      'Tudung kepala dengan tali serut stopper di bagian belakang',
      '6 kompartemen saku (2 saku dada flap, 2 saku samping ritsleting, 1 saku lengan, 1 saku dalam)',
      'Patch karet tenun logo GH di lengan',
      'Pergelangan tangan elastis dan tali serut di pinggang bawah',
      'Potongan boxy yang memberi ruang nyaman untuk kaos atau hoodie di bagian dalam',
    ],
    mainImage: '/images/products/nimble-x-jacket-black.jpg',
    hoverImage: '/images/products/nimble-x-jacket-green-olive.jpg',
    gallery: [
      '/images/products/nimble-x-jacket-black.jpg',
      '/images/products/nimble-x-jacket-green-olive.jpg',
      '/images/products/nimble-x-jacket-blue-oxford.jpg',
    ],
    colors: [
      {
        name: 'Black',
        hex: '#18191B',
        image: '/images/products/nimble-x-jacket-black.jpg',
      },
      {
        name: 'Green Olive',
        hex: '#555D47',
        image: '/images/products/nimble-x-jacket-green-olive.jpg',
      },
      {
        name: 'Blue Oxford',
        hex: '#283A66',
        image: '/images/products/nimble-x-jacket-blue-oxford.jpg',
      },
    ],
    sizeChart: JACKET_SIZE_CHART,
    sizeChartImage: '/images/sizecharts/sizechart-jacket.png',
    marketplaceLinks: [
      {
        platform: 'Shopee',
        url: 'https://shopee.co.id/geesthart',
        label: 'Beli di Shopee Official',
      },
      {
        platform: 'TikTok Shop',
        url: 'https://www.tiktok.com/@geesthart_',
        label: 'Beli lewat TikTok Shop',
      },
    ],
    order: 1,
    isFeatured: true,
  },
  {
    id: 'prod-litefield-pants',
    name: 'Geesthart Litefield Trackpants',
    slug: 'geesthart-litefield-trackpants',
    category: 'celana-panjang',
    genderType: 'unisex',
    collection: 'Litefield',
    price: 237200,
    status: 'tersedia',
    shortDescription:
      'Celana panjang unisex berpotongan loose-straight dari bahan taslan crinkle ringan dengan tali serut stopper di bukaan kaki.',
    description:
      'Geesthart Litefield Trackpants dirancang untuk pemakaian seharian, baik saat jalur trekking ringan maupun aktivitas komuter di dalam kota. Potongan pipa longgar memberi ruang gerak di bagian paha dan lutut, dilengkapi tali stopper di ujung mata kaki agar jatuh celana bisa diatur lurus atau mengerucut sesuai sepatu yang dipakai.',
    materialSpecs: [
      'Kain nylon crinkle taslan bertekstur matte',
      'Cepat kering saat terkena air dan mudah dibersihkan',
      'Karet pinggang elastis dengan tali pengencang di bagian dalam',
      'Label tenun GH di saku belakang',
    ],
    features: [
      'Bukaan mata kaki dilengkapi stopper serut untuk mengatur siluet celana',
      '2 saku samping yang dalam dan 1 saku belakang',
      'Bobot ringan dan ringkas saat dilipat ke dalam tas',
      'Jahitan penguat (bartack) di titik tumpuan saku dan selangkangan',
    ],
    mainImage: '/images/products/litefield-pants-olive-1.jpg',
    hoverImage: '/images/products/litefield-pants-black-1.jpg',
    gallery: [
      '/images/products/litefield-pants-olive-1.jpg',
      '/images/products/litefield-pants-olive-2.jpg',
      '/images/products/litefield-pants-black-1.jpg',
      '/images/products/litefield-pants-black-2.jpg',
    ],
    colors: [
      {
        name: 'Green Olive',
        hex: '#555D47',
        image: '/images/products/litefield-pants-olive-1.jpg',
      },
      {
        name: 'Black',
        hex: '#18191B',
        image: '/images/products/litefield-pants-black-1.jpg',
      },
    ],
    sizeChart: TRACKPANTS_SIZE_CHART,
    sizeChartImage: '/images/sizecharts/sizechart-trackpants.png',
    marketplaceLinks: [
      {
        platform: 'Shopee',
        url: 'https://shopee.co.id/geesthart',
        label: 'Beli di Shopee Official',
      },
      {
        platform: 'TikTok Shop',
        url: 'https://www.tiktok.com/@geesthart_',
        label: 'Beli lewat TikTok Shop',
      },
    ],
    order: 2,
    isFeatured: true,
  },
  {
    id: 'prod-litefield-skort',
    name: 'Litefield Skort Short Pants Women',
    slug: 'litefield-skort-short-pants-women',
    category: 'celana-pendek',
    genderType: 'wanita',
    collection: 'Litefield',
    price: 127450,
    status: 'tersedia',
    shortDescription:
      'Kombinasi rok lipat asimetris di bagian depan dan celana pendek di bagian dalam dengan saku tempel kontras untuk olahraga maupun jalan santai.',
    description:
      'Litefield Skort menggabungkan tampilan rok di tampak depan dengan konstruksi celana pendek penuh di bagian dalam sehingga tetap aman saat bergerak cepat. Dilengkapi saku depan berpenutup dengan warna kontras dan garis piping melengkung yang khas, nyaman dipakai untuk padel, tenis, lari pagi, atau aktivitas harian.',
    materialSpecs: [
      'Campuran nylon-spandex ringan yang sejuk di kulit',
      'Tidak menahan keringat dan cepat kering',
      'Saku depan berpenutup dengan kontras warna',
      'Pinggang karet elastis yang tidak menekan perut',
    ],
    features: [
      'Konstruksi 2-in-1: tampak rok di depan, celana pendek di bagian dalam',
      'Saku tempel depan yang muat menyimpan kunci atau kartu',
      'Garis piping tepi melengkung mengikuti gerak langkah',
      'Tersedia dalam 5 pilihan warna dari netral hingga pastel',
    ],
    mainImage: '/images/products/litefield-skort-pink-1.jpeg',
    hoverImage: '/images/products/litefield-skort-pink-2.jpeg',
    gallery: [
      '/images/products/litefield-skort-pink-1.jpeg',
      '/images/products/litefield-skort-pink-2.jpeg',
    ],
    colors: [
      {
        name: 'Pink',
        hex: '#D8BBD0',
        image: '/images/products/litefield-skort-pink-1.jpeg',
      },
      {
        name: 'Black',
        hex: '#18191B',
        image: '/images/products/litefield-skort-pink-2.jpeg',
      },
      {
        name: 'Green Olive',
        hex: '#555D47',
        image: '/images/products/litefield-skort-pink-1.jpeg',
      },
      {
        name: 'Teddy',
        hex: '#A8896C',
        image: '/images/products/litefield-skort-pink-1.jpeg',
      },
      {
        name: 'Cream',
        hex: '#EDE6D6',
        image: '/images/products/litefield-skort-pink-1.jpeg',
      },
    ],
    sizeChart: SHORTPANTS_SIZE_CHART,
    sizeChartImage: '/images/sizecharts/sizechart-skort.jpg',
    marketplaceLinks: [
      {
        platform: 'Shopee',
        url: 'https://shopee.co.id/geesthart',
        label: 'Beli di Shopee Official',
      },
      {
        platform: 'TikTok Shop',
        url: 'https://www.tiktok.com/@geesthart_',
        label: 'Beli lewat TikTok Shop',
      },
    ],
    order: 3,
    isFeatured: true,
  },
  {
    id: 'prod-litefield-shortpants',
    name: 'Litefield Shortpants Unisex',
    slug: 'litefield-shortpants-unisex',
    category: 'celana-pendek',
    genderType: 'unisex',
    collection: 'Litefield',
    price: 69699,
    status: 'tersedia',
    shortDescription:
      'Celana pendek unisex berpotongan di atas lutut dari bahan taslan crinkle ringan yang cepat kering untuk cuaca panas dan aktivitas luar ruang.',
    description:
      'Litefield Shortpants dirancang dengan potongan di atas lutut (panjang 42 sampai 45 cm) agar langkah kaki lebih leluasa. Menggunakan karet pinggang penuh dan tali pengatur di bagian dalam sehingga pas di berbagai ukuran pinggang.',
    materialSpecs: [
      'Kain taslan crinkle ringan',
      'Tahan cipratan air dan cepat kering',
      'Kantung saku bagian dalam berbahan jaring agar air tidak menggenang',
    ],
    features: [
      'Potongan santai di atas lutut dengan lingkar paha lega (61 sampai 63 cm)',
      'Pinggang karet elastis penuh dengan tali serut',
      '2 saku samping dan 1 saku belakang',
      'Label tenun asli Geesthart Bandung',
    ],
    mainImage: '/images/products/litefield-pants-black-2.jpg',
    hoverImage: '/images/products/litefield-pants-black-1.jpg',
    gallery: [
      '/images/products/litefield-pants-black-2.jpg',
      '/images/products/litefield-pants-black-1.jpg',
    ],
    colors: [
      {
        name: 'Black',
        hex: '#18191B',
        image: '/images/products/litefield-pants-black-2.jpg',
      },
      {
        name: 'Navy',
        hex: '#1E293B',
        image: '/images/products/litefield-pants-black-1.jpg',
      },
    ],
    sizeChart: SHORTPANTS_SIZE_CHART,
    sizeChartImage: '/images/sizecharts/sizechart-skort.jpg',
    marketplaceLinks: [
      {
        platform: 'Shopee',
        url: 'https://shopee.co.id/geesthart',
        label: 'Beli di Shopee Official',
      },
      {
        platform: 'TikTok Shop',
        url: 'https://www.tiktok.com/@geesthart_',
        label: 'Beli lewat TikTok Shop',
      },
    ],
    order: 4,
    isFeatured: true,
  },
  {
    id: 'prod-fieldlite-anorak',
    name: 'Fieldlite Packable Anorak Pullover',
    slug: 'fieldlite-packable-anorak-pullover',
    category: 'jaket',
    genderType: 'unisex',
    collection: 'Fieldlite',
    price: 289000,
    status: 'segera-hadir',
    shortDescription:
      'Jaket anorak half-zip ringan yang dapat dilipat masuk ke dalam saku depannya sendiri, praktis dibawa di dalam tas harian.',
    description:
      'Bagian dari seri Fieldlite yang mengutamakan bobot seringan mungkin tanpa mengurangi fungsi penahan angin. Saat cuaca siang sedang terik, jaket ini bisa dilipat masuk ke dalam saku kanguru depannya hingga seukuran pouch kecil, dan langsung dibuka ketika udara mulai dingin.',
    materialSpecs: [
      'Nylon ripstop 20D dengan lapisan penahan gerimis',
      'Saku kanguru depan yang berfungsi ganda sebagai kantung lipat',
      'Tali penarik ritsleting dengan benang reflektif',
    ],
    features: [
      'Dapat dilipat penuh ke dalam saku depan (packable)',
      'Celah sirkulasi udara di bagian punggung atas',
      'Ritsleting setengah dada dengan pelindung dagu',
      'Detail reflektif untuk visibilitas saat malam hari',
    ],
    mainImage: '/images/products/nimble-x-jacket-blue-oxford.jpg',
    hoverImage: '/images/products/nimble-x-jacket-black.jpg',
    gallery: [
      '/images/products/nimble-x-jacket-blue-oxford.jpg',
      '/images/products/nimble-x-jacket-black.jpg',
    ],
    colors: [
      {
        name: 'Blue Oxford',
        hex: '#283A66',
        image: '/images/products/nimble-x-jacket-blue-oxford.jpg',
      },
      {
        name: 'Black',
        hex: '#18191B',
        image: '/images/products/nimble-x-jacket-black.jpg',
      },
    ],
    sizeChart: JACKET_SIZE_CHART,
    sizeChartImage: '/images/sizecharts/sizechart-jacket.png',
    marketplaceLinks: [
      {
        platform: 'Shopee',
        url: 'https://shopee.co.id/geesthart',
        label: 'Cek di Shopee Official',
      },
    ],
    order: 5,
    isFeatured: false,
  },
  {
    id: 'prod-fieldlite-cargo-pants',
    name: 'Fieldlite Convertible Cargo Pants',
    slug: 'fieldlite-convertible-cargo-pants',
    category: 'celana-panjang',
    genderType: 'unisex',
    collection: 'Fieldlite',
    price: 275000,
    status: 'habis',
    shortDescription:
      'Celana kargo teknis dengan saku lipat berkapasitas besar dan jahitan lipatan lutut untuk ruang langkah di jalur menanjak.',
    description:
      'Rilisan pertama dari seri Fieldlite Cargo Pants. Menggunakan pola lipatan di bagian lutut (articulated knee) yang mengikuti tekukan kaki saat mendaki jalur tanah maupun menaiki tangga jembatan penyeberangan kota.',
    materialSpecs: [
      'Kain nylon dengan kelenturan mekanis dua arah',
      'Pola jahitan lutut berlipat untuk ruang tekuk kaki',
      'Saku kargo samping dengan lipatan ekspansi',
    ],
    features: [
      'Pola lutut ergonomis yang tidak menarik kain saat jongkok atau melangkah tinggi',
      '4 saku kargo dengan penutup flap',
      'Sabuk webbing bawaan yang terpasang langsung di pinggang',
    ],
    mainImage: '/images/products/litefield-pants-olive-2.jpg',
    hoverImage: '/images/products/litefield-pants-olive-1.jpg',
    gallery: [
      '/images/products/litefield-pants-olive-2.jpg',
      '/images/products/litefield-pants-olive-1.jpg',
    ],
    colors: [
      {
        name: 'Green Olive',
        hex: '#555D47',
        image: '/images/products/litefield-pants-olive-2.jpg',
      },
    ],
    sizeChart: TRACKPANTS_SIZE_CHART,
    sizeChartImage: '/images/sizecharts/sizechart-trackpants.png',
    marketplaceLinks: [
      {
        platform: 'Shopee',
        url: 'https://shopee.co.id/geesthart',
        label: 'Cek Restock di Shopee',
      },
    ],
    order: 6,
    isFeatured: false,
  },
];

export const INITIAL_LOOKBOOKS: LookbookEntry[] = [
  {
    id: 'look-01',
    title: 'Kanopi Pinus Bandung Utara',
    subtitle: 'Seri Nimble X di Jalur Dataran Tinggi',
    collection: 'Nimble X',
    realm: 'forest',
    location: 'Hutan Pinus Bandung Utara',
    season: 'Seri 01: Pakaian Luar Ruang',
    coverImage: '/images/products/nimble-x-jacket-green-olive.jpg',
    gallery: [
      '/images/products/nimble-x-jacket-green-olive.jpg',
      '/images/products/nimble-x-jacket-black.jpg',
      '/images/products/nimble-x-jacket-blue-oxford.jpg',
    ],
    description:
      'Pengujian langsung jaket parachute crinkle Nimble X di bawah rimbun pohon pinus Bandung Utara. Potongan dada yang lega memudahkan pemakaian berlapis di atas kaos maupun sweater saat udara pagi berkabut.',
    featuredProductSlugs: ['fieldcore-jacket-nimble-x-series', 'geesthart-litefield-trackpants'],
  },
  {
    id: 'look-02',
    title: 'Langkah di Aspal Kota',
    subtitle: 'Seri Litefield untuk Rutinitas Harian',
    collection: 'Litefield',
    realm: 'city',
    location: 'Distrik Pusat Kota Bandung',
    season: 'Seri 02: Utilitas Harian',
    coverImage: '/images/products/litefield-pants-black-1.jpg',
    gallery: [
      '/images/products/litefield-pants-black-1.jpg',
      '/images/products/litefield-pants-olive-1.jpg',
      '/images/products/litefield-pants-olive-2.jpg',
      '/images/products/litefield-pants-black-2.jpg',
    ],
    description:
      'Dari trotoar jalan raya hingga area parkir kota, Litefield Trackpants memadukan potongan celana lapangan yang longgar dengan bahan taslan ringan yang nyaman dipakai seharian.',
    featuredProductSlugs: ['geesthart-litefield-trackpants', 'litefield-shortpants-unisex'],
  },
  {
    id: 'look-03',
    title: 'Gerak Aktif di Lapangan',
    subtitle: 'Litefield Skort untuk Padel & Kasual',
    collection: 'Litefield',
    realm: 'court',
    location: 'Lapangan Padel Bandung',
    season: 'Seri 03: Koleksi Aktif Wanita',
    coverImage: '/images/products/litefield-skort-pink-1.jpeg',
    gallery: [
      '/images/products/litefield-skort-pink-1.jpeg',
      '/images/products/litefield-skort-pink-2.jpeg',
    ],
    description:
      'Dirancang untuk pemakaian aktif dari lapangan olahraga hingga akhir pekan di dalam kota. Bagian dalam celana pendek memberi keleluasaan melangkah, sementara tampilan luarnya tetap rapi.',
    featuredProductSlugs: ['litefield-skort-short-pants-women'],
  },
];
