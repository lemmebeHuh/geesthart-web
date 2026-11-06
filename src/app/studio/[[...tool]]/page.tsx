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
  ShoppingBag,
  Eye,
  RefreshCw,
  AlertCircle,
  X,
} from 'lucide-react';

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'analytics'>('products');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string>('');
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState<boolean>(true);
  const [analyticsError, setAnalyticsError] = useState<string>('');
  const [sanityToken, setSanityToken] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [isErrorFeedback, setIsErrorFeedback] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

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

  const fetchProducts = () => {
    setProductsLoading(true);
    setProductsError('');
    fetch(`/api/cms/products?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat produk dari server.');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        setProductsError(err.message || 'Gagal memuat daftar produk.');
      })
      .finally(() => setProductsLoading(false));
  };

  const fetchAnalytics = () => {
    setAnalyticsLoading(true);
    setAnalyticsError('');
    fetch(`/api/analytics?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat data statistik.');
        return res.json();
      })
      .then((data) => setAnalytics(data))
      .catch((err) => {
        setAnalyticsError(err.message || 'Gagal memuat data statistik.');
      })
      .finally(() => setAnalyticsLoading(false));
  };

  useEffect(() => {
    fetchProducts();
    fetchAnalytics();
  }, []);

  // R-26 / R-32: Close Add Product modal on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showAddModal) {
        setShowAddModal(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showAddModal]);

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
    setIsErrorFeedback(false);
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
        setIsErrorFeedback(false);
        setFeedback(
          data.sanityMessage ||
            'Perubahan disimpan. Halaman Katalog dan Beranda telah diperbarui.'
        );
      } else {
        setIsErrorFeedback(true);
        setFeedback(`Gagal menyimpan: ${data.error || 'Terjadi kesalahan'}`);
      }
    } catch (err: any) {
      setIsErrorFeedback(true);
      setFeedback(`Kesalahan koneksi: ${err.message}`);
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
        `Artikel terbaru dari seri ${newCollection} Geesthart Bandung.`,
      description:
        newShortDesc ||
        `Dirancang di Bandung untuk pemakaian luar ruang maupun aktivitas harian di kota.`,
      materialSpecs: ['Kain nilon crinkle ringan', 'Tahan cipratan air ringan'],
      features: ['Potongan nyaman bergerak', 'Label tenun resmi GH'],
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
          label: 'Beli lewat TikTok Shop',
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
        setIsErrorFeedback(false);
        setFeedback('Data katalog dikembalikan ke 6 artikel awal Geesthart.');
      }
    } finally {
      setSaving(false);
    }
  };

  const totalStoreClicks =
    analytics?.storeClicks?.reduce((acc, curr) => acc + curr.clicks, 0) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      <div className="bg-[#141517] text-white p-5 sm:p-8 border border-[#141517] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3F4734] text-[11px] font-bold uppercase tracking-[0.14em] mb-2">
            <Database className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Sanity Project: a2ie5vo6 • Dataset: production</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight">
            Panel Admin Katalog &amp; Statistik
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 max-w-2xl leading-relaxed">
            Tambah atau ubah artikel katalog serta pantau jumlah kunjungan halaman dan klik menuju toko resmi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {activeTab === 'products' ? (
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="min-h-[44px] px-4 py-2.5 bg-[#3F4734] hover:bg-[#4F5942] text-white text-xs font-extrabold uppercase tracking-[0.12em] transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Tambah Produk Baru</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={fetchAnalytics}
              disabled={analyticsLoading}
              className="min-h-[44px] px-4 py-2.5 bg-[#3F4734] hover:bg-[#4F5942] disabled:opacity-50 text-white text-xs font-extrabold uppercase tracking-[0.12em] transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${analyticsLoading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>Muat Ulang Data</span>
            </button>
          )}

          <a
            href="https://vercel.com/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2.5 bg-white text-[#141517] text-xs font-extrabold uppercase tracking-[0.12em] hover:bg-[#B8CCA0] transition-colors inline-flex items-center gap-2"
          >
            <span>Vercel Analytics</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Pilih tampilan panel admin"
        className="flex items-center gap-4 sm:gap-6 border-b border-[#DCDCD4]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'products'}
          onClick={() => setActiveTab('products')}
          className={`min-h-[44px] pb-2 text-xs font-extrabold uppercase tracking-[0.14em] transition-colors flex items-center gap-2 relative ${
            activeTab === 'products'
              ? 'text-[#141517]'
              : 'text-[#4A4D52] hover:text-[#141517]'
          }`}
        >
          <Sliders className="w-4 h-4" aria-hidden="true" />
          <span>Katalog Produk ({products.length})</span>
          {activeTab === 'products' && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#3F4734]" />
          )}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'analytics'}
          onClick={() => setActiveTab('analytics')}
          className={`min-h-[44px] pb-2 text-xs font-extrabold uppercase tracking-[0.14em] transition-colors flex items-center gap-2 relative ${
            activeTab === 'analytics'
              ? 'text-[#141517]'
              : 'text-[#4A4D52] hover:text-[#141517]'
          }`}
        >
          <BarChart3 className="w-4 h-4" aria-hidden="true" />
          <span>Statistik Kunjungan</span>
          {activeTab === 'analytics' && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#3F4734]" />
          )}
        </button>
      </div>

      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className={`p-4 border text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isErrorFeedback
              ? 'bg-[#FDF2F0] border-[#B32810] text-[#7A1807]'
              : 'bg-[#EFF2EC] border-[#3F4734] text-[#141517]'
          }`}
        >
          <div className="flex items-center gap-2">
            {isErrorFeedback ? (
              <AlertCircle className="w-4 h-4 text-[#B32810] shrink-0" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#3F4734] shrink-0" aria-hidden="true" />
            )}
            <span>{feedback}</span>
          </div>
          <Link
            href="/catalog"
            className="min-h-[38px] px-3 py-1.5 bg-[#141517] text-white text-[11px] uppercase tracking-wider inline-flex items-center justify-center gap-1 shrink-0"
          >
            <span>Lihat di Katalog</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      )}

      {activeTab === 'products' && (
        <>
          <div className="bg-white border border-[#DCDCD4] p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#1D2B4D]">
                  <CloudUpload className="w-4 h-4" aria-hidden="true" />
                  <span>Sinkronisasi Cloud Sanity (ID: a2ie5vo6)</span>
                </div>
                <p className="text-xs text-[#4A4D52] leading-relaxed">
                  Tekan tombol <strong>Simpan Semua Perubahan</strong> setelah mengubah harga, nama, atau status stok untuk memperbarui katalog publik.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2.5 shrink-0">
                <div>
                  <label
                    htmlFor="sanity-token-input"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#141517] mb-1"
                  >
                    Token Sanity (Opsional jika sudah di server)
                  </label>
                  <div className="relative">
                    <KeyRound
                      className="w-3.5 h-3.5 text-[#4A4D52] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="sanity-token-input"
                      type="password"
                      value={sanityToken}
                      onChange={(e) => setSanityToken(e.target.value)}
                      placeholder="Kosongkan untuk pakai token server"
                      className="min-h-[44px] w-full sm:w-64 pl-9 pr-3 py-2 text-xs bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleSaveAll()}
                  className="min-h-[44px] px-5 py-2.5 bg-[#141517] hover:bg-[#3F4734] disabled:opacity-50 text-white text-xs font-extrabold uppercase tracking-[0.12em] transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" aria-hidden="true" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product List Container with Loading / Error / Empty states (R-27) */}
          <div className="bg-white border border-[#DCDCD4] p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#DCDCD4]">
              <div>
                <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#141517] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#3F4734]" aria-hidden="true" />
                  <span>Daftar Artikel Katalog ({products.length})</span>
                </h2>
                <p className="text-xs text-[#4A4D52] mt-0.5">
                  Ubah nama, harga, atau status ketersediaan lalu klik Simpan Semua Perubahan.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetDefault}
                className="min-h-[40px] px-3 border border-[#C8C8C0] text-xs font-bold text-[#141517] hover:bg-[#F7F7F4] inline-flex items-center gap-1.5 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Kembalikan Data Awal</span>
              </button>
            </div>

            {productsLoading ? (
              <div role="status" className="py-12 text-center text-xs font-bold uppercase tracking-wider text-[#4A4D52]">
                Sedang memuat daftar produk dari penyimpanan...
              </div>
            ) : productsError ? (
              <div role="alert" className="p-6 bg-[#FDF2F0] border border-[#B32810] text-xs text-[#7A1807] space-y-3">
                <p className="font-bold">{productsError}</p>
                <button
                  type="button"
                  onClick={fetchProducts}
                  className="min-h-[40px] px-4 py-2 bg-[#141517] text-white font-bold uppercase"
                >
                  Coba Muat Ulang
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <p className="text-sm font-bold text-[#141517]">
                  Belum ada produk di dalam katalog.
                </p>
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="min-h-[44px] px-5 py-2.5 bg-[#141517] text-white text-xs font-bold uppercase"
                >
                  Tambah Produk Pertama
                </button>
              </div>
            ) : (
              <>
                {/* MOBILE & TABLET REFLOWED CARDS (< lg: prevents sideways table scroll on phones per R-03) */}
                <div className="lg:hidden space-y-4">
                  {products.map((prod) => (
                    <div
                      key={`mob-${prod.id}`}
                      className="p-4 bg-[#F7F7F4] border border-[#DCDCD4] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 bg-[#141517] text-white text-[10px] font-bold uppercase">
                          {prod.collection} • {getCategoryLabel(prod.category)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(prod.id)}
                          aria-label={`Hapus produk ${prod.name}`}
                          className="min-w-[40px] min-h-[40px] -mt-1 -mr-1 inline-flex items-center justify-center text-[#4A4D52] hover:text-[#B32810]"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div>
                        <label
                          htmlFor={`mob-name-${prod.id}`}
                          className="block text-[11px] font-bold uppercase text-[#4A4D52] mb-1"
                        >
                          Nama Artikel
                        </label>
                        <input
                          id={`mob-name-${prod.id}`}
                          type="text"
                          value={prod.name}
                          onChange={(e) => handleNameChange(prod.id, e.target.value)}
                          className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#C8C8C0] text-xs font-bold text-[#141517]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor={`mob-price-${prod.id}`}
                            className="block text-[11px] font-bold uppercase text-[#4A4D52] mb-1"
                          >
                            Harga (Rp)
                          </label>
                          <input
                            id={`mob-price-${prod.id}`}
                            type="number"
                            value={prod.price}
                            onChange={(e) =>
                              handlePriceChange(prod.id, Number(e.target.value) || 0)
                            }
                            className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#C8C8C0] text-xs font-bold text-[#141517] tabular-nums"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`mob-status-${prod.id}`}
                            className="block text-[11px] font-bold uppercase text-[#4A4D52] mb-1"
                          >
                            Status Stok
                          </label>
                          <select
                            id={`mob-status-${prod.id}`}
                            value={prod.status}
                            onChange={(e) =>
                              handleStatusChange(prod.id, e.target.value as ProductStatus)
                            }
                            className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#C8C8C0] text-xs font-bold text-[#141517]"
                          >
                            <option value="tersedia">Tersedia</option>
                            <option value="segera-hadir">Segera Hadir</option>
                            <option value="habis">Habis</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DESKTOP TABLE (lg+) */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F7F7F4] border-y border-[#DCDCD4] text-[11px] font-bold uppercase tracking-wider text-[#141517]">
                        <th scope="col" className="py-3 px-4">Nama Artikel</th>
                        <th scope="col" className="py-3 px-4">Seri &amp; Kategori</th>
                        <th scope="col" className="py-3 px-4">Varian Warna</th>
                        <th scope="col" className="py-3 px-4">Harga (Rp)</th>
                        <th scope="col" className="py-3 px-4">Status Stok</th>
                        <th scope="col" className="py-3 px-4 text-right">Hapus</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DCDCD4]">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#F7F7F4]/60">
                          <td className="py-3.5 px-4">
                            <label htmlFor={`desk-name-${prod.id}`} className="sr-only">
                              Nama artikel {prod.name}
                            </label>
                            <input
                              id={`desk-name-${prod.id}`}
                              type="text"
                              value={prod.name}
                              onChange={(e) => handleNameChange(prod.id, e.target.value)}
                              className="min-h-[40px] w-full min-w-[220px] px-3 py-1.5 bg-[#F7F7F4] border border-[#C8C8C0] font-bold text-[#141517]"
                            />
                            <Link
                              href={`/product/${prod.slug}`}
                              className="inline-block text-[11px] font-mono text-[#1D2B4D] hover:underline mt-1"
                            >
                              /product/{prod.slug}
                            </Link>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 bg-[#141517] text-white text-[10px] font-bold uppercase">
                              {prod.collection}
                            </span>
                            <span className="block text-xs text-[#4A4D52] mt-1">
                              {getCategoryLabel(prod.category)} ({prod.genderType})
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1.5">
                              {prod.colors.map((c) => (
                                <span
                                  key={c.name}
                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F7F7F4] border border-[#DCDCD4] text-[11px] font-medium"
                                >
                                  <span
                                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                                    style={{ backgroundColor: c.hex }}
                                    aria-hidden="true"
                                  />
                                  {c.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <label htmlFor={`desk-price-${prod.id}`} className="sr-only">
                              Harga {prod.name}
                            </label>
                            <input
                              id={`desk-price-${prod.id}`}
                              type="number"
                              value={prod.price}
                              onChange={(e) =>
                                handlePriceChange(prod.id, Number(e.target.value) || 0)
                              }
                              className="min-h-[40px] w-32 px-3 py-1.5 bg-[#F7F7F4] border border-[#C8C8C0] font-bold text-[#141517] tabular-nums"
                            />
                            <span className="block text-[11px] text-[#4A4D52] mt-0.5 tabular-nums">
                              {formatRupiah(prod.price)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <label htmlFor={`desk-status-${prod.id}`} className="sr-only">
                              Status stok {prod.name}
                            </label>
                            <select
                              id={`desk-status-${prod.id}`}
                              value={prod.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  prod.id,
                                  e.target.value as ProductStatus
                                )
                              }
                              className="min-h-[40px] px-3 py-1.5 bg-white border border-[#C8C8C0] font-bold text-xs text-[#141517]"
                            >
                              <option value="tersedia">Tersedia</option>
                              <option value="segera-hadir">Segera Hadir</option>
                              <option value="habis">Habis</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center text-[#4A4D52] hover:text-[#B32810] transition-colors"
                              aria-label={`Hapus artikel ${prod.name}`}
                            >
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white border border-[#141517] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3F4734]" aria-hidden="true" />
                <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517]">
                  Pencatatan Kunjungan Aktif (Sanity a2ie5vo6 &amp; Vercel)
                </span>
              </div>
              <p className="text-xs text-[#4A4D52] max-w-2xl leading-relaxed">
                Metrik di bawah ini dihitung dari kunjungan halaman nyata dan klik tombol pembelian menuju Shopee, TikTok Shop, maupun WhatsApp.
              </p>
            </div>

            <a
              href="https://vercel.com/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 bg-[#141517] text-white hover:bg-[#3F4734] text-xs font-extrabold uppercase tracking-[0.12em] transition-colors inline-flex items-center justify-center gap-2 shrink-0"
            >
              <BarChart3 className="w-4 h-4 text-[#B8CCA0]" aria-hidden="true" />
              <span>Buka Vercel Web Analytics</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {analyticsLoading ? (
            <div role="status" className="bg-white border border-[#DCDCD4] p-12 text-center text-xs font-bold uppercase tracking-wider text-[#4A4D52]">
              Sedang mengambil data statistik kunjungan terbaru...
            </div>
          ) : analyticsError ? (
            <div role="alert" className="bg-[#FDF2F0] border border-[#B32810] p-6 text-xs text-[#7A1807] space-y-3">
              <p className="font-bold">{analyticsError}</p>
              <button
                type="button"
                onClick={fetchAnalytics}
                className="min-h-[40px] px-4 py-2 bg-[#141517] text-white font-bold uppercase"
              >
                Coba Lagi
              </button>
            </div>
          ) : analytics ? (
            <>
              {/* Top 4 KPI Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#DCDCD4] p-5">
                  <div className="flex items-center justify-between text-[#4A4D52] mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Total Tayangan Halaman
                    </span>
                    <Eye className="w-4 h-4 text-[#3F4734]" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-black text-[#141517] tabular-nums">
                    {analytics.totalPageViews.toLocaleString('id-ID')}
                  </div>
                  <span className="text-xs text-[#4A4D52] mt-1 block">
                    Akumulasi seluruh halaman
                  </span>
                </div>

                <div className="bg-white border border-[#DCDCD4] p-5">
                  <div className="flex items-center justify-between text-[#4A4D52] mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Pengunjung Unik
                    </span>
                    <Users className="w-4 h-4 text-[#1D2B4D]" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-black text-[#141517] tabular-nums">
                    {analytics.uniqueVisitors.toLocaleString('id-ID')}
                  </div>
                  <span className="text-xs text-[#4A4D52] mt-1 block">
                    Sesi perangkat berbeda
                  </span>
                </div>

                <div className="bg-white border border-[#DCDCD4] p-5">
                  <div className="flex items-center justify-between text-[#4A4D52] mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Kunjungan Hari Ini
                    </span>
                    <TrendingUp className="w-4 h-4 text-[#3F4734]" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-black text-[#3F4734] tabular-nums">
                    +{analytics.todayViews.toLocaleString('id-ID')}
                  </div>
                  <span className="text-xs text-[#4A4D52] mt-1 block">
                    Tercatat hari ini
                  </span>
                </div>

                <div className="bg-white border border-[#DCDCD4] p-5">
                  <div className="flex items-center justify-between text-[#4A4D52] mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider">
                      Total Klik Toko Resmi
                    </span>
                    <MousePointerClick className="w-4 h-4 text-[#141517]" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-black text-[#141517] tabular-nums">
                    {totalStoreClicks.toLocaleString('id-ID')}
                  </div>
                  <span className="text-xs text-[#4A4D52] mt-1 block">
                    Klik Shopee, TikTok &amp; WA
                  </span>
                </div>
              </div>

              {/* Row 2: Traffic Referral vs Conversion Store Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Left: Referrers (6 cols) */}
                <div className="lg:col-span-6 bg-white border border-[#DCDCD4] p-5 sm:p-6 space-y-4">
                  <div className="pb-3 border-b border-[#DCDCD4]">
                    <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517]">
                      Asal Kunjungan (Traffic Referrer)
                    </h3>
                    <p className="text-xs text-[#4A4D52] mt-0.5">
                      Sumber tautan pengunjung yang masuk ke situs Geesthart
                    </p>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    {analytics.referrers.length === 0 ? (
                      <p className="text-xs text-[#4A4D52] py-4 text-center">
                        Belum ada data rujukan eksternal. Data akan muncul saat pengunjung membuka web dari tautan Instagram, TikTok, atau mesin pencari.
                      </p>
                    ) : (
                      analytics.referrers.map((ref) => {
                        const percent = Math.round(
                          (ref.count / (analytics.totalPageViews || 1)) * 100
                        );
                        return (
                          <div key={ref.source} className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="text-[#141517]">{ref.source}</span>
                              <span className="text-[#4A4D52] font-mono tabular-nums">
                                {ref.count} kunjungan ({percent}%)
                              </span>
                            </div>
                            <div className="w-full bg-[#F7F7F4] h-2.5 overflow-hidden border border-[#DCDCD4]">
                              <div
                                className="bg-[#3F4734] h-full"
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
                <div className="lg:col-span-6 bg-white border border-[#DCDCD4] p-5 sm:p-6 space-y-4">
                  <div className="pb-3 border-b border-[#DCDCD4]">
                    <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517]">
                      Jumlah Klik per Kanal Pembelian
                    </h3>
                    <p className="text-xs text-[#4A4D52] mt-0.5">
                      Perbandingan kanal toko yang dipilih pembeli saat menekan tombol Beli
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 pt-1">
                    {analytics.storeClicks.map((store) => (
                      <div
                        key={store.platform}
                        className="p-4 bg-[#F7F7F4] border border-[#DCDCD4] space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#141517]">
                            {store.platform}
                          </span>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#3F4734]" aria-hidden="true" />
                        </div>
                        <div className="text-2xl font-black text-[#141517] tabular-nums">
                          {store.clicks}
                        </div>
                        <span className="text-[11px] font-medium text-[#4A4D52] block">
                          Klik Keluar
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Popular Products & Pages */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                <div className="lg:col-span-7 bg-white border border-[#DCDCD4] p-5 sm:p-6 space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517] pb-3 border-b border-[#DCDCD4]">
                    Produk yang Paling Sering Dilihat
                  </h3>
                  <div className="space-y-2.5 pt-1">
                    {analytics.popularProducts.length === 0 ? (
                      <p className="text-xs text-[#4A4D52] py-4 text-center">
                        Belum ada halaman detail produk yang tercatat. Buka salah satu halaman produk untuk melihat statistiknya.
                      </p>
                    ) : (
                      analytics.popularProducts.map((prod, idx) => (
                        <div
                          key={prod.slug}
                          className="flex items-center justify-between p-3 bg-[#F7F7F4] border border-[#DCDCD4]"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-6 h-6 bg-[#141517] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <h4 className="text-xs font-extrabold text-[#141517] truncate">
                                {prod.name}
                              </h4>
                              <Link
                                href={`/product/${prod.slug}`}
                                className="text-[11px] text-[#1D2B4D] hover:underline truncate block"
                              >
                                /product/{prod.slug}
                              </Link>
                            </div>
                          </div>
                          <span className="text-xs font-black text-[#3F4734] tabular-nums shrink-0 ml-2">
                            {prod.views} tayangan
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-[#DCDCD4] p-5 sm:p-6 space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#141517] pb-3 border-b border-[#DCDCD4]">
                    Halaman Teratas
                  </h3>
                  <div className="space-y-2.5 pt-1">
                    {analytics.popularPages.length === 0 ? (
                      <p className="text-xs text-[#4A4D52] py-4 text-center">
                        Belum ada riwayat halaman yang tercatat.
                      </p>
                    ) : (
                      analytics.popularPages.map((page) => (
                        <div
                          key={page.path}
                          className="flex items-center justify-between py-2 border-b border-[#EFEFEA] text-xs"
                        >
                          <div>
                            <span className="font-bold text-[#141517] block">
                              {page.label}
                            </span>
                            <span className="text-[11px] font-mono text-[#4A4D52]">
                              {page.path}
                            </span>
                          </div>
                          <span className="font-extrabold text-[#141517] font-mono tabular-nums">
                            {page.views}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}

      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-product-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white border-2 border-[#141517] p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#DCDCD4]">
              <h3
                id="add-product-modal-title"
                className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#141517]"
              >
                Tambah Artikel Baru Geesthart
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                aria-label="Tutup modal tambah produk"
                className="min-w-[44px] min-h-[44px] -mr-2 inline-flex items-center justify-center text-[#4A4D52] hover:text-[#141517]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label
                  htmlFor="new-prod-name"
                  className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                >
                  Nama Produk *
                </label>
                <input
                  id="new-prod-name"
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Fieldlite Windbreaker Jacket"
                  className="min-h-[44px] w-full px-3.5 py-2 bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="new-prod-collection"
                    className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                  >
                    Seri Koleksi
                  </label>
                  <select
                    id="new-prod-collection"
                    value={newCollection}
                    onChange={(e) =>
                      setNewCollection(e.target.value as ProductCollection)
                    }
                    className="min-h-[44px] w-full px-3 py-2 bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] font-semibold"
                  >
                    <option value="Nimble X">Nimble X</option>
                    <option value="Litefield">Litefield</option>
                    <option value="Fieldlite">Fieldlite</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="new-prod-category"
                    className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                  >
                    Kategori (Menentukan Size Chart)
                  </label>
                  <select
                    id="new-prod-category"
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as ProductCategory)
                    }
                    className="min-h-[44px] w-full px-3 py-2 bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] font-semibold"
                  >
                    <option value="jaket">Jaket</option>
                    <option value="celana-panjang">Celana Panjang</option>
                    <option value="celana-pendek">Celana Pendek / Skort</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="new-prod-gender"
                    className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                  >
                    Tipe Pemakai
                  </label>
                  <select
                    id="new-prod-gender"
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as ProductGender)}
                    className="min-h-[44px] w-full px-3 py-2 bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] font-semibold"
                  >
                    <option value="unisex">Unisex</option>
                    <option value="wanita">Wanita</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="new-prod-price"
                    className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                  >
                    Harga (Rp) *
                  </label>
                  <input
                    id="new-prod-price"
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value) || 0)}
                    className="min-h-[44px] w-full px-3 py-2 bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] font-bold tabular-nums"
                  />
                </div>

                <div>
                  <label
                    htmlFor="new-prod-status"
                    className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                  >
                    Status Stok
                  </label>
                  <select
                    id="new-prod-status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ProductStatus)}
                    className="min-h-[44px] w-full px-3 py-2 bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] font-semibold"
                  >
                    <option value="tersedia">Tersedia</option>
                    <option value="segera-hadir">Segera Hadir</option>
                    <option value="habis">Habis</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="new-prod-image"
                  className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                >
                  Pilih Foto Produk
                </label>
                <select
                  id="new-prod-image"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="min-h-[44px] w-full px-3 py-2 bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] font-semibold"
                >
                  <option value="/images/products/nimble-x-jacket-black.jpg">
                    Nimble X Jacket (Black)
                  </option>
                  <option value="/images/products/nimble-x-jacket-green-olive.jpg">
                    Nimble X Jacket (Green Olive)
                  </option>
                  <option value="/images/products/nimble-x-jacket-blue-oxford.jpg">
                    Nimble X Jacket (Blue Oxford)
                  </option>
                  <option value="/images/products/litefield-pants-black-1.jpg">
                    Litefield Trackpants (Black)
                  </option>
                  <option value="/images/products/litefield-pants-olive-1.jpg">
                    Litefield Trackpants (Green Olive)
                  </option>
                  <option value="/images/products/litefield-skort-pink-1.jpeg">
                    Litefield Skort (Pink)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="new-prod-color-name"
                    className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                  >
                    Nama Warna Utama
                  </label>
                  <input
                    id="new-prod-color-name"
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    className="min-h-[44px] w-full px-3 py-2 bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="new-prod-color-hex"
                    className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                  >
                    Kode Warna Swatch
                  </label>
                  <input
                    id="new-prod-color-hex"
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="min-h-[44px] w-full bg-[#F7F7F4] border border-[#C8C8C0] p-1"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="new-prod-desc"
                  className="block font-bold uppercase tracking-wider text-[#141517] mb-1"
                >
                  Deskripsi Singkat
                </label>
                <textarea
                  id="new-prod-desc"
                  rows={2}
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  placeholder="Tuliskan deskripsi bahan dan potongan produk..."
                  className="w-full p-3 bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="min-h-[44px] px-4 py-2 border border-[#141517] text-[#141517] font-bold uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 bg-[#141517] hover:bg-[#3F4734] text-white font-extrabold uppercase tracking-wider"
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
