"use client";

import { useEffect, useMemo, useState } from "react";
import { Pagination } from "@/components/people/Pagination";
import { Button } from "@/components/ui/Button";
import { LiveMark } from "@/components/ui/LiveMark";
import { Pill } from "@/components/ui/Pill";
import { StatCard } from "@/components/ui/StatCard";
import { money } from "@/lib/format";
import { paginate } from "@/lib/people";
import { useWorkspace } from "@/lib/workspace-context";

export function ApprovalsView() {
  const { approvals, decide } = useWorkspace();
  const [page, setPage] = useState(1);
  const openAmount = useMemo(() => approvals.reduce((sum, item) => sum + item.amount, 0), [approvals]);
  const result = paginate(approvals, page);

  useEffect(() => {
    if (page !== result.current) setPage(result.current);
  }, [page, result.current]);

  return (
    <div>
      <header>
        <div className="mb-2">
          <LiveMark label="Queue is moving" />
        </div>
        <h1 className="text-[36px] font-semibold tracking-tight text-ink">Approvals</h1>
        <p className="mt-1.5 max-w-xl text-[15px] text-secondary">
          Wires and batches wait here. Approve or return one, and a new request keeps arriving on the desk.
        </p>
      </header>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <StatCard label="Open items" value={String(approvals.length)} tone="teal" />
        <StatCard label="Open amount" value={money(openAmount)} />
      </div>

      <div className="mt-4 rounded-2xl border border-hairline bg-white shadow-card">
        <ul>
          {result.slice.map((item) => (
            <li key={item.id} className={`flex flex-col gap-3 border-b border-hairline px-4 py-4 last:border-b-0 min-[860px]:flex-row min-[860px]:items-center ${item.waiting === "Just now" ? "row-in" : ""}`}>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-[13px] text-secondary">
                  {item.owner} · waiting {item.waiting}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Pill tone={item.kind === "Wire" ? "teal" : item.kind === "Batch" ? "sun" : "rose"}>{item.kind}</Pill>
                <p className="w-24 text-right font-mono text-[14px] font-medium text-ink">{money(item.amount)}</p>
              </div>
              <div className="flex gap-2">
                <Button className="h-9 px-3" onClick={() => decide(item.id, "Approved")}>
                  Approve
                </Button>
                <Button variant="quiet" className="h-9 px-3" onClick={() => decide(item.id, "Returned")}>
                  Return
                </Button>
              </div>
            </li>
          ))}
        </ul>
        {result.total === 0 ? <p className="px-5 py-10 text-center text-[14px] text-secondary">The queue is clear. The next request will land here.</p> : null}
        <div className="border-t border-hairline px-4 py-3">
          <Pagination page={result.current} pageCount={result.pageCount} from={result.from} to={result.to} total={result.total} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}
