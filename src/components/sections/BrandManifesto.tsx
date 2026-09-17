import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SITE } from "@/data/site";

export function BrandManifesto() {
  const { manifesto } = SITE;

  return (
    <section data-header-theme="dark" className="section-pad container-edge bg-ivory text-charcoal">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-14 text-center">
        <p className="text-eyebrow text-charcoal/50">{manifesto.eyebrow}</p>
        <h2 className="text-display-md text-charcoal/40">{manifesto.heading}</h2>
        <AnimatedHeading
          lines={manifesto.lines}
          size="lg"
          as="p"
          className="text-charcoal"
        />
      </div>
    </section>
  );
}
