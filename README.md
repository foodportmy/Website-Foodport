# Foodport.my: Laman Web Rasmi

> **Your Port Of Desire**: Mee Kari Istana, Tauhu Bergedil, Soto Ayam dan masakan Asia moden di Sungai Dua, Butterworth, Pulau Pinang.

Laman web statik (HTML + CSS + JS, tanpa build) yang sedia dihoskan di **GitHub Pages**.

## Kandungan laman
- **Hero**: tagline, butang order WhatsApp
- **Hidangan istimewa**: Mee Kari Istana, Tauhu Bergedil, Soto Ayam
- **Menu bertab**: Ala-Carte, Kegemaran Kafe, Family Pax, Buffet & Talam, Frozen
- **Pakej & katering**: Satisfied Tummy, Heartful Sharing, Celebrate Your Joy
- **Tentang kami**, **ulasan pelanggan**, **lokasi** (Google Maps), waktu operasi
- Tukar bahasa **BM / EN**, butang WhatsApp terapung, SEO (schema.org Restaurant)

## Struktur
```
index.html          ← semua kandungan (teks, harga, alamat, waktu)
css/style.css       ← reka bentuk & warna (lihat :root untuk palet)
js/main.js          ← menu mobile, tab menu, tukar bahasa, animasi
assets/img/*.svg    ← ilustrasi makanan (tukar dengan gambar sebenar)
assets/favicon.svg
```

## Aktifkan GitHub Pages
1. Pergi ke **Settings → Pages** dalam repo ini.
2. Bawah **Build and deployment**, pilih **Source: Deploy from a branch**.
3. Pilih branch (cth. `main`) dan folder **`/ (root)`**, kemudian **Save**.
4. Laman akan siap dalam 1–2 minit di `https://<username>.github.io/<nama-repo>/`.

Nak guna domain sendiri (cth. `foodport.my`)? Isi **Custom domain** di halaman yang sama, kemudian tetapkan DNS domain ke GitHub Pages.

## Cara edit
| Nak tukar | Di mana |
|---|---|
| Harga / item menu | `index.html` → seksyen `id="menu"` |
| Waktu operasi | `index.html` → seksyen `id="lokasi"` + `openingHours` dalam JSON-LD di `<head>` |
| Teks bahasa Inggeris | atribut `data-en="..."` pada elemen yang sama |
| Link WhatsApp | cari `wa.me/message/HX6XUJJAKD64A1` |
| Warna jenama | `css/style.css` → `:root` |

### Guna gambar makanan sebenar
Letak gambar dalam `assets/img/` (cth. `kari.jpg`), kemudian dalam `css/style.css` tukar:
```css
.art--kari { background-image: url("../assets/img/kari.jpg"); }
```
Saiz cadangan: 1200×900px, format `.jpg` atau `.webp`, bawah 300KB.
