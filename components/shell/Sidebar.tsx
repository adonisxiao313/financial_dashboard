"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { LiveMark } from "@/components/ui/LiveMark";
import { Portrait } from "@/components/ui/Portrait";
import { useFocusTrap } from "@/lib/use-focus-trap";

const LINKS = [
  { href: "/overview", label: "Overview", icon: OverviewIcon },
  { href: "/payments", label: "Payments", icon: PaymentsIcon },
  { href: "/treasury", label: "Treasury", icon: TreasuryIcon },
  { href: "/approvals", label: "Approvals", icon: ApprovalsIcon },
  { href: "/vendors", label: "Vendors", icon: VendorsIcon },
  { href: "/people", label: "People", icon: PeopleIcon },
  { href: "/audit", label: "Audit", icon: AuditIcon },
] as const;

function Brand() {
  return (
    <div className="flex items-center gap-2.5 text-ink">
      <span className="logo-mark relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl">
        <img src="/brand/halcyon-mark.png" alt="" className="size-14 max-w-none object-cover" />
      </span>
      <span className="text-[18px] font-semibold tracking-tight">Halcyon</span>
    </div>
  );
}

function WorkspaceNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Workspace">
      <ul className="space-y-1">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[15px] font-medium transition-colors duration-150 ${active ? "bg-teal-wash text-teal" : "text-secondary hover:bg-hover hover:text-ink"}`}
              >
                <Icon />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function UserFooter() {
  return (
    <div className="mt-auto flex items-center gap-3 border-t border-hairline pt-4">
      <Portrait id="p01" name="Mara Ellison" size="side" />
      <div className="min-w-0">
        <p className="truncate text-[14px] font-semibold leading-5 text-ink">Mara Ellison</p>
        <p className="text-[12px] leading-5 text-secondary">Controller</p>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[232px] flex-col border-r border-hairline bg-white px-4 pt-6 pb-5 min-[860px]:flex">
      <Brand />
      <div className="mt-5 flex items-center justify-between gap-2 px-3">
        <p className="text-[13px] font-medium text-ink">Northwind Capital</p>
      </div>
      <div className="mt-2 px-3">
        <LiveMark />
      </div>
      <div className="mt-3 min-h-0 flex-1 overflow-y-auto">
        <WorkspaceNav />
      </div>
      <UserFooter />
    </aside>
  );
}

export function MobileDrawer({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(true, ref, onClose);

  return createPortal(
    <div className="min-[860px]:hidden">
      <button type="button" aria-label="Close menu" className="animate-fade fixed inset-0 z-40 bg-[#14343C]/30" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        tabIndex={-1}
        className="animate-drawer fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col border-r border-hairline bg-white px-4 pt-5 pb-5"
      >
        <div className="flex items-center justify-between">
          <Brand />
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-9 cursor-pointer place-items-center rounded-xl text-ink hover:bg-hover"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-6 flex items-center justify-between px-3">
          <p className="text-[13px] font-medium text-ink">Northwind Capital</p>
          <LiveMark />
        </div>
        <div className="mt-3 min-h-0 flex-1 overflow-y-auto">
          <WorkspaceNav onNavigate={onClose} />
        </div>
        <UserFooter />
      </div>
    </div>,
    document.body,
  );
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6" cy="5" r="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.6 13c.4-2.1 1.7-3.2 3.4-3.2s3 .1 3.4 3.2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="11.25" cy="5.4" r="1.55" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.7 9.8c1.15.25 2 .95 2.4 2.7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function OverviewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.25" y="2.75" width="11.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.25 6.25h11.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 9h2.4M5 11.1h4.2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 5.5h11v6.2a1.3 1.3 0 0 1-1.3 1.3H3.8a1.3 1.3 0 0 1-1.3-1.3V5.5Z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.5 5.5 4.2 3.2h7.6L13.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M2.5 8.2h11" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function TreasuryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 6.2 8 3.2l5.5 3" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M3.4 6.5v4.6M6.5 6.5v4.6M9.6 6.5v4.6M12.6 6.5v4.6M2.4 11.2h11.2M2.4 13h11.2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function ApprovalsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 8.1 7.1 10.2 11.2 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VendorsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 6.2 4.2 3.5h7.6L13 6.2" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M3 6.2h10v6.1a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 12.3V6.2Z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6.3 8.2h3.4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function AuditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 2.8h5.2L12.5 6v7.2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3.8a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9 2.8V6h3.4M5.2 8.4h5M5.2 10.6h3.6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4 4 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
