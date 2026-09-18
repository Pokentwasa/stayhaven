import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { DESTINATIONS } from "@/data/destinations";
import { PROPERTIES } from "@/data/properties";

/** 05 — Destinations. Three real facets shown side by side; each image stays clear, with its text arriving on hover. */
export function DestinationExplorer() {
  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <SectionIntro index="06" label="Destinations" heading="Where will you disappear to next?" />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DESTINATIONS.map((d) => {
          const relatedProperty = PROPERTIES.find((p) => p.destinationSlug === d.slug);
          return (
            <TransitionLink
              key={d.id}
              href={relatedProperty ? `/stays/${relatedProperty.slug}` : `/destinations/${d.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden"
            >
              <PlaceholderMedia
                media={d.heroImage}
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/10 to-transparent opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-95" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-ivory">
                <p className="text-eyebrow opacity-70">{d.region}</p>
                <p className="text-display-sm">{d.name}</p>
                <p className="max-h-0 max-w-xs overflow-hidden text-body-lg opacity-0 transition-all duration-500 ease-out group-hover:max-h-32 group-hover:opacity-90">
                  {d.description}
                </p>
              </div>
            </TransitionLink>
          );
        })}
      </div>
    </section>
  );
}
