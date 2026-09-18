"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/data/types";

/**
 * 04 — Featured Haven. A magazine-style story rather than a heading + grid:
 * the property name sits oversized and pale behind the hero image, imagery
 * is asymmetric and overlapping (not a uniform grid), and the statement
 * floats in the negative space between frames.
 */
export function FeaturedHaven({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [imgA, imgB, imgC, imgD] = property.featuredGallery;
  const statementLines = property.featuredStatement.split("\n");

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
        <p className="text-eyebrow text-charcoal/55">
          {property.location.city}, {property.location.state}
        </p>
      </div>

      <div className="relative">
        <h2 className="container-edge text-display-xl leading-[0.85] text-charcoal/[0.08]">{property.name}</h2>
        <div data-reveal className="relative -mt-[14vw] aspect-[16/9] w-full overflow-hidden md:-mt-[9vw]">
          <div data-reveal-media className="absolute inset-0">
            <PlaceholderMedia media={property.featuredHeroImage} className="absolute inset-0" />
          </div>
        </div>
      </div>

      <div data-statement className="container-edge mt-16 flex flex-col text-display-sm text-charcoal/70 md:ml-[18%] md:mt-24 md:max-w-lg">
        {statementLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>

      <div className="container-edge relative mt-16 flex flex-col gap-6 md:mt-24 md:h-[68vh] md:gap-0">
        {imgA && (
          <div
            data-reveal
            className="relative aspect-[3/4] w-[70%] overflow-hidden md:absolute md:left-0 md:top-0 md:h-full md:w-[36%]"
          >
            <div data-reveal-media className="absolute inset-0">
              <PlaceholderMedia media={imgA} className="absolute inset-0" />
            </div>
          </div>
        )}
        {imgB && (
          <div
            data-reveal
            className="relative ml-auto aspect-[4/3] w-[85%] overflow-hidden md:absolute md:right-0 md:top-[22%] md:z-10 md:h-[68%] md:w-[58%]"
          >
            <div data-reveal-media className="absolute inset-0">
              <PlaceholderMedia media={imgB} className="absolute inset-0" />
            </div>
          </div>
        )}
        {imgC && (
          <div
            data-reveal
            className="relative aspect-square w-1/2 overflow-hidden md:absolute md:bottom-0 md:left-[30%] md:z-20 md:h-[30%] md:w-[22%]"
          >
            <div data-reveal-media className="absolute inset-0">
              <PlaceholderMedia media={imgC} className="absolute inset-0" />
            </div>
          </div>
        )}
      </div>

      <div className="container-edge mt-16 flex items-center justify-between gap-10 md:mt-20">
        <LuxuryButton href="#hood-canal" variant="dark" data-cursor="VIEW">
          Explore Salt+Haven
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
