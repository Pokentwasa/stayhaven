import { CinematicHero } from "@/components/sections/CinematicHero";
import { PropertyShowcase } from "@/components/sections/PropertyShowcase";
import { BrandManifesto } from "@/components/sections/BrandManifesto";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedHaven } from "@/components/sections/FeaturedHaven";
import { DestinationExplorer } from "@/components/sections/DestinationExplorer";
import { EditorialGallery } from "@/components/sections/EditorialGallery";
import { GuestNotes } from "@/components/sections/GuestNotes";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { getPrimaryProperty } from "@/data/property";

export default function HomePage() {
  const property = getPrimaryProperty();

  return (
    <>
      <CinematicHero property={property} />
      <PropertyShowcase property={property} />
      <BrandManifesto property={property} />
      <ExperienceSection property={property} />
      <FeaturedHaven property={property} />
      <DestinationExplorer property={property} />
      <EditorialGallery property={property} />
      <GuestNotes property={property} />
      <BookingCTA property={property} />
    </>
  );
}
