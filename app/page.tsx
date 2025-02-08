"use client";

import { useState } from "react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import CurrentWeather from "./components/current-weather";
import DailyForecast from "./components/daily-forecast";
import { useGeolocation } from "./components/geolocation-provider";
import HourlyForecast from "./components/hourly-forecast";
import LocationSearch from "./components/location-search";
import TemperatureChart from "./components/temperature-chart";

export default function Home() {
  const { latitude, longitude, error, isPending } = useGeolocation();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const handleLocationSelect = (lat: number, lon: number) => {
    setSelectedLocation({ lat, lon });
  };

  const currentLat = selectedLocation?.lat ?? latitude;
  const currentLon = selectedLocation?.lon ?? longitude;

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error && !selectedLocation) {
    return (
      <LocationSearch
        errorMessage={error}
        onLocationSelect={handleLocationSelect}
      />
    );
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto px-4">
      {!currentLat || !currentLon ? (
        <LocationSearch onLocationSelect={handleLocationSelect} />
      ) : (
        <>
          <CurrentWeather lat={currentLat} lon={currentLon} />
          <TemperatureChart lat={currentLat} lon={currentLon} />
          <HourlyForecast lat={currentLat} lon={currentLon} />
          <DailyForecast lat={currentLat} lon={currentLon} />
        </>
      )}
    </div>
  );
}

