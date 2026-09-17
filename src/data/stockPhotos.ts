/**
 * Curated pool of real, freely-licensed Pexels stock photos used as VISUAL
 * placeholders only (Pexels License — free to use, no attribution required:
 * https://www.pexels.com/license/). These are generic stock images, not
 * real Stay Haven Collection photography — every usage keeps its original
 * placeholder token as `id`/alt-text seed so it stays obvious what still
 * needs to be replaced once real property photography is supplied.
 *
 * Swap these out by editing this file alone; nothing downstream needs to
 * change shape.
 */

export type StockCategory =
  | "villaExterior"
  | "pool"
  | "bedroom"
  | "bathroom"
  | "livingRoom"
  | "dining"
  | "lobby"
  | "spa"
  | "beach"
  | "forestCabin"
  | "cityStreet"
  | "breakfast"
  | "mountain"
  | "rooftop";

const POOL: Record<StockCategory, number[]> = {
  villaExterior: [31817156, 29453302, 24807132, 26859026],
  pool: [30615187, 31359181, 30037427, 6437583],
  bedroom: [7786785, 31728406, 28843330, 15273732],
  bathroom: [19141076, 33829528, 3741317, 19227243],
  livingRoom: [4468806, 6035369, 6782369, 5825398],
  dining: [29616285, 11160491, 28059316, 5116976],
  lobby: [31080809, 6758532, 18426842],
  spa: [19695969],
  beach: [18245896, 14805497, 7245083],
  forestCabin: [10583840, 28965545, 14295339, 14267367],
  cityStreet: [35319765, 28508990, 30718801, 3888048],
  breakfast: [34232215, 12716046, 4279, 5720774],
  mountain: [34584160, 1266810, 35483575, 8936637],
  rooftop: [12333626, 19718653, 16135943, 2725479],
};

/** Builds a Pexels CDN hotlink URL (Pexels License permits this for free, no key required). */
export function pexelsUrl(id: number, width = 1600): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Deterministically picks an image from a category pool so repeat calls with the same index stay stable. */
export function stockPhotoUrl(category: StockCategory, index = 0, width = 1600): string {
  const ids = POOL[category];
  const id = ids[index % ids.length]!;
  return pexelsUrl(id, width);
}
