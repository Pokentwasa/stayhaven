"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { prefersReducedMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import type { Property } from "@/data/types";

/**
 * The opening sequence, shown once per browser session: brand mark, then
 * the property number, then its photograph narrows into view and expands
 * to fill the screen as the property name arrives — the same image the
 * Hero opens on, so the fade-out beneath it reads as continuous rather
 * than a hard cut. Fast (~2.2s) and never replayed for a returning visitor
 * in the same session.
 *
 * Two effects, deliberately: the first decides whether to show the overlay
 * at all (and flips `visible`); the second — gated on `visible` — builds
 * the GSAP timeline only once that state change has actually re-rendered
 * the overlay into the DOM, so its refs are never built against nothing.
 */
export function LoadingScreen({ property }: { property: Property }) {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("sh-intro-seen") === "1";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDone(false);
    setVisible(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!visible || !root || !frame) return;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
        try {
          sessionStorage.setItem("sh-intro-seen", "1");
        } catch {
          /* private browsing / storage disabled — fine to skip */
        }
      },
    });

    tl.from("[data-open-brand]", { opacity: 0, y: 8, duration: 0.4, ease: "power2.out" })
      .from("[data-open-number]", { opacity: 0, y: 8, duration: 0.35, ease: "power2.out" }, "+=0.1")
      .to(frame, { opacity: 1, duration: 0.3, ease: "power2.out" }, "+=0.1")
      .to(frame, { width: "100vw", height: "100vh", duration: 0.9, ease: "power3.inOut" }, "+=0.05")
      .to("[data-open-brand], [data-open-number]", { opacity: 0, duration: 0.3, ease: "power2.in" }, "<")
      .from("[data-open-name]", { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.35")
      .from("[data-open-meta]", { opacity: 0, duration: 0.35, ease: "power2.out" }, "-=0.1")
      .to(root, { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.25 });

    return () => {
      tl.kill();
    };
  }, [visible]);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-warm-black text-ivory" role="status" aria-label={`Loading ${property.name}`}>
      <div data-open-brand className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-eyebrow whitespace-nowrap opacity-80">{SITE.brand.name}</p>
      </div>
      <div data-open-number className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-stat opacity-50">001</p>
      </div>

      <div ref={frameRef} className="relative h-[55vh] w-[20vw] overflow-hidden opacity-0">
        <PlaceholderMedia media={property.heroMedia} priority className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 via-transparent to-warm-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <p data-open-name className="text-display-lg text-center leading-none">
            {property.name}
          </p>
          <p data-open-meta className="text-stat opacity-70">
            {property.location.city.toUpperCase()} / {property.location.state === "Washington" ? "WA" : property.location.state}
          </p>
        </div>
      </div>
    </div>
  );
}
