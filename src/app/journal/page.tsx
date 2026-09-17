import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <StubPage
      eyebrow="Journal"
      heading="Letters from Stay Haven."
      body="JOURNAL_CONTENT — editorial travel stories and destination notes, once supplied."
    />
  );
}
