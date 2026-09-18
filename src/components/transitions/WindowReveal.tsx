"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { prefersReducedMotion, Z } from "@/lib/motion";
import type { Media } from "@/data/types";

/**
 * Featured Haven -> Hood Canal. Interior to water: a single picture window
 * (the A-frame's real windows are floor-to-ceiling glass, not a mullioned
 * grid) grows from a framed rectangle until the canal beyond fills the
 * whole scene. `view` is the image the next section opens on.
 */
export function WindowReveal({ view }: { view: Media }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const mullionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pane = paneRef.current;
    const mullions = mullionsRef.current;
    if (!root || !pane || !mullions) return;

    if (prefersReducedMotion()) {
      gsap.set(pane, { clipPath: "inset(-10% -10% -10% -10%)" });
      gsap.set(mullions, { opacity: 0 });
      return;
    }

    gsap.set(pane, { clipPath: "inset(40% 36% 40% 36% round 6px)" });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "+=60%", scrub: 0.8, pin: true },
      });
      tl.to(pane, { clipPath: "inset(-10% -10% -10% -10% round 0px)", ease: "power2.in" }, 0).to(
        mullions,
        { opacity: 0, ease: "power1.in", duration: 0.4 },
        0.15
      );
      return () => tl.scrollTrigger?.kill();
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%", end: "bottom top", scrub: 0.6 },
      });
      tl.to(pane, { clipPath: "inset(-10% -10% -10% -10% round 0px)", ease: "power2.in" }, 0).to(
        mullions,
        { opacity: 0, ease: "power1.in", duration: 0.4 },
        0.15
      );
      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-transition
      className="relative h-[22vh] w-full overflow-hidden bg-ivory md:h-[60vh]"
      style={{ zIndex: Z.transition }}
    >
      <div ref={paneRef} className="absolute inset-0">
        <PlaceholderMedia media={view} className="absolute inset-0" />
      </div>
      <div ref={mullionsRef} className="pointer-events-none absolute inset-[38%] border border-ivory/70">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ivory/70" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ivory/70" />
      </div>
    </div>
  );
}
