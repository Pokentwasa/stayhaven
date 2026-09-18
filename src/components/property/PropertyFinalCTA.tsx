import { BookingTrigger } from "@/components/booking/BookingTrigger";
import type { Property } from "@/data/types";

export function PropertyFinalCTA({ property }: { property: Property }) {
  return (
    <section
      data-header-theme="light"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-10 bg-forest text-center text-ivory"
    >
      <p className="text-eyebrow opacity-70">11 — Book Your Stay</p>
      <h2 className="text-display-xl">{property.name} awaits.</h2>
      <BookingTrigger property={property} className="border-b border-ivory pb-1">
        Book Your Stay
      </BookingTrigger>
    </section>
  );
}
