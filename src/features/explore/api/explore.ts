import type { PokemonAbility, PokemonResponse, PokemonStat, PokemonType, SpeciesResponse } from "@/shared/types/pokemon";
import type { PokemonFilterData, PokemonListItem, PokemonListResponse } from "../types/explore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPokemonList(): Promise<PokemonListItem[]> {
  const res = await fetch(
    `${API_BASE_URL}/pokemon?limit=100000&offset=0`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon index");
  }

  const data: PokemonListResponse = await res.json();

  return data.results.map((item) => ({
    id: Number(item.url.split("/").at(-2)),
    name: item.name,
  }));
}

export async function fetchPokemonSummary(id: number): Promise<PokemonFilterData> {
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`${API_BASE_URL}/pokemon/${id}`),
    fetch(`${API_BASE_URL}/pokemon-species/${id}`),
  ]);

  if (!pokemonRes.ok || !speciesRes.ok) {
    throw new Error("Failed to fetch Pokémon summary");
  }

  const pokemon: PokemonResponse = await pokemonRes.json();
  const species: SpeciesResponse = await speciesRes.json();

  return {
    id: pokemon.id,
    image: pokemon.sprites.front_default,
    name: pokemon.name,
    types: pokemon.types.map((t: PokemonType) => t.type.name),
    generation: Number(species.generation.url.split("/").at(-2)),
    stats: pokemon.stats.filter((stat: PokemonStat) => !stat.stat.name.includes("special")),
    abilities: pokemon.abilities.map((a: PokemonAbility) => a.ability.name),
  };
}

