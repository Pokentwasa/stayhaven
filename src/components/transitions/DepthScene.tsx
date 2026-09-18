"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { prefersReducedMotion, Z } from "@/lib/motion";
import type { Media } from "@/data/types";
import type { DepthLayer } from "./DepthSceneCanvas";

const DepthSceneCanvas = dynamic(() => import("./DepthSceneCanvas").then((m) => m.DepthSceneCanvas), {
  ssr: false,
});

/**
 * Hood Canal -> Moments. Moving physically through Salt+Haven: the one
 * WebGL moment on the page, three photographs at increasing depth that the
 * camera dollies toward as the user scrolls. Lazy-mounted only once the
 * section is near the viewport, and replaced outright by a plain crossfade
 * under prefers-reduced-motion — no Three.js is loaded at all in that case.
 */
export function DepthScene({ layers, fallback }: { layers: [Media, Media, Media]; fallback: Media }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  // Defaults to false so the first client render matches the server's
  // (motion-unaware) markup; the real preference is only known post-mount.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [reduced]);

  if (reduced) {
    return (
      <div
        ref={rootRef}
        aria-hidden="true"
        data-transition
        className="relative h-[22vh] w-full overflow-hidden bg-warm-black md:h-[60vh]"
        style={{ zIndex: Z.transition }}
      >
        <PlaceholderMedia media={fallback} className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-black/40 via-transparent to-warm-black/60" />
      </div>
    );
  }

  const depthLayers: DepthLayer[] = layers.map((media, i) => ({ src: media.src, z: -(i + 1) * 4 }));

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-transition
      className="relative h-[22vh] w-full overflow-hidden bg-warm-black md:h-[85vh]"
      style={{ zIndex: Z.transition }}
    >
      {nearViewport && depthLayers.every((l) => l.src) ? (
        <DepthSceneCanvas layers={depthLayers} rootRef={rootRef} />
      ) : (
        <PlaceholderMedia media={fallback} className="absolute inset-0 opacity-70" />
      )}
    </div>
  );
}
