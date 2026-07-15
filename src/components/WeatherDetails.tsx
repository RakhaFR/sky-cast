"use client";

import React from "react";

export default function WeatherDetails() {
  // Data bohongan untuk detail metrik
  const mockDetails = [
    { label: "Kelembapan", value: "75%", icon: "💧" },
    { label: "Kecepatan Angin", value: "12 km/jam", icon: "💨" },
    { label: "Indeks UV", value: "5 (Sedang)", icon: "☀️" },
    { label: "Kualitas Udara (AQI)", value: "42 (Baik)", icon: "🍃" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      {/* Grid sistem: 2 kolom di HP, 4 kolom di layar laptop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockDetails.map((detail, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center shadow-md hover:bg-white/15 transition-all"
          >
            <span className="text-2xl mb-2">{detail.icon}</span>
            <span className="text-xs text-white/60 uppercase tracking-wider font-medium">
              {detail.label}
            </span>
            <span className="text-lg font-bold mt-1 text-white">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}