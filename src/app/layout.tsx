import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 

const inter = Inter({ subsets: ["latin"] });

// Ini buat ngatur judul di tab browser lu nanti
export const metadata: Metadata = {
  title: "SkyCast - Weather Dashboard",
  description: "Pantau info cuaca terkini dengan mudah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* Di sini kita set background gradasi biru-ungu biar estetik tema cuaca */}
      <body
        className={`${inter.className} bg-gradient-to-br from-blue-500 to-indigo-900 min-h-screen text-white antialiased`}
      >
        {/* Wrapper ini biar isi web lu nanti rapi di tengah, gak meletot ke pinggir layar */}
        <main className="container mx-auto max-w-5xl p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}