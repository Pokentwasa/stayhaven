"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Property } from "@/data/types";
import { prefersReducedMotion } from "@/lib/motion";
import { cx } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 08 — Amenities. Curated groups, not a wall of icons — with a "View All
 * Amenities" drawer for the full inventory for guests who want it.
 */
export function Amenities({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-amenity-group]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const [shouldRenderModal, setShouldRenderModal] = useState(false);
  const [animateModalIn, setAnimateModalIn] = useState(false);

  useEffect(() => {
    // Bridging open/close state into a two-phase mount-then-animate CSS
    // transition genuinely needs effect-driven setState here.
    if (modalOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRenderModal(true);
      document.body.style.overflow = "hidden";
      const frame = requestAnimationFrame(() => setAnimateModalIn(true));
      return () => cancelAnimationFrame(frame);
    }
    setAnimateModalIn(false);
    document.body.style.overflow = "";
    const timeout = setTimeout(() => setShouldRenderModal(false), 500);
    return () => clearTimeout(timeout);
  }, [modalOpen]);

  return (
    <section id="amenities" ref={rootRef} data-header-theme="dark" data-scene="9" className="section-pad container-edge bg-ivory text-charcoal">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-eyebrow mb-6 flex items-center gap-3 text-charcoal/50">
            <span>08</span>
            <span className="h-px w-8 bg-current/50" />
            <span>Amenities</span>
          </p>
          <h2 className="text-display-lg">Everything you need. Nothing you don&rsquo;t.</h2>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="text-eyebrow w-fit border-b border-charcoal pb-1 transition-opacity hover:opacity-60"
        >
          View All Amenities
        </button>
      </div>

      <div className="grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {property.amenityGroups.map((group) => (
          <div key={group.id} data-amenity-group>
            <h3 className="text-eyebrow mb-4 text-charcoal/50">{group.title}</h3>
            <ul className="flex flex-col divide-y divide-charcoal/10">
              {group.items.map((item) => (
                <li key={item} className="py-3 text-body-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {shouldRenderModal && (
        <div
          className="fixed inset-0 z-[80]"
          role="dialog"
          aria-modal="true"
          aria-label="All amenities"
        >
          <div
            className={cx(
              "absolute inset-0 bg-warm-black/70 transition-opacity duration-500 ease-out motion-reduce:transition-none",
              animateModalIn ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setModalOpen(false)}
          />
          <div
            className={cx(
              "absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto bg-ivory transition-transform duration-500 ease-out motion-reduce:transition-none",
              animateModalIn ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-6 md:px-12">
              <p className="text-eyebrow">All Amenities</p>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close amenities list"
                className="text-eyebrow transition-opacity hover:opacity-60"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col gap-10 px-6 py-10 md:px-12">
              {property.amenityGroups.map((group) => (
                <div key={group.id}>
                  <h3 className="text-eyebrow mb-4 text-charcoal/50">{group.title}</h3>
                  <ul className="grid grid-cols-1 gap-y-2 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-body-lg text-charcoal/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
