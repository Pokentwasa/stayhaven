"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import type { Property } from "@/data/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 01 — The House / Outside / The View. The homepage's signature moment: a
 * pinned, layered editorial sequence. Each story-moment image wipes over
 * the last (clip-path reveal, not a hard cut) inside a large inset frame,
 * with an oversized page-slug numeral and the title block crossfading on
 * their own, offset rhythm. Mobile drops the pin for a vertical cinematic
 * stack.
 */
export function PropertyShowcase({ property }: { property: Property }) {
  const moments = property.storyMoments;
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const frames = frameRefs.current;
    const numbers = numberRefs.current;
    const texts = textRefs.current;

    function setInteractive(index: number) {
      texts.forEach((el, i) => {
        const isActive = i === index;
        el.style.pointerEvents = isActive ? "auto" : "none";
        el.setAttribute("aria-hidden", isActive ? "false" : "true");
        el.querySelectorAll("a, button").forEach((node) => {
          if (isActive) node.removeAttribute("tabindex");
          else node.setAttribute("tabindex", "-1");
        });
      });
    }

    if (prefersReducedMotion()) {
      setInteractive(0);
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      setInteractive(0);
      gsap.set(frames.slice(1), { clipPath: "inset(0 0 0 100%)" });
      gsap.set(numbers.slice(1), { opacity: 0, yPercent: 30, xPercent: 6 });
      gsap.set(texts.slice(1), { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${(moments.length - 1) * 130}%`,
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const i = Math.min(moments.length - 1, Math.round(self.progress * (moments.length - 1)));
            setActive((prev) => (prev === i ? prev : i));
            setInteractive(i);
          },
        },
      });

      moments.forEach((_, i) => {
        if (i === 0) return;
        const seg = i - 1;
        const outgoingMedia = frames[i - 1]!.querySelector("[data-frame-media]");
        const incomingMedia = frames[i]!.querySelector("[data-frame-media]");
        tl.to(outgoingMedia, { scale: 1.14, xPercent: -4, ease: "power1.inOut", duration: 1.4 }, seg)
          .to(frames[i]!, { clipPath: "inset(0 0 0 0%)", ease: "power2.inOut", duration: 1.3 }, seg)
          .fromTo(incomingMedia, { scale: 1.1 }, { scale: 1, ease: "power2.out", duration: 1.3 }, seg)
          .to(numbers[i - 1]!, { opacity: 0, yPercent: -20, xPercent: -6, ease: "power1.in", duration: 0.6 }, seg)
          .to(numbers[i]!, { opacity: 1, yPercent: 0, xPercent: 0, ease: "power2.out", duration: 0.7 }, seg + 0.2)
          .to(texts[i - 1]!, { opacity: 0, y: -18, ease: "power1.in", duration: 0.5 }, seg + 0.05)
          .to(texts[i]!, { opacity: 1, y: 0, ease: "power2.out", duration: 0.7 }, seg + 0.45);
      });

      return () => tl.scrollTrigger?.kill();
    });

    mm.add("(max-width: 767px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-mobile-panel]", section);
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector("[data-frame-media]"),
          { scale: 1.12 },
          {
            scale: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: panel, start: "top 90%", end: "top 40%", scrub: true },
          }
        );
        gsap.from(panel.querySelectorAll("[data-mobile-text] > *"), {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 75%" },
        });
      });
      return () => undefined;
    });

    return () => mm.revert();
  }, [moments]);

  return (
    <section
      id="the-house"
      ref={sectionRef}
      data-header-theme="light"
      data-scene="2"
      className="relative overflow-hidden bg-warm-black text-ivory"
    >
      {/* Desktop: pinned layered stage */}
      <div className="relative hidden h-[100svh] md:block">
        <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden pl-4 lg:pl-8">
          {moments.map((moment, i) => (
            <span
              key={moment.id}
              ref={(el) => {
                if (el) numberRefs.current[i] = el;
              }}
              className="absolute left-4 font-serif leading-none text-ivory/10 lg:left-8"
              style={{ fontSize: "23vw" }}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>

        <div className="absolute inset-6 lg:inset-x-20 lg:inset-y-14">
          {moments.map((moment, i) => (
            <div
              key={moment.id}
              ref={(el) => {
                if (el) frameRefs.current[i] = el;
              }}
              className="absolute inset-0 overflow-hidden"
            >
              <div data-frame-media className="absolute inset-0 h-full w-full">
                <PlaceholderMedia media={moment.image} className="absolute inset-0" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/5 to-warm-black/30" />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          {moments.map((moment, i) => (
            <div
              key={moment.id}
              ref={(el) => {
                if (el) textRefs.current[i] = el;
              }}
              className="container-edge absolute inset-x-0 bottom-0 flex flex-col gap-5 pb-16 lg:pb-20"
            >
              <p className="text-eyebrow opacity-70">
                {moment.eyebrow} — {property.name}
              </p>
              <h2 className="text-display-lg lg:text-display-xl max-w-4xl">{moment.title}</h2>
              <p className="text-body-lg max-w-xl opacity-85">{moment.statement}</p>
              <div className="mt-2 flex items-center gap-10">
                <LuxuryButton href={moment.cta.href} variant="primary" data-cursor="VIEW">
                  {moment.cta.label}
                </LuxuryButton>
                <BookingTrigger property={property}>Book Stay</BookingTrigger>
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {moments.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-8 rounded-full transition-colors duration-500 ${
                i === active ? "bg-ivory" : "bg-ivory/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile: vertical cinematic stack */}
      <div className="flex flex-col md:hidden">
        {moments.map((moment) => (
          <article key={moment.id} data-mobile-panel className="relative flex h-[92svh] w-full flex-col justify-end">
            <div data-frame-media className="absolute inset-0 h-full w-full">
              <PlaceholderMedia media={moment.image} className="absolute inset-0" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/10 to-warm-black/40" />

            <div data-mobile-text className="container-edge relative z-10 flex flex-col gap-5 pb-16">
              <p>
                <span className="text-eyebrow opacity-70">
                  {moment.eyebrow} — {property.name}
                </span>
              </p>
              <h2 className="text-display-lg max-w-3xl">{moment.title}</h2>
              <p className="text-body-lg max-w-xl opacity-85">{moment.statement}</p>
              <div className="mt-2 flex items-center gap-10">
                <LuxuryButton href={moment.cta.href} variant="primary">
                  {moment.cta.label}
                </LuxuryButton>
                <BookingTrigger property={property}>Book Stay</BookingTrigger>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
