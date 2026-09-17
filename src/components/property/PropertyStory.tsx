import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { Property } from "@/data/types";

export function PropertyIntro({ property }: { property: Property }) {
  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <p className="text-eyebrow mb-8 text-charcoal/50">02 — Intro</p>
      <p className="text-display-md max-w-3xl">{property.positioningStatement}</p>
    </section>
  );
}

export function PropertyStory({ property }: { property: Property }) {
  const [imgA, imgB, imgC] = property.gallery;

  return (
    <section data-header-theme="dark" className="section-pad-b container-edge bg-ivory text-charcoal">
      <p className="text-eyebrow mb-12 text-charcoal/50">03 — Story</p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col gap-6">
          <h2 className="text-display-sm">{property.shortDescription}</h2>
          <p className="text-body-lg text-charcoal/70">{property.longDescription}</p>
        </div>
        {imgA && (
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <PlaceholderMedia media={imgA} className="absolute inset-0" />
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {imgB && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <PlaceholderMedia media={imgB} className="absolute inset-0" />
          </div>
        )}
        {imgC && (
          <div className="relative mt-0 aspect-[4/3] overflow-hidden md:mt-12">
            <PlaceholderMedia media={imgC} className="absolute inset-0" />
          </div>
        )}
      </div>
    </section>
  );
}
