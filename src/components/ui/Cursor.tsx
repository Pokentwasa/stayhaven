"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Subtle desktop-only cursor companion. Shows a contextual word (VIEW, DRAG,
 * EXPLORE, BOOK, ...) when hovering an element carrying `data-cursor="WORD"`.
 * No-op entirely on touch devices and under reduced motion.
 */
export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    if (!root || !dot) return;

    const quickX = gsap.quickTo(root, "x", { duration: 0.5, ease: "power3.out" });
    const quickY = gsap.quickTo(root, "y", { duration: 0.5, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      quickX(e.clientX);
      quickY(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setLabel(labelled.dataset.cursor ?? null);
        gsap.to(dot, { scale: 3.2, duration: 0.35, ease: "power2.out" });
        return;
      }
      if (target.closest("a, button")) {
        gsap.to(dot, { scale: 2.2, duration: 0.35, ease: "power2.out" });
      }
    }

    function onOut(e: MouseEvent) {
      const related = e.relatedTarget as HTMLElement | null;
      if (related?.closest("[data-cursor], a, button")) return;
      setLabel(null);
      gsap.to(dot, { scale: 1, duration: 0.35, ease: "power2.out" });
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    gsap.set(root, { opacity: 1 });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden -translate-x-1/2 -translate-y-1/2 opacity-0 md:flex md:items-center md:justify-center"
    >
      <div
        ref={dotRef}
        className="flex h-3 w-3 items-center justify-center rounded-full bg-olive mix-blend-difference"
      >
        {label && (
          <span className="absolute whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ivory">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
