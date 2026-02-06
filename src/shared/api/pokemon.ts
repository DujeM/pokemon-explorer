import type { PokemonAbility, PokemonDetailsData, PokemonFlavorTextEntry, PokemonType } from "../types/pokemon";

const API_BASE_URL = import.meta.env.API_BASE_URL;

export async function fetchPokemonDetails(id: number): Promise<PokemonDetailsData> {
    const [pokemonRes, speciesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/pokemon/${id}`),
        fetch(`${API_BASE_URL}/pokemon-species/${id}`),
    ]);

    if (!pokemonRes.ok || !speciesRes.ok) {
        throw new Error("Failed to fetch Pokémon details");
    }

    const pokemon = await pokemonRes.json();
    const species = await speciesRes.json();

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