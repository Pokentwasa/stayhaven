import type { Media, MediaAspect } from "./types";

/**
 * Creates a placeholder media slot. `src` is intentionally empty until real
 * photography/video is supplied — components render a styled placeholder
 * treatment (see `PlaceholderMedia`) whenever `src` is empty.
 */
export function placeholder(
  id: string,
  alt: string,
  aspect: MediaAspect = "landscape",
  type: Media["type"] = "image"
): Media {
  return { id, src: "", type, alt, aspect };
}
