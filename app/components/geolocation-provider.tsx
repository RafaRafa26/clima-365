"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type GeolocationContextType = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isPending: boolean;
};

const GeolocationContext = createContext<GeolocationContextType>({
  latitude: null,
  longitude: null,
  error: null,
  isPending: true,
});

export const useGeolocation = () => useContext(GeolocationContext);

export function GeolocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [geolocation, setGeolocation] = useState<GeolocationContextType>({
    latitude: null,
    longitude: null,
    error: null,
    isPending: true,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            isPending: false,
          });
        },
        () => {
          setGeolocation((prev) => ({
            ...prev,
            error:
              "Não foi possível obter sua localização. Por favor, ative os serviços de localização ou busque um local abaixo.",
            isPending: false,
          }));
        }
      );
    } else {
      setGeolocation((prev) => ({
        ...prev,
        error: "Geolocalização não é suportada pelo seu navegador.",
        isPending: false,
      }));
    }
  }, []);

  return (
    <GeolocationContext.Provider value={geolocation}>
      {children}
    </GeolocationContext.Provider>
  );
}
