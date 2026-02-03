import { Filter } from "@/shared/components/filter";
import { useFilterStore } from "../store/filterStore";
import clsx from "clsx";
import { usePokemonAbilities } from "@/shared/hooks/usePokemonAbilities";
import { useState } from "react";

export function AbilityFilter() {
  const { abilities, toggleAbility } = useFilterStore();
  const { data: allAbilities = [] } = usePokemonAbilities();
  const [search, setSearch] = useState("");
  const filteredAbilities = allAbilities.filter((ability: string) =>
    ability.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Filter label="Ability">
      {/* Ability search input */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="Search abilities..."
          className="border-2 border-black px-2 py-1 w-full"
          value={search || ""}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filteredAbilities.map((ability: string) => (
          <button
            key={ability}
            onClick={() => toggleAbility(ability)}
            className={clsx(
              "px-2 py-1 border-2 border-black font-bold cursor-pointer",
              abilities.includes(ability) ? "bg-yellow-300" : "bg-white"
            )}
          >
            {ability}
          </button>
        ))}
        {filteredAbilities.length === 0 && (
          <div className="text-gray-500 p-2">No abilities found</div>
        )}
      </div>
    </Filter>
  );
}
