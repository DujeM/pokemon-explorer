import { useQuery } from "@tanstack/react-query";

interface PokemonAbility {
    name: string;
    url: string;
}

export function usePokemonAbilities() {
    return useQuery({
        queryKey: ["reference", "abilities"],
        queryFn: async () => {
            const res = await fetch(
                "https://pokeapi.co/api/v2/ability/?limit=1000&offset=0"
            );
            const data = await res.json();
            return data.results.map((a: PokemonAbility) => a.name);
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
