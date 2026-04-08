import { HomeRouteView } from "@/components/routes/page-route-views";
import { createHomePageMetadata } from "@/lib/page-metadata";

export const metadata = createHomePageMetadata("standard", "en");

export default function EnglishHomePage() {
  return <HomeRouteView locale="en" />;
}
