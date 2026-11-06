# GEESTHART — Digital Flagship & Interactive Catalog

Website resmi untuk brand streetwear & outdoor **Geesthart** (Bandung, Est. 2024) — *"Own your path"*.

---

## Fitur Utama

1. **Interactive Split Hero (Forest vs City):**
   - Sisi Kiri (*Highland Pine Woods*) & Sisi Kanan (*Bandung Urban Grid*) yang mengembang halus saat di-hover (dan dilengkapi switcher mode di layar mobile).
2. **Katalog Multi-Filter Lengkap (`/catalog`):**
   - Filter berdasarkan **Seri Koleksi** (*Nimble X, Litefield, Fieldlite*), **Kategori** (*Jaket, Celana Panjang, Celana Pendek & Skort*), **Gender** (*Unisex, Wanita*), **Pilihan Warna**, **Rentang Harga**, **Status Stok** (*Tersedia, Segera Hadir, Habis*), serta **Filter Lebar Pinggang (cm)**.
3. **Halaman Detail Produk & Dynamic Size Chart (`/product/[slug]`):**
   - Galeri foto interaktif yang berganti otomatis saat warna dipilih.
   - Tabel ukuran dinamis sesuai kategori (Jaket, Trackpants, Celana Pendek/Skort) + pop-up diagram ukur resmi Geesthart.
   - Modal Pilihan Toko (**Shopee Official**, **TikTok Shop**, & **WhatsApp CS** dengan pesan otomatis berisi produk, warna, dan ukuran yang dipilih).
4. **Lookbook, Tentang & Kontak (`/lookbook`, `/about`, `/contact`):**
   - Galeri editorial dengan fitur *Shop the Look*, cerita brand Geesthart, dan formulir kerja sama B2B/Wholesale langsung ke WhatsApp.
5. **Panel CMS Sanity (`/studio`):**
   - Skema lengkap di `src/sanity/schemaTypes/` untuk mengelola produk, harga, foto, dan status stok tanpa menyentuh kode.

---

## Cara Menjalankan di Komputer Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan server development
npm run dev
```

Buka `http://localhost:3000` di browser.

---

## Cara Menghubungkan Sanity CMS & Deploy ke Vercel

1. Buat project gratis di [sanity.io/manage](https://www.sanity.io/manage) dan salin **Project ID**.
2. Salin `.env.example` menjadi `.env.local` dan isi `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Push repositori ke GitHub dan impor ke [Vercel](https://vercel.com), lalu hubungkan domain resmi Geesthart.

