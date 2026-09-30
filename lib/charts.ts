export type CashRange = "7d" | "30d" | "90d";

export type CashPoint = {
  date: string;
  value: number;
};

export const CASH_SERIES: Record<CashRange, CashPoint[]> = {
  "7d": [
    { date: "Sep 24", value: 16.8 },
    { date: "Sep 25", value: 17.1 },
    { date: "Sep 26", value: 16.9 },
    { date: "Sep 27", value: 17.4 },
    { date: "Sep 28", value: 17.6 },
    { date: "Sep 29", value: 18.0 },
    { date: "Sep 30", value: 18.4 },
  ],
  "30d": [
    { date: "Sep 1", value: 16.4 },
    { date: "Sep 5", value: 16.6 },
    { date: "Sep 9", value: 16.5 },
    { date: "Sep 12", value: 16.9 },
    { date: "Sep 16", value: 17.2 },
    { date: "Sep 19", value: 17.1 },
    { date: "Sep 23", value: 17.6 },
    { date: "Sep 26", value: 17.9 },
    { date: "Sep 30", value: 18.4 },
  ],
  "90d": [
    { date: "Jul 2", value: 16.1 },
    { date: "Jul 16", value: 16.4 },
    { date: "Jul 30", value: 16.3 },
    { date: "Aug 13", value: 16.8 },
    { date: "Aug 27", value: 17.2 },
    { date: "Sep 10", value: 17.4 },
    { date: "Sep 20", value: 17.9 },
    { date: "Sep 30", value: 18.4 },
  ],
};

export const CASH_NOW = 18.4;

export const DEPARTMENT_BARS = [
  { name: "Treasury", amount: 6.4, color: "#0E9B8A" },
  { name: "Accounting", amount: 4.1, color: "#4C9BE8" },
  { name: "FP&A", amount: 3.2, color: "#F5B942" },
  { name: "Tax", amount: 2.4, color: "#FF6B57" },
  { name: "Executive", amount: 2.3, color: "#14343C" },
] as const;
