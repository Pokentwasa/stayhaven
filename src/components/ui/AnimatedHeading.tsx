"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cx } from "@/lib/utils";

const SIZE_CLASS = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
} as const;

/** Reveals each line on scroll-in, one at a time. Falls back to a static render under reduced motion. */
export function AnimatedHeading({
  lines,
  className,
  as = "h2",
  size = "lg",
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  size?: keyof typeof SIZE_CLASS;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>("[data-line]");
      gsap.set(words, { yPercent: 110, opacity: 0 });
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={cx(SIZE_CLASS[size], className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-line className="block">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
