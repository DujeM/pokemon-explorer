import { useQuery } from "@tanstack/react-query";

interface PokemonType {
    name: string;
    url: string;
}

export function usePokemonTypes() {
    return useQuery({
        queryKey: ["reference", "types"],
        queryFn: async () => {
            const res = await fetch("https://pokeapi.co/api/v2/type/?limit=1000&offset=0");
            if (!res.ok) throw new Error("Failed to fetch types");
            const data = await res.json();
            return data.results.map((t: PokemonType) => t.name);
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
