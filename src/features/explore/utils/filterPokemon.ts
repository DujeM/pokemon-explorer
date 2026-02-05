import type { PokemonFilterData } from "../api/pokemonApi";
import type { FilterState } from "../store/filterStore";

export function filterPokemon(
    pokemon: PokemonFilterData,
    filters: FilterState,
    favorites: number[] = []
): boolean {
    if (
        filters.showOnlyFavorites &&
        !favorites.find(f => f === pokemon.id)
    ) {
        return false;
    }

    if (
        filters.search &&
        !pokemon.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
        return false;
    }

    if (
        filters.types.length &&
        !filters.types.some((t) => pokemon.types.includes(t))
    ) {
        return false;
    }

    if (
        filters.generation.length &&
        !filters.generation.some((g) => g === pokemon.generation)
    ) {
        return false;
    }

    if (
        filters.abilities.length &&
        !filters.abilities.some((a) => pokemon.abilities.includes(a))
    ) {
        return false;
    }

    const attack = pokemon.stats.find(
        (stat) => stat.stat.name === "attack"
    )?.base_stat;
    if (
        attack &&
        (attack < filters.stats.attack.min || attack > filters.stats.attack.max)
    ) {
        return false;
    }

    const defense = pokemon.stats.find(
        (stat) => stat.stat.name === "defense"
    )?.base_stat;
    if (
        defense &&
        (defense < filters.stats.defense.min ||
            defense > filters.stats.defense.max)
    ) {
        return false;
    }

    const hp = pokemon.stats.find(
        (stat) => stat.stat.name === "hp"
    )?.base_stat;
    if (hp && (hp < filters.stats.hp.min || hp > filters.stats.hp.max)) {
        return false;
    }

    const speed = pokemon.stats.find(
        (stat) => stat.stat.name === "speed"
    )?.base_stat;
    if (
        speed &&
        (speed < filters.stats.speed.min || speed > filters.stats.speed.max)
    ) {
        return false;
    }

    return true;
}
