import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PROPERTIES } from "@/data/properties";

const SPAN = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-2 md:row-span-2",
  "md:col-span-4",
];

export function EditorialGallery() {
  const moments = PROPERTIES.flatMap((p) => p.gallery).slice(0, 7);

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <SectionIntro index="06" label="Moments" heading="Moments from the Collection." />

      <div className="mt-16 grid grid-cols-2 gap-4 md:auto-rows-[14rem] md:grid-cols-6">
        {moments.map((media, i) => (
          <div
            key={media.id}
            className={`group relative overflow-hidden ${SPAN[i % SPAN.length]}`}
          >
            <PlaceholderMedia
              media={media}
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
