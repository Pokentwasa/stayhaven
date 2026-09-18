"use client";

import { useState } from "react";
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

/** 05 — Amenities. A categorized accordion — each category drops open to its full list, collapsed by default. */
export function AmenitiesAccordion() {
  const property = getFeaturedProperty();
  const categories = groupByCategory(property.amenities);
  const [open, setOpen] = useState<Set<string>>(new Set([categories[0]?.[0] ?? ""]));

  function toggle(category: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <SectionIntro index="05" label="Amenities" heading="Everything you need is already here." />

      <div className="mx-auto mt-16 flex max-w-3xl flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
        {categories.map(([category, items]) => {
          const isOpen = open.has(category);
          return (
            <div key={category}>
              <button
                type="button"
                onClick={() => toggle(category)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-7 text-left"
              >
                <span className="text-display-sm">{category}</span>
                <span className="flex items-center gap-4">
                  <span className="text-eyebrow text-charcoal/45">{items.length}</span>
                  <span
                    className={cx(
                      "text-2xl font-light transition-transform duration-400 ease-out",
                      isOpen && "rotate-45"
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
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
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
    </section>
  );
}
