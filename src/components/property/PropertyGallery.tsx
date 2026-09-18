"use client";

import { useEffect, useState } from "react";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { Property } from "@/data/types";

export function PropertyGallery({ property }: { property: Property }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % property.gallery.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + property.gallery.length) % property.gallery.length));
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, property.gallery.length]);

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-white text-charcoal">
      <p className="text-eyebrow mb-12 text-charcoal/50">05 — Gallery</p>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {property.gallery.map((media, i) => (
          <button
            key={media.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="relative w-[70vw] shrink-0 snap-start overflow-hidden md:w-[32vw]"
          >
            <PlaceholderMedia media={media} />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery viewer"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-warm-black/95 p-6"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="text-eyebrow absolute right-6 top-6 text-ivory"
            aria-label="Close gallery"
          >
            Close
          </button>
          <div className="relative h-full max-h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <PlaceholderMedia media={property.gallery[openIndex]!} className="h-full max-h-[80vh]" />
          </div>
        </div>
      )}
    </section>
  );
}
