"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SITE } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 03 — The Experience. Desktop: fixed STAY/EAT/EXPLORE/UNWIND labels on the
 * left, a single pinned frame on the right whose image and caption crossfade
 * as each category becomes active — one continuous scene, not four cards.
 * Mobile falls back to a simple vertical chapter list.
 */
export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const descRefs = useRef<HTMLParagraphElement[]>([]);
  const [active, setActive] = useState(0);

  const pillars = SITE.experiencePillars;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const labels = labelRefs.current;
    const images = imageRefs.current;
    const descs = descRefs.current;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(images.slice(1), { opacity: 0, scale: 1.06 });
      gsap.set(descs.slice(1), { opacity: 0, y: 16 });
      gsap.set(labels.slice(1), { opacity: 0.35 });
      gsap.set(labels[0]!, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${(pillars.length - 1) * 90}%`,
          scrub: 0.7,
          pin: true,
          onUpdate: (self) => {
            const i = Math.min(pillars.length - 1, Math.round(self.progress * (pillars.length - 1)));
            setActive((prev) => (prev === i ? prev : i));
          },
        },
      });

      pillars.forEach((_, i) => {
        if (i === 0) return;
        const seg = i - 1;
        tl.to(images[i - 1]!, { opacity: 0, scale: 0.97, ease: "power1.in", duration: 0.9 }, seg)
          .to(images[i]!, { opacity: 1, scale: 1, ease: "power2.out", duration: 0.9 }, seg + 0.1)
          .to(descs[i - 1]!, { opacity: 0, y: -12, ease: "power1.in", duration: 0.5 }, seg)
          .to(descs[i]!, { opacity: 1, y: 0, ease: "power2.out", duration: 0.6 }, seg + 0.35)
          .to(labels[i - 1]!, { opacity: 0.35, ease: "power1.out", duration: 0.6 }, seg)
          .to(labels[i]!, { opacity: 1, ease: "power1.out", duration: 0.6 }, seg);
      });

      return () => tl.scrollTrigger?.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((chapter) => {
        const media = chapter.querySelector("[data-chapter-media]");
        gsap.fromTo(
          media,
          { scale: 1.12, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: chapter, start: "top 85%", end: "top 30%", scrub: true },
          }
        );
        gsap.from(chapter.querySelectorAll("[data-chapter-text]"), {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: chapter, start: "top 75%" },
        });
      });
      return () => undefined;
    });

    return () => mm.revert();
  }, [pillars]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      data-header-theme="dark"
      data-scene="4"
      className="relative overflow-hidden bg-ivory text-charcoal"
    >
      {/* Desktop: pinned fixed-label / crossfading-frame scene */}
      <div className="relative hidden h-[100svh] md:block">
        <div className="container-edge grid h-full grid-cols-[minmax(0,300px)_1fr] items-center gap-16">
          <div className="flex flex-col gap-12">
            <p className="text-eyebrow text-charcoal/45">03 — The Experience</p>
            {pillars.map((pillar, i) => (
              <div
                key={pillar.id}
                ref={(el) => {
                  if (el) labelRefs.current[i] = el;
                }}
                className="flex items-baseline gap-4"
              >
                <span className="text-eyebrow text-charcoal/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-display-sm">{pillar.title}</span>
              </div>
            ))}
          </div>

          <div className="relative h-[72vh] w-full overflow-hidden">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.id}
                ref={(el) => {
                  if (el) imageRefs.current[i] = el;
                }}
                className="absolute inset-0"
              >
                <PlaceholderMedia media={pillar.image} className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-warm-black/5 to-transparent" />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 z-10 p-10">
              {pillars.map((pillar, i) => (
                <p
                  key={pillar.id}
                  ref={(el) => {
                    if (el) descRefs.current[i] = el;
                  }}
                  className="text-body-lg absolute max-w-md text-ivory"
                >
                  {pillar.description}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {pillars.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-8 rounded-full transition-colors duration-500 ${
                i === active ? "bg-charcoal" : "bg-charcoal/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile: vertical chapter list */}
      <div className="section-pad md:hidden">
        <div className="container-edge">
          <SectionIntro index="03" label="The Experience" heading="Made for staying a little longer." />
        </div>

        <div className="mt-16 flex flex-col gap-4">
          {pillars.map((pillar, i) => (
            <div key={pillar.id} data-chapter className="container-edge flex flex-col gap-8 py-12">
              <div data-chapter-media className="relative aspect-[4/3] w-full overflow-hidden">
                <PlaceholderMedia media={pillar.image} className="absolute inset-0" />
              </div>
              <div className="flex flex-col gap-5">
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
      </div>
    </section>
  );
}
