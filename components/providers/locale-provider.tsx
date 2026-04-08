"use client";

import { createContext, useContext, useEffect, useMemo } from "react";

import { useAppMode } from "@/components/providers/app-mode-provider";
import {
  defaultLocale,
  getLocaleAwareHref,
  getLocaleFromPathname,
  type Locale
} from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

type LocaleContextValue = {
  locale: Locale;
  defaultLocale: Locale;
  messages: ReturnType<typeof getMessages>;
  getLocaleAwareHref: (href: string) => string;
  getSwitchLocaleHref: (targetLocale: Locale, href?: string) => string;
  isDefaultLocale: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const { canonicalPathname } = useAppMode();
  const pathname = canonicalPathname;
  const locale = initialLocale ?? getLocaleFromPathname(canonicalPathname);

  const value = useMemo<LocaleContextValue>(
    () => ({
      defaultLocale,
      getLocaleAwareHref: (href: string) => getLocaleAwareHref(href, locale),
      getSwitchLocaleHref: (targetLocale: Locale, href = pathname) => getLocaleAwareHref(href, targetLocale),
      isDefaultLocale: locale === defaultLocale,
      locale,
      messages: getMessages(locale)
    }),
    [locale, pathname]
  );

  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.lang = locale;
    htmlElement.dataset.locale = locale;
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider.");
  }

  return context;
}
