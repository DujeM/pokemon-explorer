import { usePokemonTypes } from "@/shared/hooks/usePokemonTypes";
import { usePokemonAbilities } from "@/shared/hooks/usePokemonAbilities";
import { usePokemonGenerations } from "@/shared/hooks/usePokemonGenerations";

export function AppBootstrap({ children }: { children: React.ReactNode }) {
  usePokemonTypes();
  usePokemonAbilities();
  usePokemonGenerations();

  return <>{children}</>;
}
