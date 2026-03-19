import { pointOfInterestLegend } from "@/features/map/map.data";
import { BackLink } from "@/components/shared/back-link";
import { IslandMapCanvas } from "@/components/map/island-map-canvas";
import { MapPointWorkbench } from "@/components/map/map-point-workbench";

export function MapPage() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <section className="flex flex-1 flex-col gap-8">
      <BackLink href="/" label="Home" />

      <section className="glass-panel soft-outline rounded-[2rem] border p-7">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-4xl font-semibold text-navy-950">Mappa interattiva</h1>
        </div>
      </section>

      <section className="glass-panel soft-outline rounded-[1.7rem] border px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-navy-900/45">Legenda mappa</p>
          <ul className="flex flex-wrap items-center gap-3" aria-label="Legenda dei punti di interesse">
            {Object.entries(pointOfInterestLegend).map(([label, color]) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full border border-navy-950/8 bg-white/85 px-4 py-2 text-sm font-medium text-navy-900 shadow-[0_10px_20px_rgba(16,36,63,0.06)]"
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {isDevelopment ? (
        <MapPointWorkbench />
      ) : (
        <section className="flex flex-1">
          <div className="glass-panel soft-outline relative h-[720px] w-full overflow-visible rounded-[2rem] border p-6">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(91,183,212,0.15),transparent_28%),linear-gradient(180deg,#fdfefe_0%,#eff6f8_100%)]" />
            <IslandMapCanvas />
          </div>
        </section>
      )}
    </section>
  );
}
