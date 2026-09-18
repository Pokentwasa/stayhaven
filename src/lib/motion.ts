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

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** Shared z-index scale for the connective transition layer between sections. */
export const Z = {
  content: 10,
  transition: 20,
  header: 50,
  loading: 100,
};

/** Height and duration tokens for the connective scenes between homepage sections. */
export const TRANSITION = {
  /** Desktop pinned scroll distance for a connective scene, in viewport heights. */
  scrollLength: "60%",
  /** Mobile/no-pin fallback: a short, unpinned strip instead. */
  mobileHeightClass: "h-[22vh]",
  desktopHeightClass: "h-[60vh]",
};

