export const ROLES = ["Owner", "Admin", "Controller", "Analyst", "Auditor", "Viewer"] as const;
export const STATUSES = ["Active", "Invited", "Suspended"] as const;
export const DEPARTMENTS = ["Treasury", "Accounting", "FP&A", "Tax", "Executive"] as const;

export type Role = (typeof ROLES)[number];
export type Status = (typeof STATUSES)[number];
export type Department = (typeof DEPARTMENTS)[number];

export type Person = {
  id: string;
  name: string;
  portraitId: string;
  role: Role;
  department: Department;
  status: Status;
  lastActive: string;
};

export type Filters = {
  query: string;
  role: Role | "all";
  status: Status | "all";
  department: Department | "all";
};

export const PAGE_SIZE = 8;

export function accessLabel(role: Role): string {
  switch (role) {
    case "Owner":
      return "Move money";
    case "Admin":
    case "Controller":
      return "Approve";
    case "Analyst":
      return "View books";
    case "Auditor":
      return "Audit only";
    case "Viewer":
      return "Read only";
  }
}

export function filterPeople(people: Person[], filters: Filters): Person[] {
  const query = filters.query.trim().toLowerCase();
  return people.filter((person) => {
    if (query && !person.name.toLowerCase().includes(query)) return false;
    if (filters.role !== "all" && person.role !== filters.role) return false;
    if (filters.status !== "all" && person.status !== filters.status) return false;
    if (filters.department !== "all" && person.department !== filters.department) return false;
    return true;
  });
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(page, 1), pageCount);
  const start = total === 0 ? 0 : (current - 1) * pageSize;
  const slice = items.slice(start, start + pageSize);
  const from = total === 0 ? 0 : start + 1;
  const to = total === 0 ? 0 : start + slice.length;
  return { slice, total, pageCount, current, from, to };
}

export function summarize(people: Person[]) {
  return {
    seats: people.length,
    active: people.filter((person) => person.status === "Active").length,
    invited: people.filter((person) => person.status === "Invited").length,
    suspended: people.filter((person) => person.status === "Suspended").length,
  };
}

export function isRole(value: string): value is Role {
  return (ROLES as readonly string[]).includes(value);
}

export function isDepartment(value: string): value is Department {
  return (DEPARTMENTS as readonly string[]).includes(value);
}

export type InviteInput = {
  name: string;
  role: Role;
  department: Department;
};
