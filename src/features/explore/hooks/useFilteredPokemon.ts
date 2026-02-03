import { useMemo } from "react";
import { filterPokemon } from "../utils/filterPokemon";
import { useFilterStore } from "../store/filterStore";
import type { PokemonFilterData } from "../api/pokemonApi";
import { sortPokemon } from "../utils/sortPokemon";

export function useFilteredPokemon(filterIndex: PokemonFilterData[]) {
    const filters = useFilterStore();

    return useMemo(
        () => sortPokemon(filterIndex.filter((p) => filterPokemon(p, filters)), filters),
        [filterIndex, filters]
    );
}
