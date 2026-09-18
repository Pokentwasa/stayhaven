"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/data/types";

/**
 * 03 — The Experience. One definitive sequence: fixed Settle In / Gather /
 * Step Out / Unwind labels beside a single image stage whose frame and
 * caption crossfade as each scene becomes active. Desktop pins and drives
 * it by scroll; touch/mobile drops the pin and drives the same stage by
 * tapping a label.
 */
export function ExperienceSection({ property }: { property: Property }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<HTMLButtonElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const descRefs = useRef<HTMLParagraphElement[]>([]);
  const [active, setActive] = useState(0);

  const scenes = property.experienceScenes;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const labels = labelRefs.current;
    const images = imageRefs.current;
    const descs = descRefs.current;

    function setLabelEmphasis(index: number) {
      labels.forEach((label, i) => {
        label.style.opacity = i === index ? "1" : "0.35";
      });
    }

    if (prefersReducedMotion()) {
      setLabelEmphasis(0);
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(images.slice(1), { opacity: 0, scale: 1.06 });
      gsap.set(descs.slice(1), { opacity: 0, y: 16 });
      setLabelEmphasis(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${(scenes.length - 1) * 100}%`,
          scrub: 0.9,
          pin: true,
          onUpdate: (self) => {
            const i = Math.min(scenes.length - 1, Math.round(self.progress * (scenes.length - 1)));
            setActive((prev) => (prev === i ? prev : i));
            setLabelEmphasis(i);
          },
        },
      });

      scenes.forEach((_, i) => {
        if (i === 0) return;
        const seg = i - 1;
        tl.to(images[i - 1]!, { opacity: 0, scale: 0.96, ease: "power1.inOut", duration: 1 }, seg)
          .to(images[i]!, { opacity: 1, scale: 1, ease: "power2.out", duration: 1 }, seg + 0.15)
          .to(descs[i - 1]!, { opacity: 0, y: -12, ease: "power1.in", duration: 0.55 }, seg)
          .to(descs[i]!, { opacity: 1, y: 0, ease: "power2.out", duration: 0.7 }, seg + 0.4);
      });

      return () => tl.scrollTrigger?.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(images.slice(1), { opacity: 0 });
      gsap.set(descs.slice(1), { opacity: 0, y: 12 });
      setLabelEmphasis(0);
      return () => undefined;
    });

    return () => mm.revert();
  }, [scenes]);

  function focusOn(i: number) {
    const isDesktopPin = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
    if (isDesktopPin || i === active) return;

    const images = imageRefs.current;
    const descs = descRefs.current;
    gsap.to(images[active]!, { opacity: 0, duration: 0.6, ease: "power1.inOut" });
    gsap.to(images[i]!, { opacity: 1, duration: 0.6, ease: "power2.out" });
    gsap.to(descs[active]!, { opacity: 0, y: -8, duration: 0.4, ease: "power1.in" });
    gsap.to(descs[i]!, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.15 });
    labelRefs.current.forEach((label, li) => {
      label.style.opacity = li === i ? "1" : "0.35";
    });
    setActive(i);
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      data-header-theme="dark"
      data-scene="4"
      className="relative overflow-hidden bg-ivory text-charcoal"
    >
      <div className="container-edge section-pad-t pb-10 md:pb-0">
        <p className="text-eyebrow flex items-center gap-3 text-charcoal/50">
          <span>03</span>
          <span className="h-px w-8 bg-current/50" />
          <span>The Experience</span>
        </p>
        <h2 className="text-display-lg mt-6 max-w-2xl">Made for staying a little longer.</h2>
      </div>

      <div className="relative mt-10 md:mt-16 md:h-[85svh]">
        <div className="container-edge grid grid-cols-1 gap-8 md:h-full md:grid-cols-[minmax(0,300px)_1fr] md:items-center md:gap-16">
          <div className="no-scrollbar flex flex-row gap-8 overflow-x-auto pb-2 md:flex-col md:gap-10 md:overflow-visible md:pb-0">
            {scenes.map((scene, i) => (
              <button
                type="button"
                key={scene.id}
                ref={(el) => {
                  if (el) labelRefs.current[i] = el;
                }}
                onClick={() => focusOn(i)}
                data-cursor="EXPLORE"
                className="flex shrink-0 items-baseline gap-4 text-left transition-opacity duration-500"
              >
                <span className="text-eyebrow text-charcoal/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-display-sm">{scene.title}</span>
              </button>
            ))}
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-[70vh]">
            {scenes.map((scene, i) => (
              <div
                key={scene.id}
                ref={(el) => {
                  if (el) imageRefs.current[i] = el;
                }}
                className="absolute inset-0"
              >
                <PlaceholderMedia media={scene.image} className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/70 via-warm-black/5 to-transparent" />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-10">
              {scenes.map((scene, i) => (
                <p
                  key={scene.id}
                  ref={(el) => {
                    if (el) descRefs.current[i] = el;
                  }}
                  className="text-body-lg absolute max-w-md text-ivory"
                >
                  {scene.description}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 gap-3 md:flex">
          {scenes.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-8 rounded-full transition-colors duration-500 ${
                i === active ? "bg-charcoal" : "bg-charcoal/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
