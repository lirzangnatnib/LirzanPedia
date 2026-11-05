# Design System: Y2K Acid Brutalism Typography Landing Page

## 1. Project Overview
Membangun sebuah landing page dengan gaya eksperimental "Y2K Acid Graphics" dan "Digital Brutalism". Desain tidak boleh terlihat rapi atau korporat. Harus terasa seperti poster jalanan digital tahun 2000-an yang berantakan, mencolok, dan sangat berfokus pada tipografi eksperimental.

## 2. Vibe & Keywords
- **Keywords:** Chaotic, Retro-futuristic, Cyber, Grunge, Y2K, Typographic, Anti-design, High Contrast.
- **Feel:** Seperti zine digital, poster band underground, atau interface komputer jadul yang di-glitch.

## 3. Color Palette
- **Background:** Pure Black (#000000) dan Dark Charcoal (#111111).
- **Primary Text:** Pure White (#FFFFFF), Off-white (#F0F0F0).
- **Accent Colors:** 
  - Metallic Silver/Chrome (Gunakan CSS linear-gradient dengan warna #E0E0E0, #FFFFFF, #999999).
  - Accent Red (untuk elemen bintang/starburst): #FF0000 atau #C1121F.

## 4. Typography (ATURAN UTAMA: CAMPUR ADUK!)
Gunakan berbagai jenis font secara acak namun terstruktur. Gunakan tag `<span>` untuk mencampur font dalam satu kata/kalimat.
- **Font 1 (Pixel/Bitmap):** `Silkscreen` atau `VT323` (Untuk teks seperti "Free Font", "OffBit", elemen retro).
- **Font 2 (Blackletter/Gothic):** `UnifrakturMaguntia` atau `Cloister Black` (Untuk huruf-huruf tertentu di judul utama, memberikan kesan mistis/gelap).
- **Font 3 (Distorted/Stretched Serif):** `Bodoni Moda` atau `Cinzel` (Gunakan `transform: scaleY()` untuk membuatnya terlihat memanjang ke atas).
- **Font 4 (Sans-Serif Modern):** `Space Grotesk` atau `Inter` (Untuk teks paragraf kecil, watermark, dan navigasi).
- **Font 5 (Italic/Script):** Gunakan font italic yang tajam untuk variasi di tengah kata.
- **Text Effects:** Beberapa teks harus memiliki efek `text-shadow` (glitch effect) atau gradient metallic.

## 5. Layout & UI Elements
- **Hero Section:** Judul besar di tengah (contoh: "ANYTHING WORTH HAVING TAKES TIME" atau "Free OffBit Fonts"). Pecah kata-katanya dan campur font-nya. Beri efek *overlapping* (tumpang tindih).
- **Background Elements:** Tambahkan gambar mata realistis (grayscale), bola holografik 3D, atau ilustrasi monyet pixel/grunge di belakang teks.
- **Watermarks:** Teks kecil-kecil di pinggir kiri/kanan/bawah layar. Contoh: "ELEMENT 365 DAYS OF TYPE", "OFFBIT COLLECTION 6 STYLES", "welcome to bitmap world". Gunakan font sans-serif kecil, opacity 60%.
- **Accents:** Tambahkan simbol bintang 4 sudut (starburst) berwarna merah menyala yang diletakkan secara asimetris.
- **Marquee/Scrolling Text:** Buat teks berjalan di bagian bawah atau tengah dengan font pixel.
- **Navigation:** Tidak perlu navbar biasa. Cukup letakkan link kecil di sudut layar seperti watermark.

## 6. CSS/Tailwind Specific Instructions
- **Animations:** Tambahkan efek *glitch* (hover), teks berkedip (blinking cursor), dan marquee (infinite scroll).
- **Gradients:** Gunakan `bg-gradient-to-b from-gray-200 via-white to-gray-400 bg-clip-text text-transparent` pada Tailwind untuk membuat efek teks chrome/perak.
- **Transforms:** Jangan ragu gunakan `rotate-1`, `-rotate-2`, `scale-y-150`, `translate-y-2` pada huruf atau div untuk menciptakan kesan berantakan.
- **Spacing:** Gunakan negative margins (`-mt-8`, `-ml-4`) agar teks saling tumpang tindih (overlap) seperti di poster.