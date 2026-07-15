"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // State untuk menyimpan data cuaca dari API internal kita
  const [weatherData, setWeatherData] = useState<any>(null);
  // State untuk melacak status loading saat fetch data sedang berjalan
  const [loading, setLoading] = useState<boolean>(false);
  // State untuk menangani pesan error jika kota tidak ditemukan / API down
  const [error, setError] = useState<string | null>(null);
  // State untuk menyimpan nama kota yang aktif dicari (Default: Cibinong)
  const [city, setCity] = useState<string>("Cibinong");

  // Fungsi utama untuk mengambil data dari API internal kita (/api/weather)
  const fetchWeather = async (searchCity: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(searchCity)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengambil data cuaca.");
      }

      // Simpan data ke state jika sukses
      setWeatherData(data);
      // Update kota aktif saat ini agar sinkron
      setCity(data.location.name); 
      
      // KONSOL LOG DATA SECARA DETAIL (Target utama Tugas 3)
      console.log("=== DATA CUACA BERHASIL DI-FETCH ===");
      console.log("Lokasi:", data.location.name, ",", data.location.region);
      console.log("Cuaca Saat Ini:", data.current.condition.text, `${data.current.temp_c}°C`);
      console.log("Forecast 3 Hari:", data.forecast.forecastday);
      console.log("Kualitas Udara (US-EPA):", data.current.air_quality["us-epa-index"]);
      console.log("====================================");

    } catch (err: any) {
      setError(err.message);
      setWeatherData(null);
      console.error("Error Fetching Weather:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger pencarian pertama kali saat aplikasi dibuka (Default ke Cibinong)
  useEffect(() => {
    fetchWeather(city);
  }, []);

  // Fungsi wrapper yang nanti akan dioper ke komponen SearchBar
  const handleSearch = (targetCity: string) => {
    if (!targetCity.trim()) return;
    fetchWeather(targetCity);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          SkyCast Dashboard
        </h1>
        
        <p className="text-slate-400">
          Membuka jalur data Back-End ke Front-End...
        </p>

        {/* BOX SIMULASI UTK TESTING DI BROWSER */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 max-w-md mx-auto shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-slate-200 text-left">🧪 Simulator Kontrol Orang A</h2>
          
          {/* Form mini untuk testing pencarian sebelum SearchBar.tsx jadi */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const inputCity = formData.get("cityName") as string;
              handleSearch(inputCity);
            }}
            className="flex gap-2 mb-4"
          >
            <input 
              type="text" 
              name="cityName"
              placeholder="Ketik nama kota... (misal: Bogor)" 
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
            >
              Cari
            </button>
          </form>

          {/* Status Loading / Error / Data Ready */}
          <div className="text-left text-xs space-y-2 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
            <p><span className="text-purple-400">Status:</span> {loading ? "🔄 Loading..." : "🟢 Idle"}</p>
            {error && <p><span className="text-red-400">Error:</span> {error}</p>}
            <p>
              <span className="text-blue-400">Kota Aktif:</span> {city}
            </p>
            <p>
              <span className="text-green-400">Data Terikat:</span> {weatherData ? "Sudah Siap (Cek Console Log F12!)" : "Belum Ada"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}