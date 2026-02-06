import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../api/api-client";
import type { ResourceList } from "../types/pokemon";

export function usePokemonTypes() {
    return useQuery({
        queryKey: ["reference", "types"],
        queryFn: async () => {
            const types = await apiFetch<ResourceList>('/type/?limit=1000&offset=0');
            return types.results.map(t => t.name);
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
