"use client";

import { useRef, useState } from "react";
import { getAllTestimonials, PROPERTIES } from "@/data/properties";

export function GuestNotes() {
  const testimonials = getAllTestimonials();
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const testimonial = testimonials[index];
  const property = PROPERTIES.find((p) => p.slug === testimonial?.propertySlug);

  function go(delta: number) {
    setIndex((prev) => (prev + delta + testimonials.length) % testimonials.length);
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

  if (!testimonial) return null;

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-brand-blue text-charcoal">
      <h2 className="sr-only">Guest Notes</h2>
      <p aria-hidden="true" className="text-eyebrow mb-16 flex items-center justify-center gap-3 text-charcoal/50">
        <span>07</span>
        <span className="h-px w-8 bg-current/50" />
        <span>Guest Notes</span>
      </p>

      <div
        className="mx-auto flex max-w-3xl cursor-grab select-none flex-col items-center gap-10 text-center active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <p className="text-display-md">&ldquo;{testimonial.quote}&rdquo;</p>
        <div className="flex flex-col gap-1">
          <p className="text-eyebrow">{testimonial.guestName}</p>
          <p className="text-sm text-charcoal/55">
            {property?.name} — {testimonial.guestLocation}
          </p>
        </div>

        <div className="flex items-center gap-8 pt-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous guest note"
            className="text-eyebrow transition-opacity hover:opacity-60"
          >
            Prev
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <span
                key={t.id}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-charcoal" : "bg-charcoal/25"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next guest note"
            className="text-eyebrow transition-opacity hover:opacity-60"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
