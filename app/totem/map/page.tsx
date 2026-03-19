import { MapRouteView } from "@/components/routes/page-route-views";
import { createMapPageMetadata } from "@/lib/page-metadata";

export const metadata = createMapPageMetadata("totem");

export default function TotemMapPage() {
  return <MapRouteView />;
}
