import { stockPlaceholder } from "./media";
import type { Destination } from "./types";

/**
 * PLACEHOLDER DATA — replace with real Stay Haven destinations.
 * `coordinates` are percentage positions (0-100) on the abstract destination
 * map in <DestinationExplorer />; adjust once real destinations are known.
 * Hero images are temporary Pexels stock photos (see stockPhotos.ts).
 */
export const DESTINATIONS: Destination[] = [
  {
    id: "destination-01",
    slug: "destination-01",
    name: "DESTINATION_01",
    region: "DESTINATION_01_REGION",
    description: "DESTINATION_01_DESCRIPTION",
    heroImage: stockPlaceholder("DESTINATION_01_HERO_IMAGE", "coastal beach aerial view", "landscape", "beach"),
    coordinates: { x: 28, y: 62 },
  },
  {
    id: "destination-02",
    slug: "destination-02",
    name: "DESTINATION_02",
    region: "DESTINATION_02_REGION",
    description: "DESTINATION_02_DESCRIPTION",
    heroImage: stockPlaceholder("DESTINATION_02_HERO_IMAGE", "mountain landscape at sunrise", "landscape", "mountain"),
    coordinates: { x: 58, y: 38 },
  },
  {
    id: "destination-03",
    slug: "destination-03",
    name: "DESTINATION_03",
    region: "DESTINATION_03_REGION",
    description: "DESTINATION_03_DESCRIPTION",
    heroImage: stockPlaceholder("DESTINATION_03_HERO_IMAGE", "european cobblestone city street", "landscape", "cityStreet"),
    coordinates: { x: 76, y: 70 },
  },
];
