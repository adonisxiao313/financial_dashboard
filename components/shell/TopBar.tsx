"use client";

export function TopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-hairline bg-white px-4 min-[860px]:hidden">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenu}
        className="grid size-9 cursor-pointer place-items-center rounded-xl text-ink hover:bg-hover"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      </button>
      <div className="flex items-center gap-2 text-ink">
        <span className="logo-mark relative grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg">
          <img src="/brand/halcyon-mark.png" alt="" className="size-12 max-w-none object-cover" />
        </span>
        <span className="text-[17px] font-semibold tracking-tight">Halcyon</span>
      </div>
      <p className="ml-auto truncate text-[13px] text-secondary">Mara Ellison</p>
    </header>
  );
}
