import { placeholder } from "./media";
import type { Destination } from "./types";

/**
 * PLACEHOLDER DATA — replace with real Stay Haven destinations.
 * `coordinates` are percentage positions (0-100) on the abstract destination
 * map in <DestinationExplorer />; adjust once real destinations are known.
 */
export const DESTINATIONS: Destination[] = [
  {
    id: "destination-01",
    slug: "destination-01",
    name: "DESTINATION_01",
    region: "DESTINATION_01_REGION",
    description: "DESTINATION_01_DESCRIPTION",
    heroImage: placeholder("DESTINATION_01_HERO_IMAGE", "DESTINATION_01 landscape", "landscape"),
    coordinates: { x: 28, y: 62 },
  },
  {
    id: "destination-02",
    slug: "destination-02",
    name: "DESTINATION_02",
    region: "DESTINATION_02_REGION",
    description: "DESTINATION_02_DESCRIPTION",
    heroImage: placeholder("DESTINATION_02_HERO_IMAGE", "DESTINATION_02 landscape", "landscape"),
    coordinates: { x: 58, y: 38 },
  },
  {
    id: "destination-03",
    slug: "destination-03",
    name: "DESTINATION_03",
    region: "DESTINATION_03_REGION",
    description: "DESTINATION_03_DESCRIPTION",
    heroImage: placeholder("DESTINATION_03_HERO_IMAGE", "DESTINATION_03 landscape", "landscape"),
    coordinates: { x: 76, y: 70 },
  },
];
