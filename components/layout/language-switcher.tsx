"use client";

import Link from "next/link";

import { useAppMode } from "@/components/providers/app-mode-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { locales } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const { getModeAwareHref } = useAppMode();
  const { locale, getSwitchLocaleHref, messages } = useLocale();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-navy-950/10 bg-white/78 p-1 shadow-[0_10px_30px_rgba(16,36,63,0.08)] backdrop-blur"
      aria-label={messages.header.languageLabel}
    >
      {locales.map((candidateLocale) => {
        const isActive = candidateLocale === locale;

        return (
          <Link
            key={candidateLocale}
            href={getModeAwareHref(getSwitchLocaleHref(candidateLocale))}
            hrefLang={candidateLocale}
            className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
              isActive ? "bg-navy-950 text-white" : "text-navy-950/68 hover:text-navy-950"
            }`}
            aria-current={isActive ? "true" : undefined}
          >
            {candidateLocale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
