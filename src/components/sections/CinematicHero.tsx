"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { SITE } from "@/data/site";
import { getPrimaryProperty } from "@/data/property";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * 01 — Hero. A clean architectural composition, not a cinematic takeover:
 * small "Stay Haven Collection presents" mark, the Salt+Haven wordmark,
 * location, a short plain tagline, the booking CTA and small property
 * stats. One subtle load-in reveal — no pinned scroll, no oversized
 * numeral, no scroll-jacking exit.
 */
export function CinematicHero() {
  const property = getPrimaryProperty();
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(media, { scale: 1.04 }, { scale: 1, duration: 2.4, ease: "power2.out" });
      gsap.from("[data-hero-reveal]", {
        opacity: 0,
        y: 14,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      data-header-theme="light"
      data-scene="1"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-warm-black text-ivory"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <PlaceholderMedia media={property.heroMedia} priority className="opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-warm-black/5 to-warm-black/25" />
      </div>

      <div className="container-edge relative z-10 pt-28">
        <div data-hero-reveal className="flex flex-col gap-1">
          <p className="text-eyebrow opacity-80">{SITE.brand.shortName}</p>
          <p className="text-accent-serif text-sm text-ivory/60">{SITE.brand.presentsLabel}</p>
        </div>
      </div>

      <div className="container-edge relative z-10 flex flex-col gap-8 pb-16 md:pb-20">
        <div data-hero-reveal className="flex flex-col gap-3">
          <h1 className="text-display-xl leading-none">{property.name}</h1>
          <p className="text-eyebrow opacity-70">
            {property.location.city}, {property.location.state}
          </p>
          <p className="text-body-lg max-w-md opacity-85">{property.heroTagline}</p>
        </div>

        <div
          data-hero-reveal
          className="flex flex-col items-start gap-6 border-t border-ivory/20 pt-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <BookingTrigger property={property} className="text-eyebrow border-b border-ivory pb-1">
            {SITE.hero.primaryCta}
          </BookingTrigger>
          <p className="text-stat opacity-60">
            {property.guests} Guests · {property.bedrooms} Bedrooms · {property.bathrooms} Bathrooms ·{" "}
            {property.squareFeet.toLocaleString()} Sq Ft
          </p>
        </div>
      </div>
    </section>
  );
}
