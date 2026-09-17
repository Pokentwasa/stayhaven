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
 * 05 — Inside. Alternating large image blocks with short plain captions —
 * no hover-reveal cards, just the room and a line of text beside it.
 */
export function Stay({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-inside-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
      gsap.from("[data-inside-text]", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="inside" ref={rootRef} data-header-theme="dark" data-scene="5" className="section-pad bg-ivory text-charcoal">
      <div className="container-edge mb-16">
        <p data-inside-text className="text-eyebrow mb-6 flex items-center gap-3 text-charcoal/50">
          <span>05</span>
          <span className="h-px w-8 bg-current/50" />
          <span>Inside</span>
        </p>
        <h2 data-inside-text className="text-display-lg max-w-2xl">
          {property.stayHeading}
        </h2>
        <p data-inside-text className="text-body-lg mt-6 max-w-xl text-charcoal/70">
          {property.stayStatement}
        </p>
      </div>

      <div className="container-edge flex flex-col gap-16 md:gap-24">
        {property.interiorHighlights.map((highlight, i) => (
          <div key={highlight.id} className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
            <div
              data-inside-reveal
              className={`relative aspect-[4/3] overflow-hidden md:col-span-8 ${i % 2 === 1 ? "md:order-2" : ""}`}
            >
              <PlaceholderMedia media={highlight.image} className="absolute inset-0" />
            </div>
            <div data-inside-text className={`flex flex-col gap-3 md:col-span-4 ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <p className="text-eyebrow text-charcoal/45">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-display-sm">{highlight.title}</h3>
              <p className="text-body-lg text-charcoal/70">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
