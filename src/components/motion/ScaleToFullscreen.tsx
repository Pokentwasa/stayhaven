"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { Media } from "@/data/types";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The site's scene hand-off primitive: an image that starts at a modest
 * width and grows to fill the viewport as the user scrolls through it,
 * so the end of one chapter visually becomes the start of the next. Pins
 * briefly while it grows — the one deliberate, narrow use of scroll
 * pinning in the site, not a general scroll-jack.
 *
 * `children` renders once the image is fullscreen (e.g. the next chapter's
 * heading), fading in as the image finishes expanding.
 */
export function ScaleToFullscreen({
  media,
  fromWidth = "42vw",
  fromAspect = "aspect-[4/3]",
  distance = "120%",
  children,
}: {
  media: Media;
  fromWidth?: string;
  fromAspect?: string;
  distance?: string;
  children?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const content = contentRef.current;
    if (!section || !frame || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${distance}`,
          scrub: 0.8,
          pin: true,
        },
      });
      tl.to(frame, { width: "100vw", height: "100vh", borderRadius: 0, ease: "power2.inOut" }, 0);
      if (content) {
        tl.fromTo(content, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "power2.out" }, 0.65);
      }
    }, section);

    return () => ctx.revert();
  }, [distance]);

  return (
    <div ref={sectionRef} className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-ivory">
      <div ref={frameRef} className={`relative ${fromAspect} overflow-hidden`} style={{ width: fromWidth }}>
        <PlaceholderMedia media={media} className="absolute inset-0" />
      </div>
      {children && (
        <div ref={contentRef} className="absolute inset-0 z-10 flex items-end justify-start p-8 md:p-16">
          {children}
        </div>
      )}
    </div>
  );
}
