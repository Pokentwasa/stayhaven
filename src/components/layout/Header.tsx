"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "./TransitionLink";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { SITE } from "@/data/site";
import { cx } from "@/lib/utils";

/**
 * Overlays transparently on the hero, turns solid on scroll, and reads
 * `data-header-theme="light"|"dark"` off whatever section sits behind it to
 * flip nav colour — light text over photography, dark text over the light
 * brand-blue/white sections.
 */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      setSolid(window.scrollY > window.innerHeight * 0.7);

      const probeY = 48;
      const el = document.elementFromPoint(window.innerWidth / 2, probeY);
      const themed = el?.closest("[data-header-theme]") as HTMLElement | null;
      setTheme((themed?.dataset.headerTheme as "light" | "dark") ?? "dark");
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkText = theme === "dark" || solid;

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500",
        solid ? "bg-brand-blue/90 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div
        className={cx(
          "container-edge flex items-center justify-between py-6 transition-colors duration-500",
          isDarkText ? "text-charcoal" : "text-ivory"
        )}
      >
        <TransitionLink href="/" className="text-eyebrow font-medium">
          {SITE.brand.shortName}
        </TransitionLink>

        <nav className="hidden items-center gap-9 md:flex">
          {SITE.nav.primary.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="text-eyebrow transition-opacity duration-300 hover:opacity-60"
            >
              {link.label}
            </TransitionLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <BookingTrigger className="border-b border-current pb-1">
            {SITE.nav.bookCta.label}
          </BookingTrigger>
        </div>

        <button
          type="button"
          className="text-eyebrow md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-6 bg-brand-blue px-6 pb-10 pt-4 text-charcoal md:hidden">
          {SITE.nav.primary.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-display-sm"
            >
              {link.label}
            </TransitionLink>
          ))}
          <BookingTrigger className="mt-4 bg-brand-blue py-4 text-center text-charcoal">
            {SITE.nav.bookCta.label}
          </BookingTrigger>
        </div>
      )}
    </header>
  );
}
