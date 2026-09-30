"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Person } from "@/lib/people";

export function PersonMenu({
  person,
  onSuspend,
  onReactivate,
}: {
  person: Person;
  onSuspend: (id: string) => void;
  onReactivate: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const item = menuRef.current?.querySelector<HTMLElement>("[role='menuitem']");
    (item ?? menuRef.current)?.focus();

    function onPointer(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key === "Tab") {
        setOpen(false);
        return;
      }
      const items = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>("[role='menuitem']") ?? []);
      if (items.length === 0) return;
      const index = items.indexOf(document.activeElement as HTMLButtonElement);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        items[(index + 1) % items.length]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        items[(index - 1 + items.length) % items.length]?.focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        items[0]?.focus();
      } else if (event.key === "End") {
        event.preventDefault();
        items[items.length - 1]?.focus();
      }
    }

    function onScroll() {
      setOpen(false);
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  function toggle() {
    if (open) {
      setOpen(false);
      return;
    }
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const menuHeight = person.status === "Invited" ? 52 : 44;
    const top = rect.bottom + 6 + menuHeight > window.innerHeight ? Math.max(8, rect.top - menuHeight - 6) : rect.bottom + 6;
    setCoords({ top, right: Math.max(8, window.innerWidth - rect.right) });
    setOpen(true);
  }

  function choose(action: "suspend" | "reactivate") {
    if (action === "suspend") onSuspend(person.id);
    else onReactivate(person.id);
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Actions for ${person.name}`}
        onClick={toggle}
        className="grid size-8 cursor-pointer place-items-center text-secondary hover:bg-hover hover:text-ink"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <circle cx="3.5" cy="8" r="1.15" />
          <circle cx="8" cy="8" r="1.15" />
          <circle cx="12.5" cy="8" r="1.15" />
        </svg>
      </button>
      {open
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              aria-label={`Actions for ${person.name}`}
              tabIndex={-1}
              style={{ top: coords.top, right: coords.right }}
              className="fixed z-[60] min-w-[11.5rem] rounded-xl border border-hairline bg-white py-1 shadow-card"
            >
              {person.status === "Active" ? (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => choose("suspend")}
                  className="block w-full cursor-pointer px-3 py-2 text-left text-[14px] text-ink hover:bg-hover"
                >
                  Suspend access
                </button>
              ) : null}
              {person.status === "Suspended" ? (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => choose("reactivate")}
                  className="block w-full cursor-pointer px-3 py-2 text-left text-[14px] text-ink hover:bg-hover"
                >
                  Reactivate access
                </button>
              ) : null}
              {person.status === "Invited" ? (
                <p className="px-3 py-2 text-[13px] text-secondary">Waiting on their reply</p>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
