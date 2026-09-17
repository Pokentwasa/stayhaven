"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import type { Property } from "@/data/types";
import { prefersReducedMotion } from "@/lib/motion";

export function PropertyHero({ property }: { property: Property }) {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mediaRef.current || prefersReducedMotion()) return;
    gsap.fromTo(mediaRef.current, { scale: 1.15 }, { scale: 1, duration: 2, ease: "power3.out" });
  }, []);

  return (
    <section
      data-header-theme="light"
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-warm-black text-ivory"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <PlaceholderMedia media={property.heroMedia} className="opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/10 to-warm-black/40" />
      </div>

      <div className="container-edge relative z-10 flex w-full flex-col gap-6 pb-20 md:pb-28">
        <p className="text-eyebrow opacity-75">{property.locationLabel}</p>
        <h1 className="text-display-xl max-w-4xl">{property.name}</h1>
        <div className="mt-4">
          <BookingTrigger property={property} className="border-b border-ivory pb-1">
            Book Your Stay
          </BookingTrigger>
        </div>
      </div>
    </section>
  );
}
