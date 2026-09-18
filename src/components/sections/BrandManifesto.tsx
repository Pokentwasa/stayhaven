"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SITE } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Scroll distance given to each line, in viewport-heights — generous enough that a transition never feels rushed. */
const VH_PER_LINE = 0.85;

/** 02 — Brand Manifesto. Pinned on scroll; each line gets a full, unhurried beat before the next crossfades in. */
export function BrandManifesto() {
  const { manifesto } = SITE;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const lineCount = manifesto.lines.length;
    if (!section || reduced || lineCount <= 1) return;

    const steps = lineCount - 1;
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => "+=" + window.innerHeight * VH_PER_LINE * steps,
      pin: true,
      scrub: 0.6,
      snap: 1 / steps,
      onUpdate: (self) => {
        setActive(Math.min(steps, Math.round(self.progress * steps)));
      },
    });

    return () => trigger.kill();
  }, [reduced, manifesto.lines.length]);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-brand-blue text-charcoal"
    >
      <div className="absolute inset-0">
        <PlaceholderMedia media={manifesto.media} className="absolute inset-0" />
        <div className="absolute inset-0 bg-brand-blue/90" />
      </div>

      <div className="container-edge relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-14 text-center">
        <p className="text-eyebrow text-charcoal/50">{manifesto.eyebrow}</p>
        <h2 className="text-display-md text-charcoal/40">{manifesto.heading}</h2>

        {reduced ? (
          <div className="flex flex-col gap-3">
            {manifesto.lines.map((line) => (
              <p key={line} className="text-display-md text-charcoal">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <div className="relative flex h-24 w-full items-center justify-center md:h-20">
            {manifesto.lines.map((line, i) => (
              <p
                key={line}
                aria-hidden={i !== active}
                className="text-display-md absolute inset-0 flex items-center justify-center text-charcoal transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
