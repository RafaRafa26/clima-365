import FavoriteCities from "../components/favorite-cities";


export default function FavoritesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Suas Cidades Favoritas</h1>
      <FavoriteCities />
    </div>
  );
}
