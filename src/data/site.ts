import type { SiteContent } from "./types";

/**
 * Brand-level content shared across the (currently single) Stay Haven
 * property. Property-specific facts and copy live in property.ts — this
 * file only holds the Stay Haven wordmark, navigation and footer shell.
 */
export const SITE: SiteContent = {
  brand: {
    name: "Stay Haven",
    shortName: "Stay Haven",
    presentsLabel: "presents",
  },
  nav: {
    primary: [
      { label: "Salt+Haven", href: "/" },
      { label: "The House", href: "/#the-house" },
      { label: "Amenities", href: "/#amenities" },
      { label: "Hood Canal", href: "/#hood-canal" },
      { label: "Gallery", href: "/#gallery" },
    ],
    bookCta: { label: "Book Your Stay", href: "/#book" },
  },
  hero: {
    scrollCue: "Explore Salt+Haven",
    primaryCta: "Book Your Stay",
    secondaryCta: "Explore Salt+Haven",
  },
  footer: {
    heading: "Stay Haven",
    nav: [
      { label: "The House", href: "/#the-house" },
      { label: "Amenities", href: "/#amenities" },
      { label: "Gallery", href: "/#gallery" },
      { label: "Policies", href: "/#know-before-you-stay" },
      { label: "Book Your Stay", href: "/#book" },
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
