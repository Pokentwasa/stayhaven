"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Subtle desktop-only cursor companion. No-op on touch devices and under reduced motion. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const dot = dotRef.current;
    if (!dot) return;

    const quickX = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3.out" });
    const quickY = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      quickX(e.clientX);
      quickY(e.clientY);
    }

    function onEnterInteractive() {
      gsap.to(dot, { scale: 2.4, duration: 0.35, ease: "power2.out" });
    }
    function onLeaveInteractive() {
      gsap.to(dot, { scale: 1, duration: 0.35, ease: "power2.out" });
    }

    window.addEventListener("mousemove", onMove);
    const interactive = document.querySelectorAll("a, button");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    gsap.set(dot, { opacity: 1 });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive opacity-0 mix-blend-difference md:block"
    />
  );
}
