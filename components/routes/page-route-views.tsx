import { HomePage } from "@/components/home/home-page";
import { MapPage as MapPageView } from "@/components/map/map-page";
import { CategoryPage as CategoryPageView } from "@/components/category/category-page";
import { BusinessDetailPage } from "@/components/business/business-detail-page";
import type { Business, Category } from "@/features/catalog/catalog.types";
import { getBusinessStructuredData, touristHubStructuredData } from "@/features/seo/structured-data";

export function HomeRouteView({ includeStructuredData = true }: { includeStructuredData?: boolean }) {
  return (
    <>
      {includeStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristHubStructuredData) }}
        />
      ) : null}
      <HomePage />
    </>
  );
}

export function MapRouteView() {
  return <MapPageView />;
}

export function CategoryRouteView({ category }: { category: Category }) {
  return <CategoryPageView category={category} />;
}

export function BusinessRouteView({
  business,
  category,
  includeStructuredData = true
}: {
  business: Business;
  category: Category;
  includeStructuredData?: boolean;
}) {
  return (
    <>
      {includeStructuredData ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBusinessStructuredData(business)) }} />
      ) : null}
      <BusinessDetailPage business={business} category={category} />
    </>
  );
}
