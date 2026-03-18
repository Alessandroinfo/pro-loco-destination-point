import type { Category } from "@/features/catalog/catalog.types";
import { getBusinessesByCategoryId } from "@/features/catalog/catalog.selectors";
import { CategoryHeader } from "@/components/category/category-header";
import { BusinessCard } from "@/components/category/business-card";
import { BackLink } from "@/components/shared/back-link";

export function CategoryPage({ category }: { category: Category }) {
  const businessesInCategory = getBusinessesByCategoryId(category.id);

  return (
    <section className="flex flex-col gap-8">
      <BackLink href="/" label="Home" />
      <CategoryHeader category={category} />

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-[320px]">
        {businessesInCategory.map((business, index) => (
          <BusinessCard key={business.id} business={business} categoryId={category.id} preload={index === 0} />
        ))}
      </section>
    </section>
  );
}
