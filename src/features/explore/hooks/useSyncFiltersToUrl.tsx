import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilterStore } from "../store/filterStore";
import { useShallow } from "zustand/react/shallow";

export function useSyncFiltersToUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { hydrated, ...filters } = useFilterStore(
    useShallow((s) => ({
      hydrated: s.hydrated,
      search: s.search,
      types: s.types,
      generation: s.generation,
      abilities: s.abilities,
      sortBy: s.sortBy,
      sortOrder: s.sortOrder,
      page: s.page,
      pageSize: s.pageSize,
    }))
  );

  useEffect(() => {
    if (!hydrated) return;

    const params = new URLSearchParams();
    const mapping = [
      ["search", filters.search],
      ["types", filters.types.join(",")],
      ["generation", filters.generation.join(",")],
      ["abilities", filters.abilities.join(",")],
      ["sortBy", filters.sortBy],
      ["sortOrder", filters.sortOrder],
      ["page", filters.page > 1 ? String(filters.page) : ""],
      ["pageSize", filters.pageSize > 1 ? String(filters.pageSize) : ""],
    ];

    mapping.forEach(([key, value]) => {
      if (value && value !== "") params.set(key, value);
    });

    if (params.toString() === searchParams.toString()) {
      return;
    }

    setSearchParams(params, { replace: true });
  }, [filters, hydrated, searchParams, setSearchParams]);
}
