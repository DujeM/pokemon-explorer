import { Filter } from "@/shared/components/filter";
import { useFilterStore } from "../store/filterStore";
import clsx from "clsx";
import { usePokemonGenerations } from "@/shared/hooks/usePokemonGenerations";

export function GenerationFilter() {
  const { generation, toggleGeneration } = useFilterStore();
  const { data: allGenerations = [] } = usePokemonGenerations();

  return (
    <Filter label="Generation">
      <div className="flex flex-wrap gap-2">
        {allGenerations.map((g: { id: number; name: string }) => (
          <button
            key={g.id}
            onClick={() => toggleGeneration(g.id)}
            className={clsx(
              "px-2 py-1 border-2 border-black font-bold cursor-pointer",
              generation.includes(g.id) ? "bg-yellow-300" : "bg-white"
            )}
          >
            Generation {g.id}
          </button>
        ))}
      </div>
    </Filter>
  );
}
