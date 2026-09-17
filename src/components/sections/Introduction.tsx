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

/** 01 — Introduction. Large imagery, generous negative space, one editorial statement. */
export function Introduction({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-intro-reveal]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="introduction"
      ref={rootRef}
      data-header-theme="dark"
      data-scene="2"
      className="section-pad bg-ivory text-charcoal"
    >
      <div className="container-edge grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col gap-8 md:col-span-5">
          <p data-intro-reveal className="text-eyebrow flex items-center gap-3 text-charcoal/50">
            <span>02</span>
            <span className="h-px w-8 bg-current/50" />
            <span>Introduction</span>
          </p>
          <h2 data-intro-reveal className="text-display-lg">
            {property.introHeading}
          </h2>
          <p data-intro-reveal className="text-body-lg max-w-md text-charcoal/70">
            {property.introStatement}
          </p>
        </div>

        <div data-intro-reveal className="relative aspect-[4/5] w-full overflow-hidden md:col-span-7">
          <PlaceholderMedia media={property.storyImages[0] ?? property.heroMedia} className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
}
