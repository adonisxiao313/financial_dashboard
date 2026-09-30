import { CountUp } from "@/components/ui/CountUp";
import { StatusDonut } from "@/components/people/StatusDonut";
import type { Status } from "@/lib/people";

export function SeatLedger({
  seats,
  active,
  invited,
  suspended,
  selected,
  onToggle,
}: {
  seats: number;
  active: number;
  invited: number;
  suspended: number;
  selected: Status | "all";
  onToggle: (status: Status) => void;
}) {
  const items = [
    { label: "Seats", value: seats },
    { label: "Active", value: active },
    { label: "Invited", value: invited },
    { label: "Suspended", value: suspended },
  ];

  return (
    <section aria-label="Seat ledger" className="grid gap-3 min-[860px]:grid-cols-[1fr_280px]">
      <ol className="grid grid-cols-2 gap-3 min-[860px]:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="rounded-2xl border border-hairline bg-white px-4 py-3 shadow-card">
            <p className="figure text-[36px] text-teal">
              <CountUp value={item.value} />
            </p>
            <p className="mt-2 text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase">{item.label}</p>
          </li>
        ))}
      </ol>
      <StatusDonut
        active={active}
        invited={invited}
        suspended={suspended}
        selected={selected}
        onToggle={onToggle}
      />
    </section>
  );
}
