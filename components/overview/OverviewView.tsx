"use client";

import Link from "next/link";
import { CashChart } from "@/components/overview/CashChart";
import { DepartmentBars } from "@/components/overview/DepartmentBars";
import { LiveMark } from "@/components/ui/LiveMark";
import { StatCard } from "@/components/ui/StatCard";
import { compact, millions, money } from "@/lib/format";
import { useWorkspace } from "@/lib/workspace-context";
import type { Person } from "@/lib/people";

export function OverviewView() {
  const { people, payments, approvals, audit, cash, settledToday, arrived, latestPaymentId } = useWorkspace();
  const openInvites = people.filter((person) => person.status === "Invited").length;
  const tape = payments.slice(0, 5);

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2">
            <LiveMark label="Desk is live" />
          </div>
          <h1 className="text-[36px] font-semibold tracking-tight text-ink">Good afternoon, Mara</h1>
          <p className="mt-2 max-w-xl text-[15px] text-secondary">
            Northwind Capital is clearing volume in real time.
            {arrived > 0 ? ` ${arrived} ${arrived === 1 ? "payment has" : "payments have"} landed since you opened the desk.` : " The book is moving."}
          </p>
        </div>
      </header>

      <div className="mt-6 overflow-hidden rounded-2xl border border-hairline bg-white shadow-card">
        <img
          src="/brand/coast-desk.png"
          alt="A sunlit desk by a window, with a plant, an open notebook, and the sea beyond"
          className="h-[180px] w-full object-cover"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 min-[860px]:grid-cols-4">
        <StatCard label="Cash position" value={millions(cash)} tone="teal" hint="Operating cash, updating" />
        <StatCard label="Settled today" value={compact(settledToday)} hint="Keeps climbing through the day" />
        <StatCard label="Awaiting approval" value={compact(approvals.length)} hint="Queue grows as wires arrive" />
        <StatCard
          label="Open invites"
          value={
            <Link href="/people" className="underline decoration-transparent underline-offset-4 hover:decoration-teal">
              {compact(openInvites)}
            </Link>
          }
          tone="teal"
        />
      </div>

      <div className="mt-4 grid gap-4 min-[860px]:grid-cols-[1.4fr_0.8fr]">
        <CashChart />
        <DepartmentBars />
      </div>

      <section className="mt-4 rounded-2xl border border-hairline bg-white shadow-card">
        <div className="flex items-center justify-between gap-3 px-5 pt-4">
          <h2 className="text-[15px] font-semibold text-ink">Arriving now</h2>
          <Link href="/payments" className="text-[13px] font-semibold text-teal hover:underline">
            Open the ledger
          </Link>
        </div>
        <ul className="mt-2">
          {tape.map((payment) => (
            <li
              key={payment.id}
              className={`flex items-center justify-between gap-3 border-t border-hairline px-5 py-3 ${payment.id === latestPaymentId ? "row-in" : ""}`}
            >
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-ink">{payment.counterparty}</p>
                <p className="font-mono text-[12px] text-secondary">
                  {payment.reference} · {payment.rail} · {payment.when}
                </p>
              </div>
              <p className={`shrink-0 font-mono text-[14px] font-medium ${payment.direction === "In" ? "text-teal" : "text-ink"}`}>
                {payment.direction === "In" ? "+" : "−"}
                {money(payment.amount)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 grid gap-4 min-[860px]:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-white px-5 py-4 shadow-card">
          <h2 className="text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase">Needs a look</h2>
          <ul className="mt-1">
            {needsALook(people).map((item) => (
              <li key={item.title} className="border-b border-hairline py-3 last:border-b-0">
                <p className="text-[14px] font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-[14px] leading-5 text-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-hairline bg-white px-5 py-4 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[11px] font-semibold tracking-[0.14em] text-secondary uppercase">Recent activity</h2>
            <Link href="/audit" className="text-[12px] font-semibold text-teal hover:underline">
              Audit
            </Link>
          </div>
          <ul className="mt-1">
            {audit.slice(0, 5).map((event) => (
              <li key={event.id} className={`border-b border-hairline py-3 last:border-b-0 ${event.id.startsWith("live-") ? "row-in" : ""}`}>
                <p className="text-[14px] leading-5 text-ink">
                  {event.actor} {event.action.toLowerCase()} {event.detail}.
                </p>
                <p className="mt-1 font-mono text-[12px] text-secondary">{event.when}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function needsALook(people: Person[]) {
  const invited = people.find((person) => person.id === "p05") ?? people.find((person) => person.status === "Invited");
  const suspended = people.find((person) => person.id === "p06") ?? people.find((person) => person.status === "Suspended");

  return [
    {
      title: "Stale invite",
      body: invited ? `${invited.name}’s ${invited.department} seat is still waiting on a reply.` : "Every invite has been answered.",
    },
    {
      title: "Suspended access",
      body: suspended
        ? `${suspended.name}’s ${suspended.department} seat is suspended.`
        : "No seats are suspended. Access on the book is intact.",
    },
    {
      title: "Over policy",
      body: "A $42,600 wire to Meridian Logistics needs a second approver.",
    },
  ];
}
