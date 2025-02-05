"use client";

import { useEffect, useState } from "react";
import { Cloud, Sun, Thermometer, Wind, Droplet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "./location-provider";
import WeatherAlert from "./weather-alert";

type WeatherData = {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  alerts?: string[];
};

export default function WeatherDisplay() {
  const { latitude, longitude, error } = useLocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (latitude && longitude) {
      // Aqui você faria uma chamada para sua API de previsão do tempo
      // usando a latitude e longitude
      // Por enquanto, vamos simular com dados estáticos
      setWeatherData({
        location: "Sua Localização",
        temperature: 22,
        condition: "Parcialmente Nublado",
        humidity: 60,
        windSpeed: 8,
        feelsLike: 21,
        alerts: [
          "Alerta de Calor: Altas temperaturas esperadas. Mantenha-se hidratado.",
        ],
      });
    }
  }, [latitude, longitude]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!weatherData) {
    return <p className="text-center">Carregando dados do clima...</p>;
  }

  return (
    <div className="space-y-4">
      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <WeatherAlert alerts={weatherData.alerts} />
      )}
      <Card className="bg-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl flex items-center justify-between">
            <span>{weatherData.location}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Thermometer className="mr-2 h-6 w-6 sm:h-8 sm:w-8 text-sky-300" />
              <span className="text-3xl sm:text-5xl font-bold">
                {weatherData.temperature}°C
              </span>
            </div>
            <div className="flex items-center text-lg sm:text-xl">
              <Sun className="mr-2 h-6 w-6 sm:h-8 sm:w-8 text-yellow-300" />
              <Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300" />
              <span className="ml-2">{weatherData.condition}</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div>
              <Droplet className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-blue-300" />
              <p className="text-xs sm:text-sm text-sky-200">Umidade</p>
              <p className="text-sm sm:text-lg font-semibold">
                {weatherData.humidity}%
              </p>
            </div>
            <div>
              <Wind className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-green-300" />
              <p className="text-xs sm:text-sm text-sky-200">Vento</p>
              <p className="text-sm sm:text-lg font-semibold">
                {weatherData.windSpeed} km/h
              </p>
            </div>
            <div>
              <Thermometer className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 text-orange-300" />
              <p className="text-xs sm:text-sm text-sky-200">Sensação</p>
              <p className="text-sm sm:text-lg font-semibold">
                {weatherData.feelsLike}°C
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
