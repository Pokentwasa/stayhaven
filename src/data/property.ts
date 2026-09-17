import { galleryImage, stockPlaceholder } from "./media";
import type { GalleryCategory, GalleryImage, Property } from "./types";

/**
 * SALT+HAVEN — the one real Stay Haven property.
 *
 * All facts below (location, capacity, layout, amenities, house rules,
 * cancellation policy) come directly from the real Salt+Haven listing.
 * Copy has been edited for tone/length but no fact has been changed or
 * invented. Do not add rooms, amenities, pricing, activities or reviews
 * that aren't sourced from the real listing.
 *
 * Images are temporary Pacific-Northwest-cabin-styled Pexels stock photos
 * (see stockPhotos.ts) standing in for the real 53-photo library, already
 * organised into the 15 real categories so the swap is a data-only change.
 */

const galleryCounter: Partial<Record<GalleryCategory, number>> = {};

function nextGalleryImages(category: GalleryCategory, count: number, aspect: "portrait" | "landscape" | "square" = "landscape"): GalleryImage[] {
  const start = galleryCounter[category] ?? 0;
  galleryCounter[category] = start + count;
  return Array.from({ length: count }, (_, i) => {
    const n = start + i + 1;
    return galleryImage(
      `SALT_HAVEN_GALLERY_${category.toUpperCase()}_${String(n).padStart(2, "0")}`,
      `Salt+Haven — ${category} ${n}`,
      aspect,
      category,
      start + i
    );
  });
}

const gallery: GalleryImage[] = [
  ...nextGalleryImages("exterior", 4, "landscape"),
  ...nextGalleryImages("hoodCanal", 4, "landscape"),
  ...nextGalleryImages("greatRoom", 4, "landscape"),
  ...nextGalleryImages("kitchenDining", 4, "landscape"),
  ...nextGalleryImages("kingBedroom", 3, "landscape"),
  ...nextGalleryImages("queenBedroom", 3, "landscape"),
  ...nextGalleryImages("loft", 3, "landscape"),
  ...nextGalleryImages("bathrooms", 3, "landscape"),
  ...nextGalleryImages("hotTub", 4, "landscape"),
  ...nextGalleryImages("firePit", 4, "landscape"),
  ...nextGalleryImages("outdoorDining", 3, "landscape"),
  ...nextGalleryImages("deckPatio", 3, "landscape"),
  ...nextGalleryImages("detailLifestyle", 4, "portrait"),
  ...nextGalleryImages("sunsetAtmospheric", 5, "landscape"),
  ...nextGalleryImages("familyAmenity", 2, "landscape"),
];

function fromGallery(category: GalleryCategory, index: number) {
  const match = gallery.filter((g) => g.category === category)[index];
  if (!match) throw new Error(`No gallery image at ${category}[${index}]`);
  return match;
}

