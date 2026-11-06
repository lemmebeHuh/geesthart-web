# Panduan Deployment Website Geesthart ke Vercel

Panduan ringkas untuk mempublikasikan website **Geesthart** dari komputer lokal ke hosting **Vercel** (Paket Gratis/Hobby) dan menghubungkan domain resmi (misal: `geesthart.id` atau `geesthart.com`).

---

## Langkah 1: Buat Repositori di GitHub

1. Buka [github.com/new](https://github.com/new) dan login dengan akun GitHub Anda.
2. Beri nama repositori, contoh: `geesthart-web` (bisa pilih **Private** atau **Public**).
3. Jangan centang "Add a README file" (karena file sudah ada di lokal). Klik **Create repository**.
4. Di terminal folder proyek Anda (`c:\Users\ridwa\Desktop\geesthart`), jalankan perintah berikut (ganti `USERNAME` dengan username GitHub Anda):

```bash
git remote add origin https://github.com/USERNAME/geesthart-web.git
git branch -M main
git push -u origin main
```

---

## Langkah 2: Hubungkan & Deploy di Vercel

1. Buka [vercel.com](https://vercel.com) dan login (disarankan pakai opsi **Continue with GitHub**).
2. Di dashboard Vercel, klik tombol **"Add New..."** → pilih **Project**.
3. Cari repositori **`geesthart-web`** yang baru saja Anda push, lalu klik **Import**.
4. Di bagian **Environment Variables**, tambahkan 4 variabel penting berikut:

| Nama Variabel (Key) | Nilai (Value) |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `a2ie5vo6` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-02-01` |
| `SANITY_API_WRITE_TOKEN` | `sk0bElarDElBthbYXhn4mbIUkXnmZeJZuA6QeEpDLvpFmg0HtsfUENpfjSX537Awhe3YeM0VbK453DqwoFZijXCXBFUFbzmDCQJTVh2ASkI5msn3JEoeb7nJmoXHiDw89dYWUct7s6uCiqSgzqF37atBQfDHLaTFO1sZzk3sOpRIAIkDWowj` |

5. Klik tombol **Deploy**. Vercel akan otomatis melakukan proses *build* dalam waktu ±1 menit.
6. Begitu selesai, website Geesthart sudah live dengan URL gratis dari Vercel (contoh: `geesthart-web.vercel.app`).

---

## Langkah 3: Tambahkan Domain Vercel ke CORS Sanity

Agar Sanity Studio dan sinkronisasi produk bekerja dari domain Vercel yang baru:
1. Buka [sanity.io/manage/project/a2ie5vo6/api](https://www.sanity.io/manage/project/a2ie5vo6/api).
2. Di bagian **CORS origins**, klik **Add CORS origin**.
3. Masukkan domain Vercel Anda (misal: `https://geesthart-web.vercel.app` atau `https://*.vercel.app`) dan domain kustom Anda.
4. Centang opsi **Allow credentials** lalu klik **Save**.

---

## Langkah 4: Hubungkan Custom Domain (geesthart.id / geesthart.com)

1. Di dashboard project Anda di Vercel, masuk ke tab **Settings** → **Domains**.
2. Masukkan nama domain yang sudah Anda beli (misal: `geesthart.id` atau `www.geesthart.id`), lalu klik **Add**.
3. Vercel akan menampilkan petunjuk DNS:
   - **Type A Record:** `@` mengarah ke IP Vercel (`76.76.21.21`)
   - **Type CNAME:** `www` mengarah ke `cname.vercel-dns.com`
4. Buka panel tempat Anda membeli domain (misal: Niagahoster, Domainesia, Rumahweb, Cloudflare, dll.), masuk ke menu **DNS Management**, lalu masukkan A record dan CNAME di atas.
5. Tunggu proses propagasi DNS (biasanya 5–30 menit). Begitu selesai, status di Vercel akan berubah menjadi **Valid Configuration** dan SSL HTTPS gratis akan terpasang otomatis!
