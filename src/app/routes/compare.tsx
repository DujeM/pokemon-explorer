import { PokemonCompareSelector } from "@/features/compare/components/compareSelector";
import { Comparison } from "@/features/compare/components/comparison";
import { usePokemonList } from "@/features/explore/hooks/usePokemonList";

export function Compare() {
  const { data: pokemonList } = usePokemonList();

  return (
    <>
      {pokemonList && <PokemonCompareSelector options={pokemonList} />}
      <Comparison />
    </>
  );
}

export default Compare;
