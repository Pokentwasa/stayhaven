import { realMedia } from "./media";
import type { Amenity, Property, Room } from "./types";

/**
 * SALT+HAVEN — the one real Stay Haven property, on Hood Canal in Union,
 * Washington. All facts below (location, capacity, layout, amenities) come
 * directly from the real Salt+Haven listing; copy has been edited for tone
 * but no fact has been invented. There is currently only one property —
 * `PROPERTIES` stays a single-element array rather than inventing sister
 * Havens, so every array-driven section (the Collection, Featured Haven,
 * Moments, Booking) renders honestly for one real place.
 */

const img = (file: string) => `/images/salt-haven/${file}`;

const AMENITIES: Amenity[] = [
  { id: "amenity-wifi", label: "Fast Wi-Fi (100+ Mbps)" },
  { id: "amenity-heating", label: "Heating" },
  { id: "amenity-ac", label: "Air conditioning" },
  { id: "amenity-smart-tv", label: "Smart TV" },
  { id: "amenity-record-player", label: "Record player" },
  { id: "amenity-board-games", label: "Board games" },
  { id: "amenity-workspace", label: "Private workspace" },
  { id: "amenity-washer", label: "Washer" },
  { id: "amenity-dryer", label: "Dryer" },
  { id: "amenity-linens", label: "Linens & towels" },
  { id: "amenity-kitchen", label: "Full kitchen" },
  { id: "amenity-oven", label: "Oven & stove" },
  { id: "amenity-fridge", label: "Fridge & freezer" },
  { id: "amenity-dishwasher", label: "Dishwasher" },
  { id: "amenity-microwave", label: "Microwave" },
  { id: "amenity-coffee", label: "Coffee maker" },
  { id: "amenity-cooking-basics", label: "Cooking basics & dining table" },
  { id: "amenity-hot-tub", label: "Covered hot tub" },
  { id: "amenity-fire-pit", label: "Propane fire pit" },
  { id: "amenity-bbq", label: "BBQ" },
  { id: "amenity-outdoor-dining", label: "Outdoor dining & seating" },
  { id: "amenity-deck", label: "Deck / patio" },
  { id: "amenity-fenced-yard", label: "Fenced yard for dogs" },
  { id: "amenity-water-views", label: "Water views" },
  { id: "amenity-ev-charger", label: "EV charger" },
  { id: "amenity-parking", label: "Free on-site parking" },
  { id: "amenity-contactless", label: "Contactless smart-lock check-in" },
  { id: "amenity-private-entrance", label: "Private entrance" },
  { id: "amenity-safety", label: "First aid kit, smoke & CO detectors, fire extinguisher" },
  { id: "amenity-family", label: "Pack 'n Play, kids' books, toys & dinnerware, high chair" },
];

