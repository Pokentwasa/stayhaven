import type { Property } from "@/data/types";

export function PropertyGuestNotes({ property }: { property: Property }) {
  if (property.testimonials.length === 0) return null;

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-brand-blue text-charcoal">
      <p className="text-eyebrow mb-12 text-charcoal/50">09 — Guest Notes</p>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {property.testimonials.map((testimonial) => (
          <blockquote key={testimonial.id} className="flex flex-col gap-6">
            <p className="text-display-sm">&ldquo;{testimonial.quote}&rdquo;</p>
            <footer className="flex flex-col gap-1 text-sm text-charcoal/60">
              <span className="text-eyebrow">{testimonial.guestName}</span>
              <span>{testimonial.guestLocation}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
