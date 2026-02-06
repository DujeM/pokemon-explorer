import { useQuery } from "@tanstack/react-query";

interface PokemonAbility {
    name: string;
    url: string;
}

export function usePokemonAbilities() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    return useQuery({
        queryKey: ["reference", "abilities"],
        queryFn: async () => {
            const res = await fetch(
                `${API_BASE_URL}/ability/?limit=1000&offset=0`
            );
            const data = await res.json();
            return data.results.map((a: PokemonAbility) => a.name);
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
