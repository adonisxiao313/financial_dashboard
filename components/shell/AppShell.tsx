"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MobileDrawer, Sidebar } from "@/components/shell/Sidebar";
import { TopBar } from "@/components/shell/TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[90] focus:bg-surface focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Sidebar />
      <TopBar onMenu={() => setOpen(true)} />
      {open ? <MobileDrawer onClose={() => setOpen(false)} /> : null}
      <div className="min-[860px]:pl-[232px]">
        <main id="main" className="mx-auto w-full max-w-[1180px] px-5 pt-5 pb-8 min-[860px]:px-10 min-[860px]:pt-7">
          <div key={pathname} className="route-in">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
