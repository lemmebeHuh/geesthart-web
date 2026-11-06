'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  INITIAL_PRODUCTS,
  JACKET_SIZE_CHART,
  SHORTPANTS_SIZE_CHART,
  SITE_CONFIG,
  TRACKPANTS_SIZE_CHART,
} from '@/data/seed-data';
import {
  Product,
  ProductCategory,
  ProductCollection,
  ProductGender,
  ProductStatus,
} from '@/types/geesthart';
import { AnalyticsSummary } from '@/types/analytics';
import { formatRupiah, getCategoryLabel } from '@/lib/format';
import {
  Database,
  Sliders,
  ExternalLink,
  Plus,
  Save,
  Trash2,
  CheckCircle2,
  CloudUpload,
  KeyRound,
  RotateCcw,
  ArrowUpRight,
  BarChart3,
  TrendingUp,
  Users,
  MousePointerClick,
  Compass,
  ShoppingBag,
  Eye,
  RefreshCw,
} from 'lucide-react';

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'analytics'>('products');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState<boolean>(false);
  const [sanityToken, setSanityToken] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newCollection, setNewCollection] =
    useState<ProductCollection>('Litefield');
  const [newCategory, setNewCategory] = useState<ProductCategory>('jaket');
  const [newGender, setNewGender] = useState<ProductGender>('unisex');
  const [newPrice, setNewPrice] = useState<number>(250000);
  const [newStatus, setNewStatus] = useState<ProductStatus>('tersedia');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newImage, setNewImage] = useState(
    '/images/products/nimble-x-jacket-black.jpg'
  );
  const [newColorName, setNewColorName] = useState('Black');
  const [newColorHex, setNewColorHex] = useState('#18191B');

  const fetchAnalytics = () => {
    setAnalyticsLoading(true);
    fetch(`/api/analytics?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch(() => {})
      .finally(() => setAnalyticsLoading(false));
  };

  useEffect(() => {
    fetch(`/api/cms/products?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {});

    fetchAnalytics();
  }, []);

  const handleStatusChange = (id: string, newStatusVal: ProductStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatusVal } : p))
    );
  };

  const handlePriceChange = (id: string, newPriceVal: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: newPriceVal } : p))
    );
  };

  const handleNameChange = (id: string, nameVal: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: nameVal } : p))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveAll = async (customProducts?: Product[]) => {
    const listToSave = customProducts || products;
    setSaving(true);
    setFeedback('');
    try {
      const res = await fetch('/api/cms/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: listToSave,
          sanityToken: sanityToken.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setFeedback(
          data.sanityMessage ||
            'Perubahan berhasil disimpan! Halaman Katalog & Beranda sudah ter-update.'
        );
      } else {
        setFeedback(`Gagal menyimpan: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setFeedback(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const defaultSizeChart =
      newCategory === 'jaket'
        ? JACKET_SIZE_CHART
        : newCategory === 'celana-panjang'
        ? TRACKPANTS_SIZE_CHART
        : SHORTPANTS_SIZE_CHART;

    const defaultSizeImage =
      newCategory === 'jaket'
        ? '/images/sizecharts/sizechart-jacket.png'
        : newCategory === 'celana-panjang'
        ? '/images/sizecharts/sizechart-trackpants.png'
        : '/images/sizecharts/sizechart-skort.jpg';

    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newName,
      slug: slug || `product-${Date.now()}`,
      category: newCategory,
      genderType: newGender,
      collection: newCollection,
      price: newPrice,
      status: newStatus,
      shortDescription:
        newShortDesc ||
        `Artikel terbaru dari koleksi ${newCollection} Geesthart Bandung.`,
      description:
        newShortDesc ||
        `Dirancang dengan standar teknis Geesthart Bandung untuk aktivitas outdoor maupun harian di perkotaan.`,
      materialSpecs: ['Technical Crinkle Nylon', 'Water-Repellent Finish'],
      features: ['Ergonomic Gorpcore Fit', 'Signature Woven GH Patch'],
      mainImage: newImage,
      gallery: [newImage],
      colors: [
        {
          name: newColorName,
          hex: newColorHex,
          image: newImage,
        },
      ],
      sizeChart: defaultSizeChart,
      sizeChartImage: defaultSizeImage,
      marketplaceLinks: [
        {
          platform: 'Shopee',
          url: SITE_CONFIG.shopeeUrl,
          label: 'Beli di Shopee Official',
        },
        {
          platform: 'TikTok Shop',
          url: SITE_CONFIG.tiktokUrl,
          label: 'Beli via TikTok Shop',
        },
      ],
      order: products.length + 1,
      isFeatured: true,
    };

    const updated = [created, ...products];
    setProducts(updated);
    setShowAddModal(false);
    setNewName('');
    setNewShortDesc('');
    await handleSaveAll(updated);
  };

  const handleResetDefault = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' }),
      });
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
        setFeedback('Data katalog dikembalikan ke 6 produk awal Geesthart.');
      }
    } finally {
      setSaving(false);
    }
  };

  const totalStoreClicks =
    analytics?.storeClicks?.reduce((acc, curr) => acc + curr.clicks, 0) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-8">
      {/* Top Header with Live Project ID a2ie5vo6 */}
      <div className="bg-[#141517] text-white p-6 sm:p-8 border border-[#141517] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#555D47] text-[10px] font-bold uppercase tracking-[0.18em] mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>SANITY PROJECT ID: a2ie5vo6 • DATASET: production</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
            Geesthart Brand Panel &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 max-w-2xl leading-relaxed">
            Kelola katalog produk, update harga, serta pantau statistik kunjungan dan konversi klik toko langsung dari satu tempat.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {activeTab === 'products' ? (
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-3 bg-[#555D47] hover:bg-[#687257] text-white text-xs font-extrabold uppercase tracking-[0.14em] transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={fetchAnalytics}
              disabled={analyticsLoading}
              className="px-4 py-3 bg-[#555D47] hover:bg-[#687257] disabled:opacity-50 text-white text-xs font-extrabold uppercase tracking-[0.14em] transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${analyticsLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Metrik</span>
            </button>
          )}

          <a
            href="https://vercel.com/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-white text-[#141517] text-xs font-extrabold uppercase tracking-[0.14em] hover:bg-[#9CAF84] transition-colors inline-flex items-center gap-2"
          >
            <span>Vercel Analytics</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Tabs Switcher: Produk vs Statistik */}
      <div className="flex items-center gap-6 border-b border-[#E2E2DC] pt-2">
        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-xs font-extrabold uppercase tracking-[0.16em] transition-all flex items-center gap-2 relative ${
            activeTab === 'products'
              ? 'text-[#141517]'
              : 'text-neutral-500 hover:text-[#141517]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Katalog Produk ({products.length})</span>
          {activeTab === 'products' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#555D47]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 text-xs font-extrabold uppercase tracking-[0.16em] transition-all flex items-center gap-2 relative ${
            activeTab === 'analytics'
              ? 'text-[#141517]'
              : 'text-neutral-500 hover:text-[#141517]'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Statistik Kunjungan &amp; Traffic</span>
          <span className="px-1.5 py-0.5 text-[9px] bg-[#555D47]/15 text-[#555D47] rounded-sm font-bold">
            Live
          </span>
          {activeTab === 'analytics' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#555D47]" />
          )}
        </button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className="p-4 bg-[#555D47]/15 border border-[#555D47] text-[#141517] text-xs font-bold flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#555D47] shrink-0" />
            <span>{feedback}</span>
          </div>
          <Link
            href="/catalog"
            className="px-3 py-1.5 bg-[#141517] text-white text-[10px] uppercase tracking-wider inline-flex items-center gap-1 shrink-0"
          >
            <span>Lihat di Katalog</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* ================= TAB 1: PRODUK & SINKRONISASI ================= */}
      {activeTab === 'products' && (
        <>
          {/* Sanity Cloud Sync Box */}
          <div className="bg-white border border-[#E2E2DC] p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#283A66]">
                  <CloudUpload className="w-4 h-4" />
                  <span>Sinkronisasi Cloud Sanity (Project ID: a2ie5vo6)</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Setiap klik <strong>&ldquo;Simpan Semua Perubahan&rdquo;</strong> otomatis memperbarui website. Token Editor kamu sudah tersimpan di sistem untuk push ke project <code>a2ie5vo6</code>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                <div className="relative">
                  <KeyRound className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={sanityToken}
                    onChange={(e) => setSanityToken(e.target.value)}
                    placeholder="Token Tersimpan (Bisa ditimpa)"
                    className="w-full sm:w-64 pl-9 pr-3 py-2.5 text-xs bg-[#F7F7F4] border border-[#D5D5CE] focus:outline-none focus:border-[#141517]"
                  />
                </div>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSaveAll()}
                  className="px-5 py-2.5 bg-[#141517] hover:bg-[#555D47] disabled:opacity-50 text-white text-xs font-extrabold uppercase tracking-[0.14em] transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Product Table */}
          <div className="bg-white border border-[#E2E2DC] p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#E2E2DC]">
              <div>
                <h2 className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#141517] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#555D47]" />
                  <span>Daftar Katalog Produk Aktif ({products.length} Artikel)</span>
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Ubah nama, harga, atau status stok di bawah ini lalu klik tombol <strong>Simpan Semua Perubahan</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetDefault}
                className="text-xs font-semibold text-neutral-500 hover:text-[#141517] inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Data Awal</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F7F7F4] border-y border-[#E2E2DC] text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                    <th className="py-3 px-4">Nama Produk</th>
                    <th className="py-3 px-4">Koleksi &amp; Kategori</th>
                    <th className="py-3 px-4">Varian Warna</th>
                    <th className="py-3 px-4">Harga (Rp)</th>
                    <th className="py-3 px-4">Status Stok</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DC]">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#F7F7F4]/50">
                      <td className="py-3.5 px-4">
                        <input
                          type="text"
                          value={prod.name}
                          onChange={(e) => handleNameChange(prod.id, e.target.value)}
                          className="w-full min-w-[200px] px-2.5 py-1.5 bg-[#F7F7F4] border border-[#D5D5CE] font-bold text-[#141517]"
                        />
                        <Link
                          href={`/product/${prod.slug}`}
                          className="inline-block text-[10px] font-mono text-[#283A66] hover:underline mt-1"
                        >
                          Lihat halaman: /product/{prod.slug} ↗
                        </Link>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-[#141517] text-white text-[10px] font-bold uppercase">
                          {prod.collection}
                        </span>
                        <span className="block text-[11px] text-neutral-500 mt-1">
                          {getCategoryLabel(prod.category)} ({prod.genderType})
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {prod.colors.map((c) => (
                            <span
                              key={c.name}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F7F7F4] border border-[#E2E2DC] text-[10px]"
                            >
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: c.hex }}
                              />
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <input
                          type="number"
                          value={prod.price}
                          onChange={(e) =>
                            handlePriceChange(prod.id, Number(e.target.value) || 0)
                          }
                          className="w-28 px-2.5 py-1.5 bg-[#F7F7F4] border border-[#D5D5CE] font-bold text-[#141517]"
                        />
                        <span className="block text-[10px] text-neutral-500 mt-0.5">
                          {formatRupiah(prod.price)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={prod.status}
                          onChange={(e) =>
                            handleStatusChange(prod.id, e.target.value as ProductStatus)
                          }
                          className="px-2.5 py-1.5 bg-white border border-[#D5D5CE] font-bold text-xs text-[#141517]"
                        >
                          <option value="tersedia">Tersedia</option>
                          <option value="segera-hadir">Segera Hadir</option>
                          <option value="habis">Habis (Sold Out)</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                          title="Hapus produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ================= TAB 2: STATISTIK KUNJUNGAN & TRAFFIC ================= */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Real Analytics Status Banner & Vercel Web Analytics Banner */}
          <div className="bg-white border border-[#141517] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517]">
                  Statistik Real-Time Aktif (Cloud Sanity a2ie5vo6 + Vercel)
                </span>
              </div>
              <p className="text-xs text-neutral-600 max-w-2xl leading-relaxed">
                Data di bawah ini mencatat pengunjung asli dan setiap klik ke channel marketplace (Shopee, TikTok, WhatsApp). Karena baru saja diaktifkan, angka bertambah otomatis seiring bertambahnya pengunjung website.
              </p>
            </div>

            <a
              href="https://vercel.com/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#141517] text-white hover:bg-[#555D47] text-xs font-extrabold uppercase tracking-[0.14em] transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <BarChart3 className="w-4 h-4 text-[#9CAF84]" />
              <span>Buka Grafik Vercel Analytics</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {analytics && (
            <>
              {/* Top 4 KPI Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E2E2DC] p-5">
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.16em]">
                      Total Pageviews
                    </span>
                    <Eye className="w-4 h-4 text-[#555D47]" />
                  </div>
                  <div className="text-3xl font-black text-[#141517]">
                    {analytics.totalPageViews.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    Kunjungan asli sejak aktif
                  </span>
                </div>

                <div className="bg-white border border-[#E2E2DC] p-5">
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.16em]">
                      Pengunjung Unik (Est)
                    </span>
                    <Users className="w-4 h-4 text-[#283A66]" />
                  </div>
                  <div className="text-3xl font-black text-[#141517]">
                    {analytics.uniqueVisitors.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    Pengguna berbeda
                  </span>
                </div>

                <div className="bg-white border border-[#E2E2DC] p-5">
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.16em]">
                      Kunjungan Hari Ini
                    </span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black text-emerald-700">
                    +{analytics.todayViews.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    Sesi aktif hari ini
                  </span>
                </div>

                <div className="bg-white border border-[#E2E2DC] p-5">
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.16em]">
                      Total Klik Beli (CTA)
                    </span>
                    <MousePointerClick className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-3xl font-black text-[#141517]">
                    {totalStoreClicks.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    Klik ke Shopee, WA, TT
                  </span>
                </div>
              </div>

              {/* Row 2: Traffic Referral vs Conversion Store Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Referrers (6 cols) */}
                <div className="lg:col-span-6 bg-white border border-[#E2E2DC] p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DC]">
                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517]">
                        Sumber Kunjungan (Traffic Referrers)
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Asal link pengunjung (Instagram, TikTok, Google, Direct)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    {analytics.referrers.length === 0 ? (
                      <p className="text-xs text-neutral-500 italic py-4 text-center">
                        Belum ada data rujukan. Data akan terisi otomatis saat pengunjung datang dari Instagram bio, TikTok, atau link langsung.
                      </p>
                    ) : (
                      analytics.referrers.map((ref) => {
                        const percent = Math.round(
                          (ref.count / (analytics.totalPageViews || 1)) * 100
                        );
                        return (
                          <div key={ref.source} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="text-[#141517]">{ref.source}</span>
                              <span className="text-neutral-500 font-mono">
                                {ref.count} klik ({percent}%)
                              </span>
                            </div>
                            <div className="w-full bg-[#F7F7F4] h-2 rounded-xs overflow-hidden border border-[#E2E2DC]">
                              <div
                                className="bg-[#555D47] h-full"
                                style={{ width: `${Math.min(percent, 100)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right: Conversion By Store (6 cols) */}
                <div className="lg:col-span-6 bg-white border border-[#E2E2DC] p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DC]">
                    <div>
                      <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517]">
                        Konversi Saluran Pembelian
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Jumlah klik tombol beli ke masing-masing channel resmi
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 pt-2">
                    {analytics.storeClicks.map((store) => (
                      <div
                        key={store.platform}
                        className="p-4 bg-[#F7F7F4] border border-[#E2E2DC] space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#141517]">
                            {store.platform}
                          </span>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#555D47]" />
                        </div>
                        <div className="text-2xl font-black text-[#141517]">
                          {store.clicks}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                          Klik Checkout
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-[#555D47]/10 text-xs text-neutral-700 leading-relaxed border border-[#555D47]/20 mt-4">
                    <strong>Catatan Real-time:</strong> Setiap kali pembeli mengklik tombol Shopee, WhatsApp, atau TikTok di modal checkout produk, counter di atas bertambah secara instan.
                  </div>
                </div>
              </div>

              {/* Row 3: Popular Products & Pages */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Top Products (7 cols) */}
                <div className="lg:col-span-7 bg-white border border-[#E2E2DC] p-6 space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517] pb-3 border-b border-[#E2E2DC]">
                    Artikel Produk Paling Banyak Dilihat (Top Views)
                  </h3>
                  <div className="space-y-3 pt-1">
                    {analytics.popularProducts.length === 0 ? (
                      <p className="text-xs text-neutral-500 italic py-4 text-center">
                        Belum ada halaman produk yang dikunjungi. Kunjungan baru akan otomatis terdaftar di sini.
                      </p>
                    ) : (
                      analytics.popularProducts.map((prod, idx) => (
                        <div
                          key={prod.slug}
                          className="flex items-center justify-between p-3 bg-[#F7F7F4] border border-[#E2E2DC] hover:border-[#141517] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 bg-[#141517] text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-[#141517]">
                                {prod.name}
                              </h4>
                              <Link
                                href={`/product/${prod.slug}`}
                                className="text-[10px] text-neutral-500 hover:underline"
                              >
                                /product/{prod.slug}
                              </Link>
                            </div>
                          </div>
                          <span className="text-xs font-black text-[#555D47]">
                            {prod.views} views
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Top Pages (5 cols) */}
                <div className="lg:col-span-5 bg-white border border-[#E2E2DC] p-6 space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517] pb-3 border-b border-[#E2E2DC]">
                    Halaman Teratas
                  </h3>
                  <div className="space-y-2.5 pt-1">
                    {analytics.popularPages.length === 0 ? (
                      <p className="text-xs text-neutral-500 italic py-4 text-center">
                        Belum ada data kunjungan halaman.
                      </p>
                    ) : (
                      analytics.popularPages.map((page) => (
                        <div
                          key={page.path}
                          className="flex items-center justify-between py-2 border-b border-[#EFEFEA] text-xs"
                        >
                          <div>
                            <span className="font-semibold text-[#141517] block">
                              {page.label}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                              {page.path}
                            </span>
                          </div>
                          <span className="font-bold text-neutral-700 font-mono">
                            {page.views}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Modal Tambah Produk Baru */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white border border-[#141517] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-extrabold uppercase tracking-[0.15em] text-[#141517] pb-3 border-b border-[#E2E2DC]">
              Tambah Produk Baru Geesthart
            </h3>

            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Fieldlite Windbreaker Jacket"
                  className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#D5D5CE]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">
                    Seri Koleksi
                  </label>
                  <select
                    value={newCollection}
                    onChange={(e) =>
                      setNewCollection(e.target.value as ProductCollection)
                    }
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#D5D5CE]"
                  >
                    <option value="Nimble X">Nimble X</option>
                    <option value="Litefield">Litefield</option>
                    <option value="Fieldlite">Fieldlite</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">
                    Kategori (Otomatis Size Chart)
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as ProductCategory)
                    }
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#D5D5CE]"
                  >
                    <option value="jaket">Jaket</option>
                    <option value="celana-panjang">Celana Panjang</option>
                    <option value="celana-pendek">Celana Pendek / Skort</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">
                    Gender
                  </label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as ProductGender)}
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#D5D5CE]"
                  >
                    <option value="unisex">Unisex</option>
                    <option value="wanita">Wanita</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#D5D5CE]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">
                    Status Stok
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ProductStatus)}
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#D5D5CE]"
                  >
                    <option value="tersedia">Tersedia</option>
                    <option value="segera-hadir">Segera Hadir</option>
                    <option value="habis">Habis</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">
                  Pilih Foto Produk (Dari Aset atau URL)
                </label>
                <select
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#D5D5CE]"
                >
                  <option value="/images/products/nimble-x-jacket-black.jpg">
                    Nimble X Jacket — Black
                  </option>
                  <option value="/images/products/nimble-x-jacket-green-olive.jpg">
                    Nimble X Jacket — Green Olive
                  </option>
                  <option value="/images/products/nimble-x-jacket-blue-oxford.jpg">
                    Nimble X Jacket — Blue Oxford
                  </option>
                  <option value="/images/products/litefield-pants-black-1.jpg">
                    Litefield Trackpants — Black
                  </option>
                  <option value="/images/products/litefield-pants-olive-1.jpg">
                    Litefield Trackpants — Green Olive
                  </option>
                  <option value="/images/products/litefield-skort-pink-1.jpeg">
                    Litefield Skort — Pink
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">
                    Nama Warna Utama
                  </label>
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#D5D5CE]"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider mb-1">
                    Warna Swatch
                  </label>
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-full h-9 bg-[#F7F7F4] border border-[#D5D5CE] p-1"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  placeholder="Deskripsi singkat produk..."
                  className="w-full px-3 py-2 bg-[#F7F7F4] border border-[#D5D5CE]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#D5D5CE] text-neutral-700 font-bold uppercase"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#141517] text-white font-bold uppercase"
                >
                  Simpan &amp; Publikasikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
