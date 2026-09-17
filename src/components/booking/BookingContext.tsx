"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Property } from "@/data/types";

interface BookingState {
  isOpen: boolean;
  property?: Property;
  open: (property?: Property) => void;
  close: () => void;
}

const BookingContext = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [property, setProperty] = useState<Property | undefined>(undefined);

  const open = useCallback((p?: Property) => {
    setProperty(p);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, property, open, close }), [isOpen, property, open, close]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
