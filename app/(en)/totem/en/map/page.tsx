import { MapRouteView } from "@/components/routes/page-route-views";
import { createMapPageMetadata } from "@/lib/page-metadata";

export const metadata = createMapPageMetadata("totem", "en");

export default function TotemEnglishMapPage() {
  return <MapRouteView locale="en" />;
}
