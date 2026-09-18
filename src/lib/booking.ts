import type { Property, Room } from "@/data/types";

export interface BookingQuery {
  propertySlug?: string;
  roomSlug?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

/**
 * Integration seam for the existing Stay Haven booking engine.
 *
 * This deliberately does not implement availability/payment logic — that
 * already exists on the current booking system. It only builds the URL to
 * hand off to it, using whichever config is available:
 *
 *   1. `property.booking.engineUrl` — a direct deep link for this property.
 *   2. `NEXT_PUBLIC_BOOKING_ENGINE_URL` (+ optional site id) — a generic
 *      engine base URL with query params appended.
 *   3. Neither configured — returns null, and calling UI should show a
 *      "booking opens soon" state instead of a dead link.
 */
export function getBookingEngineMode(): "iframe" | "redirect" {
  return process.env.NEXT_PUBLIC_BOOKING_ENGINE_MODE === "iframe" ? "iframe" : "redirect";
}

export function buildBookingUrl(query: BookingQuery, property?: Property, room?: Room): string | null {
  if (property?.booking.engineUrl) {
    return appendParams(property.booking.engineUrl, query, property, room);
  }

  const base = process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL;
  if (!base) return null;

  return appendParams(base, query, property, room);
}

function appendParams(base: string, query: BookingQuery, property?: Property, room?: Room): string {
  const url = new URL(base);
  const siteId = process.env.NEXT_PUBLIC_BOOKING_ENGINE_SITE_ID;

  if (siteId) url.searchParams.set("site", siteId);
  if (property?.booking.engineId) url.searchParams.set("property", property.booking.engineId);
  if (room?.bookingEngineRoomId) url.searchParams.set("room", room.bookingEngineRoomId);
  if (query.checkIn) url.searchParams.set("checkin", query.checkIn);
  if (query.checkOut) url.searchParams.set("checkout", query.checkOut);
  if (query.guests) url.searchParams.set("guests", String(query.guests));

  return url.toString();
}

export function isBookingEngineConfigured(property?: Property): boolean {
  return Boolean(property?.booking.engineUrl || process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL);
}
