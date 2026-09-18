"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { Media } from "@/data/types";
import { prefersReducedMotion } from "@/lib/motion";
import { cx } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * The site's one image-entrance primitive: a vertical mask wipe
 * (`clip-path: inset(100% 0 0 0) → inset(0 0 0 0)`) combined with a slight
 * scale-settle (1.08 → 1) on the image itself. Used everywhere a photograph
 * needs to arrive rather than simply sit on the page.
 *
 * The parent element controls size/aspect (`relative aspect-[…] overflow-hidden`);
 * this component only owns the reveal.
 */
export function ImageReveal({
  media,
  className,
  priority,
  delay = 0,
}: {
  media: Media;
  className?: string;
  priority?: boolean;
  delay?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(wrap, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(img, { scale: 1.08 });
      gsap.to(wrap, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.3,
        delay,
        ease: "power4.out",
        scrollTrigger: { trigger: wrap, start: "top 90%" },
      });
      gsap.to(img, {
        scale: 1,
        duration: 1.6,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: wrap, start: "top 90%" },
      });
    }, wrap);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <div ref={imgRef} className="absolute inset-0">
        <PlaceholderMedia media={media} className={cx("absolute inset-0", className)} priority={priority} />
      </div>
    </div>
  );
}
