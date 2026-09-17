import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <StubPage
      eyebrow="Legal"
      heading="Terms of Service"
      body="TERMS_OF_SERVICE_CONTENT — pending legal copy."
    />
  );
}
