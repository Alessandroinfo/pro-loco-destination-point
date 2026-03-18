import { businesses } from "@/features/catalog/businesses.data";
import { categories } from "@/features/catalog/categories.data";
import type { Business, Category, CategoryId } from "@/features/catalog/catalog.types";

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((category) => category.id === categoryId);
}

export function getBusinessesByCategoryId(categoryId: CategoryId): Business[] {
  return businesses.filter((business) => business.categoryId === categoryId);
}

export function getBusinessBySlug(categoryId: string, businessId: string): Business | undefined {
  return businesses.find((business) => business.categoryId === categoryId && business.id === businessId);
}
