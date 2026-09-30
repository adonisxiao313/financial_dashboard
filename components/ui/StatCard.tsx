import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  tone = "ink",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "ink" | "teal";
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-white px-5 py-4 shadow-card">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase">{label}</p>
      <p className={`figure mt-2 text-[32px] ${tone === "teal" ? "text-teal" : "text-ink"}`}>{value}</p>
      {hint ? <p className="mt-1 text-[12px] text-secondary">{hint}</p> : null}
    </div>
  );
}
