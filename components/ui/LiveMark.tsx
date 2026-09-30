export function LiveMark({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-wash px-2.5 py-1 text-[12px] font-semibold text-teal">
      <span className="live-dot size-1.5 rounded-full bg-teal" aria-hidden="true" />
      {label}
    </span>
  );
}
