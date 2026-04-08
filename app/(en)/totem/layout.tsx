import type { Metadata } from "next";

import { withBasePath } from "@/lib/site";

export const metadata: Metadata = {
  manifest: withBasePath("/totem/en/manifest.webmanifest"),
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
};

export default function TotemEnglishLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
