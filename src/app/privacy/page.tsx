import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <StubPage
      eyebrow="Legal"
      heading="Privacy Policy"
      body="PRIVACY_POLICY_CONTENT — pending legal copy."
    />
  );
}
