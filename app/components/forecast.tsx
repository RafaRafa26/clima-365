import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain } from "lucide-react";

export default function Forecast() {
  // Isso normalmente viria de uma chamada de API
  const forecastData = [
    { day: "Seg", temp: 24, icon: Sun, description: "Ensolarado" },
    { day: "Ter", temp: 23, icon: Cloud, description: "Nublado" },
    { day: "Qua", temp: 20, icon: CloudRain, description: "Chuvoso" },
    { day: "Qui", temp: 22, icon: Sun, description: "Ensolarado" },
    { day: "Sex", temp: 23, icon: Cloud, description: "Parcialmente Nublado" },
  ];

  return (
    <Card className="bg-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          Previsão para 5 Dias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {forecastData.map((day) => (
            <div key={day.day} className="text-center">
              <p className="font-semibold text-sm sm:text-base">{day.day}</p>
              <day.icon className="mx-auto my-1 sm:my-2 h-6 w-6 sm:h-8 sm:w-8 text-sky-300" />
              <p className="text-base sm:text-lg font-bold">{day.temp}°C</p>
              <p className="text-xs sm:text-sm text-sky-200">
                {day.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
