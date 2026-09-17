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
 * 06 — Outside. A fixed, deliberate composition (large hot tub, a small
 * fire pit detail, a wide deck shot) rather than a pinned scroll-driven
 * slideshow — simple reveal-on-scroll only.
 */
export function Outside({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [hotTub, firePit, outdoorDining, deckPatio] = property.outdoorFeatures;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-outside-reveal]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            ease: "power3.out",
            delay: (i % 2) * 0.08,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
      gsap.from("[data-outside-text]", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="outside" ref={rootRef} data-header-theme="dark" data-scene="6" className="section-pad bg-ivory text-charcoal">
      <div className="container-edge mb-12">
        <p data-outside-text className="text-eyebrow mb-6 flex items-center gap-3 text-charcoal/50">
          <span>06</span>
          <span className="h-px w-8 bg-current/50" />
          <span>Outside</span>
        </p>
        <h2 data-outside-text className="text-display-lg max-w-2xl">
          {property.outdoorHeading}
        </h2>
        <p data-outside-text className="text-body-lg mt-6 max-w-xl text-charcoal/70">
          {property.outdoorStatement}
        </p>
      </div>

      <div className="container-edge grid grid-cols-1 gap-4 sm:grid-cols-3">
        {hotTub && (
          <div data-outside-reveal className="relative aspect-[4/3] overflow-hidden sm:col-span-2 sm:row-span-2 sm:aspect-auto">
            <PlaceholderMedia media={hotTub.image} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-eyebrow text-ivory">{hotTub.title}</p>
          </div>
        )}
        {firePit && (
          <div data-outside-reveal className="relative aspect-square overflow-hidden">
            <PlaceholderMedia media={firePit.image} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-eyebrow text-ivory">{firePit.title}</p>
          </div>
        )}
        {outdoorDining && (
          <div data-outside-reveal className="relative aspect-square overflow-hidden">
            <PlaceholderMedia media={outdoorDining.image} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-eyebrow text-ivory">{outdoorDining.title}</p>
          </div>
        )}
        {deckPatio && (
          <div data-outside-reveal className="relative aspect-[21/9] overflow-hidden sm:col-span-3">
            <PlaceholderMedia media={deckPatio.image} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-eyebrow text-ivory">{deckPatio.title}</p>
          </div>
        )}
      </div>
    </section>
  );
}
