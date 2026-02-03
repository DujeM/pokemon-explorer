import { useFilterStore } from "../store/filterStore";
import { TypeFilter } from "./typeFilter";
import { AbilityFilter } from "./abilityFilter";
import { GenerationFilter } from "./generationFilter";
import { StatsFilter } from "./statsFilter";
import { Search } from "./search";

export function Toolbar() {
  const resetFilters = useFilterStore((s) => s.resetFilters);

  return (
    <div
      className="
        flex flex-wrap items-center gap-3
        border-4 border-black
        bg-white
        p-4
        shadow-[6px_6px_0_#000]
        mb-12
      "
    >
      <Search />
      <TypeFilter />
      <AbilityFilter />
      <GenerationFilter />
      <StatsFilter />
      <div className="flex-1" />
      <button
        onClick={resetFilters}
        className="
          border-4 border-black
          cursor-pointer
          bg-red-200
          px-4 py-2
          font-bold uppercase
          shadow-[4px_4px_0_#000]
          active:translate-x-1 active:translate-y-1
        "
      >
        Reset
      </button>
    </div>
  );
}
