import { CinematicHero } from "@/components/sections/CinematicHero";
import { PropertyShowcase } from "@/components/sections/PropertyShowcase";
import { BrandManifesto } from "@/components/sections/BrandManifesto";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FeaturedHaven } from "@/components/sections/FeaturedHaven";
import { DestinationExplorer } from "@/components/sections/DestinationExplorer";
import { EditorialGallery } from "@/components/sections/EditorialGallery";
import { GuestNotes } from "@/components/sections/GuestNotes";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { CloudTransition } from "@/components/transitions/CloudTransition";
import { SceneTransition } from "@/components/transitions/SceneTransition";
import { KeyholeTransition } from "@/components/transitions/KeyholeTransition";
import { DoorTransition } from "@/components/transitions/DoorTransition";
import { WindowReveal } from "@/components/transitions/WindowReveal";
import { DepthScene } from "@/components/transitions/DepthScene";
import { getPrimaryProperty } from "@/data/property";

export default function HomePage() {
  const property = getPrimaryProperty();

  return (
    <>
      <CinematicHero property={property} />
      <CloudTransition />
      <PropertyShowcase property={property} />
      <SceneTransition from="warm-black" to="ivory" />
      <BrandManifesto property={property} />
      <KeyholeTransition peek={property.experienceScenes[0]!.image} />
      <ExperienceSection property={property} />
      <DoorTransition reveal={property.heroMedia} />
      <FeaturedHaven property={property} />
      <WindowReveal view={property.hoodCanalMoments[0]!.heroImage} />
      <DestinationExplorer property={property} />
      <DepthScene
        layers={[
          property.hoodCanalMoments[1]!.heroImage,
          property.storyMoments[0]!.image,
          property.gallery[0]!,
        ]}
        fallback={property.gallery[0]!}
      />
      <EditorialGallery property={property} />
      <SceneTransition from="ivory" to="warm-black" />
      <GuestNotes property={property} />
      <BookingCTA property={property} />
    </>
  );
}
