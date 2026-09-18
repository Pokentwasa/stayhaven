"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";

const LINE_DURATION_MS = 2600;

/** 02 — Brand Manifesto. Lines swap automatically on a timer, not on scroll — a continuous, quiet cycle. */
export function BrandManifesto() {
  const { manifesto } = SITE;
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced || manifesto.lines.length <= 1) return;
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % manifesto.lines.length);
    }, LINE_DURATION_MS);
    return () => clearInterval(interval);
  }, [reduced, manifesto.lines.length]);

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-14 text-center">
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
                className="text-display-md absolute inset-0 flex items-center justify-center text-charcoal transition-opacity duration-1000 ease-in-out"
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
