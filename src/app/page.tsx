import { CinematicHero } from "@/components/sections/CinematicHero";
import { PropertyShowcase } from "@/components/sections/PropertyShowcase";
import { BrandManifesto } from "@/components/sections/BrandManifesto";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedHaven } from "@/components/sections/FeaturedHaven";
import { AmenitiesAccordion } from "@/components/sections/AmenitiesAccordion";
import { DestinationExplorer } from "@/components/sections/DestinationExplorer";
import { EditorialGallery } from "@/components/sections/EditorialGallery";
import { GuestNotes } from "@/components/sections/GuestNotes";
import { BookingCTA } from "@/components/sections/BookingCTA";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <PropertyShowcase />
      <BrandManifesto />
      <ExperienceSection />
      <FeaturedHaven />
      <AmenitiesAccordion />
      <DestinationExplorer />
      <EditorialGallery />
      <GuestNotes />
      <BookingCTA />
    </>
  );
}
