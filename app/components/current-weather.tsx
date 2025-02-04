"use client";

import { useEffect, useState } from "react";
import { useGeolocation } from "./geolocation-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Thermometer, Wind } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";


type WeatherData = {
  cityName: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
};

export default function CurrentWeather() {
  const { latitude, longitude, error } = useGeolocation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather({
            cityName: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            feelsLike: data.main.feels_like,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do clima:", error);
          setLoading(false);
        });
    }
  }, [latitude, longitude]);

  if (error) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Clima Atual</CardTitle>
        {weather && (
          <p className="text-lg text-muted-foreground">{weather.cityName}</p>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner />
        ) : weather ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-1 sm:col-span-2">
              <p className="text-4xl font-bold">
                {Math.round(weather.temperature)}°C
              </p>
              <p className="text-xl capitalize">{weather.description}</p>
            </div>
            <div className="flex items-center">
              <Thermometer className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Sensação térmica de {Math.round(weather.feelsLike)}°C</span>
            </div>
            <div className="flex items-center">
              <Droplets className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Umidade: {weather.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Vento: {(weather.windSpeed * 3.6).toFixed(1)} km/h</span>
            </div>
          </div>
        ) : (
          <p>Não foi possível carregar os dados do clima.</p>
        )}
      </CardContent>
    </Card>
  );
}
