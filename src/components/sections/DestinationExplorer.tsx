"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { WaterTransition } from "@/components/transitions/WaterTransition";
import { cx } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/data/types";

/**
 * 05 — Hood Canal. Story-moment names run huge and full-width; hovering
 * (or, on touch, a first tap) crossfades a full-bleed background photo in
 * behind the whole scene and flips the text to run over it, in place of a
 * literal map embed.
 */
export function DestinationExplorer({ property }: { property: Property }) {
  const moments = property.hoodCanalMoments;
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const bgRefs = useRef<HTMLDivElement[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-dest-reveal]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  function focusOn(i: number) {
    if (i === active && engaged) return;
    const prev = bgRefs.current[active];
    const next = bgRefs.current[i];
    setActive(i);
    setEngaged(true);
    if (prev && prev !== next) gsap.to(prev, { opacity: 0, duration: 0.7, ease: "power2.out" });
    if (next) {
      gsap.to(next, { opacity: 1, duration: 0.7, ease: "power2.out" });
      const media = next.querySelector("img, [role='img']");
      if (media) {
        gsap.fromTo(media, { scale: 1.08 }, { scale: 1, duration: 1.4, ease: "power2.out" });
      }
    }
  }

  function release() {
    setEngaged(false);
    const current = bgRefs.current[active];
    if (current) gsap.to(current, { opacity: 0, duration: 0.6, ease: "power2.out" });
  }

  function handleTapEngage(i: number) {
    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) focusOn(i);
  }

  return (
    <section
      id="hood-canal"
      ref={rootRef}
      data-header-theme={engaged ? "light" : "dark"}
      data-scene="6"
      className="relative overflow-hidden bg-ivory text-charcoal"
      onMouseLeave={release}
    >
      <WaterTransition rootTarget={rootRef} />
      <div className="pointer-events-none absolute inset-0 z-0">
        {moments.map((moment, i) => (
          <div
            key={moment.id}
            ref={(el) => {
              if (el) bgRefs.current[i] = el;
            }}
            className="absolute inset-0 opacity-0"
          >
            <PlaceholderMedia media={moment.heroImage} className="absolute inset-0" />
            <div className="absolute inset-0 bg-warm-black/55" />
          </div>
        ))}
      </div>

      <div
        className={cx(
          "section-pad container-edge relative z-10 transition-colors duration-500",
          engaged ? "text-ivory" : "text-charcoal"
        )}
      >
        <p
          data-dest-reveal
          className={cx("text-eyebrow flex items-center gap-3", engaged ? "text-ivory/70" : "text-charcoal/55")}
        >
          <span>05</span>
          <span className="h-px w-8 bg-current/50" />
          <span>Hood Canal</span>
        </p>
        <h2 data-dest-reveal className="text-display-lg mt-6">
          Beyond the A-frame.
        </h2>

        <ul data-dest-reveal className="mt-16 flex flex-col border-t border-current/10">
          {moments.map((moment, i) => {
            const isActive = i === active && engaged;
            return (
              <li key={moment.id} className="border-b border-current/10">
                <button
                  type="button"
                  onMouseEnter={() => focusOn(i)}
                  onFocus={() => focusOn(i)}
                  onClick={() => handleTapEngage(i)}
                  data-cursor="EXPLORE"
                  className="group flex w-full flex-col items-start justify-between gap-2 py-8 text-left transition-opacity duration-300 md:flex-row md:items-baseline md:py-10"
                  style={{ opacity: engaged && !isActive ? 0.35 : 1 }}
                >
                  <span className="text-display-lg inline-block leading-none transition-transform duration-500 ease-out md:text-[8vw] md:group-hover:scale-[1.015]">
                    {moment.name}
                  </span>
                  <span className="text-eyebrow opacity-60">{moment.region}</span>
                </button>
                {isActive && <p className="max-w-md pb-8 text-body-lg opacity-90 md:pb-10">{moment.description}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
