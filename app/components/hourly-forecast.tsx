"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Image from "next/image";

type HourlyForecast = {
  time: string;
  temperature: number;
  icon: string;
};

type WeatherItem = {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
  }>;
};

type HourlyForecastProps = {
  lat: number | null;
  lon: number | null;
};

export default function HourlyForecast({ lat, lon }: HourlyForecastProps) {
  const [forecast, setForecast] = useState<HourlyForecast[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lat && lon) {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          const currentTime = new Date().getTime();
          const hourlyData = data.list
            .filter(
              (item: WeatherItem) =>
                new Date(item.dt * 1000).getTime() > currentTime
            )
            .slice(0, 6)
            .map((item: WeatherItem) => ({
              time: new Date(item.dt * 1000).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              temperature: item.main.temp,
              icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
            }));
          setForecast(hourlyData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar previsão horária:", error);
          setLoading(false);
        });
    }
  }, [lat, lon]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Previsão por Hora</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner />
        ) : forecast ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {forecast.map((hour, index) => (
              <div key={index} className="text-center">
                <p className="font-medium">{hour.time}</p>
                <Image
                  src={hour.icon || "/placeholder.svg"}
                  alt="Ícone do tempo"
                  width={32}
                  height={32}
                  className="mx-auto"
                  unoptimized
                />
                <p className="text-primary">{Math.round(hour.temperature)}°C</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Não foi possível carregar a previsão horária.</p>
        )}
      </CardContent>
    </Card>
  );
}
