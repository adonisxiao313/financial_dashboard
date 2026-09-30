"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { FilterBar } from "@/components/people/FilterBar";
import { InviteDialog } from "@/components/people/InviteDialog";
import { Pagination } from "@/components/people/Pagination";
import { PeopleGrid, PersonCardList } from "@/components/people/PersonCard";
import { PeopleTable } from "@/components/people/PeopleTable";
import { SeatLedger } from "@/components/people/SeatLedger";
import { usePeople } from "@/lib/workspace-context";
import {
  filterPeople,
  paginate,
  summarize,
  type Department,
  type Role,
  type Status,
} from "@/lib/people";

export function PeopleDirectory() {
  const { people, invite, setStatus: updateStatus } = usePeople();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<Role | "all">("all");
  const [status, setStatusFilter] = useState<Status | "all">("all");
  const [department, setDepartment] = useState<Department | "all">("all");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"table" | "grid">("table");
  const [inviteOpen, setInviteOpen] = useState(false);

  const filtered = useMemo(
    () => filterPeople(people, { query, role, status, department }),
    [people, query, role, status, department],
  );
  const result = paginate(filtered, page);
  const counts = summarize(people);
  const dirty = query.trim() !== "" || role !== "all" || status !== "all" || department !== "all";
  const listKey = `${query}|${role}|${status}|${department}|${page}`;

  useEffect(() => {
    if (page !== result.current) setPage(result.current);
  }, [page, result.current]);

  function clear() {
    setQuery("");
    setRole("all");
    setStatusFilter("all");
    setDepartment("all");
    setPage(1);
  }

  function toggleStatus(next: Status) {
    setStatusFilter((current) => (current === next ? "all" : next));
    setPage(1);
  }

  const emptyMessage = query.trim()
    ? `No one matches “${query.trim()}”.`
    : "No one fits these filters.";

  const actions = {
    onSuspend: (id: string) => updateStatus(id, "Suspended"),
    onReactivate: (id: string) => updateStatus(id, "Active"),
  };

  return (
    <div>
      <header className="flex flex-col gap-4 min-[860px]:flex-row min-[860px]:items-end min-[860px]:justify-between">
        <div>
          <h1 className="text-[36px] font-semibold tracking-tight text-ink">People</h1>
          <p className="mt-1.5 text-[15px] leading-snug text-secondary">Who can see the books and move money.</p>
        </div>
        <Button className="self-start" onClick={() => setInviteOpen(true)}>
          Invite
        </Button>
      </header>

      <div className="mt-5">
        <SeatLedger
          seats={counts.seats}
          active={counts.active}
          invited={counts.invited}
          suspended={counts.suspended}
          selected={status}
          onToggle={toggleStatus}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 min-[860px]:flex-row min-[860px]:items-center">
        <div className="min-w-0 flex-1 rounded-2xl border border-hairline bg-white px-3 py-2 shadow-card">
          <FilterBar
            query={query}
            role={role}
            status={status}
            department={department}
            dirty={dirty}
            onQuery={(value) => {
              setQuery(value);
              setPage(1);
            }}
            onRole={(value) => {
              setRole(value);
              setPage(1);
            }}
            onStatus={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
            onDepartment={(value) => {
              setDepartment(value);
              setPage(1);
            }}
            onClear={clear}
          />
        </div>
        <div role="group" aria-label="Directory layout" className="flex shrink-0 rounded-xl bg-white p-1 shadow-card">
          {(["table", "grid"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={view === mode}
              onClick={() => setView(mode)}
              className={`h-10 cursor-pointer rounded-lg px-4 text-[14px] font-semibold capitalize ${view === mode ? "bg-teal-wash text-teal" : "text-secondary hover:text-ink"}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div id="directory" className="mt-4 rounded-2xl border border-hairline bg-white shadow-card">
        <div key={listKey} className="list-fade">
          {result.total === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="text-[28px] font-semibold tracking-tight text-ink">No matching seats</p>
              <p className="mx-auto mt-2 max-w-sm text-[14px] text-secondary">{emptyMessage}</p>
              <Button variant="quiet" className="mt-5" onClick={clear}>
                Clear search and filters
              </Button>
            </div>
          ) : view === "grid" ? (
            <PeopleGrid people={result.slice} {...actions} />
          ) : (
            <>
              <PeopleTable people={result.slice} {...actions} />
              <PersonCardList people={result.slice} {...actions} />
            </>
          )}
        </div>
        <div className="border-t border-hairline px-4 py-3">
          <Pagination
            page={result.current}
            pageCount={result.pageCount}
            from={result.from}
            to={result.to}
            total={result.total}
            onPage={setPage}
          />
        </div>
      </div>

      {inviteOpen ? (
        <InviteDialog
          people={people}
          onClose={() => setInviteOpen(false)}
          onInvite={(input) => {
            invite(input);
            clear();
            setInviteOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
