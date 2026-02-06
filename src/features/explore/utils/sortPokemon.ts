import type { FilterState } from "../store/filterStore";
import type { PokemonFilterData } from "../types/explore";

export function sortPokemon(filtered: PokemonFilterData[], filters: FilterState) {
    return filtered.sort((a, b) => {
        const dir = filters.sortOrder === "asc" ? 1 : -1;

        if (filters.sortBy === "name") {
            return a.name.localeCompare(b.name) * dir;
        }

        if (filters.sortBy === "generation") {
            return (a.generation - b.generation) * dir;
        }

        return (
            ((a.stats.find((s) => s.stat.name === filters.sortBy)?.base_stat ?? 0) - (b.stats.find((s) => s.stat.name === filters.sortBy)?.base_stat ?? 0)) *
            dir
        );
    });
}