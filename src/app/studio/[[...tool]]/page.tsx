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
} from 'lucide-react';

export default function StudioPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
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

  useEffect(() => {
    fetch('/api/cms/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {});
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
            Geesthart CMS Studio &amp; Product Manager
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 max-w-2xl leading-relaxed">
            Project ID Sanity kamu (<code>a2ie5vo6</code>) sudah terhubung ke konfigurasi website. Kamu bisa langsung menambah produk, mengubah harga, dan mengganti status stok di bawah ini.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-3 bg-[#555D47] hover:bg-[#687257] text-white text-xs font-extrabold uppercase tracking-[0.14em] transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk Baru</span>
          </button>

          <a
            href="https://www.sanity.io/manage/project/a2ie5vo6"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-white text-[#141517] text-xs font-extrabold uppercase tracking-[0.14em] hover:bg-[#9CAF84] transition-colors inline-flex items-center gap-2"
          >
            <span>Manage Project a2ie5vo6</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
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

      {/* Sanity Cloud Sync Box (Project a2ie5vo6) */}
      <div className="bg-white border border-[#E2E2DC] p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#283A66]">
              <CloudUpload className="w-4 h-4" />
              <span>Sinkronisasi Cloud Sanity (Project ID: a2ie5vo6)</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Setiap klik <strong>&ldquo;Simpan Semua Perubahan&rdquo;</strong> otomatis memperbarui website saat ini juga. Jika kamu ingin sekaligus mengirim (push) seluruh data produk ke cloud Sanity <code>a2ie5vo6</code>, buat token di{' '}
              <a
                href="https://www.sanity.io/manage/project/a2ie5vo6/api#tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#283A66] underline"
              >
                sanity.io/manage/project/a2ie5vo6/api (Add API Token → pilih Editor)
              </a>{' '}
              lalu tempel di samping:
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <div className="relative">
              <KeyRound className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={sanityToken}
                onChange={(e) => setSanityToken(e.target.value)}
                placeholder="Sanity Editor Token (Opsional)"
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
