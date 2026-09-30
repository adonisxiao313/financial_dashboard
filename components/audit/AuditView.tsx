"use client";

import { useEffect, useMemo, useState } from "react";
import { Pagination } from "@/components/people/Pagination";
import { LiveMark } from "@/components/ui/LiveMark";
import { paginate } from "@/lib/people";
import { useWorkspace } from "@/lib/workspace-context";

export function AuditView() {
  const { audit } = useWorkspace();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return audit;
    return audit.filter((event) => `${event.actor} ${event.action} ${event.detail}`.toLowerCase().includes(needle));
  }, [audit, query]);

  const result = paginate(filtered, page);

  useEffect(() => {
    if (page !== result.current) setPage(result.current);
  }, [page, result.current]);

  return (
    <div>
      <header>
        <div className="mb-2">
          <LiveMark label="Events streaming" />
        </div>
        <h1 className="text-[36px] font-semibold tracking-tight text-ink">Audit</h1>
        <p className="mt-1.5 max-w-xl text-[15px] text-secondary">
          A running record of what the desk just did. New lines appear at the top as payments land and approvals move.
        </p>
      </header>

      <div className="mt-5 rounded-2xl border border-hairline bg-white px-3 py-2 shadow-card">
        <label className="sr-only" htmlFor="audit-search">
          Search the audit log
        </label>
        <input
          id="audit-search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search actor, action, or reference"
          className="h-10 w-full rounded-xl border border-hairline bg-white px-3 text-[14px] text-ink min-[860px]:w-[320px]"
        />
      </div>

      <div className="mt-4 rounded-2xl border border-hairline bg-white shadow-card">
        <ul>
          {result.slice.map((event) => (
            <li key={event.id} className={`grid gap-1 border-b border-hairline px-4 py-3 last:border-b-0 min-[860px]:grid-cols-[140px_160px_1fr] min-[860px]:items-baseline min-[860px]:gap-4 ${event.when === "Just now" ? "row-in" : ""}`}>
              <p className="font-mono text-[12px] text-secondary">{event.when}</p>
              <p className="text-[14px] font-semibold text-ink">{event.actor}</p>
              <p className="text-[14px] text-ink">
                <span className="font-semibold text-teal">{event.action}</span>
                <span className="text-secondary"> · {event.detail}</span>
              </p>
            </li>
          ))}
        </ul>
        {result.total === 0 ? <p className="px-5 py-10 text-center text-[14px] text-secondary">Nothing in the log matches that search.</p> : null}
        <div className="border-t border-hairline px-4 py-3">
          <Pagination page={result.current} pageCount={result.pageCount} from={result.from} to={result.to} total={result.total} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}
