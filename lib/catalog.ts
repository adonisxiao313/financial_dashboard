import { DEPARTMENT_BARS } from "@/lib/charts";
import { DEPARTMENTS, type Person, type Role, type Status } from "@/lib/people";

export type Rail = "Wire" | "ACH" | "Card";
export type PaymentStatus = "Settled" | "Processing" | "Held";
export type Direction = "In" | "Out";

export type Payment = {
  id: string;
  counterparty: string;
  reference: string;
  rail: Rail;
  direction: Direction;
  amount: number;
  status: PaymentStatus;
  when: string;
};

export type VendorStatus = "Active" | "Review" | "Paused";

export type Vendor = {
  id: string;
  name: string;
  category: string;
  region: string;
  invoices: number;
  spend: number;
  status: VendorStatus;
};

export type Approval = {
  id: string;
  title: string;
  owner: string;
  amount: number;
  waiting: string;
  kind: "Wire" | "Batch" | "Vendor";
};

export type AuditEvent = {
  id: string;
  actor: string;
  action: string;
  detail: string;
  when: string;
};

export type DepartmentBar = {
  name: string;
  amount: number;
  color: string;
};

const FIRST = [
  "Mara", "Julian", "Priya", "Helen", "Samir", "Noah", "Amira", "Owen", "Theo", "Ingrid",
  "Caleb", "Leila", "Freya", "Mateo", "Hana", "Felix", "Adeola", "Ruthie", "Soren", "Camille",
  "Yusuf", "Elise", "Kenji", "Nora", "Amina", "Hugo", "Chiara", "Idris", "Saskia", "Ravi",
  "Noor", "Luca", "Esme", "Tariq", "Mina", "Oscar", "Aya", "Nils", "Beatrice", "Jamal",
  "Clara", "Farid", "Ivy", "Hassan", "Lila", "Emile", "Zara", "Anton", "Mei", "Omar",
  "Greta", "Nico", "Anika", "Leo", "Fatima", "Jonah", "Rosa", "Arun", "Thea", "Malik",
  "Irene", "Pavel", "Sana", "Elliot", "Nadia", "Hugo", "Yara", "Seth", "Alicia", "Karim",
];

const LAST = [
  "Ellison", "Okonkwo", "Raman", "Cho", "Haddad", "Keller", "Solano", "Briggs", "Lang", "Voss",
  "Ortiz", "Nassar", "Lindholm", "Ruiz", "Ishikawa", "Moreau", "Bankole", "Pell", "Dahl", "Berger",
  "Rahman", "Marchand", "Watanabe", "Petrov", "Diallo", "Berg", "Costa", "Mensah", "Vogel", "Shah",
  "Almeida", "Novak", "Hart", "Rahim", "Sato", "Dupont", "Ibrahim", "Keller", "Okada", "Silva",
  "Nguyen", "Rossi", "Adeyemi", "Klein", "Farouk", "Bennett", "Chow", "Larsen", "Morales", "Khan",
  "Park", "Hoffmann", "Diallo", "Greene", "Abbas", "Marino", "Osei", "Frost", "Qureshi", "Walsh",
];

const FIRMS = [
  "Meridian Logistics", "Harbor & Co", "Northline Freight", "Cinder Studio", "Lumen Paper",
  "Brightwater Clinics", "Oak & Iron", "Sable Freight", "Kinship Foods", "Atlas Glass",
  "Fieldnote Media", "Copperlane", "Vesper Labs", "Marlow Textiles", "Pioneer Grain",
  "Helio Energy", "Kindred Retail", "Westferry Ports", "Nimbus Software", "Arcadia Mills",
  "Solstice Hotels", "Bramble Coffee", "Keystone Alloys", "Orchid Health", "Fathom Data",
  "Redbird Transit", "Cedar & Salt", "Pallet Works", "Aurora Clinics", "Highline Print",
];

const CATEGORIES = ["Logistics", "Software", "Facilities", "Professional", "Inventory", "Utilities", "Benefits"];
const REGIONS = ["Northeast", "Midwest", "South", "West", "International"];
const ACTORS = ["Mara Ellison", "Julian Okonkwo", "Priya Raman", "Helen Cho", "Amira Solano", "Desk rule"];
const ACTIONS = ["Approved", "Released", "Flagged", "Matched", "Scheduled", "Exported", "Cleared"];

