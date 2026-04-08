import "@/app/globals.css";

import { SiteRootLayout } from "@/components/layout/site-root-layout";
import { createRootMetadata } from "@/lib/root-metadata";

export const metadata = createRootMetadata("it");

export default function ItalianRootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRootLayout locale="it">{children}</SiteRootLayout>;
}
