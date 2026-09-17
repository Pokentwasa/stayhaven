import { CinematicHero } from "@/components/sections/CinematicHero";
import { Introduction } from "@/components/sections/Introduction";
import { TheHouse } from "@/components/sections/TheHouse";
import { TheView } from "@/components/sections/TheView";
import { Stay } from "@/components/sections/Stay";
import { Outside } from "@/components/sections/Outside";
import { LifeAt } from "@/components/sections/LifeAt";
import { Sleeping } from "@/components/sections/Sleeping";
import { Amenities } from "@/components/sections/Amenities";
import { HoodCanal } from "@/components/sections/HoodCanal";
import { Gallery } from "@/components/sections/Gallery";
import { KnowBeforeYouStay } from "@/components/sections/KnowBeforeYouStay";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { getPrimaryProperty } from "@/data/property";

export default function HomePage() {
  const property = getPrimaryProperty();

  return (
    <>
      <CinematicHero />
      <Introduction property={property} />
      <TheHouse property={property} />
      <TheView property={property} />
      <Stay property={property} />
      <Outside property={property} />
      <LifeAt property={property} />
      <Sleeping property={property} />
      <Amenities property={property} />
      <HoodCanal property={property} />
      <Gallery property={property} />
      <KnowBeforeYouStay property={property} />
      <BookingCTA />
    </>
  );
}
