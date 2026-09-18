import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single place where GSAP plugins are registered. Every component that
 * needs ScrollTrigger imports `gsap` from here instead of calling
 * `gsap.registerPlugin` itself — registering twice is harmless, but this
 * keeps it to one call site and one import path.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
