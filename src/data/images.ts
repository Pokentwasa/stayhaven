import type { GalleryCategory, Media, MediaAspect } from "./types";

/**
 * The complete real Salt+Haven photo library manifest — audited by hand
 * (every file viewed, not inferred from filename) before any layout work.
 * This is the single source of truth for every image on the site; nothing
 * elsewhere should hardcode a path into /images/salt-haven.
 *
 * `priority` marks the ~10 strongest hero-level photographs (full-bleed,
 * scene-opening or scene-closing quality). `featured` marks the ~30 images
 * actually woven into the long-form homepage story; everything else still
 * lives in the full archive but isn't repeated on the homepage.
 */
export interface SaltHavenImage {
  id: string;
  file: string;
  src: string;
  width: number;
  height: number;
  orientation: MediaAspect;
  category: GalleryCategory;
  /** One-line description of what's actually in the frame. */
  subject: string;
  alt: string;
  priority: boolean;
  featured: boolean;
}

function image(
  file: string,
  width: number,
  height: number,
  category: GalleryCategory,
  subject: string,
  opts: { priority?: boolean; featured?: boolean } = {}
): SaltHavenImage {
  const ratio = width / height;
  const orientation: MediaAspect = ratio < 0.85 ? "portrait" : ratio < 1.15 ? "square" : ratio < 1.65 ? "landscape" : "wide";
  const id = `SALT_HAVEN_${file.replace(".jpeg", "").toUpperCase().replace(/-/g, "_")}`;
  return {
    id,
    file,
    src: `/images/salt-haven/${file}`,
    width,
    height,
    orientation,
    category,
    subject,
    alt: `Salt+Haven — ${subject}`,
    priority: opts.priority ?? false,
    featured: opts.featured ?? false,
  };
}

