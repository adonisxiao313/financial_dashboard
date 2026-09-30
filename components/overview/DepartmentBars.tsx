"use client";

import { useState } from "react";
import { useWorkspace } from "@/lib/workspace-context";

const MAX = 7;

export function DepartmentBars() {
  const { departments, cash } = useWorkspace();
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-hairline bg-white p-5 shadow-card" aria-label="Cash by department">
      <h2 className="text-[15px] font-semibold text-ink">By department</h2>
      <p className="mt-0.5 text-[13px] text-secondary">Where the ${cash.toFixed(1)}m sits, moving with the book</p>
      <ul className="mt-4 space-y-2">
        {departments.map((bar) => {
          const hot = hover === bar.name;
          return (
            <li
              key={bar.name}
              onMouseEnter={() => setHover(bar.name)}
              onMouseLeave={() => setHover(null)}
              className={`rounded-xl px-2 py-1.5 transition-colors duration-150 ${hot ? "bg-teal-wash" : ""}`}
            >
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className={`text-[13px] ${hot ? "font-semibold text-ink" : "text-secondary"}`}>{bar.name}</span>
                <span className={`font-mono text-[12px] ${hot ? "font-medium text-ink" : "text-secondary"}`}>
                  ${bar.amount.toFixed(1)}m
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-paper">
                <div
                  className="bar-grow h-full rounded-full"
                  style={{ width: `${(bar.amount / MAX) * 100}%`, backgroundColor: bar.color }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
