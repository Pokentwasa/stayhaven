import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROPERTIES, getPropertyBySlug } from "@/data/properties";
import { PropertyHero } from "@/components/property/PropertyHero";
import { PropertyIntro, PropertyStory } from "@/components/property/PropertyStory";
import { RoomShowcase } from "@/components/property/RoomShowcase";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { Neighbourhood } from "@/components/property/Neighbourhood";
import { ExperiencesList } from "@/components/property/ExperiencesList";
import { Amenities } from "@/components/property/Amenities";
import { PropertyGuestNotes } from "@/components/property/PropertyGuestNotes";
import { Availability } from "@/components/property/Availability";
import { PropertyFinalCTA } from "@/components/property/PropertyFinalCTA";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  return {
    title: `${property.name} — ${property.locationLabel}`,
    description: property.shortDescription,
    openGraph: {
      title: property.name,
      description: property.shortDescription,
      type: "website",
    },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.shortDescription,
    address: property.locationLabel,
    numberOfRooms: property.rooms.length,
    amenityFeature: property.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a.label,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyHero property={property} />
      <PropertyIntro property={property} />
      <PropertyStory property={property} />
      <RoomShowcase property={property} />
      <PropertyGallery property={property} />
      <Neighbourhood property={property} />
      <ExperiencesList property={property} />
      <Amenities property={property} />
      <PropertyGuestNotes property={property} />
      <Availability property={property} />
      <PropertyFinalCTA property={property} />
    </>
  );
}
