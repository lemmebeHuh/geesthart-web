# DESIGN.md — Geesthart Bandung Design System & Anti-Slop Spec

## 1. Brand Identity & Soul
- **Brand**: GEESTHART (Est. 2024, Bandung, Jawa Barat)
- **Tagline**: *Own your path*
- **Character**: Clean Minimalist Gorpcore. Menggabungkan fungsi jaket dan celana teknis luar ruang (Hutan Pinus Bandung Utara) dengan potongan boxy dan loose-straight untuk pemakaian harian di jalanan kota.
- **Liveliness Dials**: `Dial: ENERGY 2 / RHYTHM 3 / MOTION 2`
  - **ENERGY 2 (Balanced Editorial)**: Kontras tipografi tegas antara judul blok dengan spesifikasi ukuran teknis dalam tabel yang rapi.
  - **RHYTHM 3 (Varied Composition)**: Komposisi antar-bagian bervariasi secara sengaja: Hero Split dua dunia (50:50), strip spesifikasi asimetris, spotlight produk unggulan diikuti katalog grid, serta editorial lookbook berdampingan dengan dokumentasi video lapangan.
  - **MOTION 2 (Purposeful Transitions)**: Transisi lebar panel pada Hero Split saat kursor atau fokus berpindah, pergantian foto produk instan saat pengguna memilih warna, dan laci filter mobile yang bergeser mulus. Dihentikan otomatis jika pengguna mengaktifkan `prefers-reduced-motion: reduce`.

## 2. Color Palette & WCAG AA Contrast (R-25, R-29)
Palet dibatasi pada 3 warna dasar netral dan 1 warna aksen utama:
- **Canvas Bone (`#F7F7F4`)**: Warna latar utama menyerupai kertas katalog cetak, mengurangi silau dibanding putih murni.
- **Pure Surface (`#FFFFFF`)**: Latar kartu produk dan tabel ukuran untuk memisahkan informasi produk dari latar halaman.
- **Deep Charcoal (`#141517`)**: Teks utama dan tombol primer. Rasio kontras terhadap `#F7F7F4` adalah **17.4:1** (Lulus WCAG AAA).
- **Slate Secondary (`#4A4D52`)**: Teks deskripsi pendukung. Rasio kontras terhadap `#FFFFFF` adalah **8.4:1** dan terhadap `#F7F7F4` adalah **7.9:1** (Lulus WCAG AA > 4.5:1).
- **Highland Olive (`#3F4734` / `#555D47`)**: Satu-satunya warna aksen utama (One Deliberate Accent) yang mewakili kanopi pinus Bandung dan warna khas seri Nimble X / Litefield. Digunakan hanya pada penanda status aktif, fokus lokasi, dan aksi sekunder utama.

## 3. One-Line Purpose Log (R-31)
- **Mengapa warna Canvas Bone (`#F7F7F4`) & Olive (`#3F4734`)?** Mencerminkan material nylon crinkle olive dan batu jalanan Bandung tanpa terlihat seperti template SaaS putih-biru.
- **Mengapa layout Split 50:50 di Hero?** Memvisualisasikan langsung dua medan pemakaian Geesthart (hutan pinus vs jalan raya kota) dalam satu layar interaktif.
- **Mengapa tipografi sans-serif grotesk tebal dipadukan angka tabular?** Judul tebal menegaskan siluet boxy streetwear, sementara angka tabular menjaga keterbacaan tabel ukuran (cm) dan harga Rupiah.
- **Mengapa menggunakan kartu pada daftar katalog?** Setiap produk memiliki variabel multi-warna (swatch interaktif), rentang ukuran, dan tombol pintas pembelian yang membutuhkan batas kontainer jelas.
- **Mengapa ada gradien gelap di bagian bawah foto Hero dan Koleksi?** Berfungsi sebagai *scrim* pelindung kontras agar teks putih di atas foto pakaian selalu melampaui rasio kontras WCAG AA 4.5:1 di seluruh area gambar (R-01, R-25).
- **Mengapa ada laci bawah (bottom sheet) dan bilah aksi lengket di layar ponsel?** Memastikan pengguna ponsel dapat memfilter katalog dan menekan tombol beli dengan satu ibu jari (target sentuh minimal 44x44 px) tanpa harus menggulir kembali ke atas (R-03).

