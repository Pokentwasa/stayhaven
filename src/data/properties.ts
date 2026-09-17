import { stockPlaceholder } from "./media";
import type { Amenity, Property, Room } from "./types";
import type { StockCategory } from "./stockPhotos";

/**
 * PLACEHOLDER DATA — every text value below is a labelled placeholder token,
 * not real Stay Haven content. Images are temporary Pexels stock photos
 * (see stockPhotos.ts) chosen to loosely match each property's theme, purely
 * so the site previews with real imagery instead of gray boxes. Replace
 * field-by-field once the real property information is supplied; the
 * templates, layout and motion are complete and do not need to change.
 */

interface PropertyTheme {
  hero: StockCategory;
  gallery: StockCategory[];
  rooms: StockCategory[];
  /** [stay, eat, explore, unwind] */
  experiences: [StockCategory, StockCategory, StockCategory, StockCategory];
  attractions: StockCategory[];
}

const THEMES: PropertyTheme[] = [
  {
    hero: "villaExterior",
    gallery: ["villaExterior", "pool", "bedroom", "livingRoom", "bathroom", "dining", "beach", "rooftop"],
    rooms: ["bedroom", "bathroom", "livingRoom"],
    experiences: ["livingRoom", "dining", "beach", "pool"],
    attractions: ["beach", "cityStreet", "dining", "rooftop", "pool", "villaExterior"],
  },
  {
    hero: "forestCabin",
    gallery: ["forestCabin", "mountain", "bedroom", "livingRoom", "bathroom", "breakfast", "mountain", "forestCabin"],
    rooms: ["bedroom", "bathroom", "livingRoom"],
    experiences: ["livingRoom", "breakfast", "mountain", "spa"],
    attractions: ["mountain", "forestCabin", "breakfast", "spa", "mountain", "forestCabin"],
  },
  {
    hero: "lobby",
    gallery: ["lobby", "cityStreet", "bedroom", "livingRoom", "bathroom", "dining", "rooftop", "cityStreet"],
    rooms: ["bedroom", "bathroom", "livingRoom"],
    experiences: ["livingRoom", "dining", "cityStreet", "rooftop"],
    attractions: ["cityStreet", "rooftop", "dining", "lobby", "cityStreet", "rooftop"],
  },
];

function amenities(propertyToken: string, count: number): Amenity[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${propertyToken}_AMENITY_${String(i + 1).padStart(2, "0")}`,
    label: `${propertyToken}_AMENITY_${String(i + 1).padStart(2, "0")}`,
  }));
}

function rooms(propertyToken: string, count: number, theme: PropertyTheme): Room[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    const token = `${propertyToken}_ROOM_TYPE_${n}`;
    const category = theme.rooms[i % theme.rooms.length]!;
    return {
      id: token,
      slug: token.toLowerCase().replace(/_/g, "-"),
      name: `ROOM_TYPE_${n}`,
      description: `${token}_DESCRIPTION`,
      occupancy: 2,
      beds: `${token}_BEDS`,
      sizeSqm: null,
      highlights: [`${token}_HIGHLIGHT_01`, `${token}_HIGHLIGHT_02`, `${token}_HIGHLIGHT_03`],
      amenities: amenities(token, 4),
      priceFrom: null,
      currency: "USD",
      images: [
        stockPlaceholder(`${token}_IMAGE_01`, `${token} interior`, "landscape", category, i),
        stockPlaceholder(`${token}_IMAGE_02`, `${token} detail`, "portrait", category, i + 1),
      ],
      bookingEngineRoomId: null,
    };
  });
}

function property(index: number, destinationSlug: string, featured: boolean): Property {
  const n = String(index).padStart(2, "0");
  const token = `PROPERTY_${n}`;
  const theme = THEMES[index - 1]!;

  return {
    id: token,
    slug: token.toLowerCase().replace(/_/g, "-"),
    name: token,
    locationLabel: "PROPERTY_LOCATION",
    destinationSlug,
    shortDescription: `${token}_SHORT_DESCRIPTION`,
    longDescription: `${token}_LONG_DESCRIPTION`,
    positioningStatement: `${token}_POSITIONING_STATEMENT`,
    heroMedia: stockPlaceholder(`${token}_HERO_MEDIA`, `${token} hero`, "wide", theme.hero),
    featuredStatement: `${token}_FEATURED_STATEMENT`,
    gallery: theme.gallery.map((category, i) =>
      stockPlaceholder(
        `${token}_GALLERY_${String(i + 1).padStart(2, "0")}`,
        `${token} gallery image ${i + 1}`,
        i % 3 === 0 ? "portrait" : "landscape",
        category,
        i
      )
    ),
    rooms: rooms(token, 3, theme),
    amenities: amenities(token, 8),
    experiences: theme.experiences.map((category, i) => {
      const en = String(i + 1).padStart(2, "0");
      return {
        id: `${token}_EXPERIENCE_${en}`,
        title: `${token}_EXPERIENCE_${en}_TITLE`,
        description: `${token}_EXPERIENCE_${en}_DESCRIPTION`,
        image: stockPlaceholder(`${token}_EXPERIENCE_${en}_IMAGE`, `${token} experience ${en}`, "landscape", category, i),
      };
    }),
    nearbyAttractions: theme.attractions.map((category, i) => {
      const an = String(i + 1).padStart(2, "0");
      return {
        id: `${token}_ATTRACTION_${an}`,
        name: `${token}_ATTRACTION_${an}_NAME`,
        category: `${token}_ATTRACTION_${an}_CATEGORY`,
        description: `${token}_ATTRACTION_${an}_DESCRIPTION`,
        distance: `${token}_ATTRACTION_${an}_DISTANCE`,
        image: stockPlaceholder(`${token}_ATTRACTION_${an}_IMAGE`, `${token} nearby attraction ${an}`, "square", category, i),
      };
    }),
    testimonials: Array.from({ length: 2 }, (_, i) => {
      const tn = String(i + 1).padStart(2, "0");
      return {
        id: `${token}_TESTIMONIAL_${tn}`,
        quote: `${token}_TESTIMONIAL_${tn}_QUOTE`,
        guestName: `${token}_TESTIMONIAL_${tn}_GUEST_NAME`,
        guestLocation: `${token}_TESTIMONIAL_${tn}_GUEST_LOCATION`,
        propertySlug: token.toLowerCase().replace(/_/g, "-"),
      };
    }),
    metadata: {
      guestsFrom: 2,
      guestsTo: 6,
      bedroomsFrom: 1,
      bedroomsTo: 3,
      priceFrom: null,
      currency: "USD",
    },
    booking: {
      engineId: null,
      engineUrl: null,
    },
    isFeatured: featured,
  };
}

export const PROPERTIES: Property[] = [
  property(1, "destination-01", true),
  property(2, "destination-02", false),
  property(3, "destination-03", false),
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getFeaturedProperty(): Property {
  return PROPERTIES.find((p) => p.isFeatured) ?? PROPERTIES[0]!;
}

export function getAllTestimonials() {
  return PROPERTIES.flatMap((p) => p.testimonials);
}
