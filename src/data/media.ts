import type { GalleryCategory, GalleryImage, Media, MediaAspect } from "./types";
import { stockPhotoUrl } from "./stockPhotos";

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

/**
 * Same slot shape as `placeholder`, but filled with a real (freely-licensed,
 * generic) Pexels stock photo so the site previews with actual imagery
 * instead of gray boxes. `id` keeps the original placeholder token so the
 * slot is still unambiguous about what real Salt+Haven photo belongs there —
 * only `src`/`alt` differ. See src/data/stockPhotos.ts.
 */
export function stockPlaceholder(
  id: string,
  alt: string,
  aspect: MediaAspect,
  category: GalleryCategory,
  index = 0
): Media {
  return {
    id,
    src: stockPhotoUrl(category, index, aspect === "portrait" ? 1000 : 1600),
    type: "image",
    alt: `Placeholder stock photo (Pexels) — ${alt}`,
    aspect,
  };
}

/** Same as `stockPlaceholder`, but tagged with its gallery category for the full 53-photo gallery. */
export function galleryImage(
  id: string,
  alt: string,
  aspect: MediaAspect,
  category: GalleryCategory,
  index = 0
): GalleryImage {
  return { ...stockPlaceholder(id, alt, aspect, category, index), category };
}
