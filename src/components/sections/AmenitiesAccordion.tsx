"use client";

import { useState } from "react";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { getFeaturedProperty } from "@/data/properties";
import { cx } from "@/lib/utils";

function groupByCategory(amenities: { id: string; label: string; category?: string }[]) {
  const groups = new Map<string, { id: string; label: string }[]>();
  for (const amenity of amenities) {
    const category = amenity.category ?? "Other";
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category)!.push(amenity);
  }
  return Array.from(groups.entries());
}

/** 05 — Amenities. Categories sit in a left-hand tab list, each with its own image on the right and its item list dropping open beneath the active label. */
export function AmenitiesAccordion() {
  const property = getFeaturedProperty();
  const categories = groupByCategory(property.amenities);
  const [active, setActive] = useState(0);

  return (
    <section id="amenities" data-header-theme="dark" className="section-pad bg-white text-charcoal">
      <div className="container-edge">
        <SectionIntro index="05" label="Amenities" heading="Everything you need is already here." />
      </div>

      <div className="container-edge mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:items-start md:gap-8">
        <div className="flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10 md:col-span-5">
          {categories.map(([category, items], i) => {
            const isActive = i === active;

            return (
              <div key={category}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className="flex w-full items-center justify-between py-7 text-left"
                >
                  <span
                    className={cx(
                      "text-display-sm transition-colors duration-500",
                      isActive ? "text-charcoal" : "text-charcoal/35"
                    )}
                  >
                    {category}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="text-eyebrow text-charcoal/45">{items.length}</span>
                    <span
                      className={cx(
                        "text-2xl font-light transition-transform duration-400 ease-out",
                        isActive && "rotate-45"
                      )}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </span>
                </button>

                <div
                  className={cx(
                    "grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out",
                    isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <ul className="min-h-0 grid grid-cols-1 gap-x-10 gap-y-3 pb-8 sm:grid-cols-2">
                    {items.map((item) => (
                      <li key={item.id} className="text-body-lg text-charcoal/75">
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden md:col-span-7">
          {categories.map(([category], i) => {
            const image = property.amenityCategoryImages.find((c) => c.name === category)?.image;
            if (!image) return null;
            return (
              <div
                key={category}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <PlaceholderMedia media={image} className="absolute inset-0" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
