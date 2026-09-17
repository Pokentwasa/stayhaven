"use client";

import type { Property } from "@/data/types";
import { useBooking } from "./BookingContext";
import { cx } from "@/lib/utils";

export function BookingTrigger({
  property,
  className,
  children,
}: {
  property?: Property;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open(property)}
      className={cx("text-eyebrow transition-opacity duration-300 hover:opacity-60", className)}
    >
      {children}
    </button>
  );
}
