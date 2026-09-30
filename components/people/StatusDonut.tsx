"use client";

import type { Status } from "@/lib/people";

const COLORS: Record<Status, string> = {
  Active: "#0E9B8A",
  Invited: "#F5B942",
  Suspended: "#E11D48",
};

export function StatusDonut({
  active,
  invited,
  suspended,
  selected,
  onToggle,
}: {
  active: number;
  invited: number;
  suspended: number;
  selected: Status | "all";
  onToggle: (status: Status) => void;
}) {
  const segments: { status: Status; value: number }[] = [
    { status: "Active", value: active },
    { status: "Invited", value: invited },
    { status: "Suspended", value: suspended },
  ];
  const total = active + invited + suspended;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  let cursor = 0;

  return (
    <div className="flex h-full items-center gap-3 rounded-2xl border border-hairline bg-white px-4 py-3 shadow-card">
      <svg viewBox="0 0 120 120" className="size-[104px] shrink-0" role="img" aria-label="Seats by status">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#E3EEF3" strokeWidth="12" />
        {total > 0
          ? segments.map((segment) => {
              if (segment.value <= 0) return null;
              const length = (segment.value / total) * circumference;
              const gap = length > 10 ? 2 : 0;
              const shown = Math.max(length - gap, 0);
              const offset = cursor;
              cursor += length;
              const dimmed = selected !== "all" && selected !== segment.status;
              return (
                <circle
                  key={segment.status}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke={COLORS[segment.status]}
                  strokeWidth={selected === segment.status ? 15 : 12}
                  strokeDasharray={`${shown} ${circumference - shown}`}
                  strokeDashoffset={-offset}
                  transform="rotate(-90 60 60)"
                  className={`cursor-pointer ${dimmed ? "opacity-30" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected === segment.status}
                  aria-label={`${segment.status}, ${segment.value}. ${selected === segment.status ? "Clear the status filter" : `Filter by ${segment.status}`}`}
                  onClick={() => onToggle(segment.status)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onToggle(segment.status);
                    }
                  }}
                />
              );
            })
          : null}
        <text x="60" y="56" textAnchor="middle" fill="#0E9B8A" fontSize="22" fontFamily="var(--font-fraunces), serif">
          {total}
        </text>
        <text x="60" y="72" textAnchor="middle" fill="#5C7380" fontSize="9" fontFamily="var(--font-jakarta), sans-serif">
          SEATS
        </text>
      </svg>
      <ul className="min-w-0 space-y-1">
        {segments.map((segment) => (
          <li key={segment.status}>
            <button
              type="button"
              onClick={() => onToggle(segment.status)}
              aria-pressed={selected === segment.status}
              className="flex cursor-pointer items-center gap-2 text-left"
            >
              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: COLORS[segment.status] }} />
              <span className={`text-[12px] ${selected === segment.status ? "font-semibold text-ink" : "text-secondary"}`}>
                {segment.status}
              </span>
              <span className="font-mono text-[12px] text-ink">{segment.value}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
