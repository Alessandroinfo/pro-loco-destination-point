import { pointsOfInterest } from "@/features/map/map.data";
import { publicRoutes } from "@/lib/routes";
import { AppModeLink } from "@/components/shared/app-mode-link";
import { SmoothImage } from "@/components/shared/smooth-image";

export function FeaturedMapCard() {
  return (
    <section className="mt-8">
      <AppModeLink
        href={publicRoutes.map}
        className="touch-card block h-[320px] text-left"
        aria-label={`Esplora le Pelagie, ${pointsOfInterest.length} punti di interesse`}
      >
        <SmoothImage
          src="/placeholders/category-map.svg"
          alt="Esplora le Pelagie"
          fill
          className="object-cover"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          skeletonClassName="bg-[linear-gradient(135deg,rgba(16,36,63,0.22),rgba(91,183,212,0.24))]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.05),rgba(16,36,63,0.84))]" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">Spiagge, cale e punti di interesse</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">Esplora le Pelagie</h2>
          </div>
          <div className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            {pointsOfInterest.length} punti di interesse
          </div>
        </div>
      </AppModeLink>
    </section>
  );
}
