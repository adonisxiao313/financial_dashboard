function pageWindow(page: number, pageCount: number): Array<number | "gap"> {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  const wanted = [1, pageCount, page - 1, page, page + 1].filter((number) => number >= 1 && number <= pageCount);
  const sorted = [...new Set(wanted)].sort((a, b) => a - b);
  const pages: Array<number | "gap"> = [];
  sorted.forEach((number, index) => {
    if (index > 0 && number - sorted[index - 1] > 1) pages.push("gap");
    pages.push(number);
  });
  return pages;
}

export function Pagination({
  page,
  pageCount,
  from,
  to,
  total,
  onPage,
}: {
  page: number;
  pageCount: number;
  from: number;
  to: number;
  total: number;
  onPage: (page: number) => void;
}) {
  const pages = pageWindow(page, pageCount);

  return (
    <div className="flex flex-col gap-3 min-[860px]:flex-row min-[860px]:items-center min-[860px]:justify-between">
      <p className="font-mono text-[13px] text-secondary" aria-live="polite">
        {total === 0 ? "Showing 0 of 0" : `Showing ${from}–${to} of ${total} · ${pageCount} ${pageCount === 1 ? "page" : "pages"}`}
      </p>
      {total > 0 ? (
        <nav aria-label="Pagination" className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => onPage(page - 1)}
            disabled={page <= 1}
            className="h-8 cursor-pointer px-2 text-[14px] text-ink transition-colors duration-[120ms] hover:text-ink disabled:cursor-not-allowed disabled:text-muted"
          >
            Previous
          </button>
          {pages.map((number, index) =>
            number === "gap" ? (
              <span key={`gap-${index}`} className="px-1 text-[14px] text-muted" aria-hidden="true">
                …
              </span>
            ) : (
              <button
                key={number}
                type="button"
                onClick={() => onPage(number)}
                aria-current={number === page ? "page" : undefined}
                className={`grid h-8 min-w-8 cursor-pointer place-items-center px-2 text-[14px] transition-colors duration-[120ms] ${
                  number === page ? "rounded-lg bg-teal-wash font-semibold text-teal" : "text-secondary hover:text-ink"
                }`}
              >
                {number}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => onPage(page + 1)}
            disabled={page >= pageCount}
            className="h-8 cursor-pointer px-2 text-[14px] text-ink transition-colors duration-[120ms] disabled:cursor-not-allowed disabled:text-muted"
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  );
}
