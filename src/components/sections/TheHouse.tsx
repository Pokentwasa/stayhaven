"use client";

import { ImageReveal } from "@/components/motion/ImageReveal";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { imageAt, toMedia } from "@/data/images";
import type { Property } from "@/data/types";

/**
 * Scene 03 — The House. Architecture and interior facts, a wide/close/wide
 * editorial image rhythm. Hands off into the Inside chapter, which owns
 * its own full-viewport entrance.
 */
export function TheHouse({ property }: { property: Property }) {
  const roofline = toMedia(imageAt("exterior", 0));
  const vaultedDetail = toMedia(imageAt("kitchenDining", 0));
  const greatRoomWide = toMedia(imageAt("greatRoom", 6));

  const stats = [
    { label: "Bedrooms", value: property.bedrooms },
    { label: "Bathrooms", value: property.bathrooms },
    { label: "Guests", value: property.guests },
    { label: "Levels", value: 3 },
  ];

  return (
    <section id="the-house" data-header-theme="dark" data-scene="2" className="section-pad-b container-edge bg-ivory text-charcoal">
        <p className="text-eyebrow mb-12 flex items-center gap-3 text-charcoal/50">
          <span>03</span>
          <span className="h-px w-8 bg-current/50" />
          <span>The House</span>
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div className="flex flex-col gap-6">
            <SplitTextReveal as="h2" text={property.houseHeading} className="text-display-lg" trigger="scroll" />
            <p className="text-eyebrow text-charcoal/55">{property.houseStatement}</p>

            <div className="mt-2 grid grid-cols-4 gap-4 border-y border-charcoal/15 py-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-display-sm">{stat.value}</span>
                  <span className="text-stat text-charcoal/50">{stat.label}</span>
                </div>
              ))}
            </div>

            <p className="text-body-lg text-charcoal/70">{property.houseDescription}</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 text-sm uppercase tracking-widest text-charcoal/55 sm:grid-cols-2">
              {property.houseFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <ImageReveal media={roofline} />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-5">
          <div className="relative aspect-[3/4] overflow-hidden md:col-span-2">
            <ImageReveal media={vaultedDetail} />
          </div>
          <div className="relative aspect-[16/9] overflow-hidden md:col-span-3 md:mt-12">
            <ImageReveal media={greatRoomWide} delay={0.1} />
          </div>
        </div>
    </section>
  );
}
