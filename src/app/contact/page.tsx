import type { Metadata } from "next";
import { StubPage } from "@/components/layout/StubPage";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <StubPage
      eyebrow="Contact"
      heading="Get in touch."
      body="CONTACT_DETAILS — phone, email and enquiry form, once supplied."
    />
  );
}
