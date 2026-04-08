"use client";

import { AppModeLink } from "@/components/shared/app-mode-link";
import { useLocale } from "@/components/providers/locale-provider";

export function BackLink({ href, label }: { href: string; label: string }) {
  const { locale } = useLocale();

  return (
    <AppModeLink
      href={href}
      className="inline-flex min-h-14 w-fit items-center gap-3 rounded-full border border-navy-950/10 bg-white/80 px-6 text-lg font-semibold text-navy-950 shadow-[0_14px_34px_rgba(16,36,63,0.08)] backdrop-blur"
      aria-label={locale === "en" ? `Back to ${label}` : `Torna a ${label}`}
    >
      <span className="text-2xl leading-none">‹</span>
      {label}
    </AppModeLink>
  );
}