const NAMED: Array<Omit<Person, "portraitId"> & { portraitId?: string }> = [
  { id: "p01", name: "Mara Ellison", role: "Owner", department: "Executive", status: "Active", lastActive: "Just now" },
  { id: "p02", name: "Julian Okonkwo", role: "Controller", department: "Treasury", status: "Active", lastActive: "12 min ago" },
  { id: "p03", name: "Priya Raman", role: "Admin", department: "Accounting", status: "Active", lastActive: "34 min ago" },
  { id: "p04", name: "Helen Cho", role: "Analyst", department: "FP&A", status: "Active", lastActive: "3 hours ago" },
  { id: "p05", name: "Samir Haddad", role: "Auditor", department: "Tax", status: "Invited", lastActive: "Invite sent" },
  { id: "p06", name: "Noah Keller", role: "Viewer", department: "Treasury", status: "Suspended", lastActive: "14 days ago" },
  { id: "p07", name: "Amira Solano", role: "Controller", department: "Accounting", status: "Active", lastActive: "1 hour ago" },
  { id: "p08", name: "Owen Briggs", role: "Auditor", department: "Accounting", status: "Invited", lastActive: "Invite sent" },
  { id: "p09", name: "Theo Lang", role: "Analyst", department: "Treasury", status: "Active", lastActive: "2 days ago" },
  { id: "p10", name: "Ingrid Voss", role: "Admin", department: "Executive", status: "Active", lastActive: "4 hours ago" },
  { id: "p11", name: "Caleb Ortiz", role: "Viewer", department: "FP&A", status: "Active", lastActive: "5 days ago" },
  { id: "p12", name: "Leila Nassar", role: "Analyst", department: "Tax", status: "Active", lastActive: "6 hours ago" },
  { id: "p13", name: "Freya Lindholm", role: "Controller", department: "FP&A", status: "Active", lastActive: "Just now" },
  { id: "p14", name: "Mateo Ruiz", role: "Analyst", department: "Treasury", status: "Suspended", lastActive: "9 days ago" },
  { id: "p15", name: "Hana Ishikawa", role: "Admin", department: "Tax", status: "Active", lastActive: "Yesterday" },
  { id: "p16", name: "Felix Moreau", role: "Viewer", department: "Executive", status: "Active", lastActive: "3 days ago" },
  { id: "p17", name: "Adeola Bankole", role: "Analyst", department: "Accounting", status: "Active", lastActive: "8 hours ago" },
  { id: "p18", name: "Ruthie Pell", role: "Auditor", department: "FP&A", status: "Invited", lastActive: "Invite sent" },
  { id: "p19", name: "Soren Dahl", role: "Controller", department: "Treasury", status: "Active", lastActive: "2 hours ago" },
  { id: "p20", name: "Camille Berger", role: "Viewer", department: "Tax", status: "Active", lastActive: "11 days ago" },
  { id: "p21", name: "Yusuf Rahman", role: "Admin", department: "Treasury", status: "Active", lastActive: "Yesterday" },
  { id: "p22", name: "Elise Marchand", role: "Analyst", department: "Executive", status: "Suspended", lastActive: "6 days ago" },
  { id: "p23", name: "Kenji Watanabe", role: "Auditor", department: "Accounting", status: "Active", lastActive: "4 days ago" },
  { id: "p24", name: "Nora Petrov", role: "Viewer", department: "FP&A", status: "Invited", lastActive: "Invite sent" },
];

function createRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, list: readonly T[]): T {
  return list[Math.floor(rng() * list.length)];
}

function portraitFor(index: number) {
  return `p${String((index % 24) + 1).padStart(2, "0")}`;
}

function roleFor(rng: () => number): Role {
  const roll = rng();
  if (roll < 0.02) return "Owner";
  if (roll < 0.12) return "Admin";
  if (roll < 0.28) return "Controller";
  if (roll < 0.55) return "Analyst";
  if (roll < 0.72) return "Auditor";
  return "Viewer";
}

function statusFor(rng: () => number): Status {
  const roll = rng();
  if (roll < 0.78) return "Active";
  if (roll < 0.92) return "Invited";
  return "Suspended";
}

function lastActiveFor(rng: () => number, status: Status) {
  if (status === "Invited") return "Invite sent";
  const options = ["Just now", "12 min ago", "1 hour ago", "4 hours ago", "Yesterday", "2 days ago", "6 days ago", "11 days ago"];
  return pick(rng, options);
}

