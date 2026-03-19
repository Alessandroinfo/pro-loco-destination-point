import { businesses } from "@/features/catalog/businesses.data";
import { categories } from "@/features/catalog/categories.data";
import { getBusinessBySlug, getCategoryById } from "@/features/catalog/catalog.selectors";

export function getCategoryStaticParams() {
  return categories.map((category) => ({ categoryId: category.id }));
}

export function getBusinessStaticParams() {
  return businesses.map((business) => ({
    categoryId: business.categoryId,
    businessId: business.id
  }));
}

export function resolveCategoryPageData(categoryId: string) {
  return getCategoryById(categoryId);
}

export function resolveBusinessPageData(categoryId: string, businessId: string) {
  const category = getCategoryById(categoryId);
  const business = getBusinessBySlug(categoryId, businessId);

  if (!category || !business) {
    return null;
  }

  return {
    category,
    business
  };
}
