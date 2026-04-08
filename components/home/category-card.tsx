import type { Category } from "@/features/catalog/catalog.types";
import { getBusinessesByCategoryId } from "@/features/catalog/catalog.selectors";
import { getCategoryRoute } from "@/lib/routes";
import { AppModeLink } from "@/components/shared/app-mode-link";
import { SmoothImage } from "@/components/shared/smooth-image";
import type { Locale } from "@/lib/i18n/config";
import { formatActivityCount } from "@/lib/i18n/messages";

export function CategoryCard({
  category,
  locale,
  preload = false
}: {
  category: Category;
  locale: Locale;
  preload?: boolean;
}) {
  const businessCount = getBusinessesByCategoryId(category.id).length;

  return (
    <AppModeLink
      href={getCategoryRoute(category.id)}
      className="touch-card group h-[290px] text-left"
      aria-label={`${category.name}, ${formatActivityCount(locale, businessCount)}`}
    >
      <SmoothImage
        src={category.image}
        alt={category.name}
        fill
        className="object-cover brightness-[0.68] saturate-[0.85]"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading={preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : "auto"}
        skeletonClassName="bg-[linear-gradient(135deg,rgba(16,36,63,0.22),rgba(91,183,212,0.24))]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.24),rgba(16,36,63,0.94))]" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-full sm:max-w-[70%]">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">{category.shortLabel}</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{category.name}</h2>
        </div>
        <div
          className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:self-auto"
          style={{ backgroundColor: `${category.color}CC` }}
        >
          {formatActivityCount(locale, businessCount)}
        </div>
      </div>
    </AppModeLink>
  );
}