export function buildPeople(count = 256): Person[] {
  const rng = createRng(20260930);
  const people: Person[] = NAMED.map((person) => ({
    ...person,
    portraitId: person.id,
  }));
  const seen = new Set(people.map((person) => person.name.toLowerCase()));

  while (people.length < count) {
    const name = `${pick(rng, FIRST)} ${pick(rng, LAST)}`;
    if (seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    const status = statusFor(rng);
    const index = people.length;
    people.push({
      id: `seat-${String(index + 1).padStart(4, "0")}`,
      name,
      portraitId: portraitFor(index),
      role: index < 2 ? "Owner" : roleFor(rng),
      department: pick(rng, DEPARTMENTS),
      status,
      lastActive: lastActiveFor(rng, status),
    });
  }

  return people;
}

export function buildPayments(count = 480): Payment[] {
  const rng = createRng(481);
  const payments: Payment[] = [];
  for (let index = 0; index < count; index += 1) {
    const roll = rng();
    const status: PaymentStatus = roll < 0.72 ? "Settled" : roll < 0.9 ? "Processing" : "Held";
    const direction: Direction = rng() < 0.38 ? "In" : "Out";
    const minutes = Math.floor(rng() * 60);
    const hours = Math.floor(rng() * 10);
    payments.push({
      id: `pay-${String(18420 - index).padStart(5, "0")}`,
      counterparty: pick(rng, FIRMS),
      reference: `NW-${184200 + index}`,
      rail: pick(rng, ["Wire", "ACH", "Card"] as const),
      direction,
      amount: Math.round(400 + rng() * rng() * 86000),
      status,
      when: hours === 0 ? `${minutes || 1} min ago` : `${hours}h ${minutes.toString().padStart(2, "0")}m ago`,
    });
  }
  return payments;
}

export function buildVendors(count = 168): Vendor[] {
  const rng = createRng(1680);
  const vendors: Vendor[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (vendors.length < count && guard < count * 20) {
    guard += 1;
    const base = pick(rng, FIRMS);
    const region = pick(rng, REGIONS);
    const name = seen.has(base) ? `${base} ${region}` : base;
    const unique = seen.has(name) ? `${name} ${vendors.length + 1}` : name;
    if (seen.has(unique)) continue;
    seen.add(unique);
    const roll = rng();
    vendors.push({
      id: `ven-${String(vendors.length + 1).padStart(4, "0")}`,
      name: unique,
      category: pick(rng, CATEGORIES),
      region: pick(rng, REGIONS),
      invoices: 1 + Math.floor(rng() * 36),
      spend: Math.round(12000 + rng() * 940000),
      status: roll < 0.78 ? "Active" : roll < 0.92 ? "Review" : "Paused",
    });
  }
  return vendors;
}

export function buildApprovals(count = 42): Approval[] {
  const rng = createRng(4200);
  return Array.from({ length: count }, (_, index) => ({
    id: `apr-${String(index + 1).padStart(4, "0")}`,
    title: `${pick(rng, FIRMS)} ${pick(rng, ["wire", "batch", "retainer", "settlement"] as const)}`,
    owner: pick(rng, ACTORS.filter((name) => name !== "Desk rule")),
    amount: Math.round(1500 + rng() * 74000),
    waiting: pick(rng, ["6 min", "22 min", "1 hour", "3 hours", "Yesterday"]),
    kind: pick(rng, ["Wire", "Batch", "Vendor"] as const),
  }));
}

export function buildAudit(count = 140): AuditEvent[] {
  const rng = createRng(1400);
  return Array.from({ length: count }, (_, index) => ({
    id: `aud-${String(index + 1).padStart(4, "0")}`,
    actor: pick(rng, ACTORS),
    action: pick(rng, ACTIONS),
    detail: `${pick(rng, FIRMS)} · NW-${190000 + index}`,
    when: index < 4 ? "Just now" : pick(rng, ["4 min ago", "18 min ago", "1 hour ago", "3 hours ago", "Yesterday"]),
  }));
}

/** Uneven cash step: pauses, small drifts, and occasional jumps. Not a repeating wave. */
export function irregularCashStep(rng: () => number) {
  const roll = rng();
  if (roll < 0.12) return (rng() - 0.5) * 0.015;
  if (roll < 0.22) return (rng() < 0.5 ? -1 : 1) * (0.12 + rng() * 0.22);
  return (rng() - 0.48) * (0.04 + rng() * 0.09);
}

export function buildLiveSeries() {
  const rng = createRng(184);
  let value = 18.15;
  return Array.from({ length: 18 }, (_, index) => {
    const pull = (18.45 - value) * 0.15;
    value = Math.min(19.4, Math.max(17.2, value + pull + irregularCashStep(rng)));
    return { date: `−${18 - index}m`, value: Math.round(value * 100) / 100 };
  });
}

export function initialDepartments(): DepartmentBar[] {
  return DEPARTMENT_BARS.map((bar) => ({ ...bar }));
}

export function nextPayment(sequence: number): Payment {
  const rng = createRng(sequence + 9000);
  const direction: Direction = rng() < 0.42 ? "In" : "Out";
  const roll = rng();
  return {
    id: `live-${sequence}`,
    counterparty: pick(rng, FIRMS),
    reference: `NW-${200000 + sequence}`,
    rail: pick(rng, ["Wire", "ACH", "Card"] as const),
    direction,
    amount: Math.round(900 + rng() * 42000),
    status: roll < 0.55 ? "Processing" : roll < 0.85 ? "Settled" : "Held",
    when: "Just now",
  };
}

export function nextApproval(sequence: number): Approval {
  const rng = createRng(sequence + 12000);
  return {
    id: `live-apr-${sequence}`,
    title: `${pick(rng, FIRMS)} ${pick(rng, ["wire", "batch", "retainer"] as const)}`,
    owner: pick(rng, ACTORS.filter((name) => name !== "Desk rule")),
    amount: Math.round(2200 + rng() * 51000),
    waiting: "Just now",
    kind: pick(rng, ["Wire", "Batch", "Vendor"] as const),
  };
}

export function nextAudit(sequence: number, detail: string): AuditEvent {
  const rng = createRng(sequence + 15000);
  return {
    id: `live-aud-${sequence}`,
    actor: pick(rng, ACTORS),
    action: pick(rng, ACTIONS),
    detail,
    when: "Just now",
  };
}

export const RAILS = ["Wire", "ACH", "Card"] as const;
export const PAYMENT_STATUSES = ["Settled", "Processing", "Held"] as const;
export const VENDOR_STATUSES = ["Active", "Review", "Paused"] as const;
