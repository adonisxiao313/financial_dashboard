"use client";

import { Portrait } from "@/components/ui/Portrait";
import { StatusPill } from "@/components/ui/StatusPill";
import { PersonMenu } from "@/components/people/PersonMenu";
import { accessLabel, type Person } from "@/lib/people";

export function PersonCardList({
  people,
  onSuspend,
  onReactivate,
}: {
  people: Person[];
  onSuspend: (id: string) => void;
  onReactivate: (id: string) => void;
}) {
  return (
    <ul className="min-[860px]:hidden">
      {people.map((person) => (
        <li key={person.id} className="border-b border-hairline last:border-b-0">
          <article aria-label={person.name} className="px-4 py-4">
            <PersonBody person={person} onSuspend={onSuspend} onReactivate={onReactivate} size="table" />
          </article>
        </li>
      ))}
    </ul>
  );
}

export function PeopleGrid({
  people,
  onSuspend,
  onReactivate,
}: {
  people: Person[];
  onSuspend: (id: string) => void;
  onReactivate: (id: string) => void;
}) {
  return (
    <ul className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 min-[860px]:grid-cols-4">
      {people.map((person) => (
        <li key={person.id} className="lift rounded-2xl border border-hairline bg-paper p-4">
          <article aria-label={person.name} className="flex flex-col items-start gap-3">
            <div className="flex w-full items-start justify-between gap-2">
              <Portrait id={person.portraitId} name={person.name} size="card" />
              <PersonMenu person={person} onSuspend={onSuspend} onReactivate={onReactivate} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-ink">{person.name}</p>
              <p className="mt-0.5 text-[13px] text-secondary">{person.role}</p>
            </div>
            <StatusPill status={person.status} />
          </article>
        </li>
      ))}
    </ul>
  );
}

function PersonBody({
  person,
  onSuspend,
  onReactivate,
  size,
}: {
  person: Person;
  onSuspend: (id: string) => void;
  onReactivate: (id: string) => void;
  size: "table" | "card";
}) {
  return (
    <div className="flex items-start gap-3">
      <Portrait id={person.portraitId} name={person.name} size={size} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold leading-5 text-ink">{person.name}</p>
            <p className="truncate text-[12px] leading-5 text-secondary">{person.department}</p>
          </div>
          <PersonMenu person={person} onSuspend={onSuspend} onReactivate={onReactivate} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
          <StatusPill status={person.status} />
          <span className="text-ink">{person.role}</span>
          <span className="text-secondary">{person.department}</span>
        </div>
        <p className="mt-2 text-[13px] text-secondary">
          <span className="text-ink">{person.lastActive}</span>
          <span className="px-1.5 text-hairline" aria-hidden="true">
            /
          </span>
          {accessLabel(person.role)}
        </p>
      </div>
    </div>
  );
}
