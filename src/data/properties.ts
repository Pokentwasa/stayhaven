import { placeholder } from "./media";
import type { Amenity, Property, Room } from "./types";

/**
 * PLACEHOLDER DATA — every value below is a labelled placeholder token, not
 * real Stay Haven content. Replace field-by-field once the real property
 * information is supplied; the templates, layout and motion are complete
 * and do not need to change when this file changes.
 */

function amenities(propertyToken: string, count: number): Amenity[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${propertyToken}_AMENITY_${String(i + 1).padStart(2, "0")}`,
    label: `${propertyToken}_AMENITY_${String(i + 1).padStart(2, "0")}`,
  }));
}

function rooms(propertyToken: string, count: number): Room[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    const token = `${propertyToken}_ROOM_TYPE_${n}`;
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
        placeholder(`${token}_IMAGE_01`, `${token} interior`, "landscape"),
        placeholder(`${token}_IMAGE_02`, `${token} detail`, "portrait"),
      ],
      bookingEngineRoomId: null,
    };
  });
}

function property(index: number, destinationSlug: string, featured: boolean): Property {
  const n = String(index).padStart(2, "0");
  const token = `PROPERTY_${n}`;
  return {
    id: token,
    slug: token.toLowerCase().replace(/_/g, "-"),
    name: token,
    locationLabel: "PROPERTY_LOCATION",
    destinationSlug,
    shortDescription: `${token}_SHORT_DESCRIPTION`,
    longDescription: `${token}_LONG_DESCRIPTION`,
    positioningStatement: `${token}_POSITIONING_STATEMENT`,
    heroMedia: placeholder(`${token}_HERO_MEDIA`, `${token} hero`, "wide", "image"),
    featuredStatement: `${token}_FEATURED_STATEMENT`,
    gallery: Array.from({ length: 8 }, (_, i) =>
      placeholder(
        `${token}_GALLERY_${String(i + 1).padStart(2, "0")}`,
        `${token} gallery image ${i + 1}`,
        i % 3 === 0 ? "portrait" : "landscape"
      )
    ),
    rooms: rooms(token, 3),
    amenities: amenities(token, 8),
    experiences: Array.from({ length: 4 }, (_, i) => {
      const en = String(i + 1).padStart(2, "0");
      return {
        id: `${token}_EXPERIENCE_${en}`,
        title: `${token}_EXPERIENCE_${en}_TITLE`,
        description: `${token}_EXPERIENCE_${en}_DESCRIPTION`,
        image: placeholder(`${token}_EXPERIENCE_${en}_IMAGE`, `${token} experience ${en}`, "landscape"),
      };
    }),
    nearbyAttractions: Array.from({ length: 6 }, (_, i) => {
      const an = String(i + 1).padStart(2, "0");
      return {
        id: `${token}_ATTRACTION_${an}`,
        name: `${token}_ATTRACTION_${an}_NAME`,
        category: `${token}_ATTRACTION_${an}_CATEGORY`,
        description: `${token}_ATTRACTION_${an}_DESCRIPTION`,
        distance: `${token}_ATTRACTION_${an}_DISTANCE`,
        image: placeholder(`${token}_ATTRACTION_${an}_IMAGE`, `${token} nearby attraction ${an}`, "square"),
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
