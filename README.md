# Food Inventor


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


<img width="1838" height="1013" alt="image" src="https://github.com/user-attachments/assets/80c70468-5ff7-4a11-a787-8244d802d1f5" />

<img width="1846" height="1005" alt="image" src="https://github.com/user-attachments/assets/31ef511e-d426-461c-9507-973e25075bae" />

