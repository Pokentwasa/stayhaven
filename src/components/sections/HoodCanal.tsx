"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { Property } from "@/data/types";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 09 — Hood Canal. The wider setting: generic activity categories only (no
 * invented restaurants or attractions), plus the practical notes about
 * getting around, parking and EV charging.
 */
export function HoodCanal({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { neighbourhood } = property;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const media = root.querySelector("[data-hoodcanal-media]");
      if (media) {
        gsap.fromTo(
          media,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 90%", end: "top 20%", scrub: true },
          }
        );
      }
      gsap.from("[data-hoodcanal-reveal]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hood-canal"
      ref={rootRef}
      data-header-theme="light"
      data-scene="10"
      className="relative overflow-hidden bg-warm-black text-ivory"
    >
      <div className="relative h-[70svh] w-full overflow-hidden">
        <div data-hoodcanal-media className="absolute inset-0">
          <PlaceholderMedia media={neighbourhood.heroImage} className="absolute inset-0" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/10 to-warm-black/40" />
        <div className="container-edge relative z-10 flex h-full flex-col justify-end pb-16">
          <p data-hoodcanal-reveal className="text-eyebrow flex items-center gap-3 opacity-70">
            <span>09</span>
            <span className="h-px w-8 bg-current/50" />
            <span>Hood Canal</span>
          </p>
          <h2 data-hoodcanal-reveal className="text-display-lg mt-6 max-w-3xl">
            {neighbourhood.heading}
          </h2>
        </div>
      </div>

      <div className="section-pad container-edge grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div data-hoodcanal-reveal className="flex flex-col gap-6">
          <p className="text-body-lg opacity-80">{neighbourhood.description}</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2 text-sm uppercase tracking-widest opacity-60">
            {neighbourhood.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </div>
        <div data-hoodcanal-reveal className="flex flex-col gap-6 border-t border-ivory/15 pt-8 md:border-t-0 md:border-l md:pl-16 md:pt-0">
          <p className="text-body-lg opacity-70">{neighbourhood.transitNote}</p>
          <p className="text-body-lg opacity-70">{neighbourhood.parkingNote}</p>
          <p className="text-body-lg opacity-70">{neighbourhood.evChargerNote}</p>
        </div>
      </div>
    </section>
  );
}
