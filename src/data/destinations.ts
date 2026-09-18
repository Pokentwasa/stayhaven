import { realMedia } from "./media";
import type { Destination } from "./types";

/**
 * Stay Haven currently operates one property, on Hood Canal in Union,
 * Washington. These three entries are three real facets of that one place
 * — not three separate destinations — so the destination-index interaction
 * stays intact without implying a collection that doesn't exist yet.
 */
export const DESTINATIONS: Destination[] = [
  {
    id: "destination-water",
    slug: "hood-canal",
    name: "The Water",
    region: "Hood Canal",
    description:
      "Union sits right on Hood Canal, with changing light, wildlife and long waterfront sunsets across the water.",
    heroImage: realMedia(
      "DESTINATION_WATER_HERO_IMAGE",
      "Vaulted living room, full-height window over Hood Canal",
      "landscape",
      "/images/salt-haven/great-room-02.jpeg"
    ),
    coordinates: { x: 28, y: 62 },
  },
  {
    id: "destination-outdoors",
    slug: "the-outdoors",
    name: "The Outdoors",
    region: "Hood Canal",
    description: "A fenced yard, a covered hot tub and a deck built for being outside, whatever the season.",
    heroImage: realMedia(
      "DESTINATION_OUTDOORS_HERO_IMAGE",
      "Aerial view of the deck, hot tub gazebo and fenced yard",
      "landscape",
      "/images/salt-haven/exterior-02.jpeg"
    ),
    coordinates: { x: 58, y: 38 },
  },
  {
    id: "destination-quiet",
    slug: "the-quiet",
    name: "The Quiet",
    region: "Hood Canal",
    description: "Dark roads, wildlife and a quiet after ten — the kind of quiet that's hard to find.",
    heroImage: realMedia(
      "DESTINATION_QUIET_HERO_IMAGE",
      "The A-frame entrance at dusk, string lights lit",
      "wide",
      "/images/salt-haven/exterior-01.jpeg"
    ),
    coordinates: { x: 76, y: 70 },
  },
];
