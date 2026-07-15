"use client";
import React from "react";

interface CurrentWeatherProps {
  data: { city: string; region: string; temp: number; condition: string; date: string };
  IconComponent: any;
}

export default function CurrentWeather({ data, IconComponent }: CurrentWeatherProps) {
  return (
    <div className="w-full max-w-md mx-auto my-4 p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 text-center shadow-xl">
      <div>
        <h2 className="text-3xl font-extrabold tracking-wide text-white">{data.city}</h2>
        <p className="text-xs text-white/60 mt-1">{data.region} • {data.date}</p>
      </div>

      <div className="flex flex-col items-center justify-center my-6">
        {/* Ikon Lucide dinamis buatan temen lu dengan animasi glow */}
        <div className="p-4 rounded-full bg-white/5 border border-white/10 mb-4 shadow-inner">
          <IconComponent className="w-16 h-16 text-cyan-300 animate-pulse" />
        </div>
        
        <div className="flex items-start justify-center">
          <span className="text-7xl font-black tracking-tighter">{data.temp}</span>
          <span className="text-3xl font-medium mt-1">°C</span>
        </div>
      </div>

      <div className="mt-2">
        <span className="px-4 py-1.5 rounded-full bg-white/15 text-xs font-bold tracking-wider uppercase text-cyan-200">
          {data.condition}
        </span>
      </div>
    </div>
  );
}