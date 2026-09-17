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

/** 02 — The House. Architecture and interior facts, staggered editorial imagery — not an icon grid. */
export function TheHouse({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [imgA, imgB, imgC] = property.storyImages;

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
        <span>02</span>
        <span className="h-px w-8 bg-current/50" />
        <span>The House</span>
      </p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col gap-6">
          <h2 className="text-display-sm">{property.houseHeading}</h2>
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
