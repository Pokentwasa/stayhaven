import { realGalleryImage, realMedia } from "./media";
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
 * Images are the real Salt+Haven photo library (49 unique photos), stored
 * under /public/images/salt-haven and organised into the 15 real gallery
 * categories. `deckPatio` currently has no dedicated photo in the library
 * (deck/patio views appear inside `exterior` shots instead) — its gallery
 * group stays empty rather than reusing an unrelated image.
 */

const GALLERY_MANIFEST: Record<GalleryCategory, { file: string; alt: string }[]> = {
  exterior: [
    { file: "exterior-01.jpeg", alt: "Salt+Haven's A-frame entry and carport at dusk, string lights lit" },
    { file: "exterior-02.jpeg", alt: "Aerial view of Salt+Haven's deck, hot tub gazebo and fenced yard" },
    { file: "exterior-03.jpeg", alt: "Salt+Haven's A-frame exterior with Hood Canal and the Olympic Mountains behind" },
    { file: "exterior-04.jpeg", alt: "Salt+Haven's A-frame exterior and hot tub gazebo at dusk" },
  ],
  hoodCanal: [
    { file: "hood-canal-01.jpeg", alt: "Salt+Haven's A-frame roofline seen across Hood Canal, with the road and waterline below" },
    { file: "hood-canal-02.jpeg", alt: "Hood Canal and the Olympic Mountains, seen from a Salt+Haven window" },
  ],
  greatRoom: [
    { file: "great-room-01.jpeg", alt: "Salt+Haven's vaulted great room, kitchen and loft ladder" },
    { file: "great-room-02.jpeg", alt: "Vaulted living room with a full-height window over Hood Canal" },
    { file: "great-room-03.jpeg", alt: "Dining table beneath the vaulted ceiling, Hood Canal beyond" },
    { file: "great-room-04.jpeg", alt: "Living room seating beneath the A-frame's peak" },
    { file: "great-room-05.jpeg", alt: "Upper living room opening onto the deck and Hood Canal" },
    { file: "great-room-06.jpeg", alt: "Living room sofa facing the deck, fire pit and water beyond" },
    { file: "great-room-07.jpeg", alt: "View down into the great room from the loft" },
    { file: "great-room-08.jpeg", alt: "Lower-level lounge with Smart TV and workspace" },
  ],
  kitchenDining: [
    { file: "kitchen-dining-01.jpeg", alt: "Kitchen island and bar seating beneath the vaulted ceiling" },
    { file: "kitchen-dining-02.jpeg", alt: "Kitchen and living area with Hood Canal through the windows" },
    { file: "kitchen-dining-03.jpeg", alt: "Kitchen island, refrigerator and stairs to the loft" },
    { file: "kitchen-dining-04.jpeg", alt: "Dining table with the loft staircase and kitchen behind" },
    { file: "kitchen-dining-05.jpeg", alt: "Dishware and glassware in the kitchen cabinet" },
    { file: "kitchen-dining-06.jpeg", alt: "Pantry staples and cookbooks in the kitchen" },
    { file: "kitchen-dining-07.jpeg", alt: "Kitchen utensils and tools" },
    { file: "kitchen-dining-08.jpeg", alt: "Stove, microwave and coffee station" },
    { file: "kitchen-dining-09.jpeg", alt: "Pots and pans in the kitchen cabinet" },
    { file: "kitchen-dining-10.jpeg", alt: "Coffee and tea station in the kitchen" },
  ],
  kingBedroom: [
    { file: "king-bedroom-01.jpeg", alt: "King bedroom with a private workspace and water view" },
    { file: "king-bedroom-02.jpeg", alt: "Bedroom with in-room laundry and a walk-in closet" },
  ],
  queenBedroom: [
    { file: "queen-bedroom-01.jpeg", alt: "Queen bedroom opening onto the deck, with Hood Canal beyond" },
    { file: "queen-bedroom-02.jpeg", alt: "Bedroom balcony over Hood Canal and the Olympic Mountains" },
  ],
  loft: [
    { file: "loft-01.jpeg", alt: "Loft with two twin beds beneath the A-frame's peak" },
    { file: "loft-02.jpeg", alt: "Loft overlooking the staircase and deck below" },
  ],
  bathrooms: [
    { file: "bathroom-01.jpeg", alt: "Bathroom with a walk-in shower" },
    { file: "bathroom-02.jpeg", alt: "Bathroom vanity beneath the sloped ceiling" },
    { file: "bathroom-03.jpeg", alt: "Bathroom storage beneath the sink" },
    { file: "bathroom-04.jpeg", alt: "Bathroom vanity and mirror" },
    { file: "bathroom-05.jpeg", alt: "Folded towels on a bathroom shelf" },
  ],
  hotTub: [
    { file: "hot-tub-01.jpeg", alt: "Covered hot tub gazebo with loungers" },
    { file: "hot-tub-02.jpeg", alt: "Hot tub at sunset, overlooking Hood Canal" },
  ],
  firePit: [{ file: "fire-pit-01.jpeg", alt: "Adirondack chairs around the propane fire pit, Hood Canal beyond" }],
  outdoorDining: [{ file: "outdoor-dining-01.jpeg", alt: "Outdoor dining table and BBQ on the deck, overlooking Hood Canal" }],
  deckPatio: [],
  detailLifestyle: [
    { file: "detail-01.jpeg", alt: "Tesla Universal Wall Connector EV charger" },
    { file: "detail-02.jpeg", alt: "Record player and vinyl collection" },
    { file: "detail-03.jpeg", alt: "Gate sign confirming no direct beach access" },
    { file: "detail-04.jpeg", alt: "Linens and towels in the closet" },
    { file: "detail-05.jpeg", alt: "Record player and bookshelf in the living room" },
    { file: "detail-06.jpeg", alt: "Laundry supplies" },
  ],
  sunsetAtmospheric: [{ file: "sunset-01.jpeg", alt: "Sunset over Hood Canal from the hot tub gazebo" }],
  familyAmenity: [
    { file: "family-01.jpeg", alt: "Board games for family game nights" },
    { file: "family-02.jpeg", alt: "Dog bowl, treats and toys" },
    { file: "family-03.jpeg", alt: "Fenced dog area sign" },
  ],
};

