import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buildFilterIndex } from "../utils/buildFilterIndex";
import type { PokemonFilterData } from "../api/pokemonApi";

export function usePokemonFilterIndex(ids: number[]) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["pokemon", "filter-index"],
    enabled: !!ids?.length,
    queryFn: async () => {
      const index: PokemonFilterData[] = [];

      await buildFilterIndex(ids, (summary) => {
        index.push(summary);

        queryClient.setQueryData<PokemonFilterData[]>(
          ["pokemon", "filter-index"],
          (old = []) => [...old, summary]
        );
      });

      return index;
    },
    staleTime: Infinity,
  });
}
