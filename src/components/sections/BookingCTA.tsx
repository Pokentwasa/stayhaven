"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBooking } from "@/components/booking/BookingContext";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/data/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 08 — Booking finale. Near full-screen, photography behind the type, the
 * form read as elegant columns divided by thin rules rather than a generic
 * widget. The background gradients into the footer's tone so the two feel
 * like one continuous close, rather than a hard section cut.
 */
export function BookingCTA({ property }: { property: Property }) {
  const { open } = useBooking();
  const rootRef = useRef<HTMLDivElement>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-finale]", {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
      gsap.to("[data-finale-bg]", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    open(property);
  }

  return (
    <section
      id="book"
      ref={rootRef}
      data-header-theme="light"
      data-scene="9"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-warm-black text-ivory"
    >
      <div data-finale-bg className="absolute inset-0 opacity-30">
        <PlaceholderMedia media={property.heroMedia} className="absolute inset-0" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-warm-black/70 via-warm-black/80 to-warm-black" />

      <div className="section-pad container-edge relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-14 text-center">
        <h2 data-finale className="text-display-xl">
          Your stay awaits.
        </h2>

        <form
          id="booking-cta-form"
          onSubmit={handleSubmit}
          data-finale
          className="grid w-full grid-cols-1 divide-y divide-ivory/15 border-t border-ivory/20 text-left sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
        >
          <div className="group relative flex flex-col gap-4 px-0 py-7 sm:px-8 sm:first:pl-0">
            <span className="font-serif text-lg text-ivory/40">Property</span>
            <p className="text-body-lg border-b border-transparent pb-2">
              {property.name} / {property.location.city}, {property.location.state === "Washington" ? "WA" : property.location.state}
            </p>
          </div>

          <label className="group relative flex flex-col gap-4 px-0 py-7 sm:px-8">
            <span className="font-serif text-lg text-ivory/40 transition-colors duration-300 group-focus-within:text-ivory/70">
              Check-in
            </span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="field-control field-control-invert border-b border-ivory/20 pb-2 text-body-lg outline-none transition-colors duration-300 group-focus-within:border-ivory/70"
            />
          </label>

          <label className="group relative flex flex-col gap-4 px-0 py-7 sm:px-8">
            <span className="font-serif text-lg text-ivory/40 transition-colors duration-300 group-focus-within:text-ivory/70">
              Check-out
            </span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="field-control field-control-invert border-b border-ivory/20 pb-2 text-body-lg outline-none transition-colors duration-300 group-focus-within:border-ivory/70"
            />
          </label>

          <label className="group relative flex flex-col gap-4 px-0 py-7 sm:px-8 sm:last:pr-0">
            <span className="font-serif text-lg text-ivory/40 transition-colors duration-300 group-focus-within:text-ivory/70">
              Guests
            </span>
            <input
              type="number"
              min={1}
              max={property.guests}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="field-control border-b border-ivory/20 pb-2 text-body-lg outline-none transition-colors duration-300 group-focus-within:border-ivory/70"
            />
          </label>
        </form>

        <button
          type="submit"
          form="booking-cta-form"
          data-finale
          data-cursor="BOOK"
          className="w-full max-w-sm bg-ivory py-5 text-eyebrow text-warm-black transition-opacity duration-300 hover:opacity-90"
        >
          Check Availability
        </button>
      </div>
    </section>
  );
}
