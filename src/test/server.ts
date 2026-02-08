import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const API = "https://pokeapi.co/api/v2";

export const server = setupServer(
    // list
    http.get(`${API}/pokemon`, () =>
        HttpResponse.json({
            results: [
                { name: "bulbasaur", url: `${API}/pokemon/1/` },
            ],
        })
    ),

    // details
    http.get(`${API}/pokemon/:id`, ({ params }) =>
        HttpResponse.json({
            id: Number(params.id),
            name: "bulbasaur",
            sprites: { front_default: "test.png" },
            types: [{ type: { name: "grass" } }],
            stats: [
                { base_stat: 45, stat: { name: "hp" } },
                { base_stat: 49, stat: { name: "attack" } },
            ],
            abilities: [{ ability: { name: "overgrow" } }],
        })
    ),

    // species (generation)
    http.get(`${API}/pokemon-species/:id`, () =>
        HttpResponse.json({
            name: "bulbasaur",
            generation: { url: `${API}/generation/1/` },
            habitat: { name: "grassland" },
            flavor_text_entries: [],
        })
    )
);
