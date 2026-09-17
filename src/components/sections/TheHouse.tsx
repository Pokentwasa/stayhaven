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

/** 03 — The House. The architecture is the hero: plain headline, small stats, staggered editorial imagery — not an icon grid. */
export function TheHouse({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [imgA, imgB, imgC] = property.storyImages;

  const stats = [
    { label: "Bedrooms", value: property.bedrooms },
    { label: "Bathrooms", value: property.bathrooms },
    { label: "Guests", value: property.guests },
    { label: "Levels", value: 3 },
  ];

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-house-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="the-house"
      ref={rootRef}
      data-header-theme="dark"
      data-scene="3"
      className="section-pad-b container-edge bg-ivory text-charcoal"
    >
      <p className="text-eyebrow mb-12 flex items-center gap-3 text-charcoal/50">
        <span>03</span>
        <span className="h-px w-8 bg-current/50" />
        <span>The House</span>
      </p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col gap-6">
          <h2 className="text-display-lg">{property.houseHeading}</h2>
          <p className="text-eyebrow text-charcoal/55">{property.houseStatement}</p>

          <div className="mt-2 grid grid-cols-4 gap-4 border-y border-charcoal/15 py-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-display-sm">{stat.value}</span>
                <span className="text-stat text-charcoal/50">{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="text-body-lg text-charcoal/70">{property.houseDescription}</p>
          <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 text-sm uppercase tracking-widest text-charcoal/55 sm:grid-cols-2">
            {property.houseFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        {imgA && (
          <div data-house-reveal className="relative aspect-[3/4] w-full overflow-hidden">
            <PlaceholderMedia media={imgA} className="absolute inset-0" />
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {imgB && (
          <div data-house-reveal className="relative aspect-[4/3] overflow-hidden">
            <PlaceholderMedia media={imgB} className="absolute inset-0" />
          </div>
        )}
        {imgC && (
          <div data-house-reveal className="relative mt-0 aspect-[4/3] overflow-hidden md:mt-12">
            <PlaceholderMedia media={imgC} className="absolute inset-0" />
          </div>
        )}
      </div>
    </section>
  );
}
