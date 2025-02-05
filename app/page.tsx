"use client";

import CurrentWeather from "./components/current-weather";
import DailyForecast from "./components/daily-forecast";
import { useGeolocation } from "./components/geolocation-provider";
import HourlyForecast from "./components/hourly-forecast";
import LocationSearch from "./components/location-search";
import TemperatureChart from "./components/temperature-chart";

export default function Home() {
  const { isPending, error } = useGeolocation();

  if (isPending) {
    return <LocationSearch />;
  }

  if (error) {
    return <LocationSearch errorMessage={error} />;
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto px-4">
      <CurrentWeather />
      <TemperatureChart />
      <HourlyForecast />
      <DailyForecast />
    </div>
  );
}
