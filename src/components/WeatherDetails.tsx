"use client";
import React from "react";

interface DetailItem {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
  colorClass?: string;
}

export default function WeatherDetails({ details }: { details: DetailItem[] }) {
  return (
    <div className="w-full max-w-3xl mx-auto my-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {details.map((detail, index) => {
          const IconComponent = detail.Icon;
          return (
            <div 
              key={index} 
              className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center shadow-md hover:bg-white/15 transition-all"
            >
              {/* Render Ikon Lucide dengan styling warna cyan soft */}
              <div className="p-2 rounded-full bg-white/5 border border-white/10 mb-2">
                <IconComponent className="w-6 h-6 text-cyan-300" />
              </div>
              <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">
                {detail.label}
              </span>
              <span className={`text-md font-extrabold mt-1 ${detail.colorClass || "text-white"}`}>
                {detail.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}