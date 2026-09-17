"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { type AnchorHTMLAttributes, type ReactNode, useCallback } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Props = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
  };

/**
 * Cinematic route transition: cross-fades the outgoing/incoming page via the
 * View Transitions API instead of a hard cut. Falls back to a plain Next
 * `<Link>` when unsupported or reduced-motion is on — never blocks navigation.
 */
export function TransitionLink({ href, children, onClick, ...rest }: Props) {
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const supportsViewTransitions =
        typeof document !== "undefined" && "startViewTransition" in document;

      if (!supportsViewTransitions || prefersReducedMotion()) return;

      e.preventDefault();
      document.startViewTransition(() => {
        router.push(href.toString());
      });
    },
    [href, onClick, router]
  );

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
