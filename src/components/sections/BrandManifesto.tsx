"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SITE } from "@/data/site";
import { PROPERTIES } from "@/data/properties";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 02 — Brand Manifesto. A quiet, pinned breathing moment between the
 * Collection and the Experience: one line of the manifesto fills the
 * viewport at a time, dissolving into the next as the user scrolls, over a
 * faint drifting background texture.
 *
 * Markup renders as a plain static stacked list by default (accessible,
 * no-JS/reduced-motion fallback); the pinned crossfade treatment is applied
 * imperatively at runtime only when motion is allowed, so nothing here
 * depends on JS to be readable.
 */
export function BrandManifesto() {
  const { manifesto } = SITE;
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const linesWrapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const bg = bgRef.current;
    const linesWrap = linesWrapRef.current;
    if (!section || !intro || !bg || !linesWrap || prefersReducedMotion()) return;

    const lines = lineRefs.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(linesWrap, { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" });
      gsap.set(lines, { position: "absolute", opacity: 0, y: 24 });
      gsap.to(bg, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });

      const segments = 1 + lines.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${segments * 85}%`,
          scrub: 1,
          pin: true,
        },
      });

      tl.to(intro, { opacity: 0, y: -20, duration: 0.7, ease: "power1.in" }, 0.5);

      lines.forEach((line, i) => {
        const seg = i + 1;
        tl.to(line, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, seg).to(
          line,
          { opacity: 0, y: -24, duration: 0.85, ease: "power1.in" },
          seg + 0.95
        );
      });

      return () => tl.scrollTrigger?.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(lines, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: linesWrap, start: "top 80%" },
      });
      return () => undefined;
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      data-scene="3"
      className="relative flex min-h-[100svh] flex-col items-center justify-center gap-16 overflow-hidden bg-ivory py-24 text-charcoal md:h-[100svh] md:py-0"
    >
      <div ref={bgRef} className="absolute inset-0 opacity-[0.06]">
        <PlaceholderMedia media={PROPERTIES[0]!.heroMedia} className="absolute inset-0 grayscale" />
      </div>

      <div ref={introRef} className="container-edge relative z-10 flex flex-col items-center gap-6 text-center">
        <p className="text-eyebrow text-charcoal/50">{manifesto.eyebrow}</p>
        <h2 className="text-display-md text-charcoal/40">{manifesto.heading}</h2>
      </div>

      <div ref={linesWrapRef} className="container-edge relative z-10 flex flex-col items-center gap-8 text-center">
        {manifesto.lines.map((line, i) => (
          <p
            key={line}
            ref={(el) => {
              if (el) lineRefs.current[i] = el;
            }}
            className="text-display-md md:text-display-xl max-w-5xl"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
