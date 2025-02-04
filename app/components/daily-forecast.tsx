"use client";

import { useEffect, useState } from "react";
import { useGeolocation } from "./geolocation-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Image from "next/image";

type DailyForecast = {
  date: string;
  tempMax: number;
  tempMin: number;
  icon: string;
  description: string;
};

export default function DailyForecast() {
  const { latitude, longitude } = useGeolocation();
  const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          const dailyData = data.list
            .reduce((acc: DailyForecast[], reading: any) => {
              const date = new Date(reading.dt * 1000).toLocaleDateString(
                "pt-BR",
                {
                  weekday: "short",
                  day: "2-digit",
                  month: "2-digit",
                }
              );
              const existingDay = acc.find((day) => day.date === date);
              if (existingDay) {
                existingDay.tempMax = Math.max(
                  existingDay.tempMax,
                  reading.main.temp_max
                );
                existingDay.tempMin = Math.min(
                  existingDay.tempMin,
                  reading.main.temp_min
                );
              } else {
                acc.push({
                  date,
                  tempMax: reading.main.temp_max,
                  tempMin: reading.main.temp_min,
                  icon: `http://openweathermap.org/img/wn/${reading.weather[0].icon}.png`,
                  description: reading.weather[0].description,
                });
              }
              return acc;
            }, [])
            .slice(0, 5);
          setForecast(dailyData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar previsão diária:", error);
          setLoading(false);
        });
    }
  }, [latitude, longitude]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Previsão para 5 Dias</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner />
        ) : forecast ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="text-center">
                <p className="font-medium">{day.date.replace(",", "")}</p>
                <Image
                  src={day.icon || "/placeholder.svg"}
                  alt={day.description}
                  width={40}
                  height={40}
                  className="mx-auto"
                  unoptimized
                />
                <p>{Math.round(day.tempMax)}°C</p>
                <p className="text-muted-foreground">
                  {Math.round(day.tempMin)}°C
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Não foi possível carregar a previsão diária.</p>
        )}
      </CardContent>
    </Card>
  );
}
