'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  Check,
  Ruler,
  Sparkles,
} from 'lucide-react';
import {
  Product,
  ProductCategory,
  ProductCollection,
  ProductGender,
  ProductStatus,
} from '@/types/geesthart';
import { ProductCard } from './ProductCard';

interface CatalogClientProps {
  products: Product[];
}

const CATEGORIES: { value: 'all' | ProductCategory; label: string }[] = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'jaket', label: 'Jaket' },
  { value: 'celana-panjang', label: 'Celana Panjang (Trackpants)' },
  { value: 'celana-pendek', label: 'Celana Pendek & Skort' },
];

const COLLECTIONS: ('all' | ProductCollection)[] = [
  'all',
  'Nimble X',
  'Litefield',
  'Fieldlite',
];

const GENDERS: { value: 'all' | ProductGender; label: string }[] = [
  { value: 'all', label: 'Semua (Unisex & Women)' },
  { value: 'unisex', label: 'Unisex' },
  { value: 'wanita', label: 'Wanita (Skort)' },
];

const STATUSES: { value: 'all' | ProductStatus; label: string }[] = [
  { value: 'all', label: 'Semua Status' },
  { value: 'tersedia', label: 'Tersedia' },
  { value: 'segera-hadir', label: 'Segera Hadir' },
  { value: 'habis', label: 'Habis' },
];

const PRICE_RANGES = [
  { id: 'all', label: 'Semua Harga', min: 0, max: Infinity },
  { id: 'under-150k', label: '< Rp150.000', min: 0, max: 150000 },
  { id: '150k-250k', label: 'Rp150.000 – Rp250.000', min: 150000, max: 250000 },
  { id: 'above-250k', label: '> Rp250.000', min: 250000, max: Infinity },
];

