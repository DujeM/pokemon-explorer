import { useFilterStore } from "../store/filterStore";
import { TypeFilter } from "./typeFilter";
import { AbilityFilter } from "./abilityFilter";
import { GenerationFilter } from "./generationFilter";
import { StatsFilter } from "./statsFilter";
import { Search } from "./search";
import { Sort } from "./sort";

import { Loading } from "@/shared/components/loading";

export function Toolbar({ isLoading = false }: { isLoading?: boolean }) {
  const resetFilters = useFilterStore((s) => s.resetFilters);

  return (
    <div
      className={`
        flex flex-wrap items-center gap-3
        border-4 border-black
        bg-white
        p-4
        shadow-[6px_6px_0_#000]
        mb-12
        relative
        ${isLoading ? "opacity-60 pointer-events-none select-none" : ""}
      `}
      style={isLoading ? { filter: "grayscale(100%)" } : undefined}
    >
      <Search />
      <TypeFilter />
      <AbilityFilter />
      <GenerationFilter />
      <StatsFilter />
      <Sort />
      <div className="flex-1" />
      <button
        onClick={resetFilters}
        className={`
          border-4 border-black
          cursor-pointer
          bg-red-200
          px-4 py-2
          font-bold uppercase
          shadow-[4px_4px_0_#000]
          active:translate-x-1 active:translate-y-1
        `}
        disabled={isLoading}
        tabIndex={isLoading ? -1 : 0}
      >
        Reset
      </button>
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-60 pointer-events-auto z-10">
          <Loading />
        </div>
      )}
    </div>
  );
}
