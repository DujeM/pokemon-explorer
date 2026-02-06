import type { PokemonAbility, PokemonStat, PokemonType } from "@/shared/types/pokemon";

const API_BASE_URL = import.meta.env.API_BASE_URL;

export type PokemonListItem = {
  name: string;
  url: string;
  id: number;
};

export type PokemonFilterData = {
  id: number;
  image: string;
  name: string;
  types: string[];
  generation: number;
  stats: PokemonStat[];
  abilities: string[];
};


interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export async function fetchPokemonList() {
  const res = await fetch(
    `${API_BASE_URL}/pokemon?limit=100000&offset=0`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon index");
  }

  const data = await res.json();

  return data.results.map((item: PokemonListResponse["results"][number]) => ({
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

  const pokemon = await pokemonRes.json();
  const species = await speciesRes.json();

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

