import type { PokemonAbility, PokemonResponse, PokemonStat, PokemonType, ResourceList, SpeciesResponse } from "@/shared/types/pokemon";
import type { PokemonFilterData, PokemonListItem } from "../types/explore";
import { apiFetch } from "@/shared/api/api-client";

export async function fetchPokemonList(): Promise<PokemonListItem[]> {
  const pokemonList = await apiFetch<ResourceList>('/pokemon?limit=100000&offset=0');

  return pokemonList.results.map((item) => ({
    id: Number(item.url.split("/").at(-2)),
    name: item.name,
  }));
}

export async function fetchPokemonSummary(id: number): Promise<PokemonFilterData> {
  const pokemon = await apiFetch<PokemonResponse>(`/pokemon/${id}`);
  const species = await apiFetch<SpeciesResponse>(`/pokemon-species/${id}`);

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

