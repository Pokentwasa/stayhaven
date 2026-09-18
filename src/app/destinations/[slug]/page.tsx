import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { DESTINATIONS } from "@/data/destinations";
import { PROPERTIES } from "@/data/properties";

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = DESTINATIONS.find((d) => d.slug === slug);
  if (!destination) return {};
  return { title: destination.name, description: destination.description };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = DESTINATIONS.find((d) => d.slug === slug);
  if (!destination) notFound();

  const properties = PROPERTIES.filter((p) => p.destinationSlug === destination.slug);

  return (
    <>
      <section
        data-header-theme="light"
        className="relative flex h-[70svh] w-full items-end overflow-hidden bg-warm-black text-ivory"
      >
        <PlaceholderMedia media={destination.heroImage} className="absolute inset-0 opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black via-warm-black/10 to-warm-black/40" />
        <div className="container-edge relative z-10 flex flex-col gap-4 pb-16">
          <p className="text-eyebrow opacity-75">{destination.region}</p>
          <h1 className="text-display-xl">{destination.name}</h1>
        </div>
      </section>

      <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
        <p className="text-body-lg max-w-2xl text-charcoal/70">{destination.description}</p>

        {properties.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            {properties.map((property) => (
              <article key={property.id} className="flex flex-col gap-4">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <PlaceholderMedia media={property.heroMedia} className="absolute inset-0" />
                </div>
                <h2 className="text-display-sm">{property.name}</h2>
                <LuxuryButton href={`/stays/${property.slug}`} variant="dark">
                  Explore Property
                </LuxuryButton>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