export const SALT_HAVEN: Property = {
  id: "salt-haven",
  slug: "salt-haven",
  name: "Salt+Haven",
  title: "NEW Waterfront A-Frame Cabin With Panoramic Views",
  location: {
    city: "Union",
    state: "Washington",
    country: "United States",
    region: "Hood Canal",
  },
  guests: 8,
  bedrooms: 3,
  bathrooms: 2,
  squareFeet: 1446,

  heroMedia: stockPlaceholder("SALT_HAVEN_HERO_MEDIA", "Salt+Haven A-frame exterior at dusk, Hood Canal", "ultrawide", "exterior"),
  heroTagline: "Water outside. Warmth within.",
  heroSupporting: "A private Pacific Northwest escape.",

  introHeading: "A quieter side of Washington.",
  introStatement:
    "Salt+Haven is a waterview A-frame on Hood Canal — three bedrooms, two baths, and room to sleep eight beneath vaulted wood ceilings. Panoramic water views, a covered hot tub, outdoor dining, and space enough to slow all the way down.",

  houseHeading: "1,446 square feet. Three levels. One view worth slowing down for.",
  houseStatement: "An A-frame, built to settle into.",
  houseDescription:
    "Vaulted wood ceilings draw the eye up and out toward the water. A great room for gathering, a fully equipped kitchen, a dedicated dining area, and quiet corners — including a private workspace — for the moments in between.",
  houseFacts: [
    "A-frame architecture",
    "1,446 sq ft across three levels",
    "Vaulted wood ceilings",
    "Great room",
    "Fully equipped kitchen",
    "Dedicated dining area",
    "Washer & dryer",
    "Two full bathrooms",
    "Private workspace",
  ],
  storyImages: [fromGallery("exterior", 1), fromGallery("greatRoom", 0), fromGallery("kitchenDining", 0)],

  viewHeading: "Hood Canal, from here.",
  viewStatement: "Salt+Haven sits along the Hood Canal waterfront in Union, Washington.",
  viewDescription:
    "Panoramic water views. Sunsets that hold the whole sky. Wildlife passing through, and quiet on every side. A road sits between the property and the waterline — this is a water-view retreat, not direct beach access — but from the deck, the hot tub and nearly every window, Hood Canal is always there.",
  viewImages: [fromGallery("hoodCanal", 0), fromGallery("hoodCanal", 1), fromGallery("sunsetAtmospheric", 0)],

  stayHeading: "An interior built for staying in.",
  stayStatement: "Vaulted ceilings, an open great room, and everything you need to cook, gather and unwind.",
  interiorHighlights: [
    {
      id: "stay-great-room",
      title: "Great Room",
      description: "Vaulted wood ceilings over an open living space, made for gathering.",
      image: fromGallery("greatRoom", 1),
    },
    {
      id: "stay-kitchen-dining",
      title: "Kitchen & Dining",
      description: "A fully equipped kitchen and a dedicated dining area for shared meals.",
      image: fromGallery("kitchenDining", 1),
    },
    {
      id: "stay-lounge",
      title: "Lounge & Entertainment",
      description: "A Smart TV, record player and board games for slow evenings in.",
      image: fromGallery("greatRoom", 2),
    },
    {
      id: "stay-comfort",
      title: "Comfort",
      description: "Fast 100+ Mbps Wi-Fi, heating and air conditioning throughout.",
      image: fromGallery("kitchenDining", 2),
    },
  ],

  outdoorHeading: "Outside is part of the stay.",
  outdoorStatement: "Stay out a little longer.",
  outdoorFeatures: [
    {
      id: "outside-hot-tub",
      title: "Hot Tub",
      description: "A private covered hot tub, ready any time of year.",
      image: fromGallery("hotTub", 0),
    },
    {
      id: "outside-fire-pit",
      title: "Fire Pit",
      description: "A propane fire pit for slow evenings outside.",
      image: fromGallery("firePit", 0),
    },
    {
      id: "outside-outdoor-dining",
      title: "Outdoor Dining",
      description: "A table for outdoor meals and a BBQ, with Hood Canal as the backdrop.",
      image: fromGallery("outdoorDining", 0),
    },
    {
      id: "outside-deck-patio",
      title: "Deck & Patio",
      description: "Deck and patio seating, plus a fenced area for dogs.",
      image: fromGallery("deckPatio", 0),
    },
  ],

  lifeAtHeading: "Life at Salt+Haven.",
  lifeAtMoments: [
    "Morning coffee overlooking the canal.",
    "Lunch outside.",
    "Afternoon exploring Union.",
    "Sunset from the deck.",
    "Hot tub after dark.",
    "Fire pit conversations.",
    "Record playing inside.",
  ],
  lifeAtBackgroundImage: fromGallery("sunsetAtmospheric", 1),

  sleepingHeading: "Sleeps eight, easily.",
  sleepingStatement: "Three bedrooms. Two bathrooms. Room enough for the whole group.",
  sleepingAreas: [
    {
      id: "sleeping-king",
      level: "Lower Level",
      name: "King Bedroom",
      description: "A king bedroom with its own en suite bathroom and a private workspace.",
      beds: "1 King bed",
      features: ["En suite bathroom", "Private workspace"],
      image: fromGallery("kingBedroom", 0),
    },
    {
      id: "sleeping-queen",
      level: "Main Level",
      name: "Queen Bedroom",
      description: "A queen bedroom on the main level.",
      beds: "1 Queen bed",
      features: [],
      image: fromGallery("queenBedroom", 0),
    },
    {
      id: "sleeping-loft",
      level: "Loft",
      name: "Loft",
      description: "An open loft with two twin beds, tucked beneath the A-frame's peak.",
      beds: "2 Twin beds",
      features: [],
      image: fromGallery("loft", 0),
    },
    {
      id: "sleeping-living-room",
      level: "Living Room",
      name: "Living Room",
      description: "A sofa bed in the living room for extra guests.",
      beds: "1 Sofa bed",
      features: [],
      image: fromGallery("greatRoom", 3),
    },
  ],

  amenityGroups: [
    {
      id: "essentials",
      title: "Essentials",
      items: ["Fast Wi-Fi (100+ Mbps)", "Air conditioning", "Heating", "Washer", "Dryer", "Linens", "Towels"],
    },
    {
      id: "kitchen",
      title: "Kitchen",
      items: [
        "Full kitchen",
        "Oven",
        "Stove",
        "Fridge",
        "Freezer",
        "Dishwasher",
        "Microwave",
        "Coffee maker",
        "Blender",
        "Toaster",
        "Cooking basics",
        "Pots & pans",
        "Dining table",
      ],
    },
    {
      id: "outdoor",
      title: "Outdoor",
      items: [
        "Covered hot tub",
        "Propane fire pit",
        "BBQ",
        "Outdoor dining",
        "Deck / patio",
        "Outdoor seating",
        "Fenced yard",
        "Water views",
      ],
    },
    {
      id: "family",
      title: "Family",
      items: ["Pack 'n Play", "Children's books and toys", "Children's dinnerware", "High chair", "Room-darkening shades"],
    },
    {
      id: "entertainment",
      title: "Entertainment",
      items: ["Smart TV", "Record player", "Board games"],
    },
    {
      id: "practical",
      title: "Practical",
      items: [
        "EV charger",
        "Free on-site parking",
        "Contactless check-in",
        "Private entrance",
        "Workspace",
        "First aid kit",
        "Smoke detector",
        "Carbon monoxide detector",
        "Fire extinguisher",
      ],
    },
  ],
  fullAmenities: [],

  neighbourhood: {
    heading: "Quiet enough to disappear. Close enough to explore.",
    description:
      "Salt+Haven is located in Union, Washington, on Hood Canal — an area known for boating, fishing, hiking, golf, wildlife, water views, sunsets, dining and outdoor recreation.",
    activities: [
      "Boating",
      "Fishing",
      "Hiking",
      "Golf",
      "Wildlife watching",
      "Water views",
      "Sunsets",
      "Dining",
      "Outdoor recreation",
    ],
    transitNote: "A personal vehicle is strongly recommended. Roads can be dark and winding at night.",
    parkingNote: "Free on-site parking is available.",
    evChargerNote: "A Tesla Universal Wall Connector is available for compatible EVs.",
    heroImage: fromGallery("hoodCanal", 2),
  },

  gallery,

  houseRules: [
    { id: "check-in", title: "Check-in", description: "Contactless self check-in via smart lock. Access details provided before arrival." },
    { id: "occupancy", title: "Occupancy", description: "Maximum 8 registered guests." },
    { id: "pets", title: "Pets", description: "Dogs allowed with prior approval. Maximum 2 pets. $100 fee per pet, per stay." },
    { id: "quiet-hours", title: "Quiet hours", description: "10 PM – 8 AM." },
    { id: "smoking", title: "Smoking", description: "No smoking or vaping inside." },
    { id: "events", title: "Events", description: "No parties, weddings, receptions or unauthorised gatherings." },
    { id: "waterfront", title: "Waterfront", description: "No direct beach access. Children and pets must be supervised outside." },
    { id: "stairs", title: "Stairs", description: "The home has three levels. Guests should be comfortable using stairs." },
    { id: "security", title: "Security", description: "Exterior security cameras monitor outdoor areas only." },
    { id: "rental-agreement", title: "Rental agreement", description: "Guests must electronically sign the Salt+Haven rental agreement before check-in." },
  ],

  cancellationPolicy: [
    { id: "tier-1", window: "30+ days before check-in", refund: "Full refund" },
    { id: "tier-2", window: "7–30 days before check-in", refund: "50% refund" },
    { id: "tier-3", window: "Fewer than 7 days before check-in", refund: "Non-refundable, excluding applicable refundable taxes" },
    {
      id: "tier-4",
      window: "Within 24 hours of booking",
      refund: "Full refund, if the reservation was confirmed at least 7 days before check-in",
    },
    {
      id: "tier-5",
      window: "No-shows, late arrivals or early departures",
      refund: "No refunds, except where required by law or booking platform policy",
    },
  ],

  booking: {
    engineId: null,
    engineUrl: null,
    priceFrom: null,
    currency: "USD",
  },
};

SALT_HAVEN.fullAmenities = SALT_HAVEN.amenityGroups.flatMap((g) => g.items);

export const PROPERTIES: Property[] = [SALT_HAVEN];

export const isSinglePropertyMode = PROPERTIES.length <= 1;

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getPrimaryProperty(): Property {
  return PROPERTIES[0] ?? SALT_HAVEN;
}
