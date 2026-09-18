import { realMedia } from "./media";
import { SALT_HAVEN_IMAGES } from "./images";
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
 * Images come from the audited manifest in ./images.ts (49 real photos).
 * `deckPatio` currently has no dedicated photo in the library (deck/patio
 * views appear inside `exterior` shots instead) — its gallery group stays
 * empty rather than reusing an unrelated image.
 */

const gallery: GalleryImage[] = SALT_HAVEN_IMAGES.map((img) => ({
  id: img.id,
  src: img.src,
  type: "image",
  alt: img.alt,
  aspect: img.orientation,
  category: img.category,
}));

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

  heroMedia: realMedia(
    "SALT_HAVEN_HERO_MEDIA",
    "Salt+Haven's A-frame exterior and hot tub gazebo at dusk, Hood Canal",
    "ultrawide",
    "/images/salt-haven/exterior-04.jpeg"
  ),
  heroTagline: "A-frame living on Hood Canal.",

  houseHeading: "The house.",
  houseStatement: "1,446 square feet across three levels.",
  houseDescription:
    "Vaulted wood ceilings draw the eye up and out toward the water. A great room for gathering, a full kitchen, a dining area, and quiet corners — including a private workspace — for the moments in between.",
  houseFacts: [
    "A-frame architecture",
    "Vaulted wood ceilings",
    "Great room",
    "Full kitchen",
    "Dining area",
    "Washer & dryer",
    "Private workspace",
  ],
  viewStatement:
    "Salt+Haven looks across Hood Canal from Union, Washington, with changing light, wildlife and long waterfront sunsets.",
  viewDescription: "No direct beach access. A road runs between the property and waterfront.",

  stayHeading: "Inside.",
  stayStatement: "Warm wood. Open space. Everything you need.",
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

  outdoorHeading: "Outside counts too.",
  outdoorStatement: "Hot tub after dark. Dinner outside. Fire going. Canal in front of you.",
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
      image: fromGallery("exterior", 1),
    },
  ],

  sleepingHeading: "Room for eight.",
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
      id: "comfort",
      title: "Comfort",
      items: ["Fast Wi-Fi (100+ Mbps)", "Heating", "Air conditioning", "Linens", "Towels", "Washer", "Dryer"],
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
      id: "outside",
      title: "Outside",
      items: [
        "Covered hot tub",
        "Fire pit",
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
    heading: "Your base on Hood Canal.",
    description: "Union is a quiet Hood Canal community surrounded by water, forest and outdoor recreation.",
    activities: ["Boating", "Fishing", "Hiking", "Golf", "Wildlife", "Sunsets", "Local dining"],
    transitNote: "A personal vehicle is recommended. Roads can be dark and winding at night.",
    parkingNote: "Free on-site parking is available.",
    evChargerNote: "Tesla Universal Wall Connector available on-site.",
    heroImage: fromGallery("hoodCanal", 0),
  },

  gallery,

  houseRules: [
    { id: "check-in", title: "Check-in", description: "Contactless smart lock." },
    { id: "pets", title: "Pets", description: "Dogs by prior approval. Maximum two. $100 per pet per stay." },
    { id: "quiet-hours", title: "Quiet hours", description: "10 PM – 8 AM." },
    { id: "occupancy", title: "Occupancy", description: "Maximum eight registered guests." },
    { id: "events", title: "Events", description: "No parties or unauthorised gatherings." },
    { id: "smoking", title: "Smoking", description: "No smoking or vaping inside." },
    {
      id: "safety",
      title: "Safety",
      description: "Children and pets must be supervised outdoors, near the deck, waterfront, stairs and hot tub.",
    },
    { id: "security", title: "Security", description: "Exterior cameras monitor outdoor areas only." },
    { id: "rental-agreement", title: "Rental agreement", description: "Electronic agreement required before check-in." },
  ],

  storyMoments: [
    {
      id: "story-house",
      eyebrow: "01 / 03",
      title: "The House",
      statement:
        "An A-frame on Hood Canal, its vaulted wood ceilings drawing the eye up and out toward the water.",
      cta: { label: "Step inside", href: "#the-house" },
      image: fromGallery("exterior", 2),
    },
    {
      id: "story-outside",
      eyebrow: "02 / 03",
      title: "Outside",
      statement: "Hot tub after dark. Fire going. Dinner outside. Hood Canal in front of you.",
      cta: { label: "See outside", href: "#experience" },
      image: fromGallery("firePit", 0),
    },
    {
      id: "story-view",
      eyebrow: "03 / 03",
      title: "The View",
      statement: "Changing light, wildlife and long waterfront sunsets, from nearly every room.",
      cta: { label: "Explore Hood Canal", href: "#hood-canal" },
      image: fromGallery("hoodCanal", 0),
    },
  ],

  experienceScenes: [
    {
      id: "scene-settle-in",
      title: "Settle In",
      description: "A king bedroom with its own workspace and a water view — the moment you first put your bags down.",
      image: fromGallery("kingBedroom", 0),
    },
    {
      id: "scene-gather",
      title: "Gather",
      description: "Vaulted ceilings over an open great room, made for the whole group to end up in one place.",
      image: fromGallery("greatRoom", 0),
    },
    {
      id: "scene-step-out",
      title: "Step Out",
      description: "A table for outdoor meals and a BBQ, with Hood Canal as the backdrop.",
      image: fromGallery("outdoorDining", 0),
    },
    {
      id: "scene-unwind",
      title: "Unwind",
      description: "A private, covered hot tub at sunset — the reason you came.",
      image: fromGallery("hotTub", 1),
    },
  ],

  featuredStatement: "Water outside.\nWarmth within.",
  featuredGallery: [
    fromGallery("greatRoom", 1),
    fromGallery("queenBedroom", 0),
    fromGallery("hotTub", 0),
    fromGallery("sunsetAtmospheric", 0),
  ],

  hoodCanalMoments: [
    {
      id: "hood-canal-water",
      name: "The Water",
      region: "Hood Canal",
      description: "Union sits on Hood Canal, with changing light and long waterfront sunsets across the water.",
      heroImage: fromGallery("hoodCanal", 1),
    },
    {
      id: "hood-canal-outdoors",
      name: "The Outdoors",
      region: "Union, Washington",
      description: "A fenced yard, a covered hot tub and a deck built for being outside, whatever the season.",
      heroImage: fromGallery("exterior", 1),
    },
    {
      id: "hood-canal-quiet",
      name: "The Quiet",
      region: "Hood Canal",
      description: "Dark roads, wildlife and a quiet after ten — the kind of quiet that's hard to find.",
      heroImage: fromGallery("sunsetAtmospheric", 0),
    },
  ],

  goodToKnow: [
    { id: "gtk-arrival", title: "Contactless Arrival", description: "Skip the front desk. A smart lock gets you in the moment you arrive." },
    { id: "gtk-dog", title: "Bring the Dog", description: "Dogs are welcome by prior approval, with a fenced yard of their own." },
    { id: "gtk-guests", title: "Room for Eight", description: "Three bedrooms, a loft and a sofa bed — space for the whole group." },
    { id: "gtk-levels", title: "Three Levels", description: "The A-frame unfolds across three levels, each with its own reason to linger." },
    { id: "gtk-views", title: "Waterfront Views", description: "Hood Canal and the Olympic Mountains, framed from nearly every room." },
    { id: "gtk-quiet", title: "Quiet After Ten", description: "Quiet hours run from 10 PM, so every stay stays peaceful." },
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
