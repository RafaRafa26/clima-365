"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CurrentWeather from "@/app/components/current-weather";
import HourlyForecast from "@/app/components/hourly-forecast";
import DailyForecast from "@/app/components/daily-forecast";


export default function WeatherPage() {
  const params = useParams();
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const { lat, lon } = params;
    // Aqui você faria uma chamada para a API para obter o nome da cidade
    // Por enquanto, vamos apenas simular isso
    setCityName(`Cidade (${lat}, ${lon})`);
  }, [params]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{cityName}</h1>
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
    </div>
  );
}
