/**
 * Central content schema for the Stay Haven Collection site.
 *
 * Every piece of copy, imagery and operational detail rendered on the site
 * is typed here and sourced from `src/data/*.ts`. Nothing in `src/app` or
 * `src/components` should hardcode property, room, destination or pricing
 * content — it should always come through this layer, so the real Stay
 * Haven content can be dropped in by editing the data files alone.
 *
 * Placeholder values use UPPER_SNAKE_CASE tokens (e.g. "PROPERTY_01",
 * "ROOM_TYPE_01") so they are unmistakable as temporary and are never
 * confused with real copy.
 */

export type MediaAspect = "portrait" | "square" | "landscape" | "wide" | "ultrawide";

/** A single image or video placeholder slot. Swap `src` in once real assets exist. */
export interface Media {
  /** Stable id / alt-text seed, e.g. "PROPERTY_01_HERO_IMAGE" */
  id: string;
  /** Real asset path once supplied. Empty string renders the placeholder treatment. */
  src: string;
  /** "image" | "video" */
  type: "image" | "video";
  alt: string;
  aspect: MediaAspect;
}

export interface Amenity {
  id: string;
  label: string;
  /** Grouping used by the categorized amenities accordion, e.g. "Comfort & Connectivity". Omitted for small per-room amenity lists. */
  category?: string;
}

export interface Room {
  id: string;
  slug: string;
  /** e.g. "ROOM_TYPE_01" */
  name: string;
  description: string;
  occupancy: number;
  beds: string;
  sizeSqm: number | null;
  highlights: string[];
  amenities: Amenity[];
  /** Numeric nightly rate in the smallest sensible unit for the currency, or null if unset */
  priceFrom: number | null;
  currency: string;
  images: Media[];
  /** Identifier the booking engine uses for this room/rate, once known */
  bookingEngineRoomId: string | null;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: Media;
}

export interface NearbyAttraction {
  id: string;
  name: string;
  category: string;
  description: string;
  distance: string;
  image: Media;
}

export interface Testimonial {
  id: string;
  quote: string;
  guestName: string;
  guestLocation: string;
  propertySlug: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  description: string;
  heroImage: Media;
  coordinates: { x: number; y: number } | null;
}

/** One facet of the property shown in the Collection slider — a different room/moment each time, never the hero image. */
export interface PropertyMoment {
  id: string;
  eyebrow: string;
  title: string;
  statement: string;
  image: Media;
}

/** A category of amenities (matches Amenity.category) paired with one representative image for the tabbed accordion. */
export interface AmenityCategory {
  name: string;
  image: Media;
}

export interface Property {
  id: string;
  slug: string;
  /** Placeholder token, e.g. "PROPERTY_01" */
  name: string;
  locationLabel: string;
  destinationSlug: string;
  shortDescription: string;
  longDescription: string;
  positioningStatement: string;
  heroMedia: Media;
  /** The Collection slider — several real moments/rooms, each with its own image and text. */
  moments: PropertyMoment[];
  featuredStatement: string;
  /** The large Featured Haven spread image — kept distinct from heroMedia so the two sections never repeat the same photo. */
  featuredImage: Media;
  /** One representative image per amenity category, for the tabbed Amenities accordion. */
  amenityCategoryImages: AmenityCategory[];
  gallery: Media[];
  rooms: Room[];
  amenities: Amenity[];
  experiences: Experience[];
  nearbyAttractions: NearbyAttraction[];
  testimonials: Testimonial[];
  metadata: {
    guestsFrom: number;
    guestsTo: number;
    bedroomsFrom: number;
    bedroomsTo: number;
    priceFrom: number | null;
    currency: string;
  };
  booking: {
    /** Identifier the existing booking engine uses for this property */
    engineId: string | null;
    /** Direct deep-link into the existing engine for this property, if known */
    engineUrl: string | null;
  };
  isFeatured: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteContent {
  brand: {
    name: string;
    shortName: string;
  };
  nav: {
    primary: NavLink[];
    bookCta: NavLink;
  };
  hero: {
    eyebrow: string;
    headline: string;
    supporting: string;
    scrollCue: string;
    media: Media;
  };
  manifesto: {
    eyebrow: string;
    heading: string;
    lines: string[];
    /** Quiet background texture, sat under a strong cream overlay rather than shown at full strength. */
    media: Media;
  };
  experiencePillars: Experience[];
  footer: {
    heading: string;
    nav: NavLink[];
    social: NavLink[];
    newsletter: {
      heading: string;
      description: string;
      placeholder: string;
      cta: string;
    };
    legal: NavLink[];
  };
}
