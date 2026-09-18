"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { SITE } from "@/data/site";
import { getPrimaryProperty } from "@/data/property";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scenes 01 + 02 combined: the brand establishes itself, then the "001"
 * property record — Salt+Haven's name, location and a handful of facts
 * placed like a considered grid rather than a stats bar. One photograph,
 * one subtle load-in; no pinned exit, no scroll-jack.
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
      gsap.fromTo(media, { scale: 1.05 }, { scale: 1, duration: 2.6, ease: "power2.out" });
      gsap.from("[data-hero-reveal]", {
        opacity: 0,
        y: 14,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.15,
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
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/75 via-warm-black/10 to-warm-black/35" />
      </div>

      <div className="container-edge relative z-10 flex items-start justify-between pt-28">
        <div data-hero-reveal className="flex flex-col gap-1">
          <p className="text-eyebrow opacity-80">{SITE.brand.name}</p>
          <p className="text-accent-serif text-sm text-ivory/60">A collection of considered stays.</p>
        </div>
        <p data-hero-reveal className="text-stat opacity-50">
          001
        </p>
      </div>

      <div className="container-edge relative z-10 grid grid-cols-1 gap-10 pb-16 md:grid-cols-12 md:items-end md:gap-6 md:pb-20">
        <div className="md:col-span-8">
          <SplitTextReveal
            as="h1"
            text={property.name}
            className="text-display-xl leading-none"
            stagger={0.08}
            delay={0.5}
          />
          <p data-hero-reveal className="text-eyebrow mt-4 opacity-70">
            {property.location.region} · {property.location.city}, {property.location.state}
          </p>
        </div>

        <div data-hero-reveal className="flex flex-col gap-6 md:col-span-4 md:items-end md:text-right">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-left md:text-right">
            <p className="text-stat opacity-60">{property.squareFeet.toLocaleString()} SQ FT</p>
            <p className="text-stat opacity-60">{String(property.guests).padStart(2, "0")} Guests</p>
            <p className="text-stat opacity-60">{String(property.bedrooms).padStart(2, "0")} Bedrooms</p>
            <p className="text-stat opacity-60">{String(property.bathrooms).padStart(2, "0")} Bathrooms</p>
          </div>
          <BookingTrigger property={property} className="text-eyebrow border-b border-ivory pb-1">
            {SITE.hero.primaryCta}
          </BookingTrigger>
        </div>
      </div>
    </section>
  );
}
