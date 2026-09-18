"use client";

import { useState } from "react";
import { useBooking } from "@/components/booking/BookingContext";
import { PROPERTIES } from "@/data/properties";

export function BookingCTA() {
  const { open } = useBooking();
  const [propertySlug, setPropertySlug] = useState(PROPERTIES[0]?.slug ?? "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const property = PROPERTIES.find((p) => p.slug === propertySlug);
    open(property);
  }

  return (
    <section
      id="booking"
      data-header-theme="light"
      className="section-pad container-edge flex min-h-[80vh] flex-col justify-center bg-forest text-ivory"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-14 text-center">
        <h2 className="text-display-xl">Your stay awaits.</h2>

        <form
          onSubmit={handleSubmit}
          className="grid w-full grid-cols-1 items-end gap-6 border-t border-ivory/20 pt-10 text-left sm:grid-cols-2 lg:grid-cols-4"
        >
          <label className="flex flex-col gap-2">
            <span className="text-eyebrow opacity-60">Destination</span>
            <select
              value={propertySlug}
              onChange={(e) => setPropertySlug(e.target.value)}
              className="border-b border-ivory/30 bg-transparent py-2 outline-none"
            >
              {PROPERTIES.map((p) => (
                <option key={p.slug} value={p.slug} className="text-charcoal">
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-eyebrow opacity-60">Check-in</span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="border-b border-ivory/30 bg-transparent py-2 outline-none"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-eyebrow opacity-60">Check-out</span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border-b border-ivory/30 bg-transparent py-2 outline-none"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-eyebrow opacity-60">Guests</span>
            <input
              type="number"
              min={1}
              max={16}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="border-b border-ivory/30 bg-transparent py-2 outline-none"
            />
          </label>

          <button
            type="submit"
            className="col-span-full mt-6 bg-brand-blue py-5 text-eyebrow text-charcoal transition-opacity duration-300 hover:opacity-90"
          >
            Find Your Haven
          </button>
        </form>
      </div>
    </section>
  );
}
