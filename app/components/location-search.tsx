"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/lib/hooks";
import { City } from "@/lib/types";


type LocationSearchProps = {
  errorMessage?: string;
  onLocationSelect: (lat: number, lon: number) => void;
};

export default function LocationSearch({
  errorMessage,
  onLocationSelect,
}: LocationSearchProps) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [searchResult, setSearchResult] = useState<City | null>(null);
  const router = useRouter();
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedSearch}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
        .then((response) => response.json())
        .then((data: City[]) => {
          setSuggestions(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar sugestões:", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);


  const handleCitySelect = (city: City) => {
    setSearchResult({ name: city.name, state: city.state, country: city.country, lat: city.lat, lon: city.lon });
    onLocationSelect(city.lat, city.lon);
    setSearch("");
    setSuggestions([]);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Encontre o clima na sua localização</CardTitle>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <p className="text-destructive mb-4">{errorMessage}</p>
        )}
        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar cidade..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-background border border-input rounded-md mt-1 max-h-60 overflow-auto">
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-accent cursor-pointer"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}, {city.state ? `${city.state}, ` : ""}
                    {city.country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              if (searchResult) {
                router.push(`/weather/${searchResult.lat}/${searchResult.lon}`);
              }
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
          {searchResult && (
            <div className="mt-4 flex items-center justify-between">
              <p>{searchResult.name}</p>
              <Button variant="outline" size="sm">
                <Star className="mr-2 h-4 w-4" />
                Adicionar aos favoritos
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
