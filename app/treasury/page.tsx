import type { Metadata } from "next";
import { TreasuryView } from "@/components/treasury/TreasuryView";

export const metadata: Metadata = { title: "Treasury" };

export default function TreasuryPage() {
  return <TreasuryView />;
}
