import type { Metadata } from "next";
import { DestinationExplorer } from "@/components/sections/DestinationExplorer";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Where the Stay Haven Collection takes you.",
};

export default function DestinationsPage() {
  return <DestinationExplorer />;
}
