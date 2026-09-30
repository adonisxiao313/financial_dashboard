"use client";

import { useEffect, useMemo, useState } from "react";
import { Pagination } from "@/components/people/Pagination";
import { Pill } from "@/components/ui/Pill";
import { Select } from "@/components/ui/Select";
import { StatCard } from "@/components/ui/StatCard";
import { VENDOR_STATUSES, type VendorStatus } from "@/lib/catalog";
import { money } from "@/lib/format";
import { paginate } from "@/lib/people";
import { useWorkspace } from "@/lib/workspace-context";

const TONE: Record<VendorStatus, "teal" | "sun" | "rose"> = {
  Active: "teal",
  Review: "sun",
  Paused: "rose",
};

export function VendorsView() {
  const { vendors } = useWorkspace();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<VendorStatus | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return vendors.filter((vendor) => {
      if (needle && !vendor.name.toLowerCase().includes(needle) && !vendor.region.toLowerCase().includes(needle)) return false;
      if (status !== "all" && vendor.status !== status) return false;
      return true;
    });
  }, [vendors, query, status]);

  const spend = useMemo(() => filtered.reduce((sum, vendor) => sum + vendor.spend, 0), [filtered]);
  const result = paginate(filtered, page);

  useEffect(() => {
    if (page !== result.current) setPage(result.current);
  }, [page, result.current]);

  return (
    <div>
      <header>
        <h1 className="text-[36px] font-semibold tracking-tight text-ink">Vendors</h1>
        <p className="mt-1.5 max-w-xl text-[15px] text-secondary">
          Everyone Northwind pays. Search the book, then page through the rest of the relationships.
        </p>
      </header>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <StatCard label="Vendors" value={String(filtered.length)} tone="teal" />
        <StatCard label="Spend in view" value={money(spend)} />
      </div>

      <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-hairline bg-white px-3 py-2 shadow-card min-[860px]:flex-row min-[860px]:items-center">
        <label className="sr-only" htmlFor="vendor-search">
          Search vendors
        </label>
        <input
          id="vendor-search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search vendor or region"
          className="h-10 w-full rounded-xl border border-hairline bg-white px-3 text-[14px] text-ink min-[860px]:w-[280px]"
        />
        <Select
          id="filter-vendor-status"
          label="Status"
          value={status}
          quiet={status === "all"}
          onChange={(value) => {
            setStatus(value as VendorStatus | "all");
            setPage(1);
          }}
          className="min-[860px]:w-[160px]"
          options={[{ value: "all", label: "All statuses" }, ...VENDOR_STATUSES.map((item) => ({ value: item, label: item }))]}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-hairline bg-white shadow-card">
        <table className="hidden w-full border-collapse text-left min-[860px]:table">
          <caption className="sr-only">Vendor book</caption>
          <thead>
            <tr className="border-b border-hairline">
              {["Vendor", "Category", "Region", "Invoices", "Spend", "Status"].map((label) => (
                <th key={label} scope="col" className="px-4 py-2 text-[11px] font-medium tracking-[0.14em] text-secondary uppercase">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.slice.map((vendor) => (
              <tr key={vendor.id} className="border-b border-hairline last:border-b-0 hover:bg-hover">
                <td className="px-4 py-3 text-[14px] font-semibold text-ink">{vendor.name}</td>
                <td className="px-4 py-3 text-[14px] text-ink">{vendor.category}</td>
                <td className="px-4 py-3 text-[14px] text-ink">{vendor.region}</td>
                <td className="px-4 py-3 font-mono text-[13px] text-secondary">{vendor.invoices}</td>
                <td className="px-4 py-3 font-mono text-[13px] text-ink">{money(vendor.spend)}</td>
                <td className="px-4 py-3">
                  <Pill tone={TONE[vendor.status]}>{vendor.status}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="min-[860px]:hidden">
          {result.slice.map((vendor) => (
            <li key={vendor.id} className="border-b border-hairline px-4 py-4 last:border-b-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{vendor.name}</p>
                  <p className="text-[13px] text-secondary">
                    {vendor.category} · {vendor.region}
                  </p>
                </div>
                <Pill tone={TONE[vendor.status]}>{vendor.status}</Pill>
              </div>
              <p className="mt-2 font-mono text-[13px] text-ink">
                {money(vendor.spend)} · {vendor.invoices} invoices
              </p>
            </li>
          ))}
        </ul>
        {result.total === 0 ? <p className="px-5 py-10 text-center text-[14px] text-secondary">No vendors match these filters.</p> : null}
        <div className="border-t border-hairline px-4 py-3">
          <Pagination page={result.current} pageCount={result.pageCount} from={result.from} to={result.to} total={result.total} onPage={setPage} />
        </div>
      </div>
    </div>
  );
}
