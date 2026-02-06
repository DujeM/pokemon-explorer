import { usePokemonDetails } from "@/shared/hooks/usePokemonDetails";
import { useCompareStore } from "../store/compareStore";
import { PokemonCompareCard } from "./compareCard";
import { StatsComparison } from "./statsComparison";

export function Comparison() {
  const { leftId, rightId, clear } = useCompareStore();
  const leftQuery = usePokemonDetails(leftId!);
  const rightQuery = usePokemonDetails(rightId!);

  if (!leftId || !rightId) return null;

  if (leftQuery.isLoading || rightQuery.isLoading) {
    return (
      <section className="mt-6 border-4 bg-white p-4 shadow-[6px_6px_0_0_#000]">
        <p className="font-bold">Loading comparison…</p>
      </section>
    );
  }

  if (leftQuery.isError || rightQuery.isError) {
    return (
      <section className="mt-6 border-4 bg-white p-4">
        <p className="font-bold text-red-600">Failed to load comparison data</p>
        <button
          onClick={clear}
          className="mt-3 border-2 px-3 py-1 font-bold cursor-pointer"
        >
          Clear
        </button>
      </section>
    );
  }

  const left = leftQuery.data;
  const right = rightQuery.data;

  return (
    <section className="mt-6 border-4 bg-white p-4 sm:p-6 shadow-[6px_6px_0_0_#000]">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl sm:text-2xl font-black uppercase">
          Pokémon Comparison
        </h2>

        <button
          onClick={clear}
          className="border-2 px-3 py-1 font-bold hover:bg-black hover:text-white transition cursor-pointer"
        >
          Clear
        </button>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {left && <PokemonCompareCard pokemon={left} />}
        {right && <PokemonCompareCard pokemon={right} />}
      </div>
      {left && right && (
        <StatsComparison left={left?.stats} right={right.stats} />
      )}
    </section>
  );
}