export const SALT_HAVEN_IMAGES: SaltHavenImage[] = [
  // Exterior / architecture
  image("exterior-01.jpeg", 917, 720, "exterior", "A-frame entry and carport at dusk, string lights lit", { featured: true }),
  image("exterior-02.jpeg", 1081, 720, "exterior", "Aerial view of the deck, hot tub gazebo and fenced yard", { featured: true }),
  image("exterior-03.jpeg", 988, 720, "exterior", "A-frame exterior with Hood Canal and the Olympic Mountains behind", { featured: true }),
  image("exterior-04.jpeg", 1081, 720, "exterior", "A-frame exterior and hot tub gazebo at dusk", { priority: true, featured: true }),

  // Hood Canal / water
  image("hood-canal-01.jpeg", 842, 720, "hoodCanal", "The A-frame roofline seen across Hood Canal, road and waterline below", { priority: true, featured: true }),
  image("hood-canal-02.jpeg", 960, 720, "hoodCanal", "Hood Canal and the Olympic Mountains from a window", { featured: true }),

  // Great room / living
  image("great-room-01.jpeg", 934, 720, "greatRoom", "Vaulted great room, kitchen and loft ladder", { priority: true, featured: true }),
  image("great-room-02.jpeg", 875, 720, "greatRoom", "Vaulted living room, full-height window over Hood Canal", { priority: true, featured: true }),
  image("great-room-03.jpeg", 1080, 720, "greatRoom", "Dining table beneath the vaulted ceiling, Hood Canal beyond", { featured: true }),
  image("great-room-04.jpeg", 944, 720, "greatRoom", "Living room seating beneath the A-frame's peak", { featured: true }),
  image("great-room-05.jpeg", 789, 720, "greatRoom", "Upper living room opening onto the deck and Hood Canal"),
  image("great-room-06.jpeg", 805, 720, "greatRoom", "Living room sofa facing the deck, fire pit and water beyond"),
  image("great-room-07.jpeg", 998, 720, "greatRoom", "View down into the great room from the loft", { priority: true, featured: true }),
  image("great-room-08.jpeg", 745, 720, "greatRoom", "Lower-level lounge with Smart TV and workspace", { featured: true }),

  // Kitchen & dining
  image("kitchen-dining-01.jpeg", 720, 889, "kitchenDining", "Vaulted kitchen with marble counter and bar stools", { priority: true, featured: true }),
  image("kitchen-dining-02.jpeg", 850, 720, "kitchenDining", "Kitchen and living area with Hood Canal through the windows", { featured: true }),
  image("kitchen-dining-03.jpeg", 796, 720, "kitchenDining", "Kitchen island, refrigerator and stairs to the loft", { featured: true }),
  image("kitchen-dining-04.jpeg", 766, 720, "kitchenDining", "Dining table with the loft staircase and kitchen behind"),
  image("kitchen-dining-05.jpeg", 931, 720, "kitchenDining", "Dishware and glassware in the kitchen cabinet"),
  image("kitchen-dining-06.jpeg", 720, 916, "kitchenDining", "Pantry staples and cookbooks in the kitchen"),
  image("kitchen-dining-07.jpeg", 888, 720, "kitchenDining", "Kitchen utensils and tools"),
  image("kitchen-dining-08.jpeg", 960, 720, "kitchenDining", "Stove, microwave and coffee station"),
  image("kitchen-dining-09.jpeg", 720, 785, "kitchenDining", "Pots and pans in the kitchen cabinet"),
  image("kitchen-dining-10.jpeg", 960, 720, "kitchenDining", "Coffee and tea station in the kitchen"),

  // King bedroom
  image("king-bedroom-01.jpeg", 960, 720, "kingBedroom", "King bedroom with a private workspace and water view", { priority: true, featured: true }),
  image("king-bedroom-02.jpeg", 848, 720, "kingBedroom", "Bedroom with in-room laundry and a walk-in closet", { featured: true }),

  // Queen bedroom
  image("queen-bedroom-01.jpeg", 864, 720, "queenBedroom", "Queen bedroom opening onto the deck, Hood Canal beyond", { priority: true, featured: true }),
  image("queen-bedroom-02.jpeg", 1080, 720, "queenBedroom", "Bedroom balcony over Hood Canal and the Olympic Mountains", { featured: true }),

  // Loft
  image("loft-01.jpeg", 1079, 720, "loft", "Loft with two twin beds beneath the A-frame's peak", { featured: true }),
  image("loft-02.jpeg", 1080, 720, "loft", "Loft overlooking the staircase and deck below", { featured: true }),

  // Bathrooms
  image("bathroom-01.jpeg", 720, 876, "bathrooms", "Bathroom with a walk-in shower"),
  image("bathroom-02.jpeg", 720, 783, "bathrooms", "Bathroom vanity beneath the sloped ceiling"),
  image("bathroom-03.jpeg", 720, 960, "bathrooms", "Bathroom storage beneath the sink"),
  image("bathroom-04.jpeg", 720, 960, "bathrooms", "Bathroom vanity and mirror"),
  image("bathroom-05.jpeg", 960, 720, "bathrooms", "Folded towels on a bathroom shelf"),

  // Hot tub
  image("hot-tub-01.jpeg", 960, 720, "hotTub", "Covered hot tub gazebo with loungers", { featured: true }),
  image("hot-tub-02.jpeg", 1080, 720, "hotTub", "Hot tub at sunset, overlooking Hood Canal", { priority: true, featured: true }),

  // Fire pit
  image("fire-pit-01.jpeg", 798, 720, "firePit", "Adirondack chairs around the propane fire pit, Hood Canal beyond", { priority: true, featured: true }),

  // Outdoor dining
  image("outdoor-dining-01.jpeg", 1080, 720, "outdoorDining", "Outdoor dining table and BBQ on the deck, overlooking Hood Canal", { featured: true }),

  // Detail / lifestyle
  image("detail-01.jpeg", 960, 720, "detailLifestyle", "Tesla Universal Wall Connector EV charger"),
  image("detail-02.jpeg", 960, 720, "detailLifestyle", "Record player and vinyl collection", { featured: true }),
  image("detail-03.jpeg", 720, 960, "detailLifestyle", "Gate sign confirming no direct beach access", { featured: true }),
  image("detail-04.jpeg", 720, 960, "detailLifestyle", "Linens and towels in the closet"),
  image("detail-05.jpeg", 958, 720, "detailLifestyle", "Record player and bookshelf in the living room"),
  image("detail-06.jpeg", 720, 960, "detailLifestyle", "Laundry supplies"),

  // Sunset / atmosphere
  image("sunset-01.jpeg", 1080, 720, "sunsetAtmospheric", "Sunset over Hood Canal from the hot tub gazebo", { priority: true, featured: true }),

  // Family / amenity
  image("family-01.jpeg", 960, 720, "familyAmenity", "Board games for family game nights"),
  image("family-02.jpeg", 960, 720, "familyAmenity", "Dog bowl, treats and toys", { featured: true }),
  image("family-03.jpeg", 960, 720, "familyAmenity", "Fenced dog area sign"),
];

export function imagesByCategory(category: GalleryCategory): SaltHavenImage[] {
  return SALT_HAVEN_IMAGES.filter((img) => img.category === category);
}

/** A single category image by position, e.g. the second great-room shot. */
export function imageAt(category: GalleryCategory, index: number): SaltHavenImage {
  const match = imagesByCategory(category)[index];
  if (!match) throw new Error(`No image at ${category}[${index}]`);
  return match;
}

export function toMedia(img: SaltHavenImage): Media {
  return { id: img.id, src: img.src, type: "image", alt: img.alt, aspect: img.orientation };
}

export function featuredImages(): SaltHavenImage[] {
  return SALT_HAVEN_IMAGES.filter((img) => img.featured);
}

export function priorityImages(): SaltHavenImage[] {
  return SALT_HAVEN_IMAGES.filter((img) => img.priority);
}
