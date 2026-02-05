import { useState } from "react";
import { useTeamStore } from "../store/teamStore";
import { TeamSlot } from "./teamSlot";
import { PokemonDetailsModal } from "@/features/explore/components/pokemonDetails";

export function TeamList() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { team, remove, clear } = useTeamStore();

  return (
    <>
      <section className="border-4 bg-white p-4 shadow-[6px_6px_0_0_#000]">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase">
            Pokémon Team ({team.length}/6)
          </h2>

          {team.length > 0 && (
            <button
              onClick={clear}
              className="border-2 px-3 py-1 cursor-pointer font-bold hover:bg-black hover:text-white transition"
            >
              Clear
            </button>
          )}
        </header>

        {team.length === 0 ? (
          <p className="font-bold text-sm">No Pokémon selected.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {team.map((id) => (
              <TeamSlot
                key={id}
                id={id}
                onRemove={remove}
                onClick={() => setSelectedId(id)}
              />
            ))}
          </div>
        )}
      </section>
      <PokemonDetailsModal
        pokemonId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
