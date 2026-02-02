import { PokemonCard } from "../../../shared/components/pokemonCard";
import type { PokemonListItem } from "../api/pokemonApi";
import { usePokemonFilterIndex } from "../hooks/usePokemonFilterIndex";
import { usePokemonIndex } from "../hooks/usePokemonIndex";
import { useState } from "react";
import { PokemonDetailsModal } from "./pokemonDetails";

export function Grid() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: pokemonIds } = usePokemonIndex();
  const { data: filterIndex = [] } = usePokemonFilterIndex(
    pokemonIds?.map((pokemon: PokemonListItem) => pokemon.id)
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filterIndex.slice(0, 20).map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            {...pokemon}
            onClick={() => setSelectedId(pokemon.id)}
          />
        ))}
      </div>
      <PokemonDetailsModal
        pokemonId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
