export function StubPage({ eyebrow, heading, body }: { eyebrow: string; heading: string; body: string }) {
  return (
    <section
      data-header-theme="dark"
      className="section-pad container-edge flex min-h-[70vh] flex-col justify-center gap-8 bg-brand-blue text-charcoal"
    >
      <p className="text-eyebrow text-charcoal/50">{eyebrow}</p>
      <h1 className="text-display-lg max-w-3xl">{heading}</h1>
      <p className="text-body-lg max-w-xl text-charcoal/65">{body}</p>
    </section>
  );
}
