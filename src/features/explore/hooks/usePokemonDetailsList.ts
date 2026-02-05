import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildFilterIndex } from "../utils/buildFilterIndex";
import type { PokemonFilterData } from "../api/pokemonApi";

export function usePokemonDetailsList(ids: number[], hasActiveFilters = false) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["pokemon", "details-list"],
    enabled: !!ids?.length,
    queryFn: async () => {
      const index: PokemonFilterData[] = [];
      if (hasActiveFilters) {
        // For active filters, wait for all summaries to be fetched before returning
        await buildFilterIndex(ids, (summary) => {
          index.push(summary);
        });
        // Set the cache after all items are ready, not incrementally
        queryClient.setQueryData<PokemonFilterData[]>(
          ["pokemon", "details-list"],
          index
        );
      } else {
        // For no active filters, update the cache incrementally as before
        await buildFilterIndex(ids, (summary) => {
          index.push(summary);
          queryClient.setQueryData<PokemonFilterData[]>(
            ["pokemon", "details-list"],
            (old = []) => [...old, summary]
          );
        });
      }

      return index;
    },
    staleTime: Infinity,
  });
}
