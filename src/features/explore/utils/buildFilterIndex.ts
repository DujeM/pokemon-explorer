import { fetchPokemonSummary, type PokemonFilterData } from "../api/explore";

export async function buildFilterIndex(
  ids: number[],
  onProgress: (data: PokemonFilterData) => void,
  concurrency = 5
) {
  const queue = [...ids];
  const workers: Promise<void>[] = [];

  async function worker() {
    while (queue.length) {
      const id = queue.shift();
      if (!id) return;

      try {
        const summary = await fetchPokemonSummary(id);
        onProgress(summary);
      } catch {
        // ignore individual failures
      }
    }
  }

  for (let i = 0; i < concurrency; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
}
