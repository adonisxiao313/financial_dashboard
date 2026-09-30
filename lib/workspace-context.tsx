"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  buildApprovals,
  buildAudit,
  buildLiveSeries,
  buildPayments,
  buildPeople,
  buildVendors,
  initialDepartments,
  nextApproval,
  irregularCashStep,
  nextAudit,
  nextPayment,
  type Approval,
  type AuditEvent,
  type DepartmentBar,
  type Payment,
  type Vendor,
} from "@/lib/catalog";
import type { CashPoint } from "@/lib/charts";
import type { InviteInput, Person, Status } from "@/lib/people";

const MAX_PAYMENTS = 720;
const MAX_AUDIT = 360;
const MAX_APPROVALS = 80;

type WorkspaceState = {
  people: Person[];
  payments: Payment[];
  vendors: Vendor[];
  approvals: Approval[];
  audit: AuditEvent[];
  cash: number;
  liveSeries: CashPoint[];
  departments: DepartmentBar[];
  settledToday: number;
  inflowToday: number;
  outflowToday: number;
  arrived: number;
  latestPaymentId: string | null;
  invite: (input: InviteInput) => void;
  setStatus: (id: string, status: Status) => void;
  decide: (id: string, choice: "Approved" | "Returned") => void;
};

const WorkspaceContext = createContext<WorkspaceState | null>(null);

function clockLabel() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" });
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [people, setPeople] = useState<Person[]>(() => buildPeople());
  const [payments, setPayments] = useState<Payment[]>(() => buildPayments());
  const [vendors] = useState<Vendor[]>(() => buildVendors());
  const [approvals, setApprovals] = useState<Approval[]>(() => buildApprovals());
  const [audit, setAudit] = useState<AuditEvent[]>(() => buildAudit());
  const [cash, setCash] = useState(18.4);
  const [liveSeries, setLiveSeries] = useState<CashPoint[]>(() => buildLiveSeries());
  const [departments, setDepartments] = useState<DepartmentBar[]>(() => initialDepartments());
  const [settledToday, setSettledToday] = useState(18640);
  const [inflowToday, setInflowToday] = useState(4280000);
  const [outflowToday, setOutflowToday] = useState(3910000);
  const [arrived, setArrived] = useState(0);
  const [latestPaymentId, setLatestPaymentId] = useState<string | null>(null);
  const [sequence, setSequence] = useState(1);
  const cashRef = useRef(18.4);
  const seriesReady = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSequence((current) => current + 1);
    }, 1700);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (sequence === 1) return;
    const payment = nextPayment(sequence);
    let base: { date: string; value: number }[] | null = null;
    if (!seriesReady.current) {
      seriesReady.current = true;
      base = buildLiveSeries();
      cashRef.current = base[base.length - 1]?.value ?? 18.4;
    }
    const pull = (18.5 - cashRef.current) * 0.12;
    const delta = pull + irregularCashStep(Math.random);
    const nextCash = Math.min(19.5, Math.max(17.1, Math.round((cashRef.current + delta) * 100) / 100));
    cashRef.current = nextCash;
    setPayments((current) => [payment, ...current].slice(0, MAX_PAYMENTS));
    setLatestPaymentId(payment.id);
    setArrived((current) => current + 1);
    setSettledToday((current) => current + 1);
    if (payment.direction === "In") setInflowToday((current) => current + payment.amount);
    else setOutflowToday((current) => current + payment.amount);
    setCash(nextCash);
    setLiveSeries((series) => [...(base ?? series).slice(-23), { date: clockLabel(), value: nextCash }]);
    setDepartments((current) => {
      const next = current.map((bar) => ({ ...bar }));
      const from = sequence % next.length;
      const to = (from + 2) % next.length;
      const shift = 0.04;
      next[from].amount = Math.round(Math.max(1.2, next[from].amount - shift) * 100) / 100;
      next[to].amount = Math.round((next[to].amount + shift) * 100) / 100;
      return next;
    });
    setAudit((current) =>
      [
        nextAudit(sequence, `${payment.counterparty} · ${payment.reference} · ${payment.direction === "In" ? "received" : "sent"}`),
        ...current,
      ].slice(0, MAX_AUDIT),
    );
    if (sequence % 2 === 0) {
      setApprovals((current) => [nextApproval(sequence), ...current].slice(0, MAX_APPROVALS));
    }
  }, [sequence]);

  const value = useMemo<WorkspaceState>(
    () => ({
      people,
      payments,
      vendors,
      approvals,
      audit,
      cash,
      liveSeries,
      departments,
      settledToday,
      inflowToday,
      outflowToday,
      arrived,
      latestPaymentId,
      invite(input) {
        const person: Person = {
          id: crypto.randomUUID(),
          name: input.name.trim(),
          portraitId: "invited",
          role: input.role,
          department: input.department,
          status: "Invited",
          lastActive: "Invite sent",
        };
        setPeople((current) => [person, ...current]);
        setAudit((current) =>
          [
            {
              id: `invite-${person.id}`,
              actor: "Mara Ellison",
              action: "Invited",
              detail: `${person.name} · ${person.department}`,
              when: "Just now",
            },
            ...current,
          ].slice(0, MAX_AUDIT),
        );
      },
      setStatus(id, status) {
        setPeople((current) => current.map((person) => (person.id === id ? { ...person, status } : person)));
      },
      decide(id, choice) {
        const item = approvals.find((approval) => approval.id === id);
        if (!item) return;
        setApprovals((current) => current.filter((approval) => approval.id !== id));
        setAudit((events) =>
          [
            {
              id: `decision-${id}-${choice}`,
              actor: "Mara Ellison",
              action: choice,
              detail: item.title,
              when: "Just now",
            },
            ...events,
          ].slice(0, MAX_AUDIT),
        );
      },
    }),
    [people, payments, vendors, approvals, audit, cash, liveSeries, departments, settledToday, inflowToday, outflowToday, arrived, latestPaymentId],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return context;
}

export function usePeople() {
  const { people, invite, setStatus } = useWorkspace();
  return { people, invite, setStatus };
}
