import type { PokemonFilterData } from "../api/pokemonApi";
import { exportListToCsv } from "../utils/exportListToCsv";

type Props = {
  data: PokemonFilterData[];
};

export function ExportCsvButton({ data }: Props) {
  return (
    <button
      onClick={() => exportListToCsv(data)}
      disabled={!data.length}
      className="
        border-4 bg-white px-4 py-2 font-black uppercase
        w-1/2 sm:w-auto
        shadow-[4px_4px_0_0_#000]
        bg-yellow-300 cursor-pointer
        transition-transform transition-shadow 
        hover:shadow-[1px_1px_0_#000] hover:translate-x-1 hover:translate-y-1
        disabled:opacity-40 disabled:cursor-not-allowed
      "
    >
      Export CSV
    </button>
  );
}
