import type { PokemonFilterData } from "../api/explore";

export function exportListToCsv(pokemons: PokemonFilterData[]) {
    if (!pokemons.length) return;

    const headers = [
        "id",
        "name",
        "generation",
        "types",
        "abilities",
        "hp",
        "attack",
        "defense",
        "speed",
    ];

    const rows = pokemons.map((p) => {
        const stat = (name: string) =>
            p.stats.find((s) => s.stat.name === name)?.base_stat ?? "";

        return [
            p.id,
            p.name,
            p.generation,
            p.types.join(", "),
            p.abilities.join(", "),
            stat("hp"),
            stat("attack"),
            stat("defense"),
            stat("speed"),
        ];
    });

    const csv =
        [headers, ...rows]
            .map((row) =>
                row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
            )
            .join("\n");

    const dateStr = new Date().toISOString().slice(0, 10);
    download(csv, `pokemon-export-${dateStr}.csv`);
}

function download(content: string, filename: string) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}
