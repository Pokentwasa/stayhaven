"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { GALLERY_CATEGORY_SECTIONS } from "@/data/types";
import type { GalleryImage, Property } from "@/data/types";
import { cx } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PREVIEW_LAYOUT = [
  { h: "h-[62vh]", w: "w-[36vw]" },
  { h: "h-[44vh]", w: "w-[52vw]" },
  { h: "h-[52vh]", w: "w-[42vw]" },
  { h: "h-[30vh]", w: "w-[22vw]" },
  { h: "h-[62vh]", w: "w-[36vw]" },
] as const;

/**
 * 10 — Gallery. A curated preview strip (drag interaction, matching the
 * site's established horizontal-strip pattern) with a "View All 53 Photos"
 * trigger opening the full grouped gallery + lightbox viewer.
 */
export function Gallery({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const groups = useMemo(
    () =>
      GALLERY_CATEGORY_SECTIONS.map((section) => ({
        label: section.label,
        images: property.gallery.filter((img) => section.categories.includes(img.category)),
      })),
    [property.gallery]
  );

  const flatGallery = useMemo(() => groups.flatMap((g) => g.images), [groups]);

  const preview = useMemo(
    () =>
      GALLERY_CATEGORY_SECTIONS.flatMap(
        (section) => property.gallery.find((img) => section.categories.includes(img.category)) ?? []
      ).slice(0, 15) as GalleryImage[],
    [property.gallery]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-gallery-reveal]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
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
    <section
      id="gallery"
      ref={rootRef}
      data-header-theme="dark"
      data-scene="11"
      className="section-pad overflow-hidden bg-ivory text-charcoal"
    >
      <div data-gallery-reveal className="container-edge mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-eyebrow mb-6 flex items-center gap-3 text-charcoal/50">
            <span>10</span>
            <span className="h-px w-8 bg-current/50" />
            <span>Gallery</span>
          </p>
          <h2 className="text-display-lg">Every corner of Salt+Haven.</h2>
        </div>
        <button
          type="button"
          onClick={() => setViewerOpen(true)}
          data-cursor="VIEW"
          className="text-eyebrow w-fit border-b border-charcoal pb-1 transition-opacity hover:opacity-60"
        >
          View All {flatGallery.length} Photos
        </button>
      </div>

      <div
        ref={trackRef}
        data-gallery-reveal
        className="no-scrollbar flex cursor-grab select-none items-center gap-6 overflow-x-auto px-6 pb-4 md:gap-10 md:px-12"
      >
        {preview.map((image, i) => {
          const layout = PREVIEW_LAYOUT[i % PREVIEW_LAYOUT.length]!;
          return (
            <figure
              key={image.id}
              data-cursor="DRAG"
              onClick={() => setViewerOpen(true)}
              className={cx("group relative shrink-0 cursor-pointer overflow-hidden", layout.h, layout.w)}
            >
              <PlaceholderMedia
                media={image}
                className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </figure>
          );
        })}
      </div>

      {viewerOpen && (
        <GalleryViewer groups={groups} flatGallery={flatGallery} onClose={() => setViewerOpen(false)} />
      )}
    </section>
  );
}

function GalleryViewer({
  groups,
  flatGallery,
  onClose,
}: {
  groups: { label: string; images: GalleryImage[] }[];
  flatGallery: GalleryImage[];
  onClose: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (lightboxIndex === null) {
        if (e.key === "Escape") onClose();
        return;
      }
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % flatGallery.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? i : (i - 1 + flatGallery.length) % flatGallery.length));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, flatGallery.length, onClose]);

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-warm-black text-ivory" role="dialog" aria-modal="true" aria-label="Photo gallery">
      <div className="flex items-center justify-between border-b border-ivory/10 px-6 py-6 md:px-12">
        <p className="text-eyebrow opacity-70">
          {lightboxIndex === null ? `${flatGallery.length} Photos` : `${lightboxIndex + 1} / ${flatGallery.length}`}
        </p>
        <button
          type="button"
          onClick={() => (lightboxIndex === null ? onClose() : setLightboxIndex(null))}
          aria-label={lightboxIndex === null ? "Close gallery" : "Back to all photos"}
          className="text-eyebrow transition-opacity hover:opacity-60"
        >
          {lightboxIndex === null ? "Close" : "Back"}
        </button>
      </div>

      {lightboxIndex === null ? (
        <div className="flex-1 overflow-y-auto px-6 py-10 md:px-12">
          {groups.map(
            (group) =>
              group.images.length > 0 && (
                <div key={group.label} className="mb-16 last:mb-0">
                  <p className="text-eyebrow mb-6 opacity-50">{group.label}</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {group.images.map((image) => {
                      const index = flatGallery.findIndex((m) => m.id === image.id);
                      return (
                        <button
                          type="button"
                          key={image.id}
                          onClick={() => setLightboxIndex(index)}
                          data-cursor="VIEW"
                          className="group relative aspect-square overflow-hidden"
                        >
                          <PlaceholderMedia
                            media={image}
                            className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <Lightbox
          images={flatGallery}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  );
}

function Lightbox({
  images,
  index,
  onIndexChange,
}: {
  images: GalleryImage[];
  index: number;
  onIndexChange: (i: number) => void;
}) {
  const startX = useRef<number | null>(null);
  const image = images[index]!;

  function goTo(delta: number) {
    onIndexChange((index + delta + images.length) % images.length);
  }

  function onPointerDown(e: React.PointerEvent) {
    startX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) < 50) return;
    goTo(delta < 0 ? 1 : -1);
  }

  return (
    <div
      className="relative flex flex-1 select-none items-center justify-center overflow-hidden px-4 pb-8"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <button
        type="button"
        onClick={() => goTo(-1)}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 text-eyebrow opacity-60 transition-opacity hover:opacity-100 md:block"
      >
        ←
      </button>
      <div className="relative flex h-full max-h-[80vh] w-full max-w-5xl items-center justify-center">
        <LightboxImage key={image.id} image={image} />
      </div>
      <button
        type="button"
        onClick={() => goTo(1)}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 text-eyebrow opacity-60 transition-opacity hover:opacity-100 md:block"
      >
        →
      </button>
    </div>
  );
}

function LightboxImage({ image }: { image: GalleryImage }) {
  const [failed, setFailed] = useState(false);

  if (!image.src || failed) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className="flex aspect-[4/3] w-full max-w-2xl items-end justify-start bg-gradient-to-br from-stone/60 via-sand to-stone/40 p-4"
      >
        <span className="text-eyebrow text-charcoal/45">{image.id}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      alt={image.alt}
      className="max-h-full max-w-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}
