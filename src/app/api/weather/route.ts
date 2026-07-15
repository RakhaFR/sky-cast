import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 1. Ambil parameter nama kota dari URL query string (misal: /api/weather?city=Bogor)
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");

  // Jika user tidak memasukkan nama kota, kirim error
  if (!city) {
    return NextResponse.json(
      { error: "Parameter 'city' wajib diisi." },
      { status: 400 }
    );
  }

  // 2. Ambil API Key dari .env.local
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API Key tidak ditemukan di server." },
      { status: 500 }
    );
  }

  try {
    // 3. Tembak ke WeatherAPI.com (Minta data cuaca sekarang, forecast 3 hari, dan kualitas udara/aqi)
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=yes&alerts=no`,
      {
        // Cache data selama 15 menit agar hemat kuota API dan loading cepat
        next: { revalidate: 900 }, 
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Kota tidak ditemukan atau API bermasalah." },
        { status: response.status }
      );
    }

    const data = await response.json();

    // 4. Kirim balik datanya ke Front-End
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server internal." },
      { status: 500 }
    );
  }
}