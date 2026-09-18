import type { SiteContent } from "./types";

/**
 * Brand-level content shared across the (currently single) Stay Haven
 * Collection property. Property-specific facts and copy live in
 * property.ts — this file only holds the Stay Haven Collection wordmark,
 * navigation and footer shell.
 *
 * Stay Haven Collection is the parent brand; Salt+Haven is the first and
 * currently only property within it. The site always frames it as
 * "Stay Haven Collection presents Salt+Haven" — never a standalone brand
 * rename, and never implying a multi-property collection that doesn't
 * exist yet.
 */
export const SITE: SiteContent = {
  brand: {
    name: "Stay Haven Collection",
    shortName: "Stay Haven",
    presentsLabel: "presents",
  },
  nav: {
    primary: [
      { label: "001 Salt+Haven", href: "/" },
      { label: "House", href: "/#the-house" },
      { label: "Hood Canal", href: "/#hood-canal" },
      { label: "Archive", href: "/#archive" },
    ],
    bookCta: { label: "Book", href: "/#book" },
  },
  hero: {
    scrollCue: "Explore Salt+Haven",
    primaryCta: "Book Your Stay",
    secondaryCta: "Explore",
  },
  footer: {
    heading: "Stay Haven Collection",
    nav: [
      { label: "House", href: "/#the-house" },
      { label: "Hood Canal", href: "/#hood-canal" },
      { label: "Archive", href: "/#archive" },
      { label: "Location", href: "/#location" },
      { label: "Book", href: "/#book" },
      { label: "Contact", href: "/contact" },
    ],
    social: [{ label: "Instagram", href: "https://instagram.com/" }],
    newsletter: {
      heading: "Letters from Stay Haven.",
      description: "Occasional notes from Salt+Haven and Hood Canal, worth knowing about.",
      placeholder: "Your email",
      cta: "Subscribe",
    },
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};
