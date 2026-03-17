import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "@/app/globals.css";
import { PwaRegister } from "@/components/pwa-register";
import { TotemShell } from "@/components/totem-shell";

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
    default: "Hub Turistico Pro Loco Lampedusa e Linosa",
    template: "%s | Pro Loco Lampedusa e Linosa"
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
  applicationName: "Hub Turistico Pro Loco Lampedusa e Linosa",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pro Loco Hub"
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: "Hub Turistico Pro Loco Lampedusa e Linosa",
    description:
      "Un hub digitale elegante e offline-friendly per scoprire esperienze, ospitalità, ristorazione, trasporti e mappa dell'isola.",
    type: "website",
    locale: "it_IT",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Hub Turistico Pro Loco Lampedusa e Linosa"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hub Turistico Pro Loco Lampedusa e Linosa",
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
        <PwaRegister />
        <TotemShell>{children}</TotemShell>
      </body>
    </html>
  );
}
