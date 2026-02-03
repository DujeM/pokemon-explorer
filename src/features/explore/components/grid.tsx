import { PokemonCard } from "../../../shared/components/pokemonCard";
import type { PokemonListItem } from "../api/pokemonApi";
import { usePokemonDetailsList } from "../hooks/usePokemonDetailsList";
import { usePokemonList } from "../hooks/usePokemonList";
import { useState } from "react";
import { PokemonDetailsModal } from "./pokemonDetails";
import { Toolbar } from "./toolbar";
import { useFilteredPokemon } from "../hooks/useFilteredPokemon";

export function Grid() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: pokemonList } = usePokemonList();
  const { data: pokemonDetailsList = [] } = usePokemonDetailsList(
    pokemonList?.map((pokemon: PokemonListItem) => pokemon.id)
  );
  const filteredPokemon = useFilteredPokemon(pokemonDetailsList);

  return (
    <>
      <Toolbar />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredPokemon.slice(0, 20).map((pokemon) => (
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
