import type { PokemonStat } from "@/shared/types/pokemon";

export type PokemonListItem = {
    name: string;
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
