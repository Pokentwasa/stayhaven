import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { Property } from "@/data/types";

export function Neighbourhood({ property }: { property: Property }) {
  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <div className="mb-12 flex flex-col gap-4">
        <p className="text-eyebrow text-charcoal/50">06 — The Neighbourhood</p>
        <h2 className="text-display-lg">The city is outside.</h2>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {property.nearbyAttractions.map((attraction) => (
          <article key={attraction.id} className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden">
              <PlaceholderMedia media={attraction.image} className="absolute inset-0" />
            </div>
            <div>
              <p className="text-eyebrow text-charcoal/45">
                {attraction.category} · {attraction.distance}
              </p>
              <h3 className="text-display-sm mt-2">{attraction.name}</h3>
              <p className="mt-2 text-charcoal/70">{attraction.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
