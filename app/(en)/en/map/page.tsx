import { MapRouteView } from "@/components/routes/page-route-views";
import { createMapPageMetadata } from "@/lib/page-metadata";

export const metadata = createMapPageMetadata("standard", "en");

export default function EnglishMapPage() {
  return <MapRouteView locale="en" />;
}
