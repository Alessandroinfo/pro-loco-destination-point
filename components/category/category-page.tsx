import type { Category } from "@/features/catalog/catalog.types";
import { getLocalizedBusinessesByCategoryId } from "@/features/catalog/catalog.i18n";
import { CategoryHeader } from "@/components/category/category-header";
import { BusinessCard } from "@/components/category/business-card";
import { BackLink } from "@/components/shared/back-link";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export function CategoryPage({ category, locale }: { category: Category; locale: Locale }) {
  const messages = getMessages(locale);
  const businessesInCategory = getLocalizedBusinessesByCategoryId(category.id, locale);
  const hasBusinesses = businessesInCategory.length > 0;

  return (
    <section className="flex flex-col gap-8">
      <BackLink href="/" label={messages.common.home} />
      <CategoryHeader category={category} locale={locale} />

      {hasBusinesses ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-[320px]">
          {businessesInCategory.map((business, index) => (
            <BusinessCard key={business.id} business={business} categoryId={category.id} preload={index === 0} />
          ))}
        </section>
      ) : (
        <section className="glass-panel soft-outline rounded-[2rem] border border-dashed border-navy-950/12 px-8 py-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-navy-900/45">{messages.category.updatingEyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold text-navy-950">{messages.category.updatingTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-navy-900/70">{messages.category.updatingDescription}</p>
        </section>
      )}
    </section>
  );
}
