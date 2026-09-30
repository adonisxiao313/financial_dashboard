import type { Metadata } from "next";
import { PeopleDirectory } from "@/components/people/PeopleDirectory";

export const metadata: Metadata = {
  title: "People",
};

export default function PeoplePage() {
  return <PeopleDirectory />;
}
