/** Shared cinematic motion tokens — kept in one place so pacing stays consistent site-wide. */
export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  soft: "sine.out",
};

export const DURATION = {
  fast: 0.6,
  base: 1,
  slow: 1.6,
  chapter: 2.2,
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
