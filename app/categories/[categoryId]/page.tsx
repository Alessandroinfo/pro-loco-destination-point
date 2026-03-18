import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryPage as CategoryPageView } from "@/components/category/category-page";
import { categories } from "@/features/catalog/categories.data";
import { getCategoryById } from "@/features/catalog/catalog.selectors";
import { getAbsoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ categoryId: category.id }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ categoryId: string }>;
}): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: `${category.tagline}. Esplora la sezione ${category.name} del totem turistico ufficiale di Lampedusa e Linosa.`,
    alternates: {
      canonical: getAbsoluteUrl(`/categories/${category.id}`)
    }
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  return <CategoryPageView category={category} />;
}
