import { useSyncFiltersToUrl } from "@/features/explore/hooks/useSyncFiltersToUrl";
import { Grid } from "../../features/explore/components/grid";
import { useSetFiltersFromUrl } from "@/features/explore/hooks/useSetFiltersFromUrl";

export function Explore() {
  useSetFiltersFromUrl();
  useSyncFiltersToUrl();

  return (
    <>
      <Grid />
    </>
  );
}

export default Explore;
