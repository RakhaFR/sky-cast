import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudDrizzle, 
  CloudSnow, 
  CloudFog, 
  Wind,
  HelpCircle
} from "lucide-react";

/**
 * 1. Mengubah angka indeks kualitas udara (US EPA Index)
 * menjadi teks deskriptif bahasa Indonesia yang mudah dipahami.
 */
export function getAQIDescription(index: number): { text: string; color: string } {
  switch (index) {
    case 1:
      return { text: "Baik", color: "text-green-500 bg-green-500/10" };
    case 2:
      return { text: "Sedang", color: "text-yellow-500 bg-yellow-500/10" };
    case 3:
      return { text: "Tidak Sehat bagi Kelompok Sensitif", color: "text-orange-500 bg-orange-500/10" };
    case 4:
      return { text: "Tidak Sehat", color: "text-red-500 bg-red-500/10" };
    case 5:
      return { text: "Sangat Tidak Sehat", color: "text-purple-500 bg-purple-500/10" };
    case 6:
      return { text: "Berbahaya ⚠️", color: "text-red-500 bg-red-950/20" };
    default:
      return { text: "Tidak Diketahui", color: "text-gray-500 bg-gray-500/10" };
  }
}

/**
 * 2. Mengubah string tanggal (YYYY-MM-DD) dari API menjadi nama hari lokal.
 * Contoh: "2026-07-15" -> "Rabu"
 */
export function formatDayName(dateString: string): string {
  // Tambahkan handling jika input tanggal berupa format standar yyyy-mm-dd agar tidak bergeser zona waktunya
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { weekday: "long" });
}

/**
 * 3. Mapping teks kondisi cuaca ke komponen ikon Lucide React.
 * Sudah di-update agar mendukung teks Inggris (WeatherAPI) dan Indonesia (OpenWeatherMap).
 */
export function getWeatherIcon(conditionText: string) {
  const cleanText = conditionText.toLowerCase().trim();

  // 1. Cerah / Panas
  if (cleanText.includes("sunny") || cleanText.includes("clear") || cleanText.includes("cerah")) {
    return Sun;
  }
  // 2. Petir / Badai
  if (cleanText.includes("thunder") || cleanText.includes("storm") || cleanText.includes("petir") || cleanText.includes("badai")) {
    return CloudLightning;
  }
  // 3. Hujan Lebat
  if (cleanText.includes("heavy rain") || cleanText.includes("torrential") || cleanText.includes("lebat")) {
    return CloudRain;
  }
  // 4. Hujan Biasa / Sedang
  if (cleanText.includes("rain") || cleanText.includes("shower") || cleanText.includes("hujan")) {
    return CloudRain;
  }
  // 5. Gerimis
  if (cleanText.includes("drizzle") || cleanText.includes("gerimis")) {
    return CloudDrizzle;
  }
  // 6. Salju
  if (cleanText.includes("snow") || cleanText.includes("sleet") || cleanText.includes("ice") || cleanText.includes("salju")) {
    return CloudSnow;
  }
  // 7. Kabut / Asap Emisi
  if (cleanText.includes("mist") || cleanText.includes("fog") || cleanText.includes("haze") || cleanText.includes("kabut")) {
    return CloudFog;
  }
  // 8. Berawan banyak / Mendung
  if (cleanText.includes("cloud") || cleanText.includes("overcast") || cleanText.includes("awan") || cleanText.includes("mendung")) {
    return Cloud;
  }
  // 9. Berangin
  if (cleanText.includes("wind") || cleanText.includes("blizzard") || cleanText.includes("angin")) {
    return Wind;
  }

  return HelpCircle; // Ikon fallback jika text tidak cocok dengan apa pun
}