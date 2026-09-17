"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { SITE } from "@/data/site";
import { getPrimaryProperty } from "@/data/property";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 00 — Hero. "Stay Haven presents Salt+Haven": an editorial composition
 * (not centered text-on-image) — brand kicker upper-left, location metadata
 * upper-right, a monumental tagline lower-left over an oversized "00"
 * numeral (the same page-slug device reused through the rest of the site),
 * capacity facts and both CTAs set apart. Pins briefly on exit so the next
 * scene feels like it emerges from the hero rather than cutting to it.
 */
export function CinematicHero() {
  const property = getPrimaryProperty();
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

      // Slow drift while the hero is in view.
      gsap.to(media, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });

      // Exit beat: pin briefly, let the frame recede (scale down, darken,
      // content lift away) so the next scene feels like it emerges from it.
      // Shorter and snappier on mobile — less scroll-jacking on small screens.
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

  const headlineWords = property.heroTagline.split(" ");

  return (
    <section
      ref={rootRef}
      data-header-theme="light"
      data-scene="1"
      className="relative flex h-[100svh] w-full overflow-hidden bg-warm-black text-ivory"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <PlaceholderMedia media={property.heroMedia} className="opacity-70" />
        <div
          ref={vignetteRef}
          className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/20 to-warm-black/55 opacity-100"
        />
      </div>

      <div ref={contentRef} className="container-edge relative z-10 flex h-full w-full flex-col justify-between pb-8 pt-28">
        <div className="flex items-start justify-between">
          <div data-hero-eyebrow className="flex flex-col gap-1">
            <p className="text-eyebrow opacity-80">{SITE.brand.shortName}</p>
            <p className="text-sm italic text-ivory/60">
              {SITE.brand.presentsLabel} {property.name}
            </p>
          </div>
          <p data-hero-mark className="text-eyebrow text-right opacity-50">
            {property.location.city}, {property.location.state} · {property.location.region}
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

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div data-hero-sub className="flex flex-col gap-3">
              <p className="text-body-lg max-w-md opacity-80">{property.heroSupporting}</p>
              <p className="text-sm uppercase tracking-widest opacity-60">
                {property.guests} Guests · {property.bedrooms} Bedrooms · {property.bathrooms} Bathrooms
              </p>
            </div>
            <div data-hero-cta className="flex items-center gap-10">
              <BookingTrigger property={property} className="inline-block border-b border-ivory pb-1">
                {SITE.hero.primaryCta}
              </BookingTrigger>
            </div>
          </div>
        </div>
      </div>

      <TransitionLink
        href="#introduction"
        data-hero-cue
        className="absolute bottom-10 right-6 z-10 flex flex-col items-center gap-3 md:right-12"
        aria-label={SITE.hero.secondaryCta}
      >
        <span className="text-eyebrow rotate-90 whitespace-nowrap opacity-70">{SITE.hero.secondaryCta}</span>
        <span className="h-14 w-px animate-pulse bg-ivory/50 motion-reduce:animate-none" />
      </TransitionLink>
    </section>
  );
}
