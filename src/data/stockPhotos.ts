import type { GalleryCategory } from "./types";

/**
 * Curated pool of real, freely-licensed Pexels stock photos used as VISUAL
 * placeholders only (Pexels License — free to use, no attribution required:
 * https://www.pexels.com/license/) until the real 53-photo Salt+Haven
 * library is supplied. Categories match `GalleryCategory` 1:1 so the same
 * classification the real photos will use already drives the whole site.
 *
 * These are generic Pacific-Northwest-cabin-styled stock images, NOT real
 * Salt+Haven photography — every usage keeps its data-slot token as `id`/
 * alt-text seed so it stays obvious what still needs replacing.
 */
const POOL: Record<GalleryCategory, number[]> = {
  exterior: [14295338, 5708937, 10583840, 28965545, 14295339, 14267367],
  hoodCanal: [30948820, 35091112, 18158387, 346529, 13894088, 289561, 417074, 275538],
  greatRoom: [29141327, 29887320, 5865276, 4468806, 6035369, 6782369, 5825398],
  kitchenDining: [4221389, 3946661, 3946660, 29616285, 11160491],
  kingBedroom: [19737839, 30708776, 7786785, 31728406],
  queenBedroom: [34767464, 28843330, 15273732, 30708776],
  loft: [7786785, 31728406, 28843330, 15273732],
  bathrooms: [19141076, 33829528, 3741317, 19227243],
  hotTub: [30615187, 31359181, 30037427, 6437583],
  firePit: [2278646, 9355602, 29279929, 6799821],
  outdoorDining: [29616285, 11160491, 28059316, 5116976],
  deckPatio: [10583840, 28965545, 14295339, 14267367],
  detailLifestyle: [34232215, 12716046, 4279, 5720774],
  sunsetAtmospheric: [37981, 16099949, 17068948, 30755997, 28152629, 10781049],
  familyAmenity: [4468806, 6035369, 6782369, 5825398],
};

/** Builds a Pexels CDN hotlink URL (Pexels License permits this for free, no key required). */
export function pexelsUrl(id: number, width = 1600): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Deterministically picks an image from a category pool so repeat calls with the same index stay stable. */
export function stockPhotoUrl(category: GalleryCategory, index = 0, width = 1600): string {
  const ids = POOL[category];
  const id = ids[index % ids.length]!;
  return pexelsUrl(id, width);
}
