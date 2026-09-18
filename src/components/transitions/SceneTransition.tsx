"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, Z } from "@/lib/motion";
import { cx } from "@/lib/utils";

/**
 * The quiet connective tissue used where no named effect is called for —
 * a short gradient blend between two tones with a thin rule that draws in
 * as it enters view. Purely decorative (aria-hidden), never pinned, never
 * more than a couple of seconds of motion. This is the fallback every
 * other transition in this folder also collapses to under
 * prefers-reduced-motion.
 */
export function SceneTransition({
  from,
  to,
  className,
}: {
  /** Tailwind color token for the outgoing section's tone, e.g. "warm-black". */
  from: string;
  /** Tailwind color token for the incoming section's tone, e.g. "ivory". */
  to: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-transition-rule]",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 80%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-transition
      className={cx("relative h-[16vh] w-full md:h-[22vh]", className)}
      style={{ zIndex: Z.transition, background: `linear-gradient(to bottom, var(--color-${from}), var(--color-${to}))` }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span data-transition-rule className="block h-px w-16 origin-center bg-current opacity-40" />
      </div>
    </div>
  );
}
