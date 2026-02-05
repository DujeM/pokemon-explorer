import type { PokemonDetailsData } from "@/features/explore/api/pokemonApi";

export function PokemonCompareCard({
  pokemon,
}: {
  pokemon: PokemonDetailsData;
}) {
  return (
    <div className="border-4 p-4 text-center">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="mx-auto h-24 w-24 sm:h-32 sm:w-32"
      />

      <h3 className="mt-2 text-lg sm:text-xl font-black uppercase">
        {pokemon.name}
      </h3>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {pokemon.types.map((t: string) => (
          <span
            key={t}
            className="border-2 px-2 py-0.5 text-xs font-bold uppercase"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
