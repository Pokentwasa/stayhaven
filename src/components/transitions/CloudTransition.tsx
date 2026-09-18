"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, Z } from "@/lib/motion";

const PLUMES = [
  { left: "8%", top: "10%", size: "38vw", delay: 0 },
  { left: "58%", top: "0%", size: "44vw", delay: 0.08 },
  { left: "30%", top: "30%", size: "50vw", delay: 0.04 },
  { left: "72%", top: "35%", size: "34vw", delay: 0.14 },
  { left: "-4%", top: "40%", size: "40vw", delay: 0.1 },
] as const;

/**
 * Hero -> The House. Arrival: mist over the tree line thins and lifts as
 * the A-frame comes into view, the way fog actually clears on Hood Canal
 * mornings. Desktop pins briefly and scrubs the clouds apart; mobile and
 * reduced-motion drop straight to a short opacity fade.
 */
export function CloudTransition() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.to("[data-plume]", { opacity: 0, duration: 0.8, ease: "power1.out" });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=60%",
          scrub: 0.8,
          pin: true,
        },
      });
      tl.to("[data-plume]", {
        yPercent: (i) => -30 - i * 6,
        xPercent: (i) => (i % 2 === 0 ? -14 : 14),
        scale: 1.35,
        opacity: 0,
        ease: "power1.inOut",
        stagger: 0.06,
      });
      return () => tl.scrollTrigger?.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.to("[data-plume]", {
        opacity: 0,
        yPercent: -20,
        ease: "power1.out",
        stagger: 0.05,
        scrollTrigger: { trigger: root, start: "top 70%", end: "bottom top", scrub: 0.6 },
      });
      return () => undefined;
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
      <div className="absolute inset-0">
        {PLUMES.map((plume, i) => (
          <div
            key={i}
            data-plume
            className="absolute rounded-full"
            style={{
              left: plume.left,
              top: plume.top,
              width: plume.size,
              height: plume.size,
              background: "radial-gradient(circle, var(--color-mist) 0%, var(--color-ivory) 45%, transparent 72%)",
              filter: "blur(28px)",
              opacity: 0.55,
              transitionDelay: `${plume.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-warm-black via-transparent to-warm-black/40" />
    </div>
  );
}
