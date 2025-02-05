"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type LocationContextType = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};

const LocationContext = createContext<LocationContextType>({
  latitude: null,
  longitude: null,
  error: null,
});

export const useLocation = () => useContext(LocationContext);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationContextType>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        () => {
          setLocation((prev) => ({
            ...prev,
            error:
              "Não foi possível obter sua localização. Por favor, permita o acesso ou insira manualmente.",
          }));
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocalização não é suportada pelo seu navegador.",
      }));
    }
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {location.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro de Localização</AlertTitle>
          <AlertDescription>{location.error}</AlertDescription>
        </Alert>
      )}
      {children}
    </LocationContext.Provider>
  );
}
