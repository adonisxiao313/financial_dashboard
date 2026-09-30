"use client";

import { Portrait } from "@/components/ui/Portrait";
import { StatusPill } from "@/components/ui/StatusPill";
import { accessLabel, type Person } from "@/lib/people";
import { PersonMenu } from "@/components/people/PersonMenu";

export function PeopleTable({
  people,
  onSuspend,
  onReactivate,
}: {
  people: Person[];
  onSuspend: (id: string) => void;
  onReactivate: (id: string) => void;
}) {
  return (
    <table className="hidden w-full border-collapse text-left min-[860px]:table">
      <caption className="sr-only">Directory of Northwind Capital seats</caption>
      <thead>
        <tr className="border-b border-hairline">
          {["Person", "Role", "Department", "Status", "Last active", "Access"].map((label) => (
            <th
              key={label}
              scope="col"
              className="px-4 py-2 text-[11px] font-medium tracking-[0.14em] text-secondary uppercase"
            >
              {label}
            </th>
          ))}
          <th scope="col" className="w-12 px-2 py-2">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr key={person.id} className="lift border-b border-hairline last:border-b-0 hover:bg-hover">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Portrait id={person.portraitId} name={person.name} size="table" />
                <p className="truncate text-[15px] font-semibold leading-5 text-ink">{person.name}</p>
              </div>
            </td>
            <td className="px-4 py-3 text-[14px] text-ink">{person.role}</td>
            <td className="px-4 py-3 text-[14px] text-ink">{person.department}</td>
            <td className="px-4 py-3">
              <StatusPill status={person.status} />
            </td>
            <td className="px-4 py-3 text-[14px] whitespace-nowrap text-ink">{person.lastActive}</td>
            <td className="px-4 py-3 text-[13px] whitespace-nowrap text-secondary">{accessLabel(person.role)}</td>
            <td className="px-2 py-3 text-right">
              <PersonMenu person={person} onSuspend={onSuspend} onReactivate={onReactivate} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
