"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, Z } from "@/lib/motion";

/**
 * An ambient ripple wash for the entry into Hood Canal — entering the
 * water chapter. An SVG turbulence/displacement filter over a soft blue
 * wash, not a second WebGL context (the only real WebGL on the page is
 * DepthScene). Fades in as the section is reached, then settles to a low,
 * steady ripple; skipped entirely under prefers-reduced-motion.
 */
export function WaterTransition({ rootTarget }: { rootTarget: React.RefObject<HTMLElement | null> }) {
  const filterId = useId();
  const washRef = useRef<HTMLDivElement>(null);
  // Defaults to false so the first client render matches the server's
  // (motion-unaware) markup; the real preference is only known post-mount.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(!prefersReducedMotion());
  }, []);

  useEffect(() => {
    const wash = washRef.current;
    const target = rootTarget.current;
    if (!wash || !target || !enabled) return;

    const tween = gsap.fromTo(
      wash,
      { opacity: 0 },
      {
        opacity: 0.22,
        duration: 1.6,
        ease: "power1.out",
        scrollTrigger: { trigger: target, start: "top 70%", end: "top 20%", scrub: 0.6 },
      }
    );
    return () => tween.scrollTrigger?.kill();
  }, [rootTarget, enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={washRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light"
      style={{ zIndex: Z.transition, filter: `url(#${filterId})` }}
    >
      <div className="h-full w-full bg-[image:linear-gradient(to_bottom,var(--color-mist)_0%,transparent_60%)]" />
      <svg className="absolute h-0 w-0">
        <filter id={filterId}>
          <feTurbulence type="turbulence" numOctaves={2} seed={7} result="noise">
            <animate attributeName="baseFrequency" values="0.008 0.03;0.014 0.045;0.008 0.03" dur="10s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={26} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
}
