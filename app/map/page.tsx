import { MapRouteView } from "@/components/routes/page-route-views";
import { createMapPageMetadata } from "@/lib/page-metadata";

export const metadata = createMapPageMetadata("standard");

export default function MapPage() {
  return <MapRouteView />;
}
