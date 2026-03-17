import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BusinessDetailScreen } from "@/components/business-detail-screen";
import { businesses, getBusiness, getCategory } from "@/lib/totem-data";
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
  const business = getBusiness(categoryId, businessId);

  if (!business) {
    return {};
  }

  return {
    title: business.name,
    description: `${business.shortDescription} ${business.description}`,
    alternates: {
      canonical: getAbsoluteUrl(`/categorie/${categoryId}/${businessId}`)
    }
  };
}

export default async function BusinessPage({
  params
}: {
  params: Promise<{ categoryId: string; businessId: string }>;
}) {
  const { categoryId, businessId } = await params;
  const category = getCategory(categoryId);
  const business = getBusiness(categoryId, businessId);

  if (!category || !business) {
    notFound();
  }

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    address: business.address,
    openingHours: business.hours
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
      <BusinessDetailScreen business={business} category={category} />
    </>
  );
}
