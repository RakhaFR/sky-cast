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
 * 1. Mengubah angka indeks kualitas udara (US EPA Index) dari WeatherAPI
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
      return { text: "Berbahaya ⚠️", color: "text-maroon-500 bg-red-950/20" };
    default:
      return { text: "Tidak Diketahui", color: "text-gray-500 bg-gray-500/10" };
  }
}

/**
 * 2. Mengubah string tanggal (YYYY-MM-DD) dari API menjadi nama hari lokal.
 * Contoh: "2026-07-15" -> "Rabu"
 */
export function formatDayName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { weekday: "long" });
}

/**
 * 3. Mapping teks kondisi cuaca dari WeatherAPI ke komponen ikon Lucide React
 * supaya tampilan UI kita dinamis sesuai cuaca asli.
 */
export function getWeatherIcon(conditionText: string) {
  const cleanText = conditionText.toLowerCase().trim();

  if (cleanText.includes("sunny") || cleanText.includes("clear")) {
    return Sun;
  }
  if (cleanText.includes("thunder") || cleanText.includes("storm")) {
    return CloudLightning;
  }
  if (cleanText.includes("heavy rain") || cleanText.includes("torrential")) {
    return CloudRain;
  }
  if (cleanText.includes("rain") || cleanText.includes("shower")) {
    return CloudRain;
  }
  if (cleanText.includes("drizzle")) {
    return CloudDrizzle;
  }
  if (cleanText.includes("snow") || cleanText.includes("sleet") || cleanText.includes("ice")) {
    return CloudSnow;
  }
  if (cleanText.includes("mist") || cleanText.includes("fog") || cleanText.includes("haze")) {
    return CloudFog;
  }
  if (cleanText.includes("cloud") || cleanText.includes("overcast")) {
    return Cloud;
  }
  if (cleanText.includes("wind") || cleanText.includes("blizzard")) {
    return Wind;
  }

  return HelpCircle; // Ikon fallback jika text tidak cocok dengan apa pun
}