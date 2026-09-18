"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * The site's one typography-entrance primitive: each word (or, for short
 * headlines, the whole line) is wrapped in an overflow-hidden mask and
 * slides up from `translateY(110%)`. Renders as plain static text with no
 * JS/motion — the reveal is purely an enhancement layered on top.
 */
export function SplitTextReveal({
  text,
  as: Tag = "span",
  className,
  stagger = 0.05,
  trigger = "mount",
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
  trigger?: "mount" | "scroll";
  delay?: number;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const lines = root.querySelectorAll<HTMLElement>("[data-split-word]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: "power4.out",
          stagger,
          ...(trigger === "scroll" ? { scrollTrigger: { trigger: root, start: "top 85%" } } : {}),
        }
      );
    }, root);

    return () => ctx.revert();
  }, [trigger, stagger, delay]);

  return (
    <Tag ref={rootRef as never} className={className}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden align-bottom last:mr-0">
          <span data-split-word className="inline-block">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
