import { useEffect, useMemo, useRef, useState } from "react";

type Option = {
  id: number;
  name: string;
};

type Props = {
  label: string;
  value: number | null;
  onChange: (id: number | null) => void;
  options: Option[];
  disabledId?: number | null;
  placeholder?: string;
};

export function PokemonSearchSelect({
  label,
  value,
  onChange,
  options,
  disabledId,
  placeholder = "Search Pokémon…",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.id === value);
  const [query, setQuery] = useState(selected?.name ?? "");

  useEffect(() => {
    if (!value) {
      queueMicrotask(() => setQuery(""));
    }
  }, [value]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return options.filter((o) => o.name.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="mb-1 block text-sm font-black uppercase">{label}</label>
      <div
        className="
          flex items-center border-4 bg-white
          px-3 py-2 font-bold
          shadow-[3px_3px_0_0_#000]
        "
        onClick={() => setOpen(true)}
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
          className="
            w-full bg-transparent outline-none cursor-pointer
            placeholder:font-bold
          "
        />
        <span className="ml-2 text-lg">▾</span>
      </div>
      {open && (
        <ul
          className="
            absolute z-20 mt-2 max-h-64 w-full overflow-auto
            border-4 bg-white
            shadow-[4px_4px_0_0_#000]
          "
        >
          {filtered.length === 0 && (
            <li className="px-3 py-2 font-bold text-sm">No results</li>
          )}
          {filtered.map((option) => {
            const disabled = option.id === disabledId;
            return (
              <li
                key={option.id}
                onClick={() => {
                  if (disabled) return;
                  onChange(option.id);
                  setQuery(option.name);
                  setOpen(false);
                }}
                className={`
                  cursor-pointer px-3 py-2 font-bold uppercase
                  border-b-2 last:border-b-0
                  ${
                    disabled
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-black hover:text-white"
                  }
                `}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
