import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/api-client";
import type { ResourceList } from "../types/pokemon";

export function usePokemonAbilities() {
    return useQuery({
        queryKey: ["reference", "abilities"],
        queryFn: async () => {
            const abilities = await apiFetch<ResourceList>('/ability/?limit=1000&offset=0');
            return abilities.results.map(a => a.name);
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
