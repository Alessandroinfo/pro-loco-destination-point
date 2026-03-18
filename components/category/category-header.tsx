import type { Category } from "@/features/catalog/catalog.types";
import { getBusinessesByCategoryId } from "@/features/catalog/catalog.selectors";

export function CategoryHeader({ category }: { category: Category }) {
  const businessesInCategory = getBusinessesByCategoryId(category.id);

  return (
    <section className="glass-panel soft-outline rounded-[2rem] border p-7">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-semibold text-navy-950">{category.name}</h1>
        <span className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: category.color }}>
          {category.shortLabel}
        </span>
        <span className="rounded-full border border-navy-950/10 bg-slate-50 px-4 py-2 text-sm font-semibold text-navy-900">
          {businessesInCategory.length} strutture disponibili
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-navy-900/70">{category.tagline}</p>
    </section>
  );
}
