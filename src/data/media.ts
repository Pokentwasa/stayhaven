import type { GalleryCategory, GalleryImage, Media, MediaAspect } from "./types";

/**
 * Creates a placeholder media slot. `src` is intentionally empty — components
 * render a styled placeholder treatment (see `PlaceholderMedia`) whenever
 * `src` is empty. Used only where a real photo doesn't exist yet for a slot.
 */
export function placeholder(
  id: string,
  alt: string,
  aspect: MediaAspect = "landscape",
  type: Media["type"] = "image"
): Media {
  return { id, src: "", type, alt, aspect };
}

/** A real, local Salt+Haven photo. `src` is a path under /public (e.g. "/images/salt-haven/great-room-01.jpeg"). */
export function realMedia(id: string, alt: string, aspect: MediaAspect, src: string): Media {
  return { id, src, type: "image", alt, aspect };
}

/** Same as `realMedia`, but tagged with its gallery category for the full photo gallery. */
export function realGalleryImage(
  id: string,
  alt: string,
  aspect: MediaAspect,
  category: GalleryCategory,
  src: string
): GalleryImage {
  return { ...realMedia(id, alt, aspect, src), category };
}
