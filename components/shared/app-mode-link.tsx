"use client";

import { useAppMode } from "@/components/providers/app-mode-provider";
import { withBasePath } from "@/lib/site";

type AppModeLinkProps = React.PropsWithChildren<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  }
>;

export function AppModeLink({ href, children, ...props }: AppModeLinkProps) {
  const { getModeAwareHref } = useAppMode();
  const nextHref = withBasePath(getModeAwareHref(href));

  return (
    <a href={nextHref} {...props}>
      {children}
    </a>
  );
}
