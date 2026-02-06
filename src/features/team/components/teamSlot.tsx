import { usePokemonDetails } from "@/shared/hooks/usePokemonDetails";

export function TeamSlot({
  id,
  onRemove,
  onClick,
}: {
  id: number;
  onRemove: (id: number) => void;
  onClick: () => void;
}) {
  const { data, isLoading } = usePokemonDetails(id);

  if (isLoading || !data) {
    return <div className="border-4 p-4 h-40 animate-pulse" />;
  }

  return (
    <div
      className="border-4 p-3 text-center shadow-[3px_3px_0_0_#000] cursor-pointer transition-transform transition-shadow hover:shadow-[1px_1px_0_#000] hover:translate-x-1 hover:translate-y-1"
      onClick={onClick}
    >
      <img src={data.image} alt={data.name} className="mx-auto h-20 w-20" />
      <h3 className="mt-1 text-sm font-black uppercase">{data.name}</h3>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
        className="mt-2 w-full cursor-pointer border-2 px-2 py-1 text-xs font-bold hover:bg-black hover:text-white transition"
      >
        Remove
      </button>
    </div>
  );
}
