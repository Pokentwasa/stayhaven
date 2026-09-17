"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { PROPERTIES } from "@/data/properties";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** 01 — The Collection. Desktop pins the section and scrubs a horizontal chapter rail; mobile falls back to native swipe/snap. */
export function PropertyShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", track);
      const distance = () => track.scrollWidth - section.clientWidth;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          gsap.set(track, { x: -distance() * self.progress });
          setActive(Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1))));
        },
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      data-header-theme="light"
      className="relative overflow-hidden bg-warm-black text-ivory"
    >
      <div
        ref={trackRef}
        className="no-scrollbar flex h-[100svh] w-full snap-x snap-mandatory flex-row overflow-x-auto md:h-[100svh] md:overflow-visible"
      >
        {PROPERTIES.map((property, i) => (
          <article
            key={property.id}
            data-panel
            className="relative flex h-full w-full shrink-0 snap-start flex-col justify-end"
          >
            <PlaceholderMedia media={property.heroMedia} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/10 to-warm-black/40" />

            <div className="container-edge relative z-10 flex flex-col gap-6 pb-20 md:pb-28">
              <p className="text-eyebrow opacity-70">
                {String(i + 1).padStart(2, "0")} / {String(PROPERTIES.length).padStart(2, "0")} —
                The Collection
              </p>
              <h2 className="text-display-lg max-w-3xl">{property.name}</h2>
              <p className="text-eyebrow opacity-70">{property.locationLabel}</p>
              <p className="text-body-lg max-w-xl opacity-85">{property.positioningStatement}</p>
              <p className="text-sm uppercase tracking-widest opacity-60">
                {property.metadata.guestsFrom}–{property.metadata.guestsTo} guests ·{" "}
                {property.metadata.bedroomsFrom}–{property.metadata.bedroomsTo} bedrooms
              </p>

              <div className="mt-2 flex items-center gap-10">
                <LuxuryButton href={`/stays/${property.slug}`} variant="primary">
                  Explore Property
                </LuxuryButton>
                <BookingTrigger property={property}>Book Stay</BookingTrigger>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 gap-3 md:flex">
        {PROPERTIES.map((_, i) => (
          <span
            key={i}
            className={`h-1 w-8 rounded-full transition-colors duration-500 ${
              i === active ? "bg-ivory" : "bg-ivory/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
