import { useQuery } from "@tanstack/react-query";
import { fetchPokemonIndex } from "../api/pokemonApi";

export function usePokemonIndex() {
  return useQuery({
    queryKey: ["pokemon", "index"],
    queryFn: fetchPokemonIndex,
    staleTime: Infinity,
  });
}
