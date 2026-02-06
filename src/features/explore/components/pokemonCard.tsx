import { Heart } from "lucide-react";
import type { PokemonFilterData } from "../api/explore";
import { useFavoritesStore } from "@/features/explore/store/favoritesStore";

export function PokemonCard({
  id,
  name,
  image,
  types,
  stats,
  abilities,
  generation,
  onClick,
}: PokemonFilterData & { onClick: () => void }) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));

  return (
    <div
      onClick={onClick}
      className="bg-[#fff2e8] border-4 border-black rounded-xl shadow-[6px_6px_0_#000] cursor-pointer p-4 flex flex-col gap-4 transition-transform hover:-translate-x-1 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold uppercase tracking-wide">
          {name}
        </h2>
        <span
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(id);
          }}
        >
          {isFavorite ? (
            <Heart
              className="w-6 h-6 fill-red-500 stroke-black"
              fill="currentColor"
            />
          ) : (
            <Heart className="w-6 h-6 stroke-black" fill="none" />
          )}
        </span>
      </div>
      <div className="border-2 border-black rounded-md bg-white p-2">
        <img src={image} alt={name} className="w-full h-40 object-contain" />
      </div>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <span
            key={type}
            className="px-3 py-1 text-sm font-bold border-2 border-black rounded-full bg-yellow-300"
          >
            {type}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        {stats.map((stat) => (
          <div key={stat.stat.name} className="flex justify-between">
            <span className="font-semibold uppercase">{stat.stat.name}</span>
            <span className="font-mono">{stat.base_stat.toString()}</span>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-sm font-bold uppercase mb-1">Abilities</h3>
        <div className="flex flex-wrap gap-2">
          {abilities.map((ability) => (
            <span
              key={ability}
              className="px-2 py-1 text-xs font-semibold border-2 border-black rounded bg-red-400"
            >
              {ability}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto pt-2 border-t-2 border-black text-xs font-bold uppercase">
        Generation {generation}
      </div>
    </div>
  );
}
