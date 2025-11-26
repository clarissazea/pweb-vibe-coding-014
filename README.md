
<h1 align="center">🍎Food Inventory</h1>
<p align="center">Aplikasi Manajemen Stok Makanan Cerdas Berbasis Web (MERN Stack)</p>


<img width="1838" height="1013" alt="image" src="https://github.com/user-attachments/assets/80c70468-5ff7-4a11-a787-8244d802d1f5" />
---

## 📋 Table of Contents

- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Development Guide](#development-guide)

---

## 🧐 Problem Statement

Dalam pengelolaan kebutuhan rumah tangga atau usaha kuliner kecil, seringkali terjadi masalah:

1.  **Food Waste (Limbah Makanan):** Makanan sering terbuang sia-sia karena kedaluwarsa tanpa disadari oleh pemilik.
2.  **Inefisiensi Belanja:** Membeli barang yang sama berulang kali karena tidak tahu stok masih ada (terselip di lemari).
3.  **Pencatatan Manual:** Metode mencatat di kertas atau mengingat-ingat stok sangat rentan lupa dan tidak efisien.

```
Selain masalah umum di atas, aplikasi ini juga sangat relevan untuk anak kost atau individu yang menggunakan dapur bersama.
Dalam lingkungan tersebut, sering terjadi kebingungan mengenai barang milik pribadi dan tanggal kedaluwarsa barang tersebut,
yang memicu hilangnya item atau penggunaan item oleh orang yang salah.
Aplikasi ini memecahkan masalah pelacakan kepemilikan dan masa simpan dalam ruang berbagi.
```
---

## 💡 Solution

**Food Inventory** hadir sebagai solusi digital terpusat untuk melacak stok makanan secara *real-time*.

Aplikasi ini mendigitalkan dapur Anda dengan memungkinkan pencatatan detail item, visualisasi stok melalui foto, dan yang terpenting: **Sistem Peringatan Dini**. Aplikasi secara otomatis memisahkan dan menyoroti item yang akan kedaluwarsa dalam 7 hari ke depan, membantu pengguna memprioritaskan konsumsi dan mengurangi limbah.

---

## ✨ Features

### 1. 🔐 Autentikasi Pengguna Aman
* **Register & Login:** Menggunakan enkripsi password (`bcrypt`) dan Token JWT (JSON Web Token) untuk keamanan sesi.
* **Proteksi Rute:** Hanya pengguna yang login yang bisa mengakses dashboard inventaris.

### 2. 📦 Manajemen Inventaris (CRUD)
* **Create:** Tambah stok dengan detail: Nama, Jumlah, Satuan, Tanggal Kedaluwarsa, dan Foto.
* **Read:** Lihat daftar stok dalam bentuk kartu visual yang informatif.
* **Update:** Edit data stok jika ada kesalahan input atau perubahan jumlah.
* **Delete:** Hapus item yang sudah habis atau dibuang.

### 3. ⚠️ Peringatan Kedaluwarsa (Smart Alert)
* Halaman khusus **"Segera Habiskan"** yang memfilter item dengan sisa waktu ≤ 7 hari.
* Indikator status visual pada setiap kartu: **Aman**, **Segera Habis**, atau **Expired**.

### 4. 🔍 Pencarian & Filter
* **Search Bar:** Cari item berdasarkan nama makanan secara instan.
* **Unit Filter:** Filter stok berdasarkan satuan (pcs, kg, liter, box, dll).

### 5. 📷 Upload Gambar
* Integrasi `Multer` untuk mengunggah foto makanan dari perangkat pengguna ke server.

---

## 🏗️ Architecture

Proyek ini dibangun menggunakan **MERN Stack** dengan struktur **Monorepo** (Frontend dan Backend terpisah dalam satu repositori).

### Tech Stack
* **Frontend:** React.js, TypeScript, Vite, CSS Modules.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (NoSQL).
* **Tools:** Axios, React Router DOM, Multer, JWT.

### Struktur Direktori

```markdown
frontend/
├── node_modules/       # Dependensi Node.js
├── public/             # File statis (index.html, favicon)
├── src/                # Kode Sumber Utama
│   ├── api/            # Layer Komunikasi API (Axios)
│   │   ├── apiClient.ts  
│   │   ├── authApi.ts    
│   │   └── foodApi.ts    
│   │
│   ├── components/
│   │   ├── Common/         # Komponen Reusable Dasar
│   │   │   ├── FoodCard.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   └── Inventory/      # Komponen Khusus Inventaris
│   │       ├── FilterBar.tsx
│   │       └── FoodForm.tsx
│   │
│   ├── context/          # Global State Management
│   │   └── AuthContext.tsx
│   │
│   ├── pages/            # Halaman Penuh (Routing Components)
│   │   ├── AuthPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ExpiringSoonPage.tsx
│   │   └── FoodFormPage.tsx
│   │
│   ├── types/            # Tipe TypeScript (Interfaces)
│   │   ├── auth.ts
│   │   └── food.ts
│   │
│   ├── App.tsx           # Komponen Root & Routing
│   ├── main.tsx          # Entry Point Aplikasi
│   └── index.css         # Styling Global
│
├── .gitignore          
├── package.json        
├── package-lock.json   
├── tsconfig.json       
└── vite.config.ts      
```
## 🚀 Installation & Setup

Ikuti langkah ini untuk menjalankan proyek di komputer lokal Anda.

**Prasyarat**
- **Node.js** (v18 ke atas)
- **MongoDB** (Pastikan service MongoDB lokal berjalan atau siapkan URI MongoDB Atlas)

### 1. Clone Repository
```
git clone <repository-url>
cd pweb-vibe-coding-014
```
### 2. Setup Backend
```

# Masuk ke folder 
cd backend

# Install dependencies
npm install

# Buat file .env
echo "PORT=5000" > .env
echo "MONGO_URI=mongodb://localhost:27017/foodinventory" >> .env
echo "JWT_SECRET=rahasia_super_aman" >> .env

# Jalankan Server
npm start

```
Server berjalan di `http://localhost:5000`

### 3. Setup Frontend
Buka terminal baru:

```
# Masuk ke folde
cd frontend

# Install dependencies
npm install

# Jalankan Client
npm run dev
```
Aplikasi berjalan di `http://localhost:5173`


## 📡 API Documentation

Berikut adalah endpoint utama yang tersedia di Backend:

#### Auth

- `POST /api/auth/register` - Mendaftar akun baru (Email, Password).
- `POST /api/auth/login` - Masuk dan mendapatkan Token JWT.

#### Foods (Memerlukan Token Header: `Authorization: Bearer <token>`)

- `GET /api/foods` - Mengambil semua stok (mendukung query `?search=` dan `?unit=`).
- `POST /api/foods` - Menambah stok baru (Form-Data: name, quantity, unit, expiryDate, photo).
- `GET /api/foods/:id` - Mengambil detail satu item.
- `PATCH /api/foods/:id` - Mengupdate item.
- `DELETE /api/foods/:id` - Menghapus item.

## 👨‍💻 Development Guide
Jika ingin mengembangkan fitur tambahan:

1. Branching: Gunakan branch terpisah untuk fitur baru (`git checkout -b feature/tambah-barcode`).
2. Type Safety: Karena menggunakan TypeScript di frontend, pastikan untuk memperbarui `src/types/food.ts` jika Anda mengubah struktur data di backend.
3. Styling: Proyek ini menggunakan CSS global di `index.css`. Untuk komponen baru, disarankan menggunakan CSS Modules atau class yang spesifik agar tidak tumpang tindih.

## ✨ Screenshots

- Menu Stok Makanan yang sudah diinput
<img width="1838" height="1013" alt="image" src="https://github.com/user-attachments/assets/80c70468-5ff7-4a11-a787-8244d802d1f5" />

- Input form makanan yang akan ditracking
<img width="1826" height="1012" alt="image" src="https://github.com/user-attachments/assets/22dc17b1-c3e4-4d17-805f-1cca49f613a0" />


- Menu peringatan makanan yang sudah mendekati tanggal expired!
<img width="1846" height="1005" alt="image" src="https://github.com/user-attachments/assets/31ef511e-d426-461c-9507-973e25075bae" />

## 👩‍💻 Developer
Food Inventor adalah hasil yang dibuat untuk penugasan mata kuliah Pemrograman Website 2025. Dikerjakan oleh: 

| Data     | Keterangan               |
|----------|---------------------------|
| Nama     | Clarissa Aydin Rahmazea  |
| NRP      | 5027241014               |
| Kelas    | A                        |



