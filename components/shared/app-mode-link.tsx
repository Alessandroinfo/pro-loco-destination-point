"use client";

import Link, { type LinkProps } from "next/link";

import { useAppMode } from "@/components/providers/app-mode-provider";

type AppModeLinkProps = React.PropsWithChildren<
  LinkProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">
>;

export function AppModeLink({ href, children, ...props }: AppModeLinkProps) {
  const { getModeAwareHref } = useAppMode();
  const nextHref = typeof href === "string" ? getModeAwareHref(href) : href;

  return (
    <Link href={nextHref} {...props}>
      {children}
    </Link>
  );
}
