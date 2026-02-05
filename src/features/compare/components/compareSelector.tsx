type PokemonOption = {
  id: number;
  name: string;
};

type Props = {
  options: PokemonOption[];
};

import { useCompareStore } from "../store/compareStore";
import { PokemonSearchSelect } from "./select";

export function PokemonCompareSelector({ options }: Props) {
  const { leftId, rightId, setLeft, setRight, clear } = useCompareStore();

  return (
    <section className="border-4 bg-white p-4 shadow-[4px_4px_0_0_#000]">
      <h2 className="mb-4 text-lg font-black uppercase">Compare Pokémon</h2>
      <div className="flex flex-col gap-4 sm:flex-row">
        <PokemonSearchSelect
          label="Pokémon A"
          value={leftId}
          onChange={setLeft}
          options={options}
          disabledId={rightId}
        />
        <PokemonSearchSelect
          label="Pokémon B"
          value={rightId}
          onChange={setRight}
          options={options}
          disabledId={leftId}
        />
      </div>
      {(leftId || rightId) && (
        <button
          onClick={clear}
          className="mt-4 border-2 px-3 py-1 font-bold hover:bg-black hover:text-white transition cursor-pointer"
        >
          Clear Selection
        </button>
      )}
    </section>
  );
}
