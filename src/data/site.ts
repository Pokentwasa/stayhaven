import { placeholder } from "./media";
import type { SiteContent } from "./types";

/**
 * Site-level brand/navigation copy. The hero, manifesto and pillar lines
 * below are the DRAFT direction supplied in the creative brief — not
 * fabricated property content — and remain easy to swap from this single
 * file once final brand copy is approved.
 */
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
    headline: "Stay somewhere worth remembering.",
    supporting: "A quieter way to travel.",
    scrollCue: "Discover the Collection",
    media: placeholder("SITE_HERO_MEDIA", "Stay Haven Collection", "ultrawide", "video"),
  },
  manifesto: {
    eyebrow: "02 — Brand Manifesto",
    heading: "A different way to stay.",
    lines: [
      "Thoughtful spaces.",
      "Slower travel.",
      "Considered design.",
      "Neighbourhoods worth discovering.",
      "Stays worth remembering.",
    ],
  },
  experiencePillars: [
    {
      id: "pillar-stay",
      title: "Stay",
      description: "Beautiful spaces made to settle into.",
      image: placeholder("PILLAR_STAY_IMAGE", "Stay", "landscape"),
    },
    {
      id: "pillar-eat",
      title: "Eat",
      description: "Slow mornings. Long dinners.",
      image: placeholder("PILLAR_EAT_IMAGE", "Eat", "landscape"),
    },
    {
      id: "pillar-explore",
      title: "Explore",
      description: "Step outside and discover where you are.",
      image: placeholder("PILLAR_EXPLORE_IMAGE", "Explore", "landscape"),
    },
    {
      id: "pillar-unwind",
      title: "Unwind",
      description: "The reason you came.",
      image: placeholder("PILLAR_UNWIND_IMAGE", "Unwind", "landscape"),
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
