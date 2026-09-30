type Option = { value: string; label: string };

export function Select({
  id,
  label,
  value,
  onChange,
  options,
  labelled = false,
  quiet = false,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  labelled?: boolean;
  quiet?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={
          labelled
            ? "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-secondary"
            : "sr-only"
        }
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`h-10 w-full cursor-pointer appearance-none rounded-xl border border-hairline bg-white pl-3 pr-8 text-[14px] ${quiet ? "text-secondary" : "text-ink"}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-secondary"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
