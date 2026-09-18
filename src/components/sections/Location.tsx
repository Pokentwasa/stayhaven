"use client";

import { ImageReveal } from "@/components/motion/ImageReveal";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { imageAt, toMedia } from "@/data/images";
import type { Property } from "@/data/types";

/**
 * Scene 09 — The Location. Practical, not touristy: real generic activity
 * categories, and the disclaimers (no direct beach access, vehicle
 * recommended) kept clear but aesthetically integrated rather than boxed
 * off as a warning card.
 */
export function Location({ property }: { property: Property }) {
  const { neighbourhood } = property;
  const image = toMedia(imageAt("exterior", 2));

  return (
    <section id="location" data-header-theme="dark" data-scene="9" className="section-pad bg-sand text-charcoal">
      <div className="container-edge grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="text-eyebrow mb-6 flex items-center gap-3 text-charcoal/50">
            <span>09</span>
            <span className="h-px w-8 bg-current/50" />
            <span>Location</span>
          </p>
          <SplitTextReveal as="h2" text="Union, Washington." className="text-display-lg leading-none" trigger="scroll" />
          <p className="text-eyebrow mt-4 text-charcoal/55">Hood Canal / USA</p>
          <p className="text-body-lg mt-6 max-w-md text-charcoal/75">{neighbourhood.description}</p>

          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2 text-sm uppercase tracking-widest text-charcoal/55">
            {neighbourhood.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-charcoal/15 pt-6">
            <p className="text-stat text-charcoal/60">{neighbourhood.transitNote}</p>
            <p className="text-stat text-charcoal/60">{property.viewDescription}</p>
            <p className="text-stat text-charcoal/60">{neighbourhood.parkingNote}</p>
            <p className="text-stat text-charcoal/60">{neighbourhood.evChargerNote}</p>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden md:col-span-7">
          <ImageReveal media={image} />
        </div>
      </div>
    </section>
  );
}
