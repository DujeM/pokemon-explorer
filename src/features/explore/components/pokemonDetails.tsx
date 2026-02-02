import { useEffect, useState } from "react";
import { Modal } from "@/shared/components/modal";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import type { PokemonStat } from "../api/pokemonApi";
import { CircleX } from "lucide-react";

type Props = {
  pokemonId: number | null;
  onClose: () => void;
};

export function PokemonDetailsModal({ pokemonId, onClose }: Props) {
  const { data, isLoading } = usePokemonDetails(pokemonId);
  const [flavorText, setFlavorText] = useState<string | null>(null);

  useEffect(() => {
    if (!data?.flavor_text_entries?.length) return;

    const entries = data.flavor_text_entries;
    const randomEntry =
      entries[Math.floor(Math.random() * entries.length)].flavor_text;

    setTimeout(() => {
      setFlavorText(randomEntry.replace(/\f/g, " "));
    }, 100);
  }, [pokemonId, data?.flavor_text_entries]);

  return (
    <Modal open={!!pokemonId} onClose={onClose}>
      {isLoading || !data ? (
        <div className="text-center font-bold">Loading…</div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold uppercase tracking-wide">
              {data.name}
            </h2>
            <CircleX className="w-6 h-6 cursor-pointer" onClick={onClose} />
          </div>
          <div className="border-2 border-black rounded-md bg-gray-100 p-4">
            <img
              src={data.image}
              alt={data.name}
              className="mx-auto w-40 h-40 object-contain"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {data.types.map((type: string) => (
              <span
                key={type}
                className="px-3 py-1 text-sm font-bold border-2 border-black rounded-full bg-yellow-300"
              >
                {type}
              </span>
            ))}
          </div>
          {flavorText && (
            <blockquote className="border-l-4 border-black pl-4 italic text-sm">
              “{flavorText}”
            </blockquote>
          )}
          <div className="grid grid-cols-2 gap-2">
            {data.stats.map((stat: PokemonStat) => (
              <div
                key={stat.stat.name}
                className="flex justify-between border-2 border-black p-2"
              >
                <span className="font-bold uppercase">{stat.stat.name}</span>
                <span className="font-mono">{stat.base_stat}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase mb-1">Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {data.abilities.map((ability: string) => (
                <span
                  key={ability}
                  className="px-2 py-1 text-xs font-semibold border-2 border-black rounded bg-red-400"
                >
                  {ability}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="border-2 border-black p-2">
              <span className="font-bold uppercase">Height</span>
              <div>{data.height}</div>
            </div>
            <div className="border-2 border-black p-2">
              <span className="font-bold uppercase">Weight</span>
              <div>{data.weight}</div>
            </div>
            <div className="border-2 border-black p-2">
              <span className="font-bold uppercase">Species</span>
              <div>{data.species}</div>
            </div>
            <div className="border-2 border-black p-2">
              <span className="font-bold uppercase">Habitat</span>
              <div>{data.habitat}</div>
            </div>
          </div>
          <div className="pt-2 border-t-2 border-black text-xs font-bold uppercase">
            Generation {data.generation}
          </div>
          <button
            className="
              mt-2 w-full
              border-4 border-black
              bg-yellow-300
              font-bold uppercase
              py-2
              shadow-[4px_4px_0_#000]
              cursor-pointer
              transition-shadow transition-transform duration-200
              hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0_#000]
            "
          >
            Add to Team
          </button>
        </div>
      )}
    </Modal>
  );
}
