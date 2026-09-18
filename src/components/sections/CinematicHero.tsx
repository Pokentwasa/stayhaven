"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { SITE } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/data/types";

/**
 * 00 — Opening scene. An editorial composition (not centered text-on-image):
 * small label upper-left, monumental headline lower-left, supporting line
 * and CTA set apart, thin rule and a location-style metadata mark. Pins
 * briefly on exit so the frame visibly recedes into the next scene rather
 * than cutting straight to it.
 */
export function CinematicHero({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    const vignette = vignetteRef.current;
    if (!root || !media || !content || !vignette || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(media, { scale: 1.05 }, { scale: 1, duration: 3.6, ease: "power2.out" })
        .from("[data-hero-mark]", { opacity: 0, duration: 1 }, 0.2)
        .from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.9 }, 0.4)
        .from("[data-hero-rule]", { scaleX: 0, duration: 1.1, transformOrigin: "left" }, 0.5)
        .from("[data-hero-line]", { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.6)
        .from("[data-hero-sub]", { opacity: 0, y: 12, duration: 0.8 }, 1.3)
        .from("[data-hero-cta]", { opacity: 0, y: 12, duration: 0.8 }, 1.45)
        .from("[data-hero-cue]", { opacity: 0, duration: 1 }, 1.7);

      gsap.to(media, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: isMobile ? "+=35%" : "+=70%",
          scrub: 0.9,
          pin: true,
          pinSpacing: true,
        },
      });
      exit
        .to(content, { yPercent: -30, opacity: 0, ease: "power1.in" }, 0)
        .to(media, { scale: 0.92, ease: "power1.in" }, 0)
        .to(vignette, { opacity: 0.85, ease: "power1.in" }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  const headlineWords = SITE.hero.headline.split(" ");

  return (
    <section
      ref={rootRef}
      data-header-theme="light"
      data-scene="1"
      className="relative flex h-[100svh] w-full overflow-hidden bg-warm-black text-ivory"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <PlaceholderMedia media={property.heroMedia} priority className="opacity-70" />
        <div
          ref={vignetteRef}
          className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/20 to-warm-black/55 opacity-100"
        />
      </div>

      <div ref={contentRef} className="container-edge relative z-10 flex h-full w-full flex-col justify-between py-8">
        <div className="flex items-start justify-between">
          <p data-hero-eyebrow className="text-eyebrow opacity-80">
            {SITE.hero.eyebrow}
          </p>
          <p data-hero-mark className="text-eyebrow text-right opacity-50">
            {property.location.city.toUpperCase()}, {property.location.state === "Washington" ? "WA" : property.location.state}
          </p>
        </div>

        <div className="relative flex flex-col gap-8 pb-16 md:pb-24">
          <span
            data-hero-mark
            aria-hidden="true"
            className="pointer-events-none absolute -top-[0.3em] left-0 select-none font-serif leading-none text-ivory/10"
            style={{ fontSize: "26vw" }}
          >
            00
          </span>
          <span data-hero-rule className="relative block h-px w-16 bg-ivory/50" />
          <h1 className="text-display-xl relative max-w-none pr-0 md:pr-[8vw]">
            {headlineWords.map((word, i) => (
              <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
                <span data-hero-line className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <p data-hero-sub className="text-body-lg max-w-md opacity-80">
              {SITE.hero.supporting}
            </p>
            <div data-hero-cta>
              <BookingTrigger property={property} className="inline-block border-b border-ivory pb-1">
                {SITE.hero.cta}
              </BookingTrigger>
            </div>
          </div>
        </div>
      </div>

      <TransitionLink
        href="#the-house"
        data-hero-cue
        className="absolute bottom-10 right-6 z-10 flex flex-col items-center gap-3 md:right-12"
        aria-label={SITE.hero.scrollCue}
      >
        <span className="text-eyebrow rotate-90 whitespace-nowrap opacity-70">{SITE.hero.scrollCue}</span>
        <span className="h-14 w-px animate-pulse bg-ivory/50 motion-reduce:animate-none" />
      </TransitionLink>
    </section>
  );
}
