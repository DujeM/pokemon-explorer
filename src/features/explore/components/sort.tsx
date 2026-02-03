import { Filter } from "@/shared/components/filter";
import { useFilterStore } from "../store/filterStore";
import type { SortOrder } from "../store/filterStore";

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "generation", label: "Generation" },
  { value: "attack", label: "Attack" },
  { value: "defense", label: "Defense" },
  { value: "speed", label: "Speed" },
  { value: "hp", label: "HP" },
] as const;

export function Sort() {
  const sortBy = useFilterStore((s) => s.sortBy);
  const sortOrder = useFilterStore((s) => s.sortOrder);
  const setSortBy = useFilterStore((s) => s.setSortBy);
  const setSortOrder = useFilterStore((s) => s.setSortOrder);

  return (
    <Filter label="Sort">
      <div className="flex flex-col gap-3">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="
            border-4 border-black
            bg-white
            px-3 py-2
            font-bold
            shadow-[4px_4px_0_#000]
            focus:outline-none
            cursor-pointer
          "
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="
            border-4 border-black
            bg-white
            px-3 py-2
            font-bold
            shadow-[4px_4px_0_#000]
            focus:outline-none
            cursor-pointer
          "
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </Filter>
  );
}
