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

const HEIGHTS = ["h-[46vh]", "h-[62vh]", "h-[36vh]", "h-[88vh]", "h-[52vh]", "h-[40vh]", "h-[58vh]", "h-[70vh]"];
const ROTATE = ["", "", "rotate-[-1.5deg]", "", "rotate-[1.5deg]", "", "", "rotate-[-1deg]"];
const WIDTHS = ["w-[62vw]", "w-[42vw]", "w-[30vw]", "w-[78vw]", "w-[48vw]", "w-[34vw]", "w-[52vw]", "w-[40vw]"];

/** 06 — Moments. An unpredictable, draggable horizontal strip rather than a masonry grid. */
export function EditorialGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const moments = PROPERTIES.flatMap((p) => p.gallery).slice(0, 12);

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
        {moments.map((media, i) => (
          <figure
            key={media.id}
            data-cursor="DRAG"
            className={cx(
              "group relative shrink-0 overflow-hidden transition-transform duration-500",
              HEIGHTS[i % HEIGHTS.length],
              WIDTHS[i % WIDTHS.length],
              ROTATE[i % ROTATE.length]
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
        ))}
      </div>
    </section>
  );
}
