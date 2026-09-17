"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { SITE } from "@/data/site";

/** Short opening beat shown once per browser session on the homepage — not a generic spinner. */
export function LoadingScreen() {
  const [done, setDone] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("sh-intro-seen") === "1";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) return;

    // Reading sessionStorage is the external-system check this effect syncs from.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDone(false);
    document.body.style.overflow = "hidden";

    const counter = { value: 0 };
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

    tl.to(counter, {
      value: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = String(Math.round(counter.value));
      },
    })
      .to("[data-loading-word]", { yPercent: -110, duration: 0.6, ease: "power3.inOut", stagger: 0.05 }, "+=0.15")
      .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.2");

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-warm-black text-ivory"
      role="status"
      aria-label="Loading Stay Haven Collection"
    >
      <p className="overflow-hidden text-eyebrow">
        <span data-loading-word className="inline-block">
          {SITE.brand.shortName}
        </span>
      </p>
      <span ref={countRef} className="font-serif text-2xl tabular-nums text-ivory/70">
        0
      </span>
    </div>
  );
}
