"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBooking } from "@/components/booking/BookingContext";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { getPrimaryProperty } from "@/data/property";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene 10 — Booking Finale. One exceptional photograph, "Stay here.",
 * the booking form (no destination selector — there is one property),
 * then house rules / cancellation / check-in / contact kept close by, not
 * buried on another page.
 */
export function BookingCTA() {
  const property = getPrimaryProperty();
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
      gsap.from("[data-kbys-reveal]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-kbys-root]", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    open(property);
  }

  return (
    <>
      <section
        id="book"
        ref={rootRef}
        data-header-theme="light"
        data-scene="10"
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-warm-black text-ivory"
      >
        <div data-finale-bg className="absolute inset-0 opacity-30">
          <PlaceholderMedia media={property.heroMedia} className="absolute inset-0" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-warm-black/70 via-warm-black/80 to-warm-black" />

        <div className="section-pad container-edge relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-14 text-center">
          <div data-finale className="flex flex-col items-center gap-6">
            <p className="text-eyebrow opacity-60">
              001 {property.name} · {property.location.city}, {property.location.state}
            </p>
            <h2 className="text-display-xl">Stay here.</h2>
            {property.booking.priceFrom && (
              <p className="text-eyebrow opacity-70">
                From {property.booking.currency} {property.booking.priceFrom} / night
              </p>
            )}
          </div>

          <form
            id="booking-cta-form"
            onSubmit={handleSubmit}
            data-finale
            className="grid w-full grid-cols-1 divide-y divide-ivory/15 border-t border-ivory/20 text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            <label className="group relative flex flex-col gap-4 px-0 py-7 sm:px-8 sm:first:pl-0">
              <span className="font-serif text-lg text-ivory/40 transition-colors duration-300 group-focus-within:text-ivory/70">
                Arrive
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
                Leave
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
            className="w-full max-w-sm bg-ivory py-5 text-eyebrow text-warm-black transition-opacity duration-300 hover:opacity-90"
          >
            Check Availability →
          </button>
        </div>
      </section>

      <div data-kbys-root className="section-pad container-edge bg-ivory text-charcoal">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          <div data-kbys-reveal>
            <h3 className="text-eyebrow mb-6 text-charcoal/50">House Rules · Check-in</h3>
            <div className="flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
              {property.houseRules.map((rule) => (
                <details key={rule.id} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                    <span className="text-body-lg">{rule.title}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-charcoal/50 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-md text-charcoal/70">{rule.description}</p>
                </details>
              ))}
            </div>
          </div>

          <div data-kbys-reveal>
            <h3 className="text-eyebrow mb-6 text-charcoal/50">Cancellation Policy</h3>
            <div className="flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
              {property.cancellationPolicy.map((tier) => (
                <div key={tier.id} className="flex flex-col gap-1 py-5">
                  <p className="text-body-lg">{tier.window}</p>
                  <p className="text-charcoal/70">{tier.refund}</p>
                </div>
              ))}
            </div>
            <p className="text-eyebrow mt-10 text-charcoal/50">Contact</p>
            <p className="text-body-lg mt-3 text-charcoal/70">
              Questions before you book? Reach the Stay Haven Collection team via the contact page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
