"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SITE } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";
import { cx } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AUTO_ADVANCE_MS = 5000;

/** 03 — The Experience. A fixed set of numbered labels on the left; the active one's image crossfades on the right. */
export function ExperienceSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pillars = SITE.experiencePillars;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-experience-reveal]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (paused || pillars.length <= 1) return;
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % pillars.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [paused, pillars.length]);

  return (
    <section id="experience" ref={rootRef} data-header-theme="dark" className="section-pad bg-ivory text-charcoal">
      <div className="container-edge" data-experience-reveal>
        <SectionIntro index="03" label="The Experience" heading="Made for staying a little longer." />
      </div>

      <div className="container-edge mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-12 md:items-center md:gap-8">
        <div
          data-experience-reveal
          className="flex flex-col gap-8 md:col-span-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {pillars.map((pillar, i) => {
            const isActive = i === active;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActive(i)}
                className="flex flex-col items-start gap-3 text-left"
              >
                <span
                  className={cx(
                    "text-display-sm transition-colors duration-500",
                    isActive ? "text-charcoal" : "text-charcoal/30"
                  )}
                >
                  <span className="text-eyebrow mr-4 align-middle text-charcoal/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {pillar.title}
                </span>
                <p
                  className={cx(
                    "text-body-lg max-w-md overflow-hidden text-charcoal/70 transition-all duration-500 ease-in-out",
                    isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  {pillar.description}
                </p>
              </button>
            );
          })}
        </div>

        <div data-experience-reveal className="relative aspect-[4/3] w-full overflow-hidden md:col-span-7">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <PlaceholderMedia media={pillar.image} className="absolute inset-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
