"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { prefersReducedMotion, Z } from "@/lib/motion";
import type { Media } from "@/data/types";

/**
 * The Experience -> Featured Haven. Moving through a space: two panels
 * swing open on a 3D hinge to reveal what's on the other side, instead of
 * a cut. `reveal` is the image the next section opens on.
 */
export function DoorTransition({ reveal }: { reveal: Media }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!root || !left || !right) return;

    if (prefersReducedMotion()) {
      gsap.set([left, right], { opacity: 0 });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "+=60%", scrub: 0.8, pin: true },
      });
      tl.to(left, { rotateY: -112, ease: "power2.inOut" }, 0).to(right, { rotateY: 112, ease: "power2.inOut" }, 0);
      return () => tl.scrollTrigger?.kill();
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%", end: "bottom top", scrub: 0.6 },
      });
      tl.to(left, { rotateY: -100, ease: "power2.inOut" }, 0).to(right, { rotateY: 100, ease: "power2.inOut" }, 0);
      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-transition
      className="relative h-[22vh] w-full overflow-hidden bg-warm-black md:h-[60vh]"
      style={{ zIndex: Z.transition, perspective: "1800px" }}
    >
      <div className="absolute inset-0">
        <PlaceholderMedia media={reveal} className="absolute inset-0" />
        <div className="absolute inset-0 bg-warm-black/25" />
      </div>

      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-warm-black to-charcoal shadow-2xl"
        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
      />
      <div
        ref={rightRef}
        className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-warm-black to-charcoal shadow-2xl"
        style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
      />
    </div>
  );
}
