import { useState } from "react";
import { useFilterStore } from "../store/filterStore";
import { TypeFilter } from "./typeFilter";
import { AbilityFilter } from "./abilityFilter";
import { GenerationFilter } from "./generationFilter";
import { StatsFilter } from "./statsFilter";
import { Search } from "./search";
import { Sort } from "./sort";
import { Loading } from "@/shared/components/loading";
import { FavoritesFilter } from "./favoritesFilter";
import { ExportCsvButton } from "./exportCsvButton";
import type { PokemonFilterData } from "../api/pokemonApi";

export function Toolbar({
  isLoading = false,
  exportItems = [],
}: {
  isLoading?: boolean;
  exportItems?: PokemonFilterData[];
}) {
  const resetFilters = useFilterStore((s) => s.resetFilters);
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`
        border-4 border-black
        bg-white
        p-2 md:p-4
        shadow-[6px_6px_0_#000]
        mb-8 md:mb-12
        relative
        ${isLoading ? "opacity-60 pointer-events-none select-none" : ""}
      `}
      style={isLoading ? { filter: "grayscale(100%)" } : undefined}
    >
      <div className="flex items-center justify-between gap-4 md:hidden">
        <button
          onClick={() => setOpen((o) => !o)}
          className="
            border-4 border-black
            bg-white
            px-4 py-2 w-1/2
            font-black uppercase
            shadow-[4px_4px_0_#000]
            transition
            hover:translate-x-0.5 hover:translate-y-0.5
          "
          aria-expanded={open}
          aria-controls="toolbar-content"
        >
          {open ? "Hide Filters" : "Show Filters"}
        </button>
        <ExportCsvButton data={exportItems} />
      </div>
      <div
        id="toolbar-content"
        className={`
          mt-4
          flex flex-col gap-3
          md:mt-0 md:flex md:flex-row md:flex-wrap md:items-center
          ${open ? "block" : "hidden"}
          md:block
        `}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 flex-1">
          <Search />
          <TypeFilter />
          <AbilityFilter />
          <GenerationFilter />
          <StatsFilter />
          <Sort />
          <FavoritesFilter />
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <span className="hidden md:block">
            <ExportCsvButton data={exportItems} />
          </span>
          <button
            onClick={resetFilters}
            disabled={isLoading}
            className="
              border-4 border-black
              bg-red-200
              px-4 py-2
              font-bold uppercase
              shadow-[4px_4px_0_#000]
              transition
              hover:translate-x-0.5 hover:translate-y-0.5
              disabled:opacity-40
            "
          >
            Reset
          </button>
        </div>
      </div>

      {/* LOADING OVERLAY */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <Loading />
        </div>
      )}
    </div>
  );
}
