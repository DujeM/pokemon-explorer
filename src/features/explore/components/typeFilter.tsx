import { Filter } from "@/shared/components/filter";
import { useFilterStore } from "../store/filterStore";
import clsx from "clsx";
import { usePokemonTypes } from "@/shared/hooks/usePokemonTypes";

export function TypeFilter() {
  const { types, toggleType } = useFilterStore();
  const { data: allTypes = [] } = usePokemonTypes();

  return (
    <Filter label="Type">
      <div className="flex flex-wrap gap-2">
        {allTypes.map((type: string) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={clsx(
              "px-2 py-1 border-2 border-black font-bold cursor-pointer",
              types.includes(type) ? "bg-yellow-300" : "bg-white"
            )}
          >
            {type}
          </button>
        ))}
      </div>
    </Filter>
  );
}
