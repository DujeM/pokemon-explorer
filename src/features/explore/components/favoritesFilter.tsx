import { Heart } from "lucide-react";
import { useFilterStore } from "../store/filterStore";

export function FavoritesFilter() {
  const { showOnlyFavorites, setShowOnlyFavorites } = useFilterStore();

  return (
    <button
      onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
      className={`
          flex justify-center
          border-4 border-black
          px-4 py-2 font-bold uppercase cursor-pointer
          shadow-[4px_4px_0_#000]
          active:translate-x-1 active:translate-y-1
          ${showOnlyFavorites ? "bg-yellow-300" : "bg-white"}
        `}
    >
      <Heart
        className="w-6 h-6 fill-red-500 stroke-black"
        fill="currentColor"
      />
    </button>
  );
}
