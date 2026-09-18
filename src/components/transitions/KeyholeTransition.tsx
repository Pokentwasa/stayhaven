"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { prefersReducedMotion, Z } from "@/lib/motion";
import type { Media } from "@/data/types";

/**
 * Brand Manifesto -> The Experience. Entering the home: a single circular
 * peephole into the interior grows until it overruns the frame, the way a
 * door opens from one sightline into the full room. `peek` is the image
 * the next section opens on, so the reveal reads as continuous rather than
 * a preview of something unrelated.
 *
 * A plain CSS `clip-path: circle()` rather than an SVG keyhole silhouette:
 * SVG's objectBoundingBox clip units don't compose reliably with a nested
 * transform across browsers, where a native circle() is both simpler and
 * fully supported.
 */
export function KeyholeTransition({ peek }: { peek: Media }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const hole = holeRef.current;
    if (!root || !hole) return;

    if (prefersReducedMotion()) {
      gsap.set(hole, { clipPath: "circle(150% at 50% 42%)" });
      return;
    }

    gsap.set(hole, { clipPath: "circle(1.5% at 50% 42%)" });
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tween = gsap.to(hole, {
        clipPath: "circle(85% at 50% 42%)",
        ease: "power2.in",
        scrollTrigger: { trigger: root, start: "top top", end: "+=60%", scrub: 0.8, pin: true },
      });
      return () => tween.scrollTrigger?.kill();
    });

    mm.add("(max-width: 767px)", () => {
      const tween = gsap.to(hole, {
        clipPath: "circle(120% at 50% 42%)",
        ease: "power2.in",
        scrollTrigger: { trigger: root, start: "top 75%", end: "bottom top", scrub: 0.6 },
      });
      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-transition
      className="relative h-[22vh] w-full overflow-hidden bg-warm-black md:h-[60vh]"
      style={{ zIndex: Z.transition }}
    >
      <div ref={holeRef} className="absolute inset-0">
        <PlaceholderMedia media={peek} className="absolute inset-0" />
        <div className="absolute inset-0 bg-warm-black/20" />
      </div>
    </div>
  );
}
