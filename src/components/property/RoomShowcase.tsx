"use client";

import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { LuxuryButtonAsButton } from "@/components/ui/LuxuryButton";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import type { Property } from "@/data/types";

export function RoomShowcase({ property }: { property: Property }) {
  return (
    <section data-header-theme="dark" className="section-pad bg-brand-blue text-charcoal">
      <div className="container-edge mb-12">
        <p className="text-eyebrow mb-6 text-charcoal/50">04 — Rooms</p>
        <h2 className="text-display-lg">Spaces to settle into.</h2>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-4 md:px-12">
        {property.rooms.map((room) => (
          <article
            key={room.id}
            className="flex w-[85vw] shrink-0 snap-start flex-col gap-6 md:w-[45vw] lg:w-[38vw]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <PlaceholderMedia media={room.images[0]!} className="absolute inset-0" />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-display-sm">{room.name}</h3>
              <p className="text-charcoal/70">{room.description}</p>
              <p className="text-eyebrow text-charcoal/50">
                {room.occupancy} guests · {room.beds}
                {room.sizeSqm ? ` · ${room.sizeSqm}m²` : ""}
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal/60">
                {room.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="text-eyebrow mt-2">
                {room.priceFrom ? `From ${room.currency} ${room.priceFrom}` : "PRICE_ON_REQUEST"}
              </p>
              <div className="mt-2 flex items-center gap-8">
                <LuxuryButtonAsButton variant="dark">View Room</LuxuryButtonAsButton>
                <BookingTrigger property={property}>Book</BookingTrigger>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
