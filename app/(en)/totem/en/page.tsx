import { HomeRouteView } from "@/components/routes/page-route-views";
import { createHomePageMetadata } from "@/lib/page-metadata";

export const metadata = createHomePageMetadata("totem", "en");

export default function TotemEnglishPage() {
  return <HomeRouteView includeStructuredData={false} locale="en" />;
}
