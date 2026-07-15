import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "Parameter 'city' wajib diisi." }, { status: 400 });
  }

  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API Key tidak ditemukan di server." }, { status: 500 });
  }

  try {
    // 1. Tembak ke API gratis OpenWeatherMap (Current Weather)
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;
    
    const response = await fetch(currentWeatherUrl, { next: { revalidate: 900 } });

    if (!response.ok) {
      return NextResponse.json({ error: "Kota tidak ditemukan atau API bermasalah." }, { status: response.status });
    }

    const weatherData = await response.json();

    // 2. Bungkus ulang (Mapping) datanya agar strukturnya pas dengan UI Orang B
    const formattedData = {
      location: {
        name: weatherData.name,
        region: "Koordinat: " + weatherData.coord.lat + ", " + weatherData.coord.lon,
        country: weatherData.sys.country,
      },
      current: {
        temp_c: weatherData.main.temp,
        condition: {
          // OpenWeather punya deskripsi cuaca (misal: "hujan ringan")
          text: weatherData.weather[0].description, 
        },
        wind_kph: Math.round(weatherData.wind.speed * 3.6), // Konversi m/s ke km/jam
        humidity: weatherData.main.humidity,
        uv: 0, // Fallback karena API gratis tidak menyediakan UV Index
        air_quality: {
          "us-epa-index": 1, // Fallback default "Baik" karena butuh endpoint terpisah
        },
      },
      forecast: {
        // Karena API gratisan ini tidak ada forecast harian gratis, 
        // kita buat simulasi forecast berdasarkan data hari ini agar UI Orang B tidak kosong/crash
        forecastday: [
          {
            date: new Date().toISOString().split('T')[0],
            day: {
              maxtemp_c: weatherData.main.temp_max,
              mintemp_c: weatherData.main.temp_min,
              condition: { text: weatherData.weather[0].description }
            }
          },
          {
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            day: {
              maxtemp_c: weatherData.main.temp_max + 1,
              mintemp_c: weatherData.main.temp_min - 1,
              condition: { text: weatherData.weather[0].description }
            }
          },
          {
            date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
            day: {
              maxtemp_c: weatherData.main.temp_max - 1,
              mintemp_c: weatherData.main.temp_min + 2,
              condition: { text: weatherData.weather[0].description }
            }
          }
        ]
      }
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}