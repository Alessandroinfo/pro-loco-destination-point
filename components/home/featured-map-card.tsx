import { pointsOfInterest } from "@/features/map/map.data";
import { publicRoutes } from "@/lib/routes";
import { AppModeLink } from "@/components/shared/app-mode-link";
import { SmoothImage } from "@/components/shared/smooth-image";
import type { Locale } from "@/lib/i18n/config";
import { formatPoiCount, getMessages } from "@/lib/i18n/messages";

export function FeaturedMapCard({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);

  return (
    <section className="mt-8">
      <AppModeLink
        href={publicRoutes.map}
        className="touch-card block h-[320px] text-left"
        aria-label={`${messages.featuredMap.title}, ${formatPoiCount(locale, pointsOfInterest.length)}`}
      >
        <SmoothImage
          src="/placeholders/category-map-pelagie.svg"
          alt={messages.featuredMap.imageAlt}
          fill
          className="object-cover brightness-[0.72] saturate-[0.88]"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          skeletonClassName="bg-[linear-gradient(135deg,rgba(16,36,63,0.22),rgba(91,183,212,0.24))]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.18),rgba(16,36,63,0.9))]" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">{messages.featuredMap.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{messages.featuredMap.title}</h2>
          </div>
          <div className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            {formatPoiCount(locale, pointsOfInterest.length)}
          </div>
        </div>
      </AppModeLink>
    </section>
  );
}
