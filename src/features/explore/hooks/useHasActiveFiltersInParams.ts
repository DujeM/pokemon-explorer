import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useHasActiveFiltersInParams() {
    const [searchParams] = useSearchParams();

    return useMemo(() => {
        const keys = Array.from(searchParams.keys());
        const activeFilterKeys = keys.filter((key) => key !== "pageSize");
        return activeFilterKeys.length > 0;
    }, [searchParams]);
}
