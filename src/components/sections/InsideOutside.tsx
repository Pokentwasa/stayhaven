"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ScaleToFullscreen } from "@/components/motion/ScaleToFullscreen";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { imageAt, toMedia } from "@/data/images";
import type { Property } from "@/data/types";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene 04 — Inside → Outside. The signature chapter: a full-viewport
 * photograph hands off into "Inside", warm interior imagery plays out,
 * then a second full-viewport hand-off carries the same continuous scroll
 * out into "Outside". Two scenes, one uninterrupted transition.
 */
export function InsideOutside({ property }: { property: Property }) {
  const insideRef = useRef<HTMLDivElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  const insideEntrance = toMedia(imageAt("greatRoom", 0));
  const outsideEntrance = toMedia(imageAt("hotTub", 1));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      [insideRef.current, outsideRef.current].forEach((root) => {
        if (!root) return;
        gsap.utils.toArray<HTMLElement>("[data-io-reveal]", root).forEach((el, i) => {
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
        gsap.from(root.querySelectorAll("[data-io-text]"), {
          opacity: 0,
          y: 14,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: root, start: "top 78%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const [hotTub, firePit, outdoorDining, deckPatio] = property.outdoorFeatures;

  return (
    <>
      <ScaleToFullscreen media={insideEntrance} fromWidth="46vw" fromAspect="aspect-[4/3]" distance="110%">
        <p className="text-eyebrow text-ivory/80">04 — Inside</p>
      </ScaleToFullscreen>

      <div ref={insideRef} id="inside" data-header-theme="dark" data-scene="3" className="section-pad bg-ivory text-charcoal">
        <div className="container-edge mb-16">
          <SplitTextReveal as="h2" text={property.stayHeading} className="text-display-lg max-w-2xl" trigger="scroll" />
          <p data-io-text className="text-body-lg mt-6 max-w-xl text-charcoal/70">
            {property.stayStatement}
          </p>
        </div>

        <div className="container-edge flex flex-col gap-16 md:gap-24">
          {property.interiorHighlights.map((highlight, i) => (
            <div key={highlight.id} className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
              <div
                data-io-reveal
                className={`relative aspect-[4/3] overflow-hidden md:col-span-8 ${i % 2 === 1 ? "md:order-2" : ""}`}
              >
                <ImageReveal media={highlight.image} />
              </div>
              <div data-io-text className={`flex flex-col gap-3 md:col-span-4 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <p className="text-eyebrow text-charcoal/45">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-display-sm">{highlight.title}</h3>
                <p className="text-body-lg text-charcoal/70">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ScaleToFullscreen media={outsideEntrance} fromWidth="38vw" fromAspect="aspect-[3/4]" distance="110%">
        <p className="text-eyebrow text-ivory/80">04 — Outside</p>
      </ScaleToFullscreen>

      <div ref={outsideRef} id="outside" data-header-theme="dark" data-scene="4" className="section-pad bg-ivory text-charcoal">
        <div className="container-edge mb-12">
          <SplitTextReveal as="h2" text={property.outdoorHeading} className="text-display-lg max-w-2xl" trigger="scroll" />
          <p data-io-text className="text-body-lg mt-6 max-w-xl text-charcoal/70">
            {property.outdoorStatement}
          </p>
        </div>

        <div className="container-edge grid grid-cols-1 gap-4 sm:grid-cols-3">
          {hotTub && (
            <div data-io-reveal className="relative aspect-[4/3] overflow-hidden sm:col-span-2 sm:row-span-2 sm:aspect-auto">
              <ImageReveal media={hotTub.image} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
              <p className="pointer-events-none absolute bottom-5 left-5 text-eyebrow text-ivory">{hotTub.title}</p>
            </div>
          )}
          {firePit && (
            <div data-io-reveal className="relative aspect-square overflow-hidden">
              <ImageReveal media={firePit.image} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
              <p className="pointer-events-none absolute bottom-4 left-4 text-eyebrow text-ivory">{firePit.title}</p>
            </div>
          )}
          {outdoorDining && (
            <div data-io-reveal className="relative aspect-square overflow-hidden">
              <ImageReveal media={outdoorDining.image} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
              <p className="pointer-events-none absolute bottom-4 left-4 text-eyebrow text-ivory">{outdoorDining.title}</p>
            </div>
          )}
          {deckPatio && (
            <div data-io-reveal className="relative aspect-[21/9] overflow-hidden sm:col-span-3">
              <ImageReveal media={deckPatio.image} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-transparent" />
              <p className="pointer-events-none absolute bottom-5 left-5 text-eyebrow text-ivory">{deckPatio.title}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
