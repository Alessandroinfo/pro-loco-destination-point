import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BusinessRouteView } from "@/components/routes/page-route-views";
import { getBusinessStaticParams, resolveBusinessPageData } from "@/lib/catalog-route-helpers";
import { createBusinessPageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBusinessStaticParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ categoryId: string; businessId: string }>;
}): Promise<Metadata> {
  const { categoryId, businessId } = await params;
  const pageData = resolveBusinessPageData(categoryId, businessId, "it");

  if (!pageData) {
    return {};
  }

  return createBusinessPageMetadata(categoryId, pageData.business, "standard", "it");
}

export default async function BusinessPage({
  params
}: {
  params: Promise<{ categoryId: string; businessId: string }>;
}) {
  const { categoryId, businessId } = await params;
  const pageData = resolveBusinessPageData(categoryId, businessId, "it");

  if (!pageData) {
    notFound();
  }

  return <BusinessRouteView business={pageData.business} category={pageData.category} locale="it" />;
}
