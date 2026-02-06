import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildFilterIndex } from "../utils/buildFilterIndex";
import type { PokemonFilterData } from "../types/explore";

export function usePokemonDetailsList(ids: number[], hasActiveFilters = false) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["pokemon", "details-list"],
    enabled: !!ids?.length,
    queryFn: async () => {
      const index: PokemonFilterData[] = [];
      if (hasActiveFilters) {
        await buildFilterIndex(ids, (summary) => {
          index.push(summary);
        });
        queryClient.setQueryData<PokemonFilterData[]>(
          ["pokemon", "details-list"],
          index
        );
      } else {
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
