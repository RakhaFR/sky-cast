"use client";
import React, { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto my-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Cari kota... (misal: Jakarta, Bogor)"
          className="w-full px-5 py-3 pr-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-sm"
        />
        <button type="submit" className="absolute right-2 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}