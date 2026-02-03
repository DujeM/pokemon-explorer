import { useMemo } from "react";
import { filterPokemon } from "../utils/filterPokemon";
import { useFilterStore } from "../store/filterStore";
import type { PokemonFilterData } from "../api/pokemonApi";

export function useFilteredPokemon(filterIndex: PokemonFilterData[]) {
    const filters = useFilterStore();

    return useMemo(
        () => filterIndex.filter((p) => filterPokemon(p, filters)),
        [filterIndex, filters]
    );
}
