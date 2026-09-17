"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SITE } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
        const media = chapter.querySelector("[data-chapter-media]");
        const text = chapter.querySelectorAll("[data-chapter-text]");

        gsap.fromTo(
          media,
          { scale: 1.12, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: chapter, start: "top 85%", end: "top 30%", scrub: true },
          }
        );

        gsap.from(text, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: chapter, start: "top 75%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={rootRef} data-header-theme="dark" className="section-pad bg-ivory text-charcoal">
      <div className="container-edge">
        <SectionIntro index="03" label="The Experience" heading="Made for staying a little longer." />
      </div>

      <div className="mt-20 flex flex-col gap-4">
        {SITE.experiencePillars.map((pillar, i) => (
          <div
            key={pillar.id}
            data-chapter
            className={`container-edge grid grid-cols-1 items-center gap-8 py-16 md:grid-cols-2 md:gap-16 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div data-chapter-media className="relative aspect-[4/3] w-full overflow-hidden">
              <PlaceholderMedia media={pillar.image} className="absolute inset-0" />
            </div>
            <div className="flex flex-col gap-6">
              <p data-chapter-text className="text-eyebrow text-charcoal/45">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 data-chapter-text className="text-display-lg">
                {pillar.title}
              </h3>
              <p data-chapter-text className="text-body-lg max-w-md text-charcoal/70">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
