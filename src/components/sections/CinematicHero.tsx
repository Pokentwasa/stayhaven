"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { SITE } from "@/data/site";
import { getFeaturedProperty } from "@/data/properties";
import { buildBookingUrl, getBookingEngineMode, isBookingEngineConfigured } from "@/lib/booking";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function HeroAvailabilityWidget() {
  const property = getFeaturedProperty();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const configured = isBookingEngineConfigured(property);
  const mode = getBookingEngineMode();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = buildBookingUrl({ propertySlug: property.slug, checkIn, checkOut, guests }, property);
    if (!url) return;
    if (mode === "redirect") window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      data-hero-widget
      onSubmit={handleSubmit}
      className="hidden w-full max-w-xs flex-col gap-5 bg-ivory/95 p-7 text-charcoal shadow-2xl backdrop-blur-sm md:flex"
    >
      <p className="text-eyebrow text-charcoal/55">Check Availability</p>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.65rem] uppercase tracking-widest text-charcoal/50">Check-in</span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.65rem] uppercase tracking-widest text-charcoal/50">Check-out</span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[0.65rem] uppercase tracking-widest text-charcoal/50">Guests</span>
        <input
          type="number"
          min={1}
          max={property.metadata.guestsTo}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={!configured}
        className="mt-1 w-full bg-charcoal py-3.5 text-eyebrow text-ivory transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Check Availability
      </button>
    </form>
  );
}

export function CinematicHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(media, { scale: 1.15 }, { scale: 1, duration: 2.2 })
        .from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.9 }, 0.4)
        .from("[data-hero-line]", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12 }, 0.55)
        .from("[data-hero-sub]", { opacity: 0, y: 12, duration: 0.8 }, 1.1)
        .from("[data-hero-cta]", { opacity: 0, y: 12, duration: 0.8 }, 1.25)
        .from("[data-hero-widget]", { opacity: 0, x: 24, duration: 0.9 }, 1.3)
        .from("[data-hero-cue]", { opacity: 0, duration: 1 }, 1.5);

      gsap.to(media, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const headlineWords = SITE.hero.headline.split(" ");

  return (
    <section
      ref={rootRef}
      data-header-theme="light"
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-warm-black text-ivory"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <PlaceholderMedia media={SITE.hero.media} />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-black/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-warm-black/5 to-transparent" />
      </div>

      <div className="container-edge relative z-10 flex w-full items-end justify-between gap-12 pb-20 md:pb-28">
        <div className="flex max-w-2xl flex-col gap-6">
          <p data-hero-eyebrow className="text-eyebrow opacity-80">
            {SITE.hero.eyebrow}
          </p>
          <h1 className="text-display-lg">
            {headlineWords.map((word, i) => (
              <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
                <span data-hero-line className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p data-hero-sub className="text-body-lg max-w-md opacity-80">
            {SITE.hero.supporting}
          </p>

          <div data-hero-cta>
            <BookingTrigger className="mt-4 inline-block border-b border-ivory pb-1">
              Discover the Collection
            </BookingTrigger>
          </div>
        </div>

        <HeroAvailabilityWidget />
      </div>

      <TransitionLink
        href="#collection"
        data-hero-cue
        className="absolute bottom-10 right-6 z-10 flex flex-col items-center gap-3 md:left-1/2 md:right-auto md:-translate-x-1/2"
        aria-label={SITE.hero.scrollCue}
      >
        <span className="text-eyebrow rotate-90 whitespace-nowrap opacity-70">
          {SITE.hero.scrollCue}
        </span>
        <span className="h-14 w-px animate-pulse bg-ivory/50 motion-reduce:animate-none" />
      </TransitionLink>
    </section>
  );
}
