import type { Metadata } from "next";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PROPERTIES } from "@/data/properties";

export const metadata: Metadata = {
  title: "Salt+Haven",
  description: "Salt+Haven, on Hood Canal in Union, Washington.",
};

export default function StaysIndexPage() {
  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-brand-blue text-charcoal">
      <SectionIntro index="01" label="Salt+Haven" heading="Your Haven." />

      <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
        {PROPERTIES.map((property) => (
          <article key={property.id} className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <PlaceholderMedia media={property.heroMedia} className="absolute inset-0" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-eyebrow text-charcoal/50">{property.locationLabel}</p>
              <h2 className="text-display-sm">{property.name}</h2>
              <p className="text-charcoal/70">{property.positioningStatement}</p>
              <LuxuryButton href={`/stays/${property.slug}`} variant="dark" className="mt-2">
                Explore Property
              </LuxuryButton>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
