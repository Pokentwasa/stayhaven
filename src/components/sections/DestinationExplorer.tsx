"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { DESTINATIONS } from "@/data/destinations";
import { PROPERTIES } from "@/data/properties";

/** 05 — Destinations. An index list swaps a large preview image on hover/focus, in place of a literal map embed. */
export function DestinationExplorer() {
  const [active, setActive] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!previewRef.current) return;
    gsap.fromTo(previewRef.current, { opacity: 0.3 }, { opacity: 1, duration: 0.5, ease: "sine.out" });
  }, [active]);

  const destination = DESTINATIONS[active];
  const relatedProperty = PROPERTIES.find((p) => p.destinationSlug === destination?.slug);

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <SectionIntro index="05" label="Destinations" heading="Where will you disappear to next?" />

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <ul className="flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
          {DESTINATIONS.map((d, i) => (
            <li key={d.id}>
              <TransitionLink
                href={relatedProperty && i === active ? `/stays/${relatedProperty.slug}` : `/destinations/${d.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`flex items-baseline justify-between py-6 transition-colors duration-300 ${
                  i === active ? "text-charcoal" : "text-charcoal/40"
                }`}
              >
                <span className="text-display-sm">{d.name}</span>
                <span className="text-eyebrow">{d.region}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>

        <div ref={previewRef} className="relative aspect-[4/5] w-full overflow-hidden">
          {destination && <PlaceholderMedia media={destination.heroImage} className="absolute inset-0" />}
          {destination && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-warm-black/70 to-transparent p-8 text-ivory">
              <p className="text-body-lg max-w-sm">{destination.description}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
