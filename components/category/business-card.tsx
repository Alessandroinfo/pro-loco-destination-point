import type { Business, CategoryId } from "@/features/catalog/catalog.types";
import { getBusinessRoute } from "@/lib/routes";
import { AppModeLink } from "@/components/shared/app-mode-link";
import { SmoothImage } from "@/components/shared/smooth-image";

export function BusinessCard({
  business,
  categoryId,
  preload = false
}: {
  business: Business;
  categoryId: CategoryId;
  preload?: boolean;
}) {
  return (
    <AppModeLink
      href={getBusinessRoute(categoryId, business.id)}
      className="touch-card h-[320px] text-left"
      aria-label={`${business.name}, ${business.type}`}
    >
      <SmoothImage
        src={business.heroImage}
        alt={business.name}
        fill
        className="object-cover"
        sizes="50vw"
        loading={preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : "auto"}
        skeletonClassName="bg-[linear-gradient(135deg,rgba(16,36,63,0.16),rgba(255,255,255,0.14))]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.08),rgba(16,36,63,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-white/65">{business.type}</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">{business.name}</h2>
      </div>
    </AppModeLink>
  );
}
