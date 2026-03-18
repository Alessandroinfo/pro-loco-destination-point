import { pointOfInterestLegend } from "@/features/map/map.data";
import { BackLink } from "@/components/shared/back-link";
import { IslandMapCanvas } from "@/components/map/island-map-canvas";

export function MapPage() {
  return (
    <section className="flex flex-1 flex-col gap-8">
      <BackLink href="/" label="Home" />

      <section className="glass-panel soft-outline rounded-[2rem] border p-7">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-4xl font-semibold text-navy-950">Mappa interattiva</h1>
          <ul className="flex flex-wrap items-center gap-4" aria-label="Legenda dei punti di interesse">
            {Object.entries(pointOfInterestLegend).map(([label, color]) => (
              <li key={label} className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-navy-900">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-1">
        <div className="glass-panel soft-outline relative min-h-[980px] w-full overflow-hidden rounded-[2rem] border p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(91,183,212,0.15),transparent_28%),linear-gradient(180deg,#fdfefe_0%,#eff6f8_100%)]" />
          <IslandMapCanvas />
        </div>
      </section>
    </section>
  );
}
