const API_BASE = "https://pokeapi.co/api/v2";

export type PokemonListItem = {
  name: string;
  url: string;
  id: number;
};

export type PokemonDetailsData = {
  id: number;
  image: string;
  name: string;
  types: string[];
  generation: number;
  stats: PokemonStat[];
  abilities: string[];
  height: number;
  weight: number;
  species: string;
  habitat: string;
  flavor_text_entries: PokemonFlavorTextEntry[];
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

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

interface PokemonFlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export async function fetchPokemonIndex() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
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
    fetch(`${API_BASE}/pokemon/${id}`),
    fetch(`${API_BASE}/pokemon-species/${id}`),
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


export async function fetchPokemonDetails(id: number): Promise<PokemonDetailsData> {
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`${API_BASE}/pokemon/${id}`),
    fetch(`${API_BASE}/pokemon-species/${id}`),
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
