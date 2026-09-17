import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { cx } from "@/lib/utils";

const base =
  "group relative inline-flex items-center gap-3 text-eyebrow transition-colors duration-500 ease-out focus-visible:outline-offset-4";

const variants = {
  primary: "text-ivory",
  dark: "text-charcoal",
  line: "text-current",
};

function Underline() {
  return (
    <span className="relative block h-px w-8 overflow-hidden bg-current/40">
      <span className="absolute inset-0 origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </span>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block translate-x-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
    >
      &rarr;
    </span>
  );
}

export function LuxuryButton({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <TransitionLink href={href} className={cx(base, variants[variant], className)} {...rest}>
      <span>{children}</span>
      <Underline />
      <Arrow />
    </TransitionLink>
  );
}

export function LuxuryButtonAsButton({
  className,
  variant = "primary",
  children,
  ...rest
}: {
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cx(base, variants[variant], className)} {...rest}>
      <span>{children}</span>
      <Underline />
      <Arrow />
    </button>
  );
}
