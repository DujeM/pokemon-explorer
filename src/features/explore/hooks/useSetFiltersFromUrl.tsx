import { useSearchParams } from "react-router-dom";
import { useFilterStore, type SortBy } from "../store/filterStore";
import { useEffect } from "react";

export function useSetFiltersFromUrl() {
  const [params] = useSearchParams();
  const hydrated = useFilterStore((s) => s.hydrated);
  const setFromUrl = useFilterStore((s) => s.setFromUrl);

  useEffect(() => {
    if (hydrated) return;

    setFromUrl({
      search: params.get("search") ?? "",
      types: params.get("types")?.split(",") ?? [],
      generation: params.get("generation")?.split(",").map(Number) ?? [],
      abilities: params.get("abilities")?.split(",") ?? [],
      sortBy: (params.get("sortBy") as SortBy) ?? "",
      sortOrder: (params.get("sortOrder") as "asc" | "desc") ?? "",
      page: Number(params.get("page") ?? 1),
      pageSize: Number(params.get("pageSize") ?? 20),
    });
  }, [hydrated, params, setFromUrl]);
}
