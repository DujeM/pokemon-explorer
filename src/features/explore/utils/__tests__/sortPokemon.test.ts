import { describe, it, expect } from "vitest";
import { sortPokemon } from "../sortPokemon";
import type { FilterState } from "../../store/filterStore";
import type { PokemonFilterData } from "../../types/explore";

const pokemonList: PokemonFilterData[] = [
    {
        id: 1,
        name: "bulbasaur",
        generation: 1,
        stats: [
            {
                base_stat: 49,
                effort: 0,
                stat: { name: "attack", url: "" },
            },
        ],
        image: "",
        types: [],
        abilities: []
    },
    {
        id: 4,
        name: "charmander",
        generation: 1,
        stats: [
            {
                base_stat: 52,
                effort: 0,
                stat: { name: "attack", url: "" },
            },
        ],
        image: "",
        types: [],
        abilities: []
    },
    {
        id: 25,
        name: "pikachu",
        generation: 1,
        stats: [
            {
                base_stat: 55,
                effort: 0,
                stat: { name: "attack", url: "" },
            },
        ],
        image: "",
        types: [],
        abilities: []
    },
];

describe("sortPokemon", () => {
    it("sorts by name ascending", () => {
        const filters = {
            sortBy: "name",
            sortOrder: "asc",
        } as FilterState;

        const result = sortPokemon([...pokemonList], filters);

        expect(result.map((p) => p.name)).toEqual([
            "bulbasaur",
            "charmander",
            "pikachu",
        ]);
    });

    it("sorts by name descending", () => {
        const filters = {
            sortBy: "name",
            sortOrder: "desc",
        } as FilterState;

        const result = sortPokemon([...pokemonList], filters);

        expect(result.map((p) => p.name)).toEqual([
            "pikachu",
            "charmander",
            "bulbasaur",
        ]);
    });

    it("sorts by generation ascending", () => {
        const mixed: PokemonFilterData[] = [
            { ...pokemonList[0], generation: 2 },
            { ...pokemonList[1], generation: 1 },
        ];

        const filters = {
            sortBy: "generation",
            sortOrder: "asc",
        } as FilterState;

        const result = sortPokemon([...mixed], filters);

        expect(result.map((p) => p.generation)).toEqual([1, 2]);
    });

    it("sorts by attack stat ascending", () => {
        const filters = {
            sortBy: "attack",
            sortOrder: "asc",
        } as FilterState;

        const result = sortPokemon([...pokemonList], filters);

        expect(
            result.map(
                (p) =>
                    p.stats?.find((s) => s.stat.name === "attack")?.base_stat
            )
        ).toEqual([49, 52, 55]);
    });

    it("does not mutate the original array", () => {
        const filters = {
            sortBy: "name",
            sortOrder: "desc",
        } as FilterState;

        const originalOrder = pokemonList.map((p) => p.name);

        sortPokemon([...pokemonList], filters);

        expect(pokemonList.map((p) => p.name)).toEqual(originalOrder);
    });
});
