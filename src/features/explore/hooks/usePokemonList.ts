import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/pokemonApi";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon", "list"],
    queryFn: fetchPokemonList,
    staleTime: Infinity,
  });
}
