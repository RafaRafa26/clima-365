"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type WeatherAlertProps = {
  alerts: string[];
};

export default function WeatherAlert({ alerts }: WeatherAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || alerts.length === 0) {
    return null;
  }

  return (
    <Card className="bg-yellow-500/20 text-white mb-8">
      <CardContent className="p-4 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white hover:text-yellow-200"
          aria-label="Fechar alerta"
        >
          <X size={20} />
        </button>
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-300 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">Alertas Meteorológicos</h3>
            <ul className="list-disc list-inside space-y-1">
              {alerts.map((alert, index) => (
                <li key={index} className="text-sm">
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
