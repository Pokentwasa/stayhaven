"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { SITE } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(media, { scale: 1.15 }, { scale: 1, duration: 2.2 })
        .from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.9 }, 0.4)
        .from("[data-hero-line]", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.12 }, 0.55)
        .from("[data-hero-sub]", { opacity: 0, y: 12, duration: 0.8 }, 1.1)
        .from("[data-hero-cta]", { opacity: 0, y: 12, duration: 0.8 }, 1.25)
        .from("[data-hero-cue]", { opacity: 0, duration: 1 }, 1.5);

      gsap.to(media, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const headlineWords = SITE.hero.headline.split(" ");

  return (
    <section
      ref={rootRef}
      data-header-theme="light"
      className="relative flex h-[100svh] w-full items-end overflow-hidden bg-warm-black text-ivory"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <PlaceholderMedia media={SITE.hero.media} className="opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/20 to-warm-black/50" />
      </div>

      <div className="container-edge relative z-10 flex w-full flex-col gap-8 pb-20 md:pb-28">
        <p data-hero-eyebrow className="text-eyebrow opacity-80">
          {SITE.hero.eyebrow}
        </p>
        <h1 className="text-display-xl max-w-5xl">
          {headlineWords.map((word, i) => (
            <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
              <span data-hero-line className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p data-hero-sub className="text-body-lg max-w-md opacity-80">
          {SITE.hero.supporting}
        </p>

        <div data-hero-cta>
          <BookingTrigger className="mt-4 inline-block border-b border-ivory pb-1">
            Discover the Collection
          </BookingTrigger>
        </div>
      </div>

      <TransitionLink
        href="#collection"
        data-hero-cue
        className="absolute bottom-10 right-6 z-10 flex flex-col items-center gap-3 md:right-12"
        aria-label={SITE.hero.scrollCue}
      >
        <span className="text-eyebrow rotate-90 whitespace-nowrap opacity-70">
          {SITE.hero.scrollCue}
        </span>
        <span className="h-14 w-px animate-pulse bg-ivory/50 motion-reduce:animate-none" />
      </TransitionLink>
    </section>
  );
}
