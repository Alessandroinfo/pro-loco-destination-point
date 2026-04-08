import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryRouteView } from "@/components/routes/page-route-views";
import { getCategoryStaticParams, resolveCategoryPageData } from "@/lib/catalog-route-helpers";
import { createCategoryPageMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategoryStaticParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ categoryId: string }>;
}): Promise<Metadata> {
  const { categoryId } = await params;
  const category = resolveCategoryPageData(categoryId, "en");

  if (!category) {
    return {};
  }

  return createCategoryPageMetadata(category, "totem", "en");
}

export default async function TotemEnglishCategoryPage({
  params
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const category = resolveCategoryPageData(categoryId, "en");

  if (!category) {
    notFound();
  }

  return <CategoryRouteView category={category} locale="en" />;
}
