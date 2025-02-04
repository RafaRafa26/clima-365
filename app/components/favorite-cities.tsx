"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export type FavoriteCity = {
  name: string;
  lat: number;
  lon: number;
};

export function useFavoriteCities() {
  const [favoriteCities, setFavoriteCities] = useState<FavoriteCity[]>([]);

  useEffect(() => {
    const storedCities = localStorage.getItem("favoriteCities");
    if (storedCities) {
      setFavoriteCities(JSON.parse(storedCities));
    }
  }, []);

  const addFavoriteCity = (city: FavoriteCity) => {
    const updatedCities = [...favoriteCities, city];
    setFavoriteCities(updatedCities);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedCities));
  };

  const removeFavoriteCity = (cityName: string) => {
    const updatedCities = favoriteCities.filter(
      (city) => city.name !== cityName
    );
    setFavoriteCities(updatedCities);
    localStorage.setItem("favoriteCities", JSON.stringify(updatedCities));
  };

  return { favoriteCities, addFavoriteCity, removeFavoriteCity };
}

export default function FavoriteCities() {
  const { favoriteCities, removeFavoriteCity } = useFavoriteCities();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cidades Favoritas</CardTitle>
      </CardHeader>
      <CardContent>
        {favoriteCities.length === 0 ? (
          <p>Você ainda não tem cidades favoritas.</p>
        ) : (
          <ul className="space-y-2">
            {favoriteCities.map((city) => (
              <li key={city.name} className="flex items-center justify-between">
                <Link
                  href={`/weather/${city.lat}/${city.lon}`}
                  className="hover:underline"
                >
                  {city.name}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFavoriteCity(city.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
