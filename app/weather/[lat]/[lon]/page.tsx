"use client";

import WeatherPage from "@/app/components/weather-page";
import { useParams } from "next/navigation";


export default function WeatherPageWrapper() {
  const params = useParams();
  const lat = Number.parseFloat(params.lat as string);
  const lon = Number.parseFloat(params.lon as string);

  return <WeatherPage lat={lat} lon={lon} />;
}
