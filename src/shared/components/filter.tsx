import { type ReactNode, useState, useRef, useEffect } from "react";

type FilterProps = {
  label: string;
  children: ReactNode;
};

export function Filter({ label, children }: FilterProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          border-4 border-black bg-white
          px-4 py-2 font-bold uppercase cursor-pointer
          shadow-[4px_4px_0_#000]
          active:translate-x-1 active:translate-y-1
        "
      >
        {label}
      </button>
      {open && (
        <div
          className="
            absolute z-20 mt-2
            bg-white border-4 border-black
            shadow-[6px_6px_0_#000]
            p-4 w-64 max-h-112 overflow-y-auto
          "
        >
          {children}
        </div>
      )}
    </div>
  );
}
