import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <StubPage
      eyebrow="About"
      heading="A different way to stay."
      body="ABOUT_PAGE_CONTENT — the Stay Haven Collection story, values and team, once supplied."
    />
  );
}
