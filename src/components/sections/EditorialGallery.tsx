"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";
import { GALLERY_CATEGORY_SECTIONS } from "@/data/types";
import { cx } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/data/types";

/**
 * A deliberately curated set (not a gallery dump) with irregular pacing,
 * cycling through a rhythm of portrait, wide, full-width, detail and
 * full-screen frames.
 */
const LAYOUT = [
  { h: "h-[68vh]", w: "w-[38vw]", r: "" },
  { h: "h-[46vh]", w: "w-[64vw]", r: "rotate-[-1deg]" },
  { h: "h-[56vh]", w: "w-[86vw]", r: "" },
  { h: "h-[28vh]", w: "w-[20vw]", r: "rotate-[1.5deg]" },
  { h: "h-[92vh]", w: "w-[96vw]", r: "" },
  { h: "h-[50vh]", w: "w-[56vw]", r: "rotate-[-1deg]" },
] as const;

/**
 * 06 — Moments from Salt+Haven. A small, hard-curated, draggable
 * horizontal strip rather than a masonry grid, with a "View all" entry
 * point into the full grouped gallery + lightbox.
 */
export function EditorialGallery({ property }: { property: Property }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const moments = useMemo(() => property.gallery.filter((img) => img.category !== "bathrooms").slice(0, 12), [property.gallery]);

  const groups = useMemo(
    () =>
      GALLERY_CATEGORY_SECTIONS.map((section) => ({
        label: section.label,
        images: property.gallery.filter((img) => section.categories.includes(img.category)),
      })),
    [property.gallery]
  );
  const flatGallery = useMemo(() => groups.flatMap((g) => g.images), [groups]);

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
    <section id="moments" data-header-theme="dark" data-scene="7" className="section-pad overflow-hidden bg-ivory text-charcoal">
      <div ref={headingRef} className="container-edge mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-eyebrow flex items-center gap-3 text-charcoal/50">
            <span>06</span>
            <span className="h-px w-8 bg-current/50" />
            <span>Moments</span>
          </p>
          <h2 className="text-display-lg mt-6">Moments from Salt+Haven.</h2>
        </div>
        <button
          type="button"
          onClick={() => setViewerOpen(true)}
          className="text-eyebrow w-fit border-b border-charcoal pb-1 transition-opacity hover:opacity-60"
        >
          View all {flatGallery.length} photos →
        </button>
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
              onClick={() => setViewerOpen(true)}
              className={cx(
                "group relative shrink-0 cursor-pointer overflow-hidden transition-transform duration-500",
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
                {media.alt}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {viewerOpen && <GalleryViewer groups={groups} flatGallery={flatGallery} onClose={() => setViewerOpen(false)} />}
    </section>
  );
}
