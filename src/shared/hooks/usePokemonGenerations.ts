import { useQuery } from "@tanstack/react-query";

interface PokemonGeneration {
    name: string;
    url: string;
}

export function usePokemonGenerations() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    return useQuery({
        queryKey: ["reference", "generations"],
        queryFn: async () => {
            const res = await fetch(`${API_BASE_URL}/generation/?limit=1000&offset=0`);
            const data = await res.json();
            return data.results.map((g: PokemonGeneration, i: number) => ({
                id: i + 1,
                name: g.name,
            }));
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
