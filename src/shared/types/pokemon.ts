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

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonFlavorTextEntry {
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

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
};
