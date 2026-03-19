import { HomeRouteView } from "@/components/routes/page-route-views";
import { createHomePageMetadata } from "@/lib/page-metadata";

export const metadata = createHomePageMetadata("standard");

export default function Page() {
  return <HomeRouteView />;
}
