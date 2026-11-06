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
    name: 'Fieldcore Jacket "Nimble X Series"',
    slug: 'fieldcore-jacket-nimble-x-series',
    category: 'jaket',
    genderType: 'unisex',
    collection: 'Nimble X',
    price: 320699,
    status: 'tersedia',
    shortDescription:
      'Jaket parachute teknikal tahan angin dengan 6 kompartemen saku fungsional untuk jelajah hutan maupun mobilitas kota.',
    description:
      'Dirancang di Bandung untuk menjembatani dua dunia: kanopi hutan pinus yang lembap dan jalanan kota yang dinamis. Fieldcore Jacket "Nimble X Series" menggunakan material crinkle nylon lightweight yang windproof dan water-repellent ringan. Dilengkapi brimmed storm hood yang dapat disesuaikan dengan stopper elastis serta konstruksi multi-pocket di dada dan lengan.',
    materialSpecs: [
      'Lightweight Crinkle Parachute Nylon',
      'Windproof & Water-Repellent Coating',
      'Breathable Inner Mesh Lining',
      'YKK Snap Button & Heavy-Duty Zipper',
    ],
    features: [
      'Adjustable Brimmed Storm Hood',
      '6 Saku Taktis (2 Chest Flap, 2 Side Zip, 1 Arm Utility, 1 Inner)',
      'Woven Rubber Patch GH di Lengan',
      'Elasticated Cuff & Hem Drawcord',
      'Potongan Boxy Gorpcore Fit',
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
        label: 'Beli via TikTok Shop',
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
      'Trackpants unisex berpotongan loose-straight dengan bahan crinkle ringan, cord adjuster di mata kaki, dan mobilitas tinggi.',
    description:
      'Geesthart Litefield Trackpants dirancang untuk kenyamanan sepanjang hari baik saat trekking ringan maupun aktivitas komuter di perkotaan. Siluet wide-relaxed memberikan sirkulasi udara maksimal, dilengkapi bukaan bawah celana dengan tali serut (toggle cord) sehingga siluet celana bisa diatur lurus maupun mengerucut.',
    materialSpecs: [
      'Nylon Crinkle Taslan Tech Fabric',
      'Quick-Dry & Anti-UV Finish',
      'Elastic Waistband dengan Internal Drawcord',
      'Signature Woven GH Patch Logo',
    ],
    features: [
      'Adjustable Hem Toggle Stopper (Bisa diserut di pergelangan kaki)',
      '2 Deep Slanted Side Pockets + Back Pocket',
      'Ultra-Lightweight & Mudah Dilipat (Packable)',
      'Jahitan Bartack di Titik Rawan Tarikan',
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
        label: 'Beli via TikTok Shop',
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
      'Perpaduan siluet rok asimetris dan celana pendek aktif dengan saku kontras. Ideal untuk padel, lari, maupun gaya kasual harian.',
    description:
      'Litefield Skort menggabungkan tampilan rok wrap modern di bagian depan dengan konstruksi celana pendek di bagian dalam untuk kebebasan bergerak tanpa khawatir. Dilengkapi saku kargo kontras yang ikonik serta material quick-dry yang sejuk saat berolahraga di lapangan maupun santai di akhir pekan.',
    materialSpecs: [
      'Featherlight Nylon-Spandex Blend',
      'Sweat-Wicking & Quick-Dry',
      'Contrast Utility Flap Pocket',
      'Elasticated High-Comfort Waist',
    ],
    features: [
      'Desain 2-in-1 (Tampilan Rok di Depan, Celana Pendek di Dalam)',
      'Saku Flap Depan Fungsional dengan Kontras Warna',
      'Piping Line Melengkung Ergonomis',
      'Cocok untuk Padel, Tennis, Trail Walk & Daily Streetwear',
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
        label: 'Beli via TikTok Shop',
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
      'Celana pendek di atas lutut berbahan nylon ringan yang cepat kering untuk aktivitas luar ruang dan mobilitas harian.',
    description:
      'Litefield Shortpants hadir sebagai celana pendek serbaguna dengan potongan di atas lutut (above-knee cut) yang memberikan keleluasaan langkah. Karet pinggang fleksibel dengan tali pengencang membuatnya nyaman dipakai dari pagi hingga malam.',
    materialSpecs: [
      'Lightweight Taslan Crinkle',
      'Water-Splash Resistant',
      'Mesh Pocket Bag (Anti-mengembung di air)',
    ],
    features: [
      'Potongan Relaxed Above-Knee Fit',
      'Pinggang Full Karet Elastis + Tali Pengatur',
      '2 Saku Samping + 1 Saku Belakang',
      'Woven Label Geesthart Original',
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
        label: 'Beli via TikTok Shop',
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
      'Anorak half-zip ultra-ringan yang dapat dilipat ke dalam saku depannya sendiri. Dirancang untuk cuaca transisi Bandung.',
    description:
      'Bagian dari koleksi Fieldlite yang berfokus pada bobot seringan mungkin tanpa mengorbankan proteksi cuaca. Dapat dilipat menjadi pouch ringkas saat matahari terik dan dibuka seketika saat kabut atau gerimis turun.',
    materialSpecs: [
      '20D Ripstop Nylon DWR',
      'Self-Packable Kangaroo Pouch',
      'Reflective Cord Pullers',
    ],
    features: [
      'Bisa dilipat ke saku depan (Packable System)',
      'Ventilasi udara tersembunyi di punggung',
      'Half-zip dengan pelindung dagu (Chin Guard)',
      'Aksen reflektif untuk visibilitas malam hari',
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
      'Celana kargo teknis dengan saku ekspansi 3D dan artikulasi lutut untuk langkah leluasa di medan menanjak.',
    description:
      'Batch pertama dari seri Fieldlite Cargo Pants. Mengusung konstruksi articulated knee yang mengikuti lekuk kaki saat melangkah di jalur berbatu maupun tangga stasiun kota.',
    materialSpecs: [
      'Mechanical Stretch Nylon',
      'Articulated Knee Pleats',
      '3D Bellow Cargo Pockets',
    ],
    features: [
      'Lipatan lutut ergonomis (Articulated Knee)',
      '4 Saku Kargo Berkapasitas Besar',
      'Webbing Belt Terintegrasi di Pinggang',
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
    title: 'PINE CANOPY // 01',
    subtitle: 'Nimble X Series in Highland Woods',
    collection: 'Nimble X',
    realm: 'forest',
    location: 'Hutan Pinus Bandung Utara',
    season: 'Drop 01 — All-Weather Fieldcore',
    coverImage: '/images/products/nimble-x-jacket-green-olive.jpg',
    gallery: [
      '/images/products/nimble-x-jacket-green-olive.jpg',
      '/images/products/nimble-x-jacket-black.jpg',
      '/images/products/nimble-x-jacket-blue-oxford.jpg',
    ],
    description:
      'Eksplorasi ketahanan material parachute crinkle di bawah kanopi pinus dataran tinggi Bandung. Potongan boxy memberikan ruang layering yang leluasa saat suhu turun.',
    featuredProductSlugs: ['fieldcore-jacket-nimble-x-series', 'geesthart-litefield-trackpants'],
  },
  {
    id: 'look-02',
    title: 'CONCRETE GRID // 02',
    subtitle: 'Litefield Series on Urban Asphalt',
    collection: 'Litefield',
    realm: 'city',
    location: 'Distrik Urban Bandung',
    season: 'Drop 02 — Everyday Utility',
    coverImage: '/images/products/litefield-pants-black-1.jpg',
    gallery: [
      '/images/products/litefield-pants-black-1.jpg',
      '/images/products/litefield-pants-olive-1.jpg',
      '/images/products/litefield-pants-olive-2.jpg',
      '/images/products/litefield-pants-black-2.jpg',
    ],
    description:
      'Dari gang beton hingga parkiran bawah tanah, Litefield Trackpants membawa siluet gorpcore yang bersih dan fungsional untuk pergerakan tanpa batas di dalam kota.',
    featuredProductSlugs: ['geesthart-litefield-trackpants', 'litefield-shortpants-unisex'],
  },
  {
    id: 'look-03',
    title: 'COURT MOTION // 03',
    subtitle: 'Active Skort & Hybrid Movement',
    collection: 'Litefield',
    realm: 'court',
    location: 'Padel Court Bandung',
    season: 'Drop 03 — Active Sport',
    coverImage: '/images/products/litefield-skort-pink-1.jpeg',
    gallery: [
      '/images/products/litefield-skort-pink-1.jpeg',
      '/images/products/litefield-skort-pink-2.jpeg',
    ],
    description:
      'Dirancang untuk generasi aktif yang berpindah dari lapangan olahraga langsung ke tempat kopi sore tanpa perlu berganti pakaian.',
    featuredProductSlugs: ['litefield-skort-short-pants-women'],
  },
];