const PORTRAIT_FILES = new Set([
  "kitchen-dining-01.jpeg",
  "kitchen-dining-06.jpeg",
  "bathroom-01.jpeg",
  "bathroom-03.jpeg",
  "bathroom-04.jpeg",
  "detail-03.jpeg",
  "detail-04.jpeg",
  "detail-06.jpeg",
]);
const SQUARE_FILES = new Set([
  "great-room-05.jpeg",
  "great-room-06.jpeg",
  "great-room-08.jpeg",
  "kitchen-dining-03.jpeg",
  "kitchen-dining-04.jpeg",
  "kitchen-dining-09.jpeg",
  "bathroom-02.jpeg",
  "fire-pit-01.jpeg",
]);

function aspectFor(file: string): "portrait" | "square" | "landscape" {
  if (PORTRAIT_FILES.has(file)) return "portrait";
  if (SQUARE_FILES.has(file)) return "square";
  return "landscape";
}

const gallery: GalleryImage[] = (Object.keys(GALLERY_MANIFEST) as GalleryCategory[]).flatMap((category) =>
  GALLERY_MANIFEST[category].map(({ file, alt }, i) =>
    realGalleryImage(
      `SALT_HAVEN_GALLERY_${category.toUpperCase()}_${String(i + 1).padStart(2, "0")}`,
      `Salt+Haven — ${alt}`,
      aspectFor(file),
      category,
      `/images/salt-haven/${file}`
    )
  )
);

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

  introHeading: "A place to slow down.",
  introStatement:
    "Salt+Haven is a three-level A-frame retreat overlooking Hood Canal in Union, Washington. Built around the view, the house sleeps eight and includes three bedrooms, two bathrooms, a covered hot tub, fire pit, outdoor dining and everything needed for a quieter stay.",

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
  storyImages: [fromGallery("exterior", 2), fromGallery("greatRoom", 0), fromGallery("kitchenDining", 0)],

  viewHeading: "The view does most of the work.",
  viewStatement:
    "Salt+Haven looks across Hood Canal from Union, Washington, with changing light, wildlife and long waterfront sunsets.",
  viewDescription: "No direct beach access. A road runs between the property and waterfront.",
  viewImages: [fromGallery("hoodCanal", 0), fromGallery("hoodCanal", 1), fromGallery("sunsetAtmospheric", 0)],

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
