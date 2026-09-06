# Nuat Time

Website untuk Nuat Time — Thai reflexology di Ruko Golf Island, Pantai Indah Kapuk.

Dibangun dengan **Next.js 15** (App Router) dan **TypeScript**.

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:3000
```

Perintah lain:

```bash
npm run build        # build produksi
npm start            # jalankan hasil build
npm run typecheck    # cek TypeScript tanpa build
```

## Struktur

```
app/
  layout.tsx      font (next/font), metadata, scroll restoration
  page.tsx        susunan section + JSON-LD untuk Google
  globals.css     seluruh design system (token, tipografi, komponen)
components/
  Nav.tsx         navigasi + menu mobile          (client)
  Motion.tsx      animasi pintu GSAP + reveal     (client)
  Gate.tsx        pintu masuk
  Welcome.tsx     About + "What we practise"
  Treatments.tsx  daftar perawatan
  Rates.tsx       daftar harga
  Offer.tsx       promo + "The room"
  Visit.tsx       alamat, jam buka, review
  Footer.tsx
lib/
  content.ts      SEMUA teks, harga, jam, kontak
public/assets/    gambar
```

## Mengubah harga, jam buka, atau nomor telepon

Semuanya ada di satu file: **`lib/content.ts`**. Tidak perlu menyentuh komponen.

Contoh menaikkan harga Oil Massage 60 menit:

```ts
// lib/content.ts
{
  name: 'Oil Massage',
  tiers: [
    { minutes: 60, price: 220_000 },   // <- ubah angkanya saja
    ...
  ],
}
```

Angka ditulis polos (`220_000`), lalu diformat otomatis jadi `Rp 220.000`
dengan `Intl.NumberFormat('id-ID')`. Jadi pemisah ribuan tidak akan pernah
beda antar baris.

## Catatan teknis

- **Font** di-*self-host* lewat `next/font/google`, jadi tidak ada permintaan
  ke server Google saat halaman dibuka — lebih cepat dan tidak ada layout shift.
- **Scroll restoration** dimatikan (`layout.tsx`) supaya setiap kali halaman
  dibuka atau di-refresh selalu dimulai dari pintu tertutup. Link dengan hash
  (misal `#rates`) tetap dihormati.
- **Gambar berat** hasil ekspor Figma sudah dikompres ke WebP di
  `public/assets/opt/`. File SVG aslinya masih disimpan di `public/assets/`
  dan sudah tidak dipakai — aman untuk dihapus kapan saja.

## Deploy

Vercel mendeteksi Next.js otomatis. Tidak perlu `vercel.json`.
