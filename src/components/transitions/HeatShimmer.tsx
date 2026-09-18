"use client";

import { useEffect, useId, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * A faint heat-shimmer wash for the fire pit frame in PropertyShowcase's
 * "Outside" beat — an SVG turbulence/displacement filter, not a second
 * WebGL context, so the only real WebGL work on the page stays in
 * DepthScene. Animates its own turbulence frequency via a native SMIL
 * <animate>, so it costs nothing on the main thread and needs no
 * ScrollTrigger. Skipped entirely under prefers-reduced-motion.
 */
export function HeatShimmer() {
  const filterId = useId();
  // Defaults to false (not shown) so the first client render matches the
  // server's markup; the real preference is only known post-mount.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(!prefersReducedMotion());
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-[0.35] mix-blend-overlay"
      style={{ filter: `url(#${filterId})` }}
    >
      <div className="h-full w-full bg-[image:linear-gradient(to_top,var(--color-ember)_0%,transparent_70%)]" />
      <svg className="absolute h-0 w-0">
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" numOctaves={2} seed={4} result="noise">
            <animate attributeName="baseFrequency" values="0.012 0.05;0.02 0.09;0.012 0.05" dur="6s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={18} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );
}
