"use client";

import { useEffect, useRef, useState } from "react";

/** Minimal scene counter + progress rule. Reads `[data-scene]` markers placed on each homepage scene. */
export function ScrollProgress() {
  const [active, setActive] = useState(1);
  const [total, setTotal] = useState(0);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    if (scenes.length === 0) return;
    // Reading the DOM's scene markers is the external-system check this effect syncs from.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTotal(scenes.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const n = Number((entry.target as HTMLElement).dataset.scene);
            if (!Number.isNaN(n)) setActive(n);
          }
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );

    scenes.forEach((s) => observer.observe(s));

    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        if (fillRef.current) fillRef.current.style.height = `${pct * 100}%`;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (total === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-8 right-6 z-40 hidden flex-col items-center gap-3 md:flex"
    >
      <span className="text-[0.65rem] tracking-[0.2em] text-charcoal/40 mix-blend-difference">
        {String(active).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <span className="relative h-16 w-px bg-charcoal/15 mix-blend-difference">
        <span ref={fillRef} className="absolute inset-x-0 top-0 bg-charcoal/60" style={{ height: "0%" }} />
      </span>
    </div>
  );
}
