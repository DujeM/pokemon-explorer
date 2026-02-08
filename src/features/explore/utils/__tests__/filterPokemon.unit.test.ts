import { filterPokemon } from "../filterPokemon";

describe("filterPokemon", () => {
    it("filters by generation", () => {
        const pokemon = {
            id: 1,
            image: "",
            name: "bulbasaur",
            generation: 1,
            types: ["grass"],
            abilities: [],
            stats: [],
        };

        const filters = { generation: [1] };

        expect(filterPokemon(pokemon, filters)).toBe(true);
    });

    it("rejects mismatched generation", () => {
        const filters = { generation: [2] };

        expect(filterPokemon({
            generation: 1,
            id: 0,
            image: "",
            name: "",
            types: [],
            stats: [],
            abilities: []
        }, filters)).toBe(false);
    });
});
