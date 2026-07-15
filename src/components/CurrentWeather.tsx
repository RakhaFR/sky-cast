"use client";

import React from "react";

export default function CurrentWeather() {
  // Sementara pake data bohongan dulu biar kelihatan hasilnya di browser
  const mockData = {
    city: "Jakarta",
    temp: 32,
    condition: "Berawan",
    date: "Rabu, 15 Juli 2026",
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 text-center shadow-xl">
      {/* Nama Kota & Tanggal */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold tracking-wide">{mockData.city}</h2>
        <p className="text-sm text-white/70 mt-1">{mockData.date}</p>
      </div>

      {/* Visual Besar (Ikon Cuaca & Suhu) */}
      <div className="flex flex-col items-center justify-center my-6">
        {/* Ikon Cuaca Animasi Sederhana/Emoji (Nanti bisa diganti SVG atau Image API) */}
        <div className="text-7xl mb-4 animate-bounce duration-1000">
          ⛅
        </div>
        
        {/* Angka Suhu */}
        <div className="flex items-start justify-center">
          <span className="text-7xl font-extrabold tracking-tighter">
            {mockData.temp}
          </span>
          <span className="text-3xl font-medium mt-1">°C</span>
        </div>
      </div>

      {/* Status Kondisi Cuaca */}
      <div className="mt-2">
        <span className="px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold tracking-wide uppercase">
          {mockData.condition}
        </span>
      </div>
    </div>
  );
}