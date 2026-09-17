/**
 * Central content schema for the Stay Haven site.
 *
 * Stay Haven currently operates ONE property — Salt+Haven, on Hood Canal in
 * Union, Washington. The data model still supports a `properties[]` array
 * so a future second property can be added without a rewrite, but every
 * component in this codebase should render for a single retreat today: no
 * "Collection" framing, no invented sister properties.
 *
 * All copy here is either verbatim from, or an editorial rewrite of, real
 * Salt+Haven listing content — nothing here is fabricated. Image `src`
 * values are empty until the real 53-photo library is supplied; components
 * render a labelled placeholder in the meantime (see PlaceholderMedia).
 */

export type MediaAspect = "portrait" | "square" | "landscape" | "wide" | "ultrawide";

/** A single image or video slot. Empty `src` renders a placeholder treatment. */
export interface Media {
  id: string;
  src: string;
  type: "image" | "video";
  alt: string;
  aspect: MediaAspect;
}

/**
 * The 15 real photo categories the eventual 53-image library will be sorted
 * into. Used to group both the homepage preview strip and the full gallery.
 */
export type GalleryCategory =
  | "exterior"
  | "hoodCanal"
  | "greatRoom"
  | "kitchenDining"
  | "kingBedroom"
  | "queenBedroom"
  | "loft"
  | "bathrooms"
  | "hotTub"
  | "firePit"
  | "outdoorDining"
  | "deckPatio"
  | "detailLifestyle"
  | "sunsetAtmospheric"
  | "familyAmenity";

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  exterior: "Exterior & Architecture",
  hoodCanal: "Hood Canal & Water Views",
  greatRoom: "Great Room & Living Area",
  kitchenDining: "Kitchen & Dining",
  kingBedroom: "King Bedroom",
  queenBedroom: "Queen Bedroom",
  loft: "Loft",
  bathrooms: "Bathrooms",
  hotTub: "Hot Tub",
  firePit: "Fire Pit",
  outdoorDining: "Outdoor Dining",
  deckPatio: "Deck & Patio",
  detailLifestyle: "Details & Lifestyle",
  sunsetAtmospheric: "Sunset & Atmosphere",
  familyAmenity: "Family & Amenity Details",
};

/** Grouped for the "The House / Sleeping / Outside / The View / Details" full-gallery filters. */
export const GALLERY_CATEGORY_SECTIONS: { label: string; categories: GalleryCategory[] }[] = [
  { label: "The House", categories: ["exterior", "greatRoom", "kitchenDining"] },
  { label: "Sleeping", categories: ["kingBedroom", "queenBedroom", "loft", "bathrooms"] },
  { label: "Outside", categories: ["hotTub", "firePit", "outdoorDining", "deckPatio"] },
  { label: "The View", categories: ["hoodCanal", "sunsetAtmospheric"] },
  { label: "Details", categories: ["detailLifestyle", "familyAmenity"] },
];

export interface GalleryImage extends Media {
  category: GalleryCategory;
}

export interface SleepingArea {
  id: string;
  level: string;
  name: string;
  description: string;
  beds: string;
  features: string[];
  image: Media;
}

export interface AmenityGroup {
  id: string;
  title: string;
  items: string[];
}

export interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  image: Media;
}

export interface NeighbourhoodInfo {
  heading: string;
  description: string;
  activities: string[];
  transitNote: string;
  parkingNote: string;
  evChargerNote: string;
  heroImage: Media;
}

export interface HouseRule {
  id: string;
  title: string;
  description: string;
}

export interface CancellationTier {
  id: string;
  window: string;
  refund: string;
}

export interface PropertyLocation {
  city: string;
  state: string;
  country: string;
  region: string;
}

export interface Property {
  id: string;
  slug: string;
  /** "Salt+Haven" */
  name: string;
  /** Listing title, e.g. "NEW Waterfront A-Frame Cabin With Panoramic Views" */
  title: string;
  location: PropertyLocation;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;

  heroMedia: Media;
  heroTagline: string;
  heroSupporting: string;

  introHeading: string;
  introStatement: string;

  houseHeading: string;
  houseStatement: string;
  houseDescription: string;
  houseFacts: string[];
  storyImages: Media[];

  viewHeading: string;
  viewStatement: string;
  viewDescription: string;
  viewImages: Media[];

  stayHeading: string;
  stayStatement: string;
  interiorHighlights: FeatureHighlight[];

  outdoorHeading: string;
  outdoorStatement: string;
  outdoorFeatures: FeatureHighlight[];

  lifeAtHeading: string;
  lifeAtMoments: string[];
  lifeAtBackgroundImage: Media;

  sleepingHeading: string;
  sleepingStatement: string;
  sleepingAreas: SleepingArea[];

  amenityGroups: AmenityGroup[];
  fullAmenities: string[];

  neighbourhood: NeighbourhoodInfo;

  gallery: GalleryImage[];

  houseRules: HouseRule[];
  cancellationPolicy: CancellationTier[];

  booking: {
    /** Identifier the existing booking engine uses for this property */
    engineId: string | null;
    /** Direct deep-link into the existing engine for this property, if known */
    engineUrl: string | null;
    /** Nightly rate, only ever set once real pricing is supplied — never fabricated */
    priceFrom: number | null;
    currency: string;
  };
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteContent {
  brand: {
    name: string;
    shortName: string;
    /** "presents" kicker between the Stay Haven wordmark and the property name in the hero */
    presentsLabel: string;
  };
  nav: {
    primary: NavLink[];
    bookCta: NavLink;
  };
  hero: {
    scrollCue: string;
    primaryCta: string;
    secondaryCta: string;
  };
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
