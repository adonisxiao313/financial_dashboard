"use client";

import { Select } from "@/components/ui/Select";
import { DEPARTMENTS, ROLES, STATUSES, type Department, type Role, type Status } from "@/lib/people";

export function FilterBar({
  query,
  role,
  status,
  department,
  dirty,
  onQuery,
  onRole,
  onStatus,
  onDepartment,
  onClear,
}: {
  query: string;
  role: Role | "all";
  status: Status | "all";
  department: Department | "all";
  dirty: boolean;
  onQuery: (value: string) => void;
  onRole: (value: Role | "all") => void;
  onStatus: (value: Status | "all") => void;
  onDepartment: (value: Department | "all") => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 min-[860px]:flex-row min-[860px]:items-center">
      <search className="relative min-[860px]:w-[280px]">
        <svg
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-secondary"
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.25" />
          <path d="M10.4 10.4 13.2 13.2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
        <label htmlFor="people-search" className="sr-only">
          Search people by name
        </label>
        <input
          id="people-search"
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Search by name"
          autoComplete="off"
          className="h-10 w-full rounded-xl border border-hairline bg-white pr-3 pl-9 text-[14px] text-ink placeholder:text-secondary"
        />
      </search>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 min-[860px]:flex min-[860px]:items-center">
        <Select
          id="filter-role"
          label="Role"
          value={role}
          quiet={role === "all"}
          onChange={(value) => onRole(value as Role | "all")}
          className="min-[860px]:w-[148px]"
          options={[{ value: "all", label: "All roles" }, ...ROLES.map((item) => ({ value: item, label: item }))]}
        />
        <Select
          id="filter-status"
          label="Status"
          value={status}
          quiet={status === "all"}
          onChange={(value) => onStatus(value as Status | "all")}
          className="min-[860px]:w-[156px]"
          options={[{ value: "all", label: "All statuses" }, ...STATUSES.map((item) => ({ value: item, label: item }))]}
        />
        <Select
          id="filter-department"
          label="Department"
          value={department}
          quiet={department === "all"}
          onChange={(value) => onDepartment(value as Department | "all")}
          className="min-[860px]:w-[168px]"
          options={[
            { value: "all", label: "All departments" },
            ...DEPARTMENTS.map((item) => ({ value: item, label: item })),
          ]}
        />
      </div>
      {dirty ? (
        <button
          type="button"
          onClick={onClear}
          className="h-10 cursor-pointer self-start px-1 text-[14px] text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink min-[860px]:self-auto"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
