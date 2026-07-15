"use client";

import React, { useState } from "react";

export default function SearchBar() {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Sementara kita alert dulu buat ngetes tombolnya jalan atau nggak
    alert(`Mencari cuaca untuk kota: ${input}`);
    
    // Nanti di sini dicolok fungsi fetch data dari si Back-End
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto my-6">
      <div className="relative flex items-center">
        {/* Kotak Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Cari kota... (misal: Jakarta, London)"
          className="w-full px-5 py-3 pr-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
        />

        {/* Tombol Cari (Icon Kaca Pembesar) */}
        <button
          type="submit"
          className="absolute right-2 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}