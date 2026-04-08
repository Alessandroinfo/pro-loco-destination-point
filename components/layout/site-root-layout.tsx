import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";

import { AppShell } from "@/components/layout/app-shell";
import { PwaRegister } from "@/components/pwa-register";
import { AppModeProvider } from "@/components/providers/app-mode-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"]
});

export function SiteRootLayout({
  children,
  locale
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  const messages = getMessages(locale);
  const shouldCleanupServiceWorker = process.env.NODE_ENV !== "production";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <Script id="cleanup-local-sw" strategy="beforeInteractive">
          {`(() => {
  const shouldCleanupServiceWorker = ${JSON.stringify(shouldCleanupServiceWorker)};

  if (!shouldCleanupServiceWorker) {
    return;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    }).catch(() => {});
  }

  if ("caches" in window) {
    caches.keys().then((keys) => {
      keys.forEach((key) => {
        caches.delete(key);
      });
    }).catch(() => {});
  }
})();`}
        </Script>
        <a
          href="#main-content"
          className="skip-link rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(16,36,63,0.22)]"
        >
          {messages.common.skipToMain}
        </a>
        <PwaRegister />
        <AppModeProvider>
          <LocaleProvider initialLocale={locale}>
            <AppShell>{children}</AppShell>
          </LocaleProvider>
        </AppModeProvider>
      </body>
    </html>
  );
}
