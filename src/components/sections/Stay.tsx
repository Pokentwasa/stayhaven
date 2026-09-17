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
 * 04 — Stay. The main interior experience: vaulted ceilings, the great room,
 * kitchen and dining, the lounge, comfort details. Four warm, intimate
 * frames rather than an amenity-icon grid.
 */
export function Stay({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-stay-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "power3.out",
            delay: (i % 2) * 0.1,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stay" ref={rootRef} data-header-theme="light" data-scene="5" className="bg-warm-black text-ivory">
      <div className="container-edge section-pad-t pb-10 md:pb-14">
        <p className="text-eyebrow flex items-center gap-3 text-ivory/50">
          <span>04</span>
          <span className="h-px w-8 bg-current/50" />
          <span>Stay</span>
        </p>
        <h2 className="text-display-lg mt-6 max-w-2xl">{property.stayHeading}</h2>
        <p className="text-body-lg mt-6 max-w-xl text-ivory/70">{property.stayStatement}</p>
      </div>

      <div className="container-edge section-pad-b grid grid-cols-1 gap-1 md:grid-cols-2">
        {property.interiorHighlights.map((highlight) => (
          <div key={highlight.id} data-stay-card className="group relative aspect-[4/3] overflow-hidden">
            <PlaceholderMedia
              media={highlight.image}
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-warm-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <h3 className="text-display-sm">{highlight.title}</h3>
              <p className="mt-2 max-w-sm text-ivory/75">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
