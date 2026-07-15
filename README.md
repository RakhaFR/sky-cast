This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🌤️ SkyCast - Next.js Weather Application

Sebuah aplikasi dashboard cuaca modern, responsif, dan kaya fitur yang dibangun menggunakan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**. Project ini dirancang dengan struktur modular yang siap di-deploy langsung ke **Vercel**.

## 📁 Struktur Project

Berikut adalah gambaran menyeluruh dari arsitektur folder dan file di dalam project ini:

```text
src/
├── app/
│   ├── page.tsx            # Halaman utama (Dashboard Utama Cuaca)
│   ├── layout.tsx          # Layout global (Font, HTML, Body wrapper)
│   └── api/
│       └── weather/        # Internal API Route handler untuk menyembunyikan API Key pihak ketiga
│           └── route.ts
├── components/
│   ├── CurrentWeather.tsx  # Menampilkan suhu saat ini, lokasi, dan animasi/visual utama cuaca
│   ├── ForecastDaily.tsx   # Menampilkan ramalan cuaca (forecast) beberapa hari ke depan
│   ├── SearchBar.tsx       # Input pencarian kota/lokasi
│   └── WeatherDetails.tsx  # Menampilkan detail metrik (Kecepatan angin, kelembapan, UV index, AQI)
└── utils/
    └── helpers.ts          # Fungsi pembantu (Konversi suhu, format tanggal, mapping icon)