const rooms: Room[] = [
  {
    id: "room-king",
    slug: "king-bedroom",
    name: "King Bedroom",
    description: "A king bedroom on the lower level, with its own en suite bathroom and a private workspace.",
    occupancy: 2,
    beds: "1 King bed",
    sizeSqm: null,
    highlights: ["En suite bathroom", "Private workspace", "Water view"],
    amenities: [
      { id: "room-king-ensuite", label: "En suite bathroom" },
      { id: "room-king-workspace", label: "Private workspace" },
    ],
    priceFrom: null,
    currency: "USD",
    images: [
      realMedia("ROOM_KING_IMAGE_01", "King bedroom with a private workspace and water view", "landscape", img("king-bedroom-01.jpeg")),
      realMedia("ROOM_KING_IMAGE_02", "Bedroom with in-room laundry and a walk-in closet", "landscape", img("king-bedroom-02.jpeg")),
    ],
    bookingEngineRoomId: null,
  },
  {
    id: "room-queen",
    slug: "queen-bedroom",
    name: "Queen Bedroom",
    description: "A queen bedroom on the main level, opening onto the deck with Hood Canal beyond.",
    occupancy: 2,
    beds: "1 Queen bed",
    sizeSqm: null,
    highlights: ["Main level", "Deck access", "Water view"],
    amenities: [{ id: "room-queen-deck", label: "Deck access" }],
    priceFrom: null,
    currency: "USD",
    images: [
      realMedia("ROOM_QUEEN_IMAGE_01", "Queen bedroom opening onto the deck, Hood Canal beyond", "landscape", img("queen-bedroom-01.jpeg")),
      realMedia("ROOM_QUEEN_IMAGE_02", "Bedroom balcony over Hood Canal and the Olympic Mountains", "landscape", img("queen-bedroom-02.jpeg")),
    ],
    bookingEngineRoomId: null,
  },
  {
    id: "room-loft",
    slug: "loft",
    name: "Loft",
    description: "An open loft tucked beneath the A-frame's peak, with two twin beds.",
    occupancy: 2,
    beds: "2 Twin beds",
    sizeSqm: null,
    highlights: ["Beneath the A-frame peak", "Open to the great room below"],
    amenities: [],
    priceFrom: null,
    currency: "USD",
    images: [
      realMedia("ROOM_LOFT_IMAGE_01", "Loft with two twin beds beneath the A-frame's peak", "landscape", img("loft-01.jpeg")),
      realMedia("ROOM_LOFT_IMAGE_02", "Loft overlooking the staircase and deck below", "landscape", img("loft-02.jpeg")),
    ],
    bookingEngineRoomId: null,
  },
  {
    id: "room-living",
    slug: "living-room",
    name: "Living Room",
    description: "A sofa bed in the living room for extra guests, beneath the vaulted ceiling.",
    occupancy: 2,
    beds: "1 Sofa bed",
    sizeSqm: null,
    highlights: ["Vaulted ceiling", "Smart TV"],
    amenities: [],
    priceFrom: null,
    currency: "USD",
    images: [
      realMedia("ROOM_LIVING_IMAGE_01", "Living room seating beneath the A-frame's peak", "landscape", img("great-room-04.jpeg")),
      realMedia("ROOM_LIVING_IMAGE_02", "Lower-level lounge with Smart TV and workspace", "square", img("great-room-08.jpeg")),
    ],
    bookingEngineRoomId: null,
  },
];

