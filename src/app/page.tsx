"use client";

import { useState, useEffect } from "react";
// Import helper & ikon yang dibutuhkan
import {
  getWeatherIcon,
  getAQIDescription,
  formatDayName,
} from "@/utils/helpers";
import { Droplets, Wind, Sun, Wind as AirIcon } from "lucide-react"; // Import ikon detail

import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherDetails from "@/components/WeatherDetails";
import ForecastDaily from "@/components/ForecastDaily";

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("Cibinong");

  const fetchWeather = async (searchCity: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(searchCity)}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengambil data cuaca.");
      }

      setWeatherData(data);
      setCity(data.location.name);
    } catch (err: any) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (targetCity: string) => {
    if (!targetCity.trim()) return;
    fetchWeather(targetCity);
  };

  return (
    <div className="w-full space-y-8 py-6">
      {/* 1. Header & Search Bar */}
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
          SkyCast
        </h1>
        <p className="text-white/60 text-sm tracking-wide">
          Pantau dinamika cuaca lokal secara real-time
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 2. State Controller */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
          <p className="text-white/70 font-medium animate-pulse">
            Menghubungkan ke satelit cuaca...
          </p>
        </div>
      )}

      {error && (
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center my-10">
          <p className="text-red-400 font-medium">⚠️ {error}</p>
          <p className="text-xs text-white/40 mt-1">
            Coba periksa kembali ejaan nama kota Anda.
          </p>
        </div>
      )}

      {/* 3. Tampilan Utama */}
      {!loading && weatherData && (
        <div className="space-y-6 animate-fade-in">
          <CurrentWeather
            data={{
              city: weatherData.location.name,
              region: weatherData.location.region,
              temp: Math.round(weatherData.current.temp_c),
              condition: weatherData.current.condition.text,
              date: formatDayName(new Date().toISOString().split("T")[0]),
            }}
            IconComponent={getWeatherIcon(weatherData.current.condition.text)}
          />

          {/* Mengirim Ikon Lucide sebagai objek komponen langsung */}
          <WeatherDetails
            details={[
              {
                label: "Kelembapan",
                value: `${weatherData.current.humidity}%`,
                Icon: Droplets,
              },
              {
                label: "Kecepatan Angin",
                value: `${weatherData.current.wind_kph} km/jam`,
                Icon: Wind,
              },
              {
                label: "Indeks UV",
                value: `${weatherData.current.uv} (UVI)`,
                Icon: Sun,
              },
              {
                label: "Kualitas Udara",
                value: getAQIDescription(
                  weatherData.current.air_quality["us-epa-index"],
                ).text,
                Icon: AirIcon,
                colorClass: getAQIDescription(
                  weatherData.current.air_quality["us-epa-index"],
                ).color,
              },
            ]}
          />

          <ForecastDaily
            forecasts={weatherData.forecast.forecastday.map((day: any) => ({
              day: formatDayName(day.date),
              // Mengambil rata-rata dari maxtemp dan mintemp yang ada di data OpenWeatherMap kita
              temp: Math.round((day.day.maxtemp_c + day.day.mintemp_c) / 2),
              conditionText: day.day.condition.text,
              desc: day.day.condition.text,
            }))}
          />
        </div>
      )}
    </div>
  );
}
