"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { Media } from "@/data/types";
import { prefersReducedMotion } from "@/lib/motion";

/** A photograph that drifts a few percent as the page scrolls past it — restrained, not a full parallax rig. */
export function ParallaxImage({ media, className, amount = 8 }: { media: Media; className?: string; amount?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -amount },
        { yPercent: amount, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } }
      );
    }, wrap);

    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <div ref={imgRef} className="absolute inset-[-10%]">
        <PlaceholderMedia media={media} className={className} />
      </div>
    </div>
  );
}
