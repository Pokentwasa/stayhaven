import { realMedia } from "./media";
import type { SiteContent } from "./types";

export const SITE: SiteContent = {
  brand: {
    name: "Stay Haven Collection",
    shortName: "Stay Haven",
  },
  nav: {
    primary: [
      { label: "Stays", href: "/stays" },
      { label: "Destinations", href: "/destinations" },
      { label: "Experience", href: "/#experience" },
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
    ],
    bookCta: { label: "Book Your Stay", href: "/#booking" },
  },
  hero: {
    eyebrow: "Stay Haven Collection",
    headline: "Stay Haven Collection",
    supporting: "Waterfront A-Frame Cabin With Panoramic Views",
    scrollCue: "Scroll to Explore",
    media: realMedia(
      "SITE_HERO_MEDIA",
      "Salt+Haven's vaulted great room, opening onto the deck and Hood Canal",
      "ultrawide",
      "/images/salt-haven/great-room-05.jpeg"
    ),
  },
  manifesto: {
    eyebrow: "02 — Brand Manifesto",
    heading: "A different way to stay.",
    lines: [
      "Thoughtful spaces.",
      "Slower mornings.",
      "Time outside.",
      "Places worth discovering.",
      "Stays worth remembering.",
    ],
    media: realMedia(
      "SITE_MANIFESTO_MEDIA",
      "Record player and vinyl collection in the great room",
      "wide",
      "/images/salt-haven/detail-02.jpeg"
    ),
  },
  experiencePillars: [
    {
      id: "pillar-settle-in",
      title: "Settle In",
      description: "A king bedroom with its own workspace and a water view — the moment you first put your bags down.",
      image: realMedia("PILLAR_SETTLE_IN_IMAGE", "King bedroom with a private workspace and water view", "landscape", "/images/salt-haven/king-bedroom-01.jpeg"),
    },
    {
      id: "pillar-gather",
      title: "Gather",
      description: "Vaulted ceilings over an open great room, made for the whole group to end up in one place.",
      image: realMedia("PILLAR_GATHER_IMAGE", "Vaulted great room, kitchen and loft ladder", "landscape", "/images/salt-haven/great-room-01.jpeg"),
    },
    {
      id: "pillar-step-out",
      title: "Step Out",
      description: "A table for outdoor meals and a BBQ, with Hood Canal as the backdrop.",
      image: realMedia("PILLAR_STEP_OUT_IMAGE", "Outdoor dining table and BBQ on the deck, overlooking Hood Canal", "wide", "/images/salt-haven/outdoor-dining-01.jpeg"),
    },
    {
      id: "pillar-unwind",
      title: "Unwind",
      description: "A private, covered hot tub at sunset — the reason you came.",
      image: realMedia("PILLAR_UNWIND_IMAGE", "Hot tub at sunset, overlooking Hood Canal", "wide", "/images/salt-haven/hot-tub-02.jpeg"),
    },
  ],
  footer: {
    heading: "Stay Haven",
    nav: [
      { label: "Collection", href: "/stays" },
      { label: "Destinations", href: "/destinations" },
      { label: "Experience", href: "/#experience" },
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
    ],
    social: [{ label: "Instagram", href: "https://instagram.com/" }],
    newsletter: {
      heading: "Letters from Stay Haven.",
      description: "Occasional notes on new Havens, destinations and quiet places worth knowing about.",
      placeholder: "Your email",
      cta: "Subscribe",
    },
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};