const SALT_HAVEN: Property = {
  id: "salt-haven",
  slug: "salt-haven",
  name: "Salt+Haven",
  locationLabel: "Union, Washington — Hood Canal",
  destinationSlug: "hood-canal",
  shortDescription: "A waterview A-frame on Hood Canal, three bedrooms and a loft, sleeping up to eight.",
  longDescription:
    "Salt+Haven is a waterview A-frame on Hood Canal in Union, Washington. The three-bedroom, two-bath retreat sleeps up to eight guests, with a king bedroom, queen bedroom, loft with two twin beds, and a sofa bed in the living room. Vaulted wood ceilings draw the eye up and out toward the water, over a great room built for gathering, a fully equipped kitchen and dining area, fast Wi-Fi and a private workspace for the moments in between. There is no direct beach access — a road sits between the property and the waterfront.",
  positioningStatement: "An A-frame retreat on Hood Canal, built for slow mornings and long evenings outside.",
  heroMedia: realMedia(
    "SALT_HAVEN_HERO_MEDIA",
    "Salt+Haven's vaulted great room, opening onto the deck and Hood Canal",
    "wide",
    img("great-room-05.jpeg")
  ),
  featuredStatement: "Water outside. Warmth within.",
  moments: [
    {
      id: "moment-house",
      eyebrow: "The House",
      title: "An A-frame on the water",
      statement: "Vaulted ceilings, a roofline you can spot across the canal, and Hood Canal laid out beyond every window.",
      image: realMedia("MOMENT_HOUSE_IMAGE", "A-frame exterior with Hood Canal and the Olympic Mountains behind", "wide", img("exterior-03.jpeg")),
    },
    {
      id: "moment-outside",
      eyebrow: "Outside",
      title: "Fire pit nights",
      statement: "Adirondack chairs around a propane fire pit, with nowhere else you'd rather be after dark.",
      image: realMedia("MOMENT_OUTSIDE_IMAGE", "Adirondack chairs around the propane fire pit, Hood Canal beyond", "wide", img("fire-pit-01.jpeg")),
    },
    {
      id: "moment-view",
      eyebrow: "The View",
      title: "Hood Canal, every morning",
      statement: "The roofline framed against the water — the view that gives Salt+Haven its name.",
      image: realMedia("MOMENT_VIEW_IMAGE", "The A-frame roofline seen across Hood Canal", "wide", img("hood-canal-01.jpeg")),
    },
  ],
  featuredImage: realMedia(
    "SALT_HAVEN_FEATURED_IMAGE",
    "Dining table beneath the vaulted ceiling, Hood Canal beyond",
    "wide",
    img("great-room-03.jpeg")
  ),
  gallery: [
    realMedia("GALLERY_01", "View down into the great room from the loft", "landscape", img("great-room-07.jpeg")),
    realMedia("GALLERY_02", "Vaulted kitchen with marble counter and bar stools", "portrait", img("kitchen-dining-01.jpeg")),
    realMedia("GALLERY_03", "Vaulted living room, full-height window over Hood Canal", "landscape", img("great-room-02.jpeg")),
    realMedia("GALLERY_04", "Queen bedroom opening onto the deck, Hood Canal beyond", "landscape", img("queen-bedroom-01.jpeg")),
    realMedia("GALLERY_05", "Loft with two twin beds beneath the A-frame's peak", "landscape", img("loft-01.jpeg")),
    realMedia("GALLERY_06", "Record player and vinyl collection", "landscape", img("detail-02.jpeg")),
    realMedia("GALLERY_07", "Bedroom with in-room laundry and a walk-in closet", "landscape", img("king-bedroom-02.jpeg")),
    realMedia("GALLERY_08", "A-frame exterior with Hood Canal and the Olympic Mountains behind", "landscape", img("exterior-03.jpeg")),
    realMedia("GALLERY_09", "Adirondack chairs around the propane fire pit, Hood Canal beyond", "landscape", img("fire-pit-01.jpeg")),
    realMedia("GALLERY_10", "The A-frame roofline seen across Hood Canal", "landscape", img("hood-canal-01.jpeg")),
    realMedia("GALLERY_11", "King bedroom with a private workspace and water view", "landscape", img("king-bedroom-01.jpeg")),
    realMedia("GALLERY_12", "Dining table beneath the vaulted ceiling, Hood Canal beyond", "landscape", img("great-room-03.jpeg")),
    realMedia("GALLERY_13", "Outdoor dining table and BBQ on the deck, overlooking Hood Canal", "landscape", img("outdoor-dining-01.jpeg")),
    realMedia("GALLERY_14", "Hot tub at sunset, overlooking Hood Canal", "landscape", img("hot-tub-02.jpeg")),
    realMedia("GALLERY_15", "Kitchen island, refrigerator and stairs to the loft", "landscape", img("kitchen-dining-03.jpeg")),
    realMedia("GALLERY_16", "Sunset over Hood Canal from the hot tub gazebo", "landscape", img("sunset-01.jpeg")),
  ],
  rooms,
  amenities: AMENITIES,
  experiences: [
    {
      id: "experience-hot-tub",
      title: "Hot Tub Evenings",
      description: "Soak under the stars in the private, covered hot tub, ready any time of year.",
      image: realMedia("EXPERIENCE_HOT_TUB_IMAGE", "Covered hot tub gazebo with loungers", "landscape", img("hot-tub-01.jpeg")),
    },
    {
      id: "experience-fire-pit",
      title: "Fire Pit Nights",
      description: "Gather around the propane fire pit with Hood Canal laid out in front of you.",
      image: realMedia("EXPERIENCE_FIRE_PIT_IMAGE", "Adirondack chairs around the propane fire pit, Hood Canal beyond", "landscape", img("fire-pit-01.jpeg")),
    },
    {
      id: "experience-on-the-water",
      title: "On the Water",
      description: "Union sits right on Hood Canal, made for boating and fishing straight from the shore.",
      image: realMedia("EXPERIENCE_WATER_IMAGE", "Hood Canal and the Olympic Mountains from a window", "landscape", img("hood-canal-02.jpeg")),
    },
    {
      id: "experience-wildlife-sunsets",
      title: "Wildlife & Sunsets",
      description: "Changing light, wildlife and long waterfront sunsets, from nearly every room.",
      image: realMedia("EXPERIENCE_SUNSET_IMAGE", "Sunset over Hood Canal from the hot tub gazebo", "landscape", img("sunset-01.jpeg")),
    },
  ],
  nearbyAttractions: [
    {
      id: "attraction-boating",
      name: "Hood Canal",
      category: "Boating & Fishing",
      description: "Right on the water, with boating and fishing available straight from Union.",
      distance: "On site",
      image: realMedia("ATTRACTION_BOATING_IMAGE", "The A-frame roofline seen across Hood Canal", "square", img("hood-canal-01.jpeg")),
    },
    {
      id: "attraction-hiking",
      name: "Olympic Peninsula trails",
      category: "Hiking",
      description: "Forest and mountain trails across the Olympic Peninsula, a short drive from Union.",
      distance: "Nearby",
      image: realMedia("ATTRACTION_HIKING_IMAGE", "A-frame exterior with Hood Canal and the Olympic Mountains behind", "square", img("exterior-03.jpeg")),
    },
    {
      id: "attraction-golf",
      name: "Local courses",
      category: "Golf",
      description: "A handful of courses within easy reach of Union.",
      distance: "Nearby",
      image: realMedia("ATTRACTION_GOLF_IMAGE", "Aerial view of the deck, hot tub gazebo and fenced yard", "square", img("exterior-02.jpeg")),
    },
    {
      id: "attraction-dining",
      name: "Union & Hoodsport",
      category: "Local Dining",
      description: "Small-town Hood Canal dining in Union and neighbouring Hoodsport.",
      distance: "A short drive",
      image: realMedia("ATTRACTION_DINING_IMAGE", "Kitchen and living area with Hood Canal through the windows", "square", img("kitchen-dining-02.jpeg")),
    },
  ],
  testimonials: [
    { id: "gtk-arrival", quote: "Skip the front desk. A smart lock gets you in the moment you arrive.", guestName: "Good to know", guestLocation: "Contactless Arrival", propertySlug: "salt-haven" },
    { id: "gtk-dog", quote: "Dogs are welcome by prior approval, with a fenced yard of their own.", guestName: "Good to know", guestLocation: "Bring the Dog", propertySlug: "salt-haven" },
    { id: "gtk-guests", quote: "Three bedrooms, a loft and a sofa bed — space for the whole group.", guestName: "Good to know", guestLocation: "Room for Eight", propertySlug: "salt-haven" },
    { id: "gtk-levels", quote: "The A-frame unfolds across three levels, each with its own reason to linger.", guestName: "Good to know", guestLocation: "Three Levels", propertySlug: "salt-haven" },
    { id: "gtk-views", quote: "Hood Canal and the Olympic Mountains, framed from nearly every room.", guestName: "Good to know", guestLocation: "Waterfront Views", propertySlug: "salt-haven" },
    { id: "gtk-quiet", quote: "Quiet hours run from 10 PM, so every stay stays peaceful.", guestName: "Good to know", guestLocation: "Quiet After Ten", propertySlug: "salt-haven" },
  ],
  metadata: {
    guestsFrom: 1,
    guestsTo: 8,
    bedroomsFrom: 3,
    bedroomsTo: 3,
    priceFrom: null,
    currency: "USD",
  },
  booking: {
    engineId: null,
    engineUrl: null,
  },
  isFeatured: true,
};

export const PROPERTIES: Property[] = [SALT_HAVEN];

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getFeaturedProperty(): Property {
  return PROPERTIES.find((p) => p.isFeatured) ?? PROPERTIES[0]!;
}

export function getAllTestimonials() {
  return PROPERTIES.flatMap((p) => p.testimonials);
}
