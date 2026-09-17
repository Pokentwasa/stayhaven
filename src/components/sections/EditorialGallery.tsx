"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { PROPERTIES } from "@/data/properties";
import { cx } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * A deliberately small, curated set (not a gallery dump) with irregular
 * pacing: portrait, wide, full-width, a small detail, a full-screen
 * interruption, then a closing wide frame.
 */
const LAYOUT = [
  { h: "h-[68vh]", w: "w-[38vw]", r: "" }, // portrait
  { h: "h-[46vh]", w: "w-[64vw]", r: "rotate-[-1deg]" }, // wide
  { h: "h-[56vh]", w: "w-[86vw]", r: "" }, // full-width
  { h: "h-[28vh]", w: "w-[20vw]", r: "rotate-[1.5deg]" }, // small detail
  { h: "h-[92vh]", w: "w-[96vw]", r: "" }, // full-screen interruption
  { h: "h-[50vh]", w: "w-[56vw]", r: "rotate-[-1deg]" }, // closing wide
] as const;

/** 06 — Moments. A small, hard-curated, draggable horizontal strip rather than a masonry grid. */
export function EditorialGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  // Two frames per property (spread across each gallery, not the first N in a row) for variety across the Collection.
  const moments = PROPERTIES.flatMap((p) => [p.gallery[0], p.gallery[4]])
    .filter((m): m is (typeof PROPERTIES)[number]["gallery"][number] => Boolean(m))
    .slice(0, LAYOUT.length);

  useEffect(() => {
    if (!headingRef.current || prefersReducedMotion()) return;
    gsap.from(headingRef.current.children, {
      opacity: 0,
      y: 24,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    function onDown(e: PointerEvent) {
      // Touch already gets smooth native momentum scrolling — only take over for mouse/pen drag.
      if (e.pointerType === "touch") return;
      isDown = true;
      startX = e.clientX;
      startScroll = track!.scrollLeft;
      track!.style.cursor = "grabbing";
    }
    function onMove(e: PointerEvent) {
      if (!isDown) return;
      e.preventDefault();
      track!.scrollLeft = startScroll - (e.clientX - startX);
    }
    function onUp() {
      isDown = false;
      track!.style.cursor = "grab";
    }

    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section data-header-theme="dark" data-scene="7" className="section-pad overflow-hidden bg-ivory text-charcoal">
      <div ref={headingRef} className="container-edge mb-14">
        <p className="text-eyebrow flex items-center gap-3 text-charcoal/50">
          <span>06</span>
          <span className="h-px w-8 bg-current/50" />
          <span>Moments</span>
        </p>
        <h2 className="text-display-lg mt-6">Moments from the Collection.</h2>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex cursor-grab select-none items-center gap-6 overflow-x-auto px-6 pb-4 md:gap-10 md:px-12"
      >
        {moments.map((media, i) => {
          const layout = LAYOUT[i % LAYOUT.length]!;
          return (
          <figure
            key={media.id}
            data-cursor="DRAG"
            className={cx(
              "group relative shrink-0 overflow-hidden transition-transform duration-500",
              layout.h,
              layout.w,
              layout.r
            )}
          >
            <PlaceholderMedia
              media={media}
              className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-warm-black/70 to-transparent p-4 text-xs uppercase tracking-widest text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {media.id.replace(/_/g, " ")}
            </figcaption>
          </figure>
          );
        })}
      </div>
    </section>
  );
}
