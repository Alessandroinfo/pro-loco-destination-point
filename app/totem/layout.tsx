import type { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/totem/manifest.webmanifest",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
};

export default function TotemLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
