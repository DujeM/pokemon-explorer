import { Filter } from "@/shared/components/filter";
import { useFilterStore } from "../store/filterStore";

const STAT_LIMITS = {
  min: 0,
  max: 300,
};

type StatKey = "attack" | "defense" | "speed" | "hp";

const STAT_LABELS: Record<StatKey, string> = {
  attack: "Attack",
  defense: "Defense",
  speed: "Speed",
  hp: "HP",
};

export function StatsFilter() {
  const stats = useFilterStore((s) => s.stats);
  const setStatRange = useFilterStore((s) => s.setStatRange);

  return (
    <Filter label="Stats">
      <div className="flex flex-col gap-4">
        {(Object.keys(STAT_LABELS) as StatKey[]).map((stat) => {
          const range = stats[stat];

          return (
            <div key={stat} className="space-y-1">
              <div className="flex justify-between text-sm font-bold uppercase">
                <span>{STAT_LABELS[stat]}</span>
                <span className="font-mono">
                  {range.min} - {range.max}
                </span>
              </div>
              <input
                type="range"
                min={STAT_LIMITS.min}
                max={STAT_LIMITS.max}
                value={range.min}
                onChange={(e) =>
                  setStatRange(stat, {
                    min: Number(e.target.value),
                    max: Math.max(range.max, Number(e.target.value)),
                  })
                }
                className="w-full accent-black"
              />
              <input
                type="range"
                min={STAT_LIMITS.min}
                max={STAT_LIMITS.max}
                value={range.max}
                onChange={(e) =>
                  setStatRange(stat, {
                    min: Math.min(range.min, Number(e.target.value)),
                    max: Number(e.target.value),
                  })
                }
                className="w-full accent-black"
              />
            </div>
          );
        })}
      </div>
    </Filter>
  );
}
