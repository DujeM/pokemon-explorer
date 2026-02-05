import type { PokemonStat } from "@/features/explore/api/pokemonApi";

function Bar({ value, max }: { value: number; max: number }) {
  return (
    <div className="flex-1 border-2 h-4">
      <div
        className="h-2 bg-black md:h-full"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  );
}

export function StatsComparison({
  left,
  right,
}: {
  left: PokemonStat[];
  right: PokemonStat[];
}) {
  return (
    <div className="mt-6 space-y-5">
      {left.map((stat) => {
        const rightStat = right.find((s) => s.stat.name === stat.stat.name);

        if (!rightStat) {
          return;
        }

        const max = Math.max(stat.base_stat, rightStat.base_stat);

        return (
          <div key={stat.stat.name}>
            <div className="mb-2 flex justify-between text-sm font-bold uppercase">
              <span>{stat.stat.name}</span>
              <span>
                {stat.base_stat} vs {rightStat.base_stat}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Bar value={stat.base_stat} max={max} />
              <Bar value={rightStat.base_stat} max={max} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
