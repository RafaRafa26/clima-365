"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

type City = {
  name: string;
  lat: number;
  lon: number;
};

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (search.length > 2) {
      // Normalmente, você faria uma chamada à API aqui
      // Por enquanto, vamos simular algumas sugestões
      const mockSuggestions = [
        { name: `${search} City`, lat: 0, lon: 0 },
        { name: `${search} Town`, lat: 0, lon: 0 },
        { name: `${search} Village`, lat: 0, lon: 0 },
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      const firstSuggestion = suggestions[0];
      router.push(`/weather/${firstSuggestion.lat}/${firstSuggestion.lon}`);
    }
  };

  const handleSuggestionClick = (city: City) => {
    router.push(`/weather/${city.lat}/${city.lon}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Buscar localização..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-[200px] text-primary placeholder:text-muted-foreground"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-background border border-input rounded-md mt-1 max-h-60 overflow-auto">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-accent cursor-pointer"
              onClick={() => handleSuggestionClick(city)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
