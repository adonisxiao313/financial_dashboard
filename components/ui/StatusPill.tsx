import type { Status } from "@/lib/people";

const STYLES: Record<Status, string> = {
  Active: "bg-active-bg text-active-fg",
  Invited: "bg-invited-bg text-invited-fg",
  Suspended: "bg-suspended-bg text-suspended-fg",
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[12px] leading-5 font-medium ${STYLES[status]}`}>
      {status}
    </span>
  );
}
