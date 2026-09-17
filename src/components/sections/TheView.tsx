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
 * 04 — The View. A full-bleed waterfront photograph, then a plain,
 * light-background text block — headline, statement, and the factual
 * no-direct-beach-access note kept visible, not buried or overlaid on a
 * darkened image.
 */
export function TheView({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [imgA, imgB, imgC] = property.viewImages;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-view-reveal]").forEach((el) => {
        const media = el.querySelector("[data-view-media]");
        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.1 },
            {
              scale: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: true },
            }
          );
        }
      });
      gsap.from("[data-view-text]", {
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
    <section id="the-view" ref={rootRef} data-header-theme="dark" data-scene="4" className="bg-ivory text-charcoal">
      <div className="container-edge section-pad-t pb-10">
        <p data-view-text className="text-eyebrow flex items-center gap-3 text-charcoal/50">
          <span>04</span>
          <span className="h-px w-8 bg-current/50" />
          <span>The View</span>
        </p>
      </div>

      {imgA && (
        <div data-view-reveal className="relative h-[60svh] w-full overflow-hidden md:h-[75svh]">
          <div data-view-media className="absolute inset-0">
            <PlaceholderMedia media={imgA} className="absolute inset-0" />
          </div>
        </div>
      )}

      <div className="section-pad container-edge grid grid-cols-1 gap-12 md:grid-cols-12">
        <h2 data-view-text className="text-display-lg md:col-span-7">
          {property.viewHeading}
        </h2>
        <div className="flex flex-col gap-6 md:col-span-5">
          <p data-view-text className="text-body-lg text-charcoal/80">
            {property.viewStatement}
          </p>
          <div data-view-text className="border-l-2 border-charcoal/20 pl-4">
            <p className="text-stat text-charcoal/60">{property.viewDescription}</p>
          </div>
        </div>
      </div>

      <div className="container-edge section-pad-b grid grid-cols-2 gap-4">
        {imgB && (
          <div data-view-reveal className="relative aspect-[4/3] overflow-hidden">
            <div data-view-media className="absolute inset-0">
              <PlaceholderMedia media={imgB} className="absolute inset-0" />
            </div>
          </div>
        )}
        {imgC && (
          <div data-view-reveal className="relative aspect-[4/3] overflow-hidden sm:mt-10">
            <div data-view-media className="absolute inset-0">
              <PlaceholderMedia media={imgC} className="absolute inset-0" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
