"use client";

import { useEffect, useMemo, useState } from "react";
import { Pagination } from "@/components/people/Pagination";
import { LiveMark } from "@/components/ui/LiveMark";
import { Pill } from "@/components/ui/Pill";
import { Select } from "@/components/ui/Select";
import { StatCard } from "@/components/ui/StatCard";
import { PAYMENT_STATUSES, RAILS, type Payment, type PaymentStatus, type Rail } from "@/lib/catalog";
import { compact, money } from "@/lib/format";
import { paginate } from "@/lib/people";
import { useWorkspace } from "@/lib/workspace-context";

const TONE: Record<PaymentStatus, "teal" | "sun" | "rose"> = {
  Settled: "teal",
  Processing: "sun",
  Held: "rose",
};

export function PaymentsView() {
  const { payments, settledToday, inflowToday, outflowToday, arrived, latestPaymentId } = useWorkspace();
  const [query, setQuery] = useState("");
  const [rail, setRail] = useState<Rail | "all">("all");
  const [status, setStatus] = useState<PaymentStatus | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return payments.filter((payment) => {
      if (needle && !payment.counterparty.toLowerCase().includes(needle) && !payment.reference.toLowerCase().includes(needle)) {
        return false;
      }
      if (rail !== "all" && payment.rail !== rail) return false;
      if (status !== "all" && payment.status !== status) return false;
      return true;
    });
  }, [payments, query, rail, status]);

  const result = paginate(filtered, page);

  useEffect(() => {
    if (page !== result.current) setPage(result.current);
  }, [page, result.current]);

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2">
            <LiveMark label={arrived > 0 ? `${arrived} arrived this session` : "Payments arriving"} />
          </div>
          <h1 className="text-[36px] font-semibold tracking-tight text-ink">Payments</h1>
          <p className="mt-1.5 max-w-xl text-[15px] text-secondary">
            The ledger keeps filling. New rows land at the top while the rest of the book stays searchable.
          </p>
        </div>
      </header>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <StatCard label="Settled today" value={compact(settledToday)} tone="teal" />
        <StatCard label="Inflow today" value={money(inflowToday)} />
        <StatCard label="Outflow today" value={money(outflowToday)} />
      </div>

      <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-hairline bg-white px-3 py-2 shadow-card min-[860px]:flex-row min-[860px]:items-center">
        <label className="sr-only" htmlFor="payment-search">
          Search by counterparty or reference
        </label>
        <input
          id="payment-search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search counterparty or reference"
          className="h-10 w-full rounded-xl border border-hairline bg-white px-3 text-[14px] text-ink min-[860px]:w-[280px]"
        />
        <Select
          id="filter-rail"
          label="Rail"
          value={rail}
          quiet={rail === "all"}
          onChange={(value) => {
            setRail(value as Rail | "all");
            setPage(1);
          }}
          className="min-[860px]:w-[140px]"
          options={[{ value: "all", label: "All rails" }, ...RAILS.map((item) => ({ value: item, label: item }))]}
        />
        <Select
          id="filter-payment-status"
          label="Status"
          value={status}
          quiet={status === "all"}
          onChange={(value) => {
            setStatus(value as PaymentStatus | "all");
            setPage(1);
          }}
          className="min-[860px]:w-[160px]"
          options={[{ value: "all", label: "All statuses" }, ...PAYMENT_STATUSES.map((item) => ({ value: item, label: item }))]}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-hairline bg-white shadow-card">
        <table className="hidden w-full border-collapse text-left min-[860px]:table">
          <caption className="sr-only">Payment ledger</caption>
          <thead>
            <tr className="border-b border-hairline">
              {["Counterparty", "Reference", "Rail", "Amount", "Status", "When"].map((label) => (
                <th key={label} scope="col" className="px-4 py-2 text-[11px] font-medium tracking-[0.14em] text-secondary uppercase">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.slice.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} fresh={payment.id === latestPaymentId} />
            ))}
          </tbody>
        </table>
        <ul className="min-[860px]:hidden">
          {result.slice.map((payment) => (
            <li key={payment.id} className={`border-b border-hairline px-4 py-4 last:border-b-0 ${payment.id === latestPaymentId ? "row-in" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{payment.counterparty}</p>
                  <p className="font-mono text-[12px] text-secondary">{payment.reference}</p>
                </div>
                <Amount payment={payment} />
              </div>
              <div className="mt-2 flex items-center gap-2 text-[13px] text-secondary">
                <Pill tone={TONE[payment.status]}>{payment.status}</Pill>
                <span>{payment.rail}</span>
                <span>{payment.when}</span>
              </div>
            </li>
          ))}
        </ul>
        {result.total === 0 ? <p className="px-5 py-10 text-center text-[14px] text-secondary">No payments match these filters.</p> : null}
        <div className="border-t border-hairline px-4 py-3">
          <Pagination page={result.current} pageCount={result.pageCount} from={result.from} to={result.to} total={result.total} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}

function PaymentRow({ payment, fresh }: { payment: Payment; fresh: boolean }) {
  return (
    <tr className={`border-b border-hairline last:border-b-0 ${fresh ? "row-in" : "hover:bg-hover"}`}>
      <td className="px-4 py-3 text-[14px] font-semibold text-ink">{payment.counterparty}</td>
      <td className="px-4 py-3 font-mono text-[12px] text-secondary">{payment.reference}</td>
      <td className="px-4 py-3 text-[14px] text-ink">{payment.rail}</td>
      <td className="px-4 py-3">
        <Amount payment={payment} />
      </td>
      <td className="px-4 py-3">
        <Pill tone={TONE[payment.status]}>{payment.status}</Pill>
      </td>
      <td className="px-4 py-3 text-[13px] whitespace-nowrap text-secondary">{payment.when}</td>
    </tr>
  );
}

function Amount({ payment }: { payment: Payment }) {
  return (
    <span className={`font-mono text-[13px] font-medium ${payment.direction === "In" ? "text-teal" : "text-ink"}`}>
      {payment.direction === "In" ? "+" : "−"}
      {money(payment.amount)}
    </span>
  );
}
