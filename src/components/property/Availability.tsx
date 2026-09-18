"use client";

import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { isBookingEngineConfigured } from "@/lib/booking";
import type { Property } from "@/data/types";

export function Availability({ property }: { property: Property }) {
  const configured = isBookingEngineConfigured(property);

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <p className="text-eyebrow mb-8 text-charcoal/50">10 — Availability</p>
      <div className="flex flex-col items-start gap-6 border-t border-charcoal/10 pt-10">
        <p className="text-body-lg max-w-md text-charcoal/70">
          {configured
            ? "Check live availability and rates for this Haven."
            : "Live availability will appear here once this property is connected to the booking engine."}
        </p>
        <BookingTrigger
          property={property}
          className="border border-charcoal px-8 py-4 text-charcoal"
        >
          Check Availability
        </BookingTrigger>
      </div>
    </section>
  );
}
