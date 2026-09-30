"use client";

import { CashChart } from "@/components/overview/CashChart";
import { DepartmentBars } from "@/components/overview/DepartmentBars";
import { LiveMark } from "@/components/ui/LiveMark";
import { StatCard } from "@/components/ui/StatCard";
import { millions, money } from "@/lib/format";
import { useWorkspace } from "@/lib/workspace-context";

const ACCOUNTS = [
  { name: "Operating", mask: "4418", share: 0.46 },
  { name: "Reserve", mask: "9021", share: 0.33 },
  { name: "Payroll", mask: "2284", share: 0.13 },
  { name: "Tax", mask: "7730", share: 0.08 },
] as const;

export function TreasuryView() {
  const { cash, inflowToday, outflowToday, arrived } = useWorkspace();
  const book = cash * 1_000_000;

  return (
    <div>
      <header>
        <div className="mb-2">
          <LiveMark label="Balances ticking" />
        </div>
        <h1 className="text-[36px] font-semibold tracking-tight text-ink">Treasury</h1>
        <p className="mt-1.5 max-w-xl text-[15px] text-secondary">
          Cash, accounts, and department sleeves. The chart on Live keeps a new point every few seconds.
        </p>
      </header>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <StatCard label="Cash position" value={millions(cash)} tone="teal" hint="Across all four accounts" />
        <StatCard label="Inflow today" value={money(inflowToday)} />
        <StatCard label="Outflow today" value={money(outflowToday)} hint={arrived > 0 ? `${arrived} movements this session` : "Waiting for the next movement"} />
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {ACCOUNTS.map((account) => (
          <li key={account.name} className="rounded-2xl border border-hairline bg-white px-5 py-4 shadow-card">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[15px] font-semibold text-ink">{account.name}</p>
              <p className="font-mono text-[12px] text-secondary">···{account.mask}</p>
            </div>
            <p className="figure mt-2 text-[32px] text-teal">{money(Math.round(book * account.share))}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper">
              <div className="h-full rounded-full bg-teal transition-[width] duration-700" style={{ width: `${account.share * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid gap-4 min-[860px]:grid-cols-[1.4fr_0.8fr]">
        <CashChart />
        <DepartmentBars />
      </div>
    </div>
  );
}
