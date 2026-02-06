import { useMemo } from "react";
import { filterPokemon } from "../utils/filterPokemon";
import { useFilterStore } from "../store/filterStore";
import type { PokemonFilterData } from "../api/explore";
import { sortPokemon } from "../utils/sortPokemon";
import { useFavoritesStore } from "../store/favoritesStore";

export function useFilteredPokemon(filterIndex: PokemonFilterData[]) {
    const filters = useFilterStore();
    const favorites = useFavoritesStore((s) => s.favorites);

    return useMemo(
        () => {
            const filteredAndSortedList = sortPokemon(filterIndex.filter((p) => filterPokemon(p, filters, favorites)), filters);
            const start = (filters.page - 1) * filters.pageSize;
            const end = start + filters.pageSize;
            return {
                items: filteredAndSortedList.slice(start, end),
                total: filteredAndSortedList.length,
            };
        },
        [filterIndex, filters, favorites]
    );
}
