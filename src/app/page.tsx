import { CinematicHero } from "@/components/sections/CinematicHero";
import { TheHouse } from "@/components/sections/TheHouse";
import { InsideOutside } from "@/components/sections/InsideOutside";
import { Sleeping } from "@/components/sections/Sleeping";
import { HoodCanal } from "@/components/sections/HoodCanal";
import { Amenities } from "@/components/sections/Amenities";
import { Gallery } from "@/components/sections/Gallery";
import { Location } from "@/components/sections/Location";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { getPrimaryProperty } from "@/data/property";

export default function HomePage() {
  const property = getPrimaryProperty();

  return (
    <>
      <CinematicHero />
      <TheHouse property={property} />
      <InsideOutside property={property} />
      <Sleeping property={property} />
      <HoodCanal property={property} />
      <Amenities property={property} />
      <Gallery property={property} />
      <Location property={property} />
      <BookingCTA />
    </>
  );
}
