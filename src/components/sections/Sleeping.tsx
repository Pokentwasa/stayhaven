"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import type { Property } from "@/data/types";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scene 05 — Room for Eight. One large photograph and a set of room
 * labels; selecting a label crossfades the photograph (click/tap driven,
 * not scroll-pinned). Falls back to a swipeable strip on touch.
 */
export function Sleeping({ property }: { property: Property }) {
  const [active, setActive] = useState(0);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  function select(i: number) {
    if (i === active) return;
    if (!prefersReducedMotion()) {
      const from = imageRefs.current[active];
      const to = imageRefs.current[i];
      if (from) gsap.to(from, { opacity: 0, duration: 0.5, ease: "power1.inOut" });
      if (to) gsap.fromTo(to, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
    }
    setActive(i);
  }

  return (
    <section id="sleeping" data-header-theme="dark" data-scene="5" className="section-pad bg-sand text-charcoal">
      <div className="container-edge mb-12">
        <p className="text-eyebrow mb-6 flex items-center gap-3 text-charcoal/50">
          <span>05</span>
          <span className="h-px w-8 bg-current/50" />
          <span>Sleep</span>
        </p>
        <SplitTextReveal as="h2" text={property.sleepingHeading} className="text-display-lg" trigger="scroll" />
        <p className="text-body-lg mt-6 max-w-xl text-charcoal/70">{property.sleepingStatement}</p>
      </div>

      {/* Desktop: large photo + label select */}
      <div className="container-edge hidden md:grid md:grid-cols-12 md:gap-16">
        <div className="flex flex-col gap-10 md:col-span-4">
          {property.sleepingAreas.map((area, i) => (
            <button
              key={area.id}
              type="button"
              onClick={() => select(i)}
              className="flex flex-col items-start gap-1 text-left transition-opacity duration-300"
              style={{ opacity: i === active ? 1 : 0.4 }}
            >
              <span className="text-eyebrow text-charcoal/50">
                {String(i + 1).padStart(2, "0")} · {area.level}
              </span>
              <span className="text-display-sm">{area.name}</span>
              <span className="text-sm uppercase tracking-widest text-charcoal/55">{area.beds}</span>
            </button>
          ))}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden md:col-span-8">
          {property.sleepingAreas.map((area, i) => (
            <div
              key={area.id}
              ref={(el) => {
                if (el) imageRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <PlaceholderMedia media={area.image} className="absolute inset-0" />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-black/50 via-transparent to-transparent" />
          <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-end justify-between text-ivory">
            <p className="max-w-sm text-body-lg">{property.sleepingAreas[active]?.description}</p>
            {(property.sleepingAreas[active]?.features.length ?? 0) > 0 && (
              <p className="text-eyebrow opacity-80">{property.sleepingAreas[active]?.features.join(" · ")}</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: swipeable strip */}
      <div className="no-scrollbar container-edge flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:hidden">
        {property.sleepingAreas.map((area) => (
          <article key={area.id} className="flex w-[85vw] shrink-0 snap-start flex-col gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <PlaceholderMedia media={area.image} className="absolute inset-0" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-eyebrow text-charcoal/50">{area.level}</p>
              <h3 className="text-display-sm">{area.name}</h3>
              <p className="text-charcoal/70">{area.description}</p>
              <p className="text-sm uppercase tracking-widest text-charcoal/55">{area.beds}</p>
              {area.features.length > 0 && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal/60">
                  {area.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
