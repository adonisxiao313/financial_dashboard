import type { Metadata } from "next";
import { OverviewView } from "@/components/overview/OverviewView";

export const metadata: Metadata = {
  title: "Overview",
};

export default function OverviewPage() {
  return <OverviewView />;
}
