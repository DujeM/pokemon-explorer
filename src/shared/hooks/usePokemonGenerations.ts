import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/api-client";
import type { ResourceList } from "../types/pokemon";

export function usePokemonGenerations() {
    return useQuery({
        queryKey: ["reference", "generations"],
        queryFn: async () => {
            const generations = await apiFetch<ResourceList>('/generation/?limit=1000&offset=0');
            return generations.results.map((g, i: number) => ({
                id: i + 1,
                name: g.name,
            }));
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
