"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";
import { FavoriteCity, useFavoriteCities } from "./favorite-cities";


type LocationSearchProps = {
  errorMessage?: string;
};

export default function LocationSearch({ errorMessage }: LocationSearchProps) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<FavoriteCity | null>(null);
  const { addFavoriteCity } = useFavoriteCities();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você normalmente chamaria uma API para buscar dados meteorológicos para a localização pesquisada
    // Por enquanto, vamos simular uma resposta
    const result: FavoriteCity = {
      name: search,
      lat: Math.random() * 180 - 90,
      lon: Math.random() * 360 - 180,
    };
    setSearchResult(result);
  };

  const handleAddFavorite = () => {
    if (searchResult) {
      addFavoriteCity(searchResult);
      setSearchResult(null);
      setSearch("");
    }
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
        <form onSubmit={handleSearch} className="space-y-4">
          <Input
            type="text"
            placeholder="Digite uma cidade ou endereço..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </form>
        {searchResult && (
          <div className="mt-4 flex items-center justify-between">
            <p>{searchResult.name}</p>
            <Button variant="outline" size="sm" onClick={handleAddFavorite}>
              <Star className="mr-2 h-4 w-4" />
              Adicionar aos favoritos
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
