import type { Category } from "@/features/catalog/catalog.types";
import { getLocalizedBusinessesByCategoryId } from "@/features/catalog/catalog.i18n";
import type { Locale } from "@/lib/i18n/config";
import { formatBusinessCount } from "@/lib/i18n/messages";

export function CategoryHeader({ category, locale }: { category: Category; locale: Locale }) {
  const businessesInCategory = getLocalizedBusinessesByCategoryId(category.id, locale);

  return (
    <section className="glass-panel soft-outline rounded-[2rem] border p-7">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-semibold text-navy-950">{category.name}</h1>
        <span className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: category.color }}>
          {category.shortLabel}
        </span>
        <span className="rounded-full border border-navy-950/10 bg-slate-50 px-4 py-2 text-sm font-semibold text-navy-900">
          {formatBusinessCount(locale, businessesInCategory.length)}
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-navy-900/70">{category.tagline}</p>
    </section>
  );
}
