import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../api/explore";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon", "list"],
    queryFn: fetchPokemonList,
    staleTime: Infinity,
  });
}
