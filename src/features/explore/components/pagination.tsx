import { useFilterStore } from "../store/filterStore";

function PaginationButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
          border-4 border-black
          px-4 py-2
          font-bold
          bg-white
          shadow-[4px_4px_0_#000]
          transition-all
          cursor-pointer
          active:translate-x-[2px]
          active:translate-y-[2px]
          active:shadow-none
          disabled:opacity-40
          disabled:cursor-not-allowed
        `}
    >
      {label}
    </button>
  );
}

export function Pagination({ total }: { total: number }) {
  const pageSizes = [20, 50, 100];
  const page = useFilterStore((s) => s.page);
  const pageSize = useFilterStore((s) => s.pageSize);
  const setPage = useFilterStore((s) => s.setPage);
  const setPageSize = useFilterStore((s) => s.setPageSize);

  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center mt-10">
      <div
        className="
          flex items-center gap-3
          border-4 border-black
          bg-white
          p-3
          shadow-[6px_6px_0_#000]
        "
      >
        <PaginationButton
          label="← Prev"
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
        <span className="px-3 font-bold">
          {page} / {totalPages}
        </span>
        <PaginationButton
          label="Next →"
          disabled={page === totalPages}
          onClick={() => {
            setPage(page + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
      <div className="flex gap-2 mt-4 items-center">
        <span className="font-bold text-sm mr-1">Page size:</span>
        {pageSizes.map((size) => (
          <button
            key={size}
            onClick={() => {
              setPageSize(size);
              setPage(1);
            }}
            className={`
              px-3 py-1 rounded
              border-2 border-black
              font-semibold
              transition-all
              shadow-[2px_2px_0_#000]
              cursor-pointer
              bg-${pageSize === size ? "yellow-200" : "white"}
              ${pageSize === size ? "ring-2 ring-black" : ""}
              hover:bg-yellow-100
              active:translate-x-[1px] active:translate-y-[1px] active:shadow-none
            `}
            disabled={pageSize === size}
            style={{
              backgroundColor: pageSize === size ? "#fef9c3" : "white",
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
