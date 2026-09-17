"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { getFeaturedProperty } from "@/data/properties";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 04 — Featured Haven. A magazine-style story rather than a heading + grid:
 * the property name sits oversized and pale behind the hero image, imagery
 * is asymmetric and overlapping (not a uniform grid), and the statement
 * floats in the negative space between frames.
 */
export function FeaturedHaven() {
  const rootRef = useRef<HTMLDivElement>(null);
  const property = getFeaturedProperty();
  const [imgA, imgB, imgC, imgD] = property.gallery;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
        const media = el.querySelector("[data-reveal-media]");
        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", end: "top 40%", scrub: true },
            }
          );
        }
      });

      gsap.from("[data-statement]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-statement]", start: "top 85%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-header-theme="dark"
      data-scene="5"
      className="section-pad overflow-hidden bg-ivory text-charcoal"
    >
      <div className="container-edge mb-6 flex flex-col gap-4">
        <p className="text-eyebrow text-charcoal/50">04 — Featured Haven</p>
        <p className="text-eyebrow text-charcoal/55">{property.locationLabel}</p>
      </div>

      <div className="relative">
        <h2 className="container-edge text-display-xl leading-[0.85] text-charcoal/[0.08]">{property.name}</h2>
        <div data-reveal className="relative -mt-[14vw] aspect-[16/9] w-full overflow-hidden md:-mt-[9vw]">
          <div data-reveal-media className="absolute inset-0">
            <PlaceholderMedia media={property.heroMedia} className="absolute inset-0" />
          </div>
        </div>
      </div>

      <p data-statement className="container-edge text-display-sm mt-16 max-w-lg text-charcoal/70 md:ml-[18%] md:mt-24">
        {property.featuredStatement}
      </p>

      <div className="container-edge mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-12 md:gap-8">
        {imgA && (
          <div data-reveal className="relative aspect-[3/4] overflow-hidden md:col-span-4 md:col-start-1">
            <div data-reveal-media className="absolute inset-0">
              <PlaceholderMedia media={imgA} className="absolute inset-0" />
            </div>
          </div>
        )}
        {imgB && (
          <div data-reveal className="relative aspect-[4/3] overflow-hidden md:col-span-7 md:col-start-6 md:-mt-20">
            <div data-reveal-media className="absolute inset-0">
              <PlaceholderMedia media={imgB} className="absolute inset-0" />
            </div>
          </div>
        )}
      </div>

      {imgC && (
        <div className="container-edge relative mt-10 md:-mt-16">
          <div
            data-reveal
            className="relative aspect-square w-1/2 overflow-hidden md:ml-[40%] md:w-[24%]"
          >
            <div data-reveal-media className="absolute inset-0">
              <PlaceholderMedia media={imgC} className="absolute inset-0" />
            </div>
          </div>
        </div>
      )}

      <div className="container-edge mt-16 flex items-center justify-between gap-10 md:mt-20">
        <LuxuryButton href={`/stays/${property.slug}`} variant="dark" data-cursor="VIEW">
          Explore this Haven
        </LuxuryButton>
        {imgD && (
          <div data-reveal className="relative hidden aspect-square w-36 overflow-hidden md:block">
            <div data-reveal-media className="absolute inset-0">
              <PlaceholderMedia media={imgD} className="absolute inset-0" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
