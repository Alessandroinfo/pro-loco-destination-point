import { categories } from "@/features/catalog/categories.data";
import { businesses } from "@/features/catalog/businesses.data";
import { getLocalizedBusinessBySlug, getLocalizedCategoryById } from "@/features/catalog/catalog.i18n";
import type { Locale } from "@/lib/i18n/config";

export function getCategoryStaticParams() {
  return categories.map((category) => ({ categoryId: category.id }));
}

export function getBusinessStaticParams() {
  return businesses.map((business) => ({
    categoryId: business.categoryId,
    businessId: business.id
  }));
}

export function resolveCategoryPageData(categoryId: string, locale: Locale = "it") {
  return getLocalizedCategoryById(categoryId, locale);
}

export function resolveBusinessPageData(categoryId: string, businessId: string, locale: Locale = "it") {
  const category = getLocalizedCategoryById(categoryId, locale);
  const business = getLocalizedBusinessBySlug(categoryId, businessId, locale);

  if (!category || !business) {
    return null;
  }

  return {
    category,
    business
  };
}
