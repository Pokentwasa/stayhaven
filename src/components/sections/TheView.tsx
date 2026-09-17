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
 * 03 — The View. The major cinematic section: Hood Canal is Salt+Haven's
 * strongest selling point, so it gets a full-bleed image, an oversized pale
 * heading peeking behind it, and an asymmetric editorial pair beneath.
 * Copy is careful never to imply direct beach access — a road sits between
 * the property and the waterline.
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
            { scale: 1.15 },
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
      id="the-view"
      ref={rootRef}
      data-header-theme="light"
      data-scene="4"
      className="relative overflow-hidden bg-warm-black text-ivory"
    >
      {imgA && (
        <div data-view-reveal className="relative h-[85svh] w-full overflow-hidden">
          <div data-view-media className="absolute inset-0">
            <PlaceholderMedia media={imgA} className="absolute inset-0" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/10 to-warm-black/40" />
          <div className="container-edge relative z-10 flex h-full flex-col justify-end pb-20">
            <p data-view-text className="text-eyebrow flex items-center gap-3 opacity-70">
              <span>03</span>
              <span className="h-px w-8 bg-current/50" />
              <span>The View</span>
            </p>
            <h2 data-view-text className="text-display-xl mt-6 max-w-4xl">
              {property.viewHeading}
            </h2>
          </div>
        </div>
      )}

      <div className="section-pad container-edge grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div data-view-text className="flex flex-col gap-6">
          <p className="text-body-lg opacity-85">{property.viewStatement}</p>
          <p className="text-body-lg opacity-70">{property.viewDescription}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {imgB && (
            <div data-view-reveal className="relative col-span-2 aspect-[16/9] overflow-hidden sm:col-span-1">
              <div data-view-media className="absolute inset-0">
                <PlaceholderMedia media={imgB} className="absolute inset-0" />
              </div>
            </div>
          )}
          {imgC && (
            <div data-view-reveal className="relative col-span-2 aspect-[16/9] overflow-hidden sm:col-span-1 sm:mt-10">
              <div data-view-media className="absolute inset-0">
                <PlaceholderMedia media={imgC} className="absolute inset-0" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
