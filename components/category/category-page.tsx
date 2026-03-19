import type { Category } from "@/features/catalog/catalog.types";
import { getBusinessesByCategoryId } from "@/features/catalog/catalog.selectors";
import { CategoryHeader } from "@/components/category/category-header";
import { BusinessCard } from "@/components/category/business-card";
import { BackLink } from "@/components/shared/back-link";

export function CategoryPage({ category }: { category: Category }) {
  const businessesInCategory = getBusinessesByCategoryId(category.id);
  const hasBusinesses = businessesInCategory.length > 0;

  return (
    <section className="flex flex-col gap-8">
      <BackLink href="/" label="Home" />
      <CategoryHeader category={category} />

      {hasBusinesses ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-[320px]">
          {businessesInCategory.map((business, index) => (
            <BusinessCard key={business.id} business={business} categoryId={category.id} preload={index === 0} />
          ))}
        </section>
      ) : (
        <section className="glass-panel soft-outline rounded-[2rem] border border-dashed border-navy-950/12 px-8 py-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-navy-900/45">Sezione in aggiornamento</p>
          <h2 className="mt-4 text-3xl font-semibold text-navy-950">Stiamo preparando le attivita di questa categoria</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-navy-900/70">
            Torna presto per trovare una selezione curata di indirizzi consigliati a Lampedusa e Linosa.
          </p>
        </section>
      )}
    </section>
  );
}
