"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/lib/hooks";
import { City } from "@/lib/types";


// Defina e exporte o tipo NavbarSearchProps
export type NavbarSearchProps = {
  onLocationSelect: (lat: number, lon: number) => void;
};

export default function NavbarSearch({ onLocationSelect }: NavbarSearchProps) {
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
    setSearchResult(city);
    onLocationSelect(city.lat, city.lon);
    setSearch("");
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (searchResult) {
      router.push(`/weather/${searchResult.lat}/${searchResult.lon}`);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar cidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48 md:w-64" // Ajuste a largura conforme necessário
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
      <Button type="button" onClick={handleSearch}>
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
