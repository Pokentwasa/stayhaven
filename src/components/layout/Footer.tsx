import { TransitionLink } from "./TransitionLink";
import { SITE } from "@/data/site";

export function Footer() {
  const { footer } = SITE;

  return (
    <footer
      data-header-theme="light"
      className="section-pad-t container-edge flex flex-col gap-20 bg-warm-black pb-10 text-ivory"
    >
      <div className="flex flex-col justify-between gap-16 md:flex-row">
        <p className="text-display-lg leading-none">{footer.heading}</p>

        <div className="flex flex-col gap-16 sm:flex-row sm:gap-24">
          <nav className="flex flex-col gap-4">
            {footer.nav.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="text-body-lg opacity-80 transition-opacity hover:opacity-100"
              >
                {link.label}
              </TransitionLink>
            ))}
          </nav>

          <div className="flex flex-col gap-6">
            <p className="text-eyebrow opacity-60">{footer.newsletter.heading}</p>
            <p className="max-w-xs text-sm opacity-70">{footer.newsletter.description}</p>
            <form className="flex items-end gap-4 border-b border-ivory/30 pb-3">
              <input
                type="email"
                placeholder={footer.newsletter.placeholder}
                className="w-full bg-transparent text-sm outline-none placeholder:text-ivory/40"
              />
              <button type="submit" className="text-eyebrow shrink-0">
                {footer.newsletter.cta}
              </button>
            </form>

            <div className="flex gap-6 pt-2">
              {footer.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-eyebrow opacity-70 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse justify-between gap-4 border-t border-ivory/10 pt-8 text-xs opacity-50 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} {SITE.brand.name}. All rights reserved.</p>
        <div className="flex gap-6">
          {footer.legal.map((link) => (
            <TransitionLink key={link.href} href={link.href}>
              {link.label}
            </TransitionLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
