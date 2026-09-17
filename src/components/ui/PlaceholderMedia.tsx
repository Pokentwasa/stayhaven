"use client";

import { useState } from "react";
import Image from "next/image";
import type { Media } from "@/data/types";
import { cx } from "@/lib/utils";

const ASPECT_CLASS: Record<Media["aspect"], string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  ultrawide: "aspect-[21/9]",
};

function Fallback({ media, className }: { media: Media; className?: string }) {
  return (
    <div
      role="img"
      aria-label={media.alt}
      className={cx(
        ASPECT_CLASS[media.aspect],
        "relative flex h-full w-full items-end justify-start overflow-hidden bg-gradient-to-br from-stone/60 via-sand to-stone/40 p-4",
        className
      )}
    >
      <span className="text-eyebrow text-charcoal/45">{media.id}</span>
    </div>
  );
}

/**
 * Renders real media when `media.src` is populated; otherwise (or if the
 * asset fails to load — a blocked/expired/offline source) falls back to a
 * quiet, correctly-sized placeholder that names the data slot, rather than a
 * broken-image icon or raw alt text spilling out of its frame.
 */
export function PlaceholderMedia({
  media,
  className,
  priority = false,
  sizes = "100vw",
  fill = true,
}: {
  media: Media;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (!media.src || failed) {
    return <Fallback media={media} className={className} />;
  }

  if (media.type === "video") {
    return (
      <video
        className={cx(ASPECT_CLASS[media.aspect], "h-full w-full object-cover", className)}
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        aria-label={media.alt}
        onError={() => setFailed(true)}
      />
    );
  }

  // Local assets (the real Salt+Haven photo library) get Next's optimized
  // Image component. An external/unconfigured remote URL falls back to a
  // plain <img> instead of erroring at build time.
  if (media.src.startsWith("/")) {
    return (
      <Image
        className={cx(ASPECT_CLASS[media.aspect], "h-full w-full object-cover", className)}
        src={media.src}
        alt={media.alt}
        fill
        priority={priority}
        sizes={fill ? sizes : undefined}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cx(ASPECT_CLASS[media.aspect], "h-full w-full object-cover", className)}
      src={media.src}
      alt={media.alt}
      loading={priority ? "eager" : "lazy"}
      sizes={fill ? sizes : undefined}
      onError={() => setFailed(true)}
    />
  );
}
