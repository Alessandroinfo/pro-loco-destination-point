import "@/app/globals.css";

import { SiteRootLayout } from "@/components/layout/site-root-layout";
import { createRootMetadata } from "@/lib/root-metadata";

export const metadata = createRootMetadata("en");

export default function EnglishRootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRootLayout locale="en">{children}</SiteRootLayout>;
}
