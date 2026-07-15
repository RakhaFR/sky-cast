"use client";
import React from "react";
import { getWeatherIcon } from "@/utils/helpers";
import { CalendarDays } from "lucide-react"; // Import ikon kalender modern

interface ForecastItem {
  day: string;
  temp: number;
  conditionText: string;
  desc: string;
}

export default function ForecastDaily({ forecasts }: { forecasts: ForecastItem[] }) {
  return (
    <div className="w-full max-w-3xl mx-auto my-4 p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <h3 className="text-xs font-bold tracking-widest uppercase text-white/70 mb-5 flex items-center gap-2">
        <CalendarDays className="w-4 h-4 text-cyan-300" />
        Ramalan Cuaca 3 Hari Ke Depan
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        {forecasts.map((item, index) => {
          const WeatherIcon = getWeatherIcon(item.conditionText);
          return (
            <div 
              key={index} 
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center shadow-sm hover:bg-white/10 transition-all"
            >
              <span className="text-xs font-bold text-white/70">{item.day}</span>
              
              {/* Render Ikon Lucide dinamis hasil mapping helper temen lu */}
              <div className="my-3 p-2 rounded-full bg-white/5 border border-white/5">
                <WeatherIcon className="w-8 h-8 text-cyan-300" />
              </div>
              
              <span className="text-xl font-black">{item.temp}°C</span>
              <span className="text-[9px] text-white/50 mt-1.5 font-semibold truncate w-full px-1">
                {item.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}