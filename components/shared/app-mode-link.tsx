"use client";

import type { UrlObject } from "url";
import Link, { type LinkProps } from "next/link";

import { useAppMode } from "@/components/providers/app-mode-provider";

type AppModeLinkProps = React.PropsWithChildren<
  LinkProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">
>;

function getModeAwareObjectHref(href: UrlObject, getModeAwareHref: (href: string) => string) {
  if (typeof href.pathname !== "string") {
    return href;
  }

  return {
    ...href,
    pathname: getModeAwareHref(href.pathname)
  };
}

export function AppModeLink({ href, children, ...props }: AppModeLinkProps) {
  const { getModeAwareHref } = useAppMode();

  const nextHref = typeof href === "string" ? getModeAwareHref(href) : getModeAwareObjectHref(href, getModeAwareHref);

  return (
    <Link href={nextHref} {...props}>
      {children}
    </Link>
  );
}