export function CatalogClient({ products }: CatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>(
    (searchParams.get('category') as ProductCategory) || 'all'
  );
  const [selectedCollection, setSelectedCollection] = useState<
    'all' | ProductCollection
  >((searchParams.get('collection') as ProductCollection) || 'all');
  const [selectedGender, setSelectedGender] = useState<'all' | ProductGender>(
    (searchParams.get('gender') as ProductGender) || 'all'
  );
  const [selectedStatus, setSelectedStatus] = useState<'all' | ProductStatus>(
    (searchParams.get('status') as ProductStatus) || 'all'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    searchParams.get('color') || 'all'
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [waistCmFilter, setWaistCmFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null;
    const col = searchParams.get('collection') as ProductCollection | null;
    const gen = searchParams.get('gender') as ProductGender | null;
    if (cat) setSelectedCategory(cat);
    if (col) setSelectedCollection(col);
    if (gen) setSelectedGender(gen);
  }, [searchParams]);

  // Extract unique colors with hex from all products
  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      p.colors.forEach((c) => {
        if (!map.has(c.name)) {
          map.set(c.name, c.hex);
        }
      });
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const priceObj =
      PRICE_RANGES.find((r) => r.id === selectedPriceRange) || PRICE_RANGES[0];
    const waistVal = waistCmFilter ? parseFloat(waistCmFilter) : null;

    return products.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (
        selectedCollection !== 'all' &&
        product.collection !== selectedCollection
      ) {
        return false;
      }
      if (selectedGender !== 'all' && product.genderType !== selectedGender) {
        return false;
      }
      if (selectedStatus !== 'all' && product.status !== selectedStatus) {
        return false;
      }
      if (
        selectedColor !== 'all' &&
        !product.colors.some(
          (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
        )
      ) {
        return false;
      }
      if (product.price < priceObj.min || product.price > priceObj.max) {
        return false;
      }
      // Waist filter (matches pinggangMin <= waistVal <= pinggangMax)
      if (waistVal !== null && !Number.isNaN(waistVal) && waistVal > 0) {
        const matchesWaist = product.sizeChart.some(
          (row) =>
            row.pinggangMin !== undefined &&
            row.pinggangMax !== undefined &&
            waistVal >= row.pinggangMin &&
            waistVal <= row.pinggangMax
        );
        if (!matchesWaist) return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchCol = product.collection.toLowerCase().includes(q);
        const matchDesc = product.shortDescription.toLowerCase().includes(q);
        if (!matchName && !matchCol && !matchDesc) return false;
      }
      return true;
    });
  }, [
    products,
    selectedCategory,
    selectedCollection,
    selectedGender,
    selectedStatus,
    selectedColor,
    selectedPriceRange,
    waistCmFilter,
    searchQuery,
  ]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedGender('all');
    setSelectedStatus('all');
    setSelectedColor('all');
    setSelectedPriceRange('all');
    setWaistCmFilter('');
    setSearchQuery('');
    router.replace('/catalog', { scroll: false });
  };

  const activeFilterCount = [
    selectedCategory !== 'all',
    selectedCollection !== 'all',
    selectedGender !== 'all',
    selectedStatus !== 'all',
    selectedColor !== 'all',
    selectedPriceRange !== 'all',
    waistCmFilter.trim() !== '',
    searchQuery.trim() !== '',
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
      {/* Top Bar: Search + Mobile Filter Toggle + Active Count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#E2E2DC]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari jaket, trackpants, skort, Nimble X..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D5D5CE] text-xs text-[#141517] placeholder:text-neutral-400 focus:outline-none focus:border-[#141517]"
          />
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3">
          <span className="text-xs font-medium text-neutral-600">
            Menampilkan <strong className="text-[#141517]">{filteredProducts.length}</strong> dari{' '}
            {products.length} produk
          </span>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#555D47] bg-[#555D47]/10 hover:bg-[#555D47]/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-[#141517] text-white text-xs font-bold uppercase tracking-wider"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filter Panel */}
        <aside
          className={`lg:col-span-3 space-y-6 bg-white p-5 border border-[#E2E2DC] h-fit ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#EFEFEA]">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#141517] flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#555D47]" />
              <span>Filter Katalog</span>
            </h2>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-[11px] font-semibold text-neutral-500 hover:text-[#141517] underline"
              >
                Hapus Semua
              </button>
            )}
          </div>

          {/* 1. Seri Koleksi */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2.5">
              1. Seri Koleksi
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {COLLECTIONS.map((col) => {
                const active = selectedCollection === col;
                return (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setSelectedCollection(col)}
                    className={`px-2.5 py-2 text-xs font-semibold text-left border transition-colors ${
                      active
                        ? 'bg-[#141517] text-white border-[#141517]'
                        : 'bg-[#F7F7F4] text-neutral-700 border-[#E2E2DC] hover:border-neutral-400'
                    }`}
                  >
                    {col === 'all' ? 'Semua Seri' : col}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Kategori Produk */}
          <div className="pt-4 border-t border-[#EFEFEA]">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2.5">
              2. Kategori Produk
            </h3>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-[#555D47] text-white border-[#555D47]'
                        : 'bg-white text-neutral-700 border-[#E2E2DC] hover:bg-[#F7F7F4]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {active && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Gender / Tipe */}
          <div className="pt-4 border-t border-[#EFEFEA]">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2.5">
              3. Gender / Tipe
            </h3>
            <div className="space-y-1.5">
              {GENDERS.map((g) => {
                const active = selectedGender === g.value;
                return (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setSelectedGender(g.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-[#141517] text-white border-[#141517]'
                        : 'bg-white text-neutral-700 border-[#E2E2DC] hover:bg-[#F7F7F4]'
                    }`}
                  >
                    <span>{g.label}</span>
                    {active && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Pilihan Warna */}
          <div className="pt-4 border-t border-[#EFEFEA]">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2.5">
              4. Pilihan Warna
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedColor('all')}
                className={`px-2.5 py-1 text-[11px] font-semibold border transition-colors ${
                  selectedColor === 'all'
                    ? 'bg-[#141517] text-white border-[#141517]'
                    : 'bg-[#F7F7F4] text-neutral-700 border-[#E2E2DC]'
                }`}
              >
                Semua
              </button>
              {allColors.map((c) => {
                const active = selectedColor.toLowerCase() === c.name.toLowerCase();
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() =>
                      setSelectedColor(active ? 'all' : c.name)
                    }
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium border transition-colors ${
                      active
                        ? 'bg-[#141517] text-white border-[#141517]'
                        : 'bg-white text-neutral-700 border-[#E2E2DC] hover:border-neutral-400'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-neutral-300"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Rentang Harga */}
          <div className="pt-4 border-t border-[#EFEFEA]">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2.5">
              5. Rentang Harga
            </h3>
            <div className="space-y-1.5">
              {PRICE_RANGES.map((range) => {
                const active = selectedPriceRange === range.id;
                return (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-[#141517] text-white border-[#141517]'
                        : 'bg-white text-neutral-700 border-[#E2E2DC] hover:bg-[#F7F7F4]'
                    }`}
                  >
                    <span>{range.label}</span>
                    {active && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Status Stok */}
          <div className="pt-4 border-t border-[#EFEFEA]">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2.5">
              6. Status Ketersediaan
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {STATUSES.map((st) => {
                const active = selectedStatus === st.value;
                return (
                  <button
                    key={st.value}
                    type="button"
                    onClick={() => setSelectedStatus(st.value)}
                    className={`px-2.5 py-2 text-xs font-medium border text-left transition-colors ${
                      active
                        ? 'bg-[#141517] text-white border-[#141517]'
                        : 'bg-[#F7F7F4] text-neutral-700 border-[#E2E2DC]'
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Smart Filter Lebar Pinggang (cm) sesuai Brief */}
          <div className="pt-4 border-t border-[#EFEFEA]">
            <label
              htmlFor="waist-filter"
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#555D47] flex items-center gap-1.5 mb-1.5"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Filter Lebar Pinggang (Celana)</span>
            </label>
            <p className="text-[11px] text-neutral-500 mb-2">
              Masukkan lebar pinggang (28–41 cm) untuk mencocokkan celana panjang/pendek.
            </p>
            <div className="flex items-center gap-2">
              <input
                id="waist-filter"
                type="number"
                min={25}
                max={50}
                value={waistCmFilter}
                onChange={(e) => setWaistCmFilter(e.target.value)}
                placeholder="Contoh: 34"
                className="w-full px-3 py-2 text-xs bg-[#F7F7F4] border border-[#D5D5CE] focus:outline-none focus:border-[#141517]"
              />
              <span className="text-xs font-bold text-neutral-500">CM</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#E2E2DC] p-12 text-center">
              <Sparkles className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#141517]">
                Tidak ada produk yang cocok dengan filter ini
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
                Coba ubah kombinasi filter kategori, warna, rentang harga, atau tekan tombol reset di bawah.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-5 px-5 py-2.5 bg-[#141517] text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#555D47] transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

