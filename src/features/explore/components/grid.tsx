import { PokemonCard } from "./pokemonCard";
import { usePokemonDetailsList } from "../hooks/usePokemonDetailsList";
import { usePokemonList } from "../hooks/usePokemonList";
import { useState } from "react";
import { PokemonDetailsModal } from "./pokemonDetails";
import { Toolbar } from "./toolbar";
import { useFilteredPokemon } from "../hooks/useFilteredPokemon";
import { Pagination } from "./pagination";
import { useHasActiveFiltersInParams } from "../hooks/useHasActiveFiltersInParams";
import { Loading } from "@/shared/components/loading";

export function Grid() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const hasActiveFilters = useHasActiveFiltersInParams();
  const { data: pokemonList } = usePokemonList();
  const { data: pokemonDetailsList = [], isFetching } = usePokemonDetailsList(
    pokemonList ? pokemonList.map((pokemon) => pokemon.id) : [],
    hasActiveFilters
  );

  const { total, items } = useFilteredPokemon(pokemonDetailsList);

  return (
    <>
      {hasActiveFilters && isFetching ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loading />
          <span className="text-lg font-bold mb-2">
            Loading filtered Pokémon...
          </span>
          <span className="text-gray-600">
            Please wait while we apply your filters and load results.
          </span>
        </div>
      ) : (
        <>
          <Toolbar
            isLoading={!hasActiveFilters && isFetching}
            exportItems={items}
          />
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                {...pokemon}
                onClick={() => setSelectedId(pokemon.id)}
              />
            ))}
          </div>
          <Pagination total={total} />
          <PokemonDetailsModal
            pokemonId={selectedId}
            onClose={() => setSelectedId(null)}
          />
        </>
      )}
    </>
  );
}
