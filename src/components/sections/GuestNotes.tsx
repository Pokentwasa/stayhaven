"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/data/types";

/**
 * 07 — Good to Know. A deliberate pause: one huge fact at a time, near-empty
 * space, almost no UI. Real practical information, never a fabricated
 * guest review.
 */
export function GuestNotes({ property }: { property: Property }) {
  const items = property.goodToKnow;
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const prevIndex = useRef(0);

  const item = items[index];

  useEffect(() => {
    if (index === prevIndex.current) return;
    prevIndex.current = index;
    const el = quoteRef.current;
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(el, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" });
  }, [index]);

  function go(delta: number) {
    setIndex((prev) => (prev + delta + items.length) % items.length);
  }

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1);
    startX.current = null;
  }

  if (!item) return null;

  return (
    <section
      id="good-to-know"
      data-header-theme="dark"
      data-scene="8"
      className="container-edge relative flex min-h-[110svh] flex-col items-center justify-center gap-20 bg-ivory py-24 text-charcoal"
    >
      <h2 className="sr-only">Good to Know</h2>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 text-2xl text-charcoal/20 transition-colors duration-300 hover:text-charcoal/60 md:left-12 md:block"
      >
        &larr;
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-2xl text-charcoal/20 transition-colors duration-300 hover:text-charcoal/60 md:right-12 md:block"
      >
        &rarr;
      </button>

      <div
        className="mx-auto flex max-w-4xl cursor-grab select-none flex-col items-center gap-14 text-center active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div ref={quoteRef} className="flex flex-col items-center gap-6">
          <p className="text-eyebrow text-charcoal/50">Good to know</p>
          <p className="text-display-md">{item.title}</p>
          <p className="text-body-lg max-w-xl text-charcoal/70">{item.description}</p>
        </div>

        <p className="text-eyebrow text-charcoal/30">
          {String(index + 1).padStart(2, "0")} — {String(items.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
