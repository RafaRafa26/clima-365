"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { TemperatureChartData } from "@/lib/types";

type TemperatureChartProps = {
  lat: number | null;
  lon: number | null;
};

export default function TemperatureChart({ lat, lon }: TemperatureChartProps) {
  const [data, setData] = useState<TemperatureChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lat && lon) {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((result) => {
          const hourlyData = result.list
            .slice(0, 8)
            .map((item: { dt: number; main: { temp: number } }) => ({
              time: new Date(item.dt * 1000).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              temperature: item.main.temp,
            }));
          setData(hourlyData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados de temperatura:", error);
          setLoading(false);
        });
    }
  }, [lat, lon]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Variação de Temperatura</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis tickFormatter={(value) => Math.round(value).toString()} />
              <Tooltip
                formatter={(value) => Math.round(Number(value)).toString()}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                name="Temperatura"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
