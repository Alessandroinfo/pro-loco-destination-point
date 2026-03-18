import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BusinessDetailPage } from "@/components/business/business-detail-page";
import { businesses } from "@/features/catalog/businesses.data";
import { getBusinessBySlug, getCategoryById } from "@/features/catalog/catalog.selectors";
import { getBusinessStructuredData } from "@/features/seo/structured-data";
import { getAbsoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return businesses.map((business) => ({
    categoryId: business.categoryId,
    businessId: business.id
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ categoryId: string; businessId: string }>;
}): Promise<Metadata> {
  const { categoryId, businessId } = await params;
  const business = getBusinessBySlug(categoryId, businessId);

  if (!business) {
    return {};
  }

  return {
    title: business.name,
    description: `${business.shortDescription} ${business.description}`,
    alternates: {
      canonical: getAbsoluteUrl(`/categories/${categoryId}/${businessId}`)
    }
  };
}

export default async function BusinessPage({
  params
}: {
  params: Promise<{ categoryId: string; businessId: string }>;
}) {
  const { categoryId, businessId } = await params;
  const category = getCategoryById(categoryId);
  const business = getBusinessBySlug(categoryId, businessId);

  if (!category || !business) {
    notFound();
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBusinessStructuredData(business)) }} />
      <BusinessDetailPage business={business} category={category} />
    </>
  );
}
