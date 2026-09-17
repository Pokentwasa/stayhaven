"use client";

import { useEffect, useState } from "react";
import { useBooking } from "./BookingContext";
import { PROPERTIES } from "@/data/properties";
import type { Property } from "@/data/types";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { buildBookingUrl, getBookingEngineMode, isBookingEngineConfigured } from "@/lib/booking";
import { cx } from "@/lib/utils";

/**
 * Elegant booking overlay shell. Desktop: full-height side panel. Mobile:
 * full-screen. Selecting a property + dates hands off to the existing
 * booking engine via `buildBookingUrl` — this component intentionally does
 * not reimplement availability/pricing/payment.
 *
 * Slide/fade is a plain CSS transition (rather than GSAP) so it composes
 * cleanly with Tailwind's own transform utilities without fighting over the
 * element's `transform`/`translate` CSS properties.
 */
export function BookingPanel() {
  const { isOpen, property, close } = useBooking();
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Bridging context state into a two-phase mount-then-animate CSS
    // transition genuinely needs effect-driven setState here.
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      const frame = requestAnimationFrame(() => setAnimateIn(true));
      return () => cancelAnimationFrame(frame);
    }

    setAnimateIn(false);
    document.body.style.overflow = "";
    const timeout = setTimeout(() => setShouldRender(false), 550);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-label="Book your stay"
    >
      <div
        className={cx(
          "absolute inset-0 bg-warm-black/70 transition-opacity duration-500 ease-out motion-reduce:transition-none",
          animateIn ? "opacity-100" : "opacity-0"
        )}
        onClick={close}
      />
      <div
        className={cx(
          "absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto bg-ivory transition-transform duration-700 ease-out motion-reduce:transition-none",
          animateIn ? "translate-x-0" : "translate-x-full"
        )}
      >
        <BookingPanelContent key={property?.slug ?? "default"} initialProperty={property} onClose={close} />
      </div>
    </div>
  );
}

function BookingPanelContent({
  initialProperty,
  onClose,
}: {
  initialProperty?: Property;
  onClose: () => void;
}) {
  const [propertySlug, setPropertySlug] = useState(initialProperty?.slug ?? PROPERTIES[0]?.slug ?? "");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const selected = PROPERTIES.find((p) => p.slug === propertySlug);
  const configured = isBookingEngineConfigured(selected);
  const bookingUrl = configured
    ? buildBookingUrl({ propertySlug, checkIn, checkOut, guests }, selected)
    : null;
  const mode = getBookingEngineMode();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!bookingUrl) return;
    if (mode === "redirect") {
      window.open(bookingUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-6 md:px-12">
        <p className="text-eyebrow">Book Your Stay</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking panel"
          className="text-eyebrow transition-opacity hover:opacity-60"
        >
          Close
        </button>
      </div>

      {selected && (
        <div className="relative h-48 w-full shrink-0 md:h-64">
          <PlaceholderMedia media={selected.heroMedia} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6 text-ivory md:left-12">
            <p className="text-eyebrow opacity-80">{selected.locationLabel}</p>
            <p className="text-display-sm">{selected.name}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-8 px-6 py-10 md:px-12">
        <label className="group relative flex flex-col gap-3">
          <span className="font-serif text-lg text-charcoal/45 transition-colors duration-300 group-focus-within:text-charcoal/80">
            Destination / Property
          </span>
          <select
            value={propertySlug}
            onChange={(e) => setPropertySlug(e.target.value)}
            className="field-control border-b border-charcoal/20 pb-2 pr-6 text-body-lg outline-none transition-colors duration-300 group-focus-within:border-charcoal/60"
          >
            {PROPERTIES.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} — {p.locationLabel}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-0 text-xs opacity-40">
            ⌄
          </span>
        </label>

        <div className="grid grid-cols-2 gap-6">
          <label className="group flex flex-col gap-3">
            <span className="font-serif text-lg text-charcoal/45 transition-colors duration-300 group-focus-within:text-charcoal/80">
              Check-in
            </span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="field-control border-b border-charcoal/20 pb-2 outline-none transition-colors duration-300 group-focus-within:border-charcoal/60"
            />
          </label>
          <label className="group flex flex-col gap-3">
            <span className="font-serif text-lg text-charcoal/45 transition-colors duration-300 group-focus-within:text-charcoal/80">
              Check-out
            </span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="field-control border-b border-charcoal/20 pb-2 outline-none transition-colors duration-300 group-focus-within:border-charcoal/60"
            />
          </label>
        </div>

        <label className="group flex flex-col gap-3">
          <span className="font-serif text-lg text-charcoal/45 transition-colors duration-300 group-focus-within:text-charcoal/80">
            Guests
          </span>
          <input
            type="number"
            min={1}
            max={16}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="field-control border-b border-charcoal/20 pb-2 outline-none transition-colors duration-300 group-focus-within:border-charcoal/60"
          />
        </label>

        <div className="mt-auto flex flex-col gap-4 pt-6">
          {!configured && (
            <p className="text-sm text-charcoal/55">
              The booking engine connection isn&rsquo;t configured yet — this panel is ready to
              hand off to it as soon as `NEXT_PUBLIC_BOOKING_ENGINE_URL` (or this property&rsquo;s
              `booking.engineUrl`) is set.
            </p>
          )}
          <button
            type="submit"
            disabled={!bookingUrl}
            className="w-full bg-charcoal py-5 text-eyebrow text-ivory transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Find Your Haven
          </button>
        </div>
      </form>
    </>
  );
}
