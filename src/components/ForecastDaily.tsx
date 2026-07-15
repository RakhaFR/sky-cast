"use client";

import React from "react";

export default function ForecastDaily() {
  // Data bohongan ramalan cuaca 5 hari ke depan
  const mockForecast = [
    { day: "Kamis", temp: 31, condition: "⛅", desc: "Berawan" },
    { day: "Jumat", temp: 29, condition: "🌧️", desc: "Hujan Ringan" },
    { day: "Sabtu", temp: 30, condition: "⛈️", desc: "Hujan Petir" },
    { day: "Minggu", temp: 33, condition: "☀️", desc: "Cerah" },
    { day: "Senin", temp: 32, condition: "☁️", desc: "Mendung" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold tracking-wide mb-4 flex items-center gap-2">
        📅 Ramalan Cuaca 5 Hari Ke depan
      </h3>
      
      {/* Fitur scroll horizontal otomatis kalau layarnya gak muat */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20">
        {mockForecast.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-28 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center shadow-sm"
          >
            <span className="text-sm font-medium text-white/80">{item.day}</span>
            <span className="text-3xl my-3">{item.condition}</span>
            <span className="text-xl font-bold">{item.temp}°C</span>
            <span className="text-[10px] text-white/60 mt-1 font-medium truncate w-full">
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}