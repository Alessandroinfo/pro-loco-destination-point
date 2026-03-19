import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "@/app/globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { PwaRegister } from "@/components/pwa-register";
import { AppModeProvider } from "@/components/providers/app-mode-provider";

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
    default: "Pro Loco - Destination Point",
    template: "%s | Pro Loco - Destination Point"
  },
  description:
    "Totem turistico ufficiale della Pro Loco di Lampedusa e Linosa con categorie, aziende, mappa offline e accesso rapido via WhatsApp.",
  keywords: [
    "Lampedusa",
    "Linosa",
    "Pro Loco",
    "totem turistico",
    "mappa Lampedusa",
    "vacanze Lampedusa",
    "attività Lampedusa"
  ],
  applicationName: "Pro Loco - Destination Point",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Destination Point"
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: "Pro Loco - Destination Point",
    description:
      "Un hub digitale elegante e offline-friendly per scoprire esperienze, ospitalità, ristorazione, trasporti e mappa dell'isola.",
    type: "website",
    locale: "it_IT",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Pro Loco - Destination Point"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Loco - Destination Point",
    description:
      "PWA statica per totem touch screen outdoor dedicata al turismo di Lampedusa e Linosa.",
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
