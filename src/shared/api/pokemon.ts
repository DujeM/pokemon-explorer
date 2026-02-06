import type { PokemonAbility, PokemonDetailsData, PokemonFlavorTextEntry, PokemonResponse, PokemonType, SpeciesResponse } from "../types/pokemon";
import { apiFetch } from "./api-client";

export async function fetchPokemonDetails(id: number): Promise<PokemonDetailsData> {
    const pokemon = await apiFetch<PokemonResponse>(`/pokemon/${id}`);
    const species = await apiFetch<SpeciesResponse>(`/pokemon-species/${id}`);

    return {
        id: pokemon.id,
        image: pokemon.sprites.front_default,
        name: pokemon.name,
        types: pokemon.types.map((t: PokemonType) => t.type.name),
        generation: Number(species.generation.url.split("/").at(-2)),
        stats: pokemon.stats,
        abilities: pokemon.abilities.map((a: PokemonAbility) => a.ability.name),
        height: pokemon.height,
        weight: pokemon.weight,
        species: species.name,
        habitat: species.habitat.name,
        flavor_text_entries: species.flavor_text_entries.filter(
            (entry: PokemonFlavorTextEntry) => entry.language.name === "en"
        ),
    };
}