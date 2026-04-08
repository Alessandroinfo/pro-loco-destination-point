import { HomePage } from "@/components/home/home-page";
import { MapPage as MapPageView } from "@/components/map/map-page";
import { CategoryPage as CategoryPageView } from "@/components/category/category-page";
import { BusinessDetailPage } from "@/components/business/business-detail-page";
import type { Business, Category } from "@/features/catalog/catalog.types";
import { getBusinessStructuredData, getTouristHubStructuredData } from "@/features/seo/structured-data";
import type { Locale } from "@/lib/i18n/config";

export function HomeRouteView({
  includeStructuredData = true,
  locale = "it"
}: {
  includeStructuredData?: boolean;
  locale?: Locale;
}) {
  return (
    <>
      {includeStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getTouristHubStructuredData(locale)) }}
        />
      ) : null}
      <HomePage locale={locale} />
    </>
  );
}

export function MapRouteView({ locale = "it" }: { locale?: Locale }) {
  return <MapPageView locale={locale} />;
}

export function CategoryRouteView({ category, locale = "it" }: { category: Category; locale?: Locale }) {
  return <CategoryPageView category={category} locale={locale} />;
}

export function BusinessRouteView({
  business,
  category,
  includeStructuredData = true,
  locale = "it"
}: {
  business: Business;
  category: Category;
  includeStructuredData?: boolean;
  locale?: Locale;
}) {
  return (
    <>
      {includeStructuredData ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBusinessStructuredData(business)) }} />
      ) : null}
      <BusinessDetailPage business={business} category={category} locale={locale} />
    </>
  );
}
