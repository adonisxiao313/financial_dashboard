import type { ReactNode } from "react";

const TONES = {
  teal: "bg-active-bg text-active-fg",
  sun: "bg-invited-bg text-invited-fg",
  rose: "bg-suspended-bg text-suspended-fg",
} as const;

export function Pill({ children, tone }: { children: ReactNode; tone: keyof typeof TONES }) {
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[12px] font-semibold ${TONES[tone]}`}>{children}</span>;
}
