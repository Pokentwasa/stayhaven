import type { Property } from "@/data/types";

export function Amenities({ property }: { property: Property }) {
  const mid = Math.ceil(property.amenities.length / 2);
  const columns = [property.amenities.slice(0, mid), property.amenities.slice(mid)];

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-white text-charcoal">
      <p className="text-eyebrow mb-12 text-charcoal/50">08 — Amenities</p>

      <div className="grid grid-cols-1 gap-x-16 gap-y-3 sm:grid-cols-2">
        {columns.map((col, ci) => (
          <ul key={ci} className="flex flex-col divide-y divide-charcoal/10">
            {col.map((amenity) => (
              <li key={amenity.id} className="py-4 text-body-lg">
                {amenity.label}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
