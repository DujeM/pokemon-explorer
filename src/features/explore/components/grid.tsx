import { PokemonCard } from "../../../shared/components/pokemonCard";
import type { PokemonListItem } from "../api/pokemonApi";
import { usePokemonDetailsList } from "../hooks/usePokemonDetailsList";
import { usePokemonList } from "../hooks/usePokemonList";
import { useState } from "react";
import { PokemonDetailsModal } from "./pokemonDetails";
import { Toolbar } from "./toolbar";
import { useFilteredPokemon } from "../hooks/useFilteredPokemon";
import { Pagination } from "./pagination";

export function Grid() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: pokemonList } = usePokemonList();
  const { data: pokemonDetailsList = [] } = usePokemonDetailsList(
    pokemonList?.map((pokemon: PokemonListItem) => pokemon.id)
  );
  const { total, items } = useFilteredPokemon(pokemonDetailsList);

  return (
    <>
      <Toolbar />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
  );
}
