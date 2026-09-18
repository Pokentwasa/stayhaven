import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { getFeaturedProperty } from "@/data/properties";

export function FeaturedHaven() {
  const property = getFeaturedProperty();
  const [imgA, imgB, imgC, imgD] = property.gallery;

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <div className="mb-16 flex flex-col gap-4">
        <p className="text-eyebrow text-charcoal/50">04 — Featured Haven</p>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-display-lg">{property.name}</h2>
            <p className="text-eyebrow mt-3 text-charcoal/55">{property.locationLabel}</p>
          </div>
          <p className="text-display-sm max-w-sm text-charcoal/60">{property.featuredStatement}</p>
        </div>
      </div>

      <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden">
        <PlaceholderMedia media={property.featuredImage} className="absolute inset-0" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:grid-rows-2">
        {imgA && (
          <div className="relative aspect-[3/4] overflow-hidden md:col-span-2 md:row-span-2">
            <PlaceholderMedia media={imgA} className="absolute inset-0" />
          </div>
        )}
        {imgB && (
          <div className="relative aspect-[4/3] overflow-hidden md:col-span-4">
            <PlaceholderMedia media={imgB} className="absolute inset-0" />
          </div>
        )}
        {imgC && (
          <div className="relative aspect-square overflow-hidden md:col-span-2">
            <PlaceholderMedia media={imgC} className="absolute inset-0" />
          </div>
        )}
        {imgD && (
          <div className="relative aspect-square overflow-hidden md:col-span-2">
            <PlaceholderMedia media={imgD} className="absolute inset-0" />
          </div>
        )}
      </div>

      <div className="mt-14">
        <LuxuryButton href={`/stays/${property.slug}`} variant="dark">
          Explore this Haven
        </LuxuryButton>
      </div>
    </section>
  );
}
