import { X } from "lucide-react";
import { useFilterStore } from "../store/filterStore";

import { useState, useEffect } from "react";

export function Search() {
  const search = useFilterStore((s) => s.search);
  const setSearch = useFilterStore((s) => s.setSearch);
  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== search) {
        setSearch(inputValue);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearch, search]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="
          border-4 border-black
          bg-white
          px-4 py-2
          font-bold
          w-full md:w-56
          shadow-[4px_4px_0_#000]
          focus:outline-none
          placeholder:uppercase placeholder:text-gray-400
        "
      />

      {inputValue && (
        <button
          onClick={() => {
            setInputValue("");
            setSearch("");
          }}
          aria-label="Clear search"
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            cursor-pointer
          "
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
