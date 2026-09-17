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
 * 07 — Sleeping. Four sleeping areas within one home — never presented as
 * separate bookable room products, so no pricing or per-room booking CTA
 * here, just level, beds and a few defining features.
 */
export function Sleeping({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-sleeping-card]", {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sleeping" ref={rootRef} data-header-theme="dark" data-scene="7" className="section-pad bg-sand text-charcoal">
      <div className="container-edge mb-12">
        <p className="text-eyebrow mb-6 flex items-center gap-3 text-charcoal/50">
          <span>07</span>
          <span className="h-px w-8 bg-current/50" />
          <span>Sleep</span>
        </p>
        <h2 className="text-display-lg">{property.sleepingHeading}</h2>
        <p className="text-body-lg mt-6 max-w-xl text-charcoal/70">{property.sleepingStatement}</p>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-4 md:px-12">
        {property.sleepingAreas.map((area) => (
          <article
            key={area.id}
            data-sleeping-card
            className="flex w-[85vw] shrink-0 snap-start flex-col gap-6 md:w-[45vw] lg:w-[32vw]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <PlaceholderMedia media={area.image} className="absolute inset-0" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-eyebrow text-charcoal/50">{area.level}</p>
              <h3 className="text-display-sm">{area.name}</h3>
              <p className="text-charcoal/70">{area.description}</p>
              <p className="text-sm uppercase tracking-widest text-charcoal/55">{area.beds}</p>
              {area.features.length > 0 && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal/60">
                  {area.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
