"use client";

import { useEffect, useRef, useState } from "react";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { GalleryImage } from "@/data/types";

/**
 * Full grouped gallery + lightbox viewer, shared by any section that offers
 * a "View all photos" entry point. Filter tabs group by category; the
 * lightbox supports keyboard arrows/Escape and swipe on touch.
 */
export function GalleryViewer({
  groups,
  flatGallery,
  onClose,
}: {
  groups: { label: string; images: GalleryImage[] }[];
  flatGallery: GalleryImage[];
  onClose: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", ...groups.map((g) => g.label)];
  const visibleGroups = activeFilter === "All" ? groups : groups.filter((g) => g.label === activeFilter);

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
          <div className="mb-10 flex flex-wrap gap-x-6 gap-y-2">
            {filters.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFilter(label)}
                className="text-eyebrow transition-opacity"
                style={{ opacity: label === activeFilter ? 1 : 0.4 }}
              >
                {label}
              </button>
            ))}
          </div>
          {visibleGroups.map(
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
        <Lightbox images={flatGallery} index={lightboxIndex} onIndexChange={setLightboxIndex} />
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
    <img src={image.src} alt={image.alt} className="max-h-full max-w-full object-contain" onError={() => setFailed(true)} />
  );
}
