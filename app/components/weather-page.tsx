"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useEffect, useState } from "react";
import CurrentWeather from "./current-weather";
import TemperatureChart from "./temperature-chart";
import HourlyForecast from "./hourly-forecast";
import DailyForecast from "./daily-forecast";


type WeatherPageProps = {
  lat: number;
  lon: number;
};

export default function WeatherPage({ lat, lon }: WeatherPageProps) {
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCityName(data.name);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar nome da cidade:", error);
        setLoading(false);
      });
  }, [lat, lon]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{cityName}</h1>
      <CurrentWeather lat={lat} lon={lon} />
      <TemperatureChart lat={lat} lon={lon} />
      <HourlyForecast lat={lat} lon={lon} />
      <DailyForecast lat={lat} lon={lon} />
    </div>
  );
}
