import { HomeRouteView } from "@/components/routes/page-route-views";
import { createHomePageMetadata } from "@/lib/page-metadata";

export const metadata = createHomePageMetadata("totem", "it");

export default function TotemPage() {
  return <HomeRouteView includeStructuredData={false} locale="it" />;
}
