import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "@/app/globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { PwaRegister } from "@/components/pwa-register";
import { AppModeProvider } from "@/components/providers/app-mode-provider";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-brand";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Lampedusa",
    "Linosa",
    "Pro Loco",
    "totem turistico",
    "mappa Lampedusa",
    "vacanze Lampedusa",
    "attività Lampedusa"
  ],
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "it_IT",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: SITE_NAME
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.svg"]
  },
  category: "travel",
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <a
          href="#main-content"
          className="skip-link rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(16,36,63,0.22)]"
        >
          Vai al contenuto principale
        </a>
        <PwaRegister />
        <AppModeProvider>
          <AppShell>{children}</AppShell>
        </AppModeProvider>
      </body>
    </html>
  );
}
