import type { Media } from "@/data/types";
import { cx } from "@/lib/utils";

const ASPECT_CLASS: Record<Media["aspect"], string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  ultrawide: "aspect-[21/9]",
};

/**
 * Renders real media when `media.src` is populated; otherwise renders a
 * quiet, correctly-sized placeholder that names the data slot so it is
 * obvious what image/video belongs there once supplied.
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
  if (media.src) {
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
        />
      );
    }
    // Real <Image> wiring intentionally deferred until real asset paths exist.
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={cx(ASPECT_CLASS[media.aspect], "h-full w-full object-cover", className)}
        src={media.src}
        alt={media.alt}
        loading={priority ? "eager" : "lazy"}
        sizes={fill ? sizes : undefined}
      />
    );
  }

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
