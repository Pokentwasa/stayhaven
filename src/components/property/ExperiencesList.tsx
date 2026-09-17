import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import type { Property } from "@/data/types";

export function ExperiencesList({ property }: { property: Property }) {
  return (
    <section data-header-theme="light" className="section-pad bg-warm-black text-ivory">
      <div className="container-edge mb-12">
        <p className="text-eyebrow text-ivory/60">07 — Experiences</p>
        <h2 className="text-display-lg mt-4">What to do here.</h2>
      </div>

      <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
        {property.experiences.map((experience) => (
          <div key={experience.id} className="group relative aspect-[4/3] overflow-hidden">
            <PlaceholderMedia
              media={experience.image}
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/80 via-warm-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <h3 className="text-display-sm">{experience.title}</h3>
              <p className="mt-2 max-w-sm text-ivory/75">{experience.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
