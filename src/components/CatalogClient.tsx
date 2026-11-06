'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  Check,
  Ruler,
  X,
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
  { value: 'celana-panjang', label: 'Trackpants' },
  { value: 'celana-pendek', label: 'Shortpants & Skort' },
];

const COLLECTIONS: ('all' | ProductCollection)[] = [
  'all',
  'Nimble X',
  'Litefield',
  'Fieldlite',
];

const GENDERS: { value: 'all' | ProductGender; label: string }[] = [
  { value: 'all', label: 'Semua (Unisex & Wanita)' },
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
  { id: 'under-150k', label: 'Di bawah Rp150.000', min: 0, max: 150000 },
  { id: '150k-250k', label: 'Rp150.000 s/d Rp250.000', min: 150000, max: 250000 },
  { id: 'above-250k', label: 'Di atas Rp250.000', min: 250000, max: Infinity },
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

  // R-26 / R-32: Close mobile filter sheet on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileFilterOpen) {
        setMobileFilterOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileFilterOpen]);

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

  const filterFormContent = (
    <div className="space-y-6">
      {/* 1. Seri Koleksi */}
      <div>
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#141517] mb-2.5">
          1. Seri Koleksi
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {COLLECTIONS.map((col) => {
            const active = selectedCollection === col;
            return (
              <button
                key={col}
                type="button"
                onClick={() => setSelectedCollection(col)}
                aria-pressed={active}
                className={`min-h-[44px] px-3 py-2 text-xs font-bold text-left border transition-colors ${
                  active
                    ? 'bg-[#141517] text-white border-[#141517]'
                    : 'bg-[#F7F7F4] text-[#141517] border-[#C8C8C0] hover:border-[#141517]'
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
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#141517] mb-2.5">
          2. Kategori Pakaian
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                aria-pressed={active}
                className={`min-h-[44px] w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold border transition-colors ${
                  active
                    ? 'bg-[#3F4734] text-white border-[#3F4734]'
                    : 'bg-white text-[#141517] border-[#C8C8C0] hover:bg-[#F7F7F4]'
                }`}
              >
                <span>{cat.label}</span>
                {active && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Gender / Tipe */}
      <div className="pt-4 border-t border-[#EFEFEA]">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#141517] mb-2.5">
          3. Tipe Pemakai
        </h3>
        <div className="space-y-2">
          {GENDERS.map((g) => {
            const active = selectedGender === g.value;
            return (
              <button
                key={g.value}
                type="button"
                onClick={() => setSelectedGender(g.value)}
                aria-pressed={active}
                className={`min-h-[44px] w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold border transition-colors ${
                  active
                    ? 'bg-[#141517] text-white border-[#141517]'
                    : 'bg-white text-[#141517] border-[#C8C8C0] hover:bg-[#F7F7F4]'
                }`}
              >
                <span>{g.label}</span>
                {active && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Pilihan Warna */}
      <div className="pt-4 border-t border-[#EFEFEA]">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#141517] mb-2.5">
          4. Warna Artikel
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedColor('all')}
            aria-pressed={selectedColor === 'all'}
            className={`min-h-[40px] px-3 py-1.5 text-xs font-bold border transition-colors ${
              selectedColor === 'all'
                ? 'bg-[#141517] text-white border-[#141517]'
                : 'bg-[#F7F7F4] text-[#141517] border-[#C8C8C0]'
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
                onClick={() => setSelectedColor(active ? 'all' : c.name)}
                aria-pressed={active}
                className={`min-h-[40px] inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border transition-colors ${
                  active
                    ? 'bg-[#141517] text-white border-[#141517]'
                    : 'bg-white text-[#141517] border-[#C8C8C0] hover:border-[#141517]'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/25 shrink-0"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden="true"
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Rentang Harga */}
      <div className="pt-4 border-t border-[#EFEFEA]">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#141517] mb-2.5">
          5. Rentang Harga
        </h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const active = selectedPriceRange === range.id;
            return (
              <button
                key={range.id}
                type="button"
                onClick={() => setSelectedPriceRange(range.id)}
                aria-pressed={active}
                className={`min-h-[44px] w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold border transition-colors ${
                  active
                    ? 'bg-[#141517] text-white border-[#141517]'
                    : 'bg-white text-[#141517] border-[#C8C8C0] hover:bg-[#F7F7F4]'
                }`}
              >
                <span>{range.label}</span>
                {active && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Status Stok */}
      <div className="pt-4 border-t border-[#EFEFEA]">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#141517] mb-2.5">
          6. Status Ketersediaan
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {STATUSES.map((st) => {
            const active = selectedStatus === st.value;
            return (
              <button
                key={st.value}
                type="button"
                onClick={() => setSelectedStatus(st.value)}
                aria-pressed={active}
                className={`min-h-[44px] px-3 py-2 text-xs font-bold border text-left transition-colors ${
                  active
                    ? 'bg-[#141517] text-white border-[#141517]'
                    : 'bg-[#F7F7F4] text-[#141517] border-[#C8C8C0]'
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Smart Filter Lebar Pinggang (cm) */}
      <div className="pt-4 border-t border-[#EFEFEA]">
        <label
          htmlFor="waist-filter-input"
          className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#3F4734] flex items-center gap-1.5 mb-1.5"
        >
          <Ruler className="w-4 h-4" aria-hidden="true" />
          <span>7. Lebar Pinggang Celana (cm)</span>
        </label>
        <p className="text-xs text-[#4A4D52] mb-2.5 leading-relaxed">
          Masukkan angka 28 s/d 41 cm untuk mencari trackpants atau shortpants yang muat di pinggang Anda.
        </p>
        <div className="flex items-center gap-2">
          <input
            id="waist-filter-input"
            type="number"
            min={25}
            max={50}
            value={waistCmFilter}
            onChange={(e) => setWaistCmFilter(e.target.value)}
            placeholder="Contoh: 34"
            className="min-h-[44px] w-full px-3.5 py-2 text-xs font-semibold bg-[#F7F7F4] border border-[#C8C8C0] text-[#141517] placeholder:text-[#686B70] focus:border-[#141517]"
          />
          <span className="text-xs font-extrabold text-[#141517] px-2">CM</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-8 py-5 sm:py-10">
      {/* Top Bar: Labeled Search + Quick Mobile Filter Trigger */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-4 border-b border-[#DCDCD4]">
        <div className="flex-1 max-w-md">
          <label
            htmlFor="catalog-search-input"
            className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#141517] mb-1"
          >
            Cari Nama Produk atau Seri
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 text-[#4A4D52] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="catalog-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari jaket, trackpants, skort..."
                className="min-h-[42px] w-full pl-9 pr-3 py-2 bg-white border border-[#C8C8C0] text-xs font-medium text-[#141517] placeholder:text-[#686B70] focus:border-[#141517]"
              />
            </div>

            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              aria-expanded={mobileFilterOpen}
              aria-controls="mobile-filter-dialog"
              className="lg:hidden min-h-[42px] inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#141517] text-white text-xs font-bold uppercase tracking-wider active:bg-[#3F4734] shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Filter {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3">
          <p className="text-[11px] sm:text-xs font-medium text-[#4A4D52]" aria-live="polite">
            Menampilkan <strong className="text-[#141517]">{filteredProducts.length}</strong> dari{' '}
            {products.length} produk
          </p>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="min-h-[34px] inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#141517] bg-white border border-[#141517] hover:bg-[#EFEFEA] transition-colors"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* 1-Tap Quick Category Pills for Mobile & Tablet (< lg) */}
      <div
        role="group"
        aria-label="Filter cepat kategori pakaian"
        className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-3 border-b border-[#DCDCD4] no-scrollbar"
      >
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              aria-pressed={active}
              className={`min-h-[36px] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap border shrink-0 transition-colors ${
                active
                  ? 'bg-[#141517] text-white border-[#141517]'
                  : 'bg-white text-[#141517] border-[#C8C8C0]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Layout: Desktop Sidebar + Product Grid */}
      <div className="mt-4 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Desktop Sidebar Filter Panel (lg+) */}
        <aside
          aria-label="Filter Katalog Lengkap"
          className="hidden lg:block lg:col-span-3 bg-white p-5 border border-[#DCDCD4] h-fit"
        >
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#EFEFEA]">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#141517] flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#3F4734]" aria-hidden="true" />
              <span>Filter Katalog</span>
            </h2>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-xs font-bold text-[#3F4734] hover:underline"
              >
                Hapus Semua
              </button>
            )}
          </div>
          {filterFormContent}
        </aside>

        {/* Mobile Slide-Over Filter Sheet (< lg) */}
        {mobileFilterOpen && (
          <div
            id="mobile-filter-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Filter Katalog Produk"
            className="lg:hidden fixed inset-0 z-50 bg-black/70 flex flex-col justify-end"
            onClick={() => setMobileFilterOpen(false)}
          >
            <div
              className="bg-white w-full max-h-[85dvh] border-t-2 border-[#141517] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Sheet Header */}
              <div className="px-4 py-3.5 bg-[#141517] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#B8CCA0]" aria-hidden="true" />
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.14em]">
                    Filter Katalog ({filteredProducts.length} Produk)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Tutup panel filter"
                  className="min-w-[44px] min-h-[44px] -mr-2 inline-flex items-center justify-center text-neutral-300 hover:text-white"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Scrollable Sheet Body */}
              <div className="p-4 overflow-y-auto flex-1">
                {filterFormContent}
              </div>

              {/* Sticky Sheet Footer */}
              <div className="p-4 bg-[#F7F7F4] border-t border-[#DCDCD4] grid grid-cols-2 gap-3 shrink-0">
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="min-h-[44px] px-4 py-2.5 bg-white border border-[#141517] text-[#141517] text-xs font-bold uppercase tracking-wider"
                >
                  Reset Filter
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="min-h-[44px] px-4 py-2.5 bg-[#141517] text-white text-xs font-extrabold uppercase tracking-wider"
                >
                  Terapkan ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid Area (2 cols phone -> 2 cols tablet -> 3 cols desktop) */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div
              role="status"
              className="bg-white border border-[#DCDCD4] p-8 sm:p-12 text-center"
            >
              <h3 className="text-base sm:text-lg font-extrabold text-[#141517]">
                Tidak ada produk yang cocok dengan filter pilihan Anda
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4D52] mt-1.5 max-w-md mx-auto leading-relaxed">
                Kombinasi filter kategori, warna, atau lebar pinggang saat ini belum memiliki artikel yang sesuai. Reset filter untuk menampilkan seluruh koleksi Geesthart.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-5 min-h-[44px] px-5 py-2.5 bg-[#141517] text-white text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#3F4734] transition-colors"
              >
                Tampilkan Semua Produk ({products.length})
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-6">
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
