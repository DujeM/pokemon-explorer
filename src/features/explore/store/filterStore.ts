import { create } from "zustand";

export type StatRange = {
    min: number;
    max: number;
};

export type SortBy = "" | "name" | "generation" | "attack" | "defense" | "speed" | "hp";
export type SortOrder = "" | "asc" | "desc";

export type FilterState = {
    hydrated: boolean;
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
    sortBy: SortBy;
    sortOrder: SortOrder;
    setSortBy: (value: SortBy) => void;
    setSortOrder: (value: SortOrder) => void;
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setFromUrl: (filters: Partial<FilterState>) => void;
    showOnlyFavorites: boolean;
    setShowOnlyFavorites: (value: boolean) => void;
};

const DEFAULT_STATS: FilterState["stats"] = {
    attack: { min: 0, max: 300 },
    defense: { min: 0, max: 300 },
    hp: { min: 0, max: 300 },
    speed: { min: 0, max: 300 },
};

export const useFilterStore = create<FilterState>((set) => ({
    hydrated: false,
    page: 1,
    pageSize: 20,
    search: "",
    types: [],
    generation: [],
    abilities: [],
    stats: DEFAULT_STATS,
    sortBy: "",
    sortOrder: "",
    showOnlyFavorites: false,
    setSearch: (value) => set({ search: value, page: 1 }),
    toggleType: (type) =>
        set((state) => ({
            types: state.types.includes(type)
                ? state.types.filter((t) => t !== type)
                : [...state.types, type],
            page: 1,
        })),
    toggleGeneration: (gen) =>
        set((state) => ({
            generation: state.generation.includes(gen)
                ? state.generation.filter((g) => g !== gen)
                : [...state.generation, gen],
            page: 1,
        })),
    toggleAbility: (ability) =>
        set((state) => ({
            abilities: state.abilities.includes(ability)
                ? state.abilities.filter((a) => a !== ability)
                : [...state.abilities, ability],
            page: 1,
        })),
    setStatRange: (stat, range) =>
        set((state) => ({
            stats: {
                ...state.stats,
                [stat]: range,
            },
        })),
    setSortBy: (value) =>
        set((state) => ({
            sortBy: value,
            sortOrder: state.sortOrder === "" ? "asc" : state.sortOrder,
            page: 1,
        })),
    setSortOrder: (value) => set({ sortOrder: value, page: 1 }),
    setPage: (value) => set({ page: value }),
    setPageSize: (value) => set({ pageSize: value }),
    resetFilters: () =>
        set({
            search: "",
            types: [],
            generation: [],
            abilities: [],
            stats: DEFAULT_STATS,
            sortBy: "",
            sortOrder: "",
            page: 1,
            pageSize: 20,
            showOnlyFavorites: false
        }),
    setFromUrl: (filters) =>
        set(() => ({
            ...filters,
            hydrated: true,
        })),
    setShowOnlyFavorites: (value) => set({ showOnlyFavorites: value }),
}));
