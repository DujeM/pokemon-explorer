import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../api/pokemon";

export function usePokemonDetails(id: number | null) {
    return useQuery({
        queryKey: ["pokemon", "details", id],
        queryFn: async () => {
            if (!id) throw new Error("Pokemon ID is required");
            return await fetchPokemonDetails(id);
        },
        enabled: !!id,
        staleTime: 24 * 60 * 60 * 1000,
    });
}
