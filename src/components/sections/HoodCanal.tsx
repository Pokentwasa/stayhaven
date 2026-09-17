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
 * getting around, parking and EV charging. Light background, matching the
 * rest of the site rather than a dark cinematic treatment.
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
          { scale: 1.1 },
          {
            scale: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 90%", end: "top 20%", scrub: true },
          }
        );
      }
      gsap.from("[data-hoodcanal-reveal]", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hood-canal" ref={rootRef} data-header-theme="dark" data-scene="9" className="bg-sand text-charcoal">
      <div className="container-edge section-pad-t pb-10">
        <p data-hoodcanal-reveal className="text-eyebrow flex items-center gap-3 text-charcoal/50">
          <span>09</span>
          <span className="h-px w-8 bg-current/50" />
          <span>Hood Canal</span>
        </p>
      </div>

      <div className="relative h-[55svh] w-full overflow-hidden">
        <div data-hoodcanal-media className="absolute inset-0">
          <PlaceholderMedia media={neighbourhood.heroImage} className="absolute inset-0" />
        </div>
      </div>

      <div className="section-pad container-edge grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div data-hoodcanal-reveal className="flex flex-col gap-6">
          <h2 className="text-display-lg">{neighbourhood.heading}</h2>
          <p className="text-body-lg text-charcoal/75">{neighbourhood.description}</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2 text-sm uppercase tracking-widest text-charcoal/55">
            {neighbourhood.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </div>
        <div
          data-hoodcanal-reveal
          className="flex flex-col gap-4 border-t border-charcoal/15 pt-8 md:border-l md:border-t-0 md:pl-16 md:pt-0"
        >
          <p className="text-stat text-charcoal/60">{neighbourhood.transitNote}</p>
          <p className="text-stat text-charcoal/60">{neighbourhood.parkingNote}</p>
          <p className="text-stat text-charcoal/60">{neighbourhood.evChargerNote}</p>
        </div>
      </div>
    </section>
  );
}
