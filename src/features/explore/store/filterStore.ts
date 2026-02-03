import { create } from "zustand";

export type StatRange = {
    min: number;
    max: number;
};

export type FilterState = {
    search: string;
    types: string[];
    generation: number[];
    abilities: string[];
    stats: {
        attack: StatRange;
        defense: StatRange;
        hp: StatRange;
        speed: StatRange;
    };
    setSearch: (value: string) => void;
    toggleType: (type: string) => void;
    toggleGeneration: (generation: number) => void;
    toggleAbility: (ability: string) => void;
    setStatRange: (
        stat: keyof FilterState["stats"],
        range: StatRange
    ) => void;
    resetFilters: () => void;
};

const DEFAULT_STATS: FilterState["stats"] = {
    attack: { min: 0, max: 300 },
    defense: { min: 0, max: 300 },
    hp: { min: 0, max: 300 },
    speed: { min: 0, max: 300 },
};

export const useFilterStore = create<FilterState>((set) => ({
    search: "",
    types: [],
    generation: [],
    abilities: [],
    stats: DEFAULT_STATS,
    setSearch: (value) => set({ search: value }),
    toggleType: (type) =>
        set((state) => ({
            types: state.types.includes(type)
                ? state.types.filter((t) => t !== type)
                : [...state.types, type],
        })),
    toggleGeneration: (gen) =>
        set((state) => ({
            generation: state.generation.includes(gen)
                ? state.generation.filter((g) => g !== gen)
                : [...state.generation, gen],
        })),
    toggleAbility: (ability) =>
        set((state) => ({
            abilities: state.abilities.includes(ability)
                ? state.abilities.filter((a) => a !== ability)
                : [...state.abilities, ability],
        })),
    setStatRange: (stat, range) =>
        set((state) => ({
            stats: {
                ...state.stats,
                [stat]: range,
            },
        })),
    resetFilters: () =>
        set({
            search: "",
            types: [],
            generation: [],
            abilities: [],
            stats: DEFAULT_STATS,
        }),
}));
