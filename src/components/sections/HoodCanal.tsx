"use client";

import { ImageReveal } from "@/components/motion/ImageReveal";
import { ScaleToFullscreen } from "@/components/motion/ScaleToFullscreen";
import { SplitTextReveal } from "@/components/motion/SplitTextReveal";
import { imageAt, toMedia } from "@/data/images";
import type { Property } from "@/data/types";

/**
 * Scene 06 — Hood Canal. Pure photography: the water, the light, the
 * quiet. Very little text — the practical/location detail lives in its
 * own chapter later, right before booking.
 */
export function HoodCanal({ property }: { property: Property }) {
  const wide = toMedia(imageAt("hoodCanal", 1));
  const detail = toMedia(imageAt("hoodCanal", 0));
  const sunset = toMedia(imageAt("sunsetAtmospheric", 0));

  return (
    <section id="hood-canal" data-header-theme="dark" data-scene="6" className="bg-ivory text-charcoal">
      <div className="container-edge section-pad-t pb-10">
        <p className="text-eyebrow flex items-center gap-3 text-charcoal/50">
          <span>06</span>
          <span className="h-px w-8 bg-current/50" />
          <span>Hood Canal</span>
        </p>
        <SplitTextReveal as="h2" text="Hood Canal." className="text-display-xl mt-6 leading-none" trigger="scroll" />
        <p className="text-eyebrow mt-4 text-charcoal/55">Union / Washington</p>
        <p className="text-body-lg mt-6 max-w-xl text-charcoal/75">{property.viewStatement}</p>
      </div>

      <div className="relative h-[70svh] w-full overflow-hidden">
        <ImageReveal media={wide} />
        <p className="pointer-events-none absolute bottom-6 left-6 text-eyebrow text-ivory/90">Water</p>
      </div>

      <div className="container-edge grid grid-cols-2 gap-4 py-4">
        <div className="relative aspect-[4/5] overflow-hidden">
          <ImageReveal media={detail} />
          <p className="pointer-events-none absolute bottom-4 left-4 text-eyebrow text-ivory/90">Forest</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <ImageReveal media={sunset} delay={0.1} />
          <p className="pointer-events-none absolute bottom-4 left-4 text-eyebrow text-ivory/90">Sunset</p>
        </div>
      </div>

      <ScaleToFullscreen media={sunset} fromWidth="60vw" fromAspect="aspect-[16/9]" distance="90%">
        <p className="text-eyebrow text-ivory/80">07 — Details</p>
      </ScaleToFullscreen>
    </section>
  );
}
