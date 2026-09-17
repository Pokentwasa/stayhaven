"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Property } from "@/data/types";
import { prefersReducedMotion } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 11 — Know Before You Stay. House rules as expandable accordions (native
 * <details>/<summary> — accessible by default, no JS dependency), and the
 * cancellation policy set out plainly and in full, since it's the one
 * legally load-bearing section on the page and must not be paraphrased
 * away or hidden behind a click.
 */
export function KnowBeforeYouStay({ property }: { property: Property }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-kbys-reveal]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="know-before-you-stay"
      ref={rootRef}
      data-header-theme="dark"
      data-scene="12"
      className="section-pad container-edge bg-ivory text-charcoal"
    >
      <p data-kbys-reveal className="text-eyebrow mb-6 flex items-center gap-3 text-charcoal/50">
        <span>11</span>
        <span className="h-px w-8 bg-current/50" />
        <span>Know Before You Stay</span>
      </p>
      <h2 data-kbys-reveal className="text-display-lg mb-16 max-w-2xl">
        Good to know, before you arrive.
      </h2>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
        <div data-kbys-reveal>
          <h3 className="text-eyebrow mb-6 text-charcoal/50">House Rules</h3>
          <div className="flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
            {property.houseRules.map((rule) => (
              <details key={rule.id} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="text-body-lg">{rule.title}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-charcoal/50 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-md text-charcoal/70">{rule.description}</p>
              </details>
            ))}
          </div>
        </div>

        <div data-kbys-reveal>
          <h3 className="text-eyebrow mb-6 text-charcoal/50">Cancellation Policy</h3>
          <div className="flex flex-col divide-y divide-charcoal/10 border-t border-charcoal/10">
            {property.cancellationPolicy.map((tier) => (
              <div key={tier.id} className="flex flex-col gap-1 py-5">
                <p className="text-body-lg">{tier.window}</p>
                <p className="text-charcoal/70">{tier.refund}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
