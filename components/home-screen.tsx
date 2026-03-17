import Link from "next/link";

import { SmoothImage } from "@/components/smooth-image";
import { businesses, categories, getCategoryRoute } from "@/lib/totem-data";

export function HomeScreen() {
  const mapBusinessCount = 8;

  return (
    <section className="flex flex-col">
      <section className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(16,36,63,0.96),rgba(22,54,93,0.84)),radial-gradient(circle_at_top_left,rgba(231,201,137,0.36),transparent_38%)] text-white shadow-[0_34px_90px_rgba(16,36,63,0.16)]">
          <div className="float-layer pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.07))]" />
          <div className="mx-auto w-full max-w-[1080px] px-[var(--page-padding)] py-12">
            <p className="text-sm uppercase tracking-[0.34em] text-white/70">Benvenuti nelle Pelagie</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
              Scopri <span className="font-title text-[4.3rem] italic text-gold-300 sm:text-[5.2rem]">Lampedusa</span> e Linosa
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">
              Un accesso immediato alle migliori esperienze, ai luoghi da vivere e ai servizi da contattare in pochi tocchi.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <Link href="/mappa" className="touch-card block h-[320px] text-left">
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
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">Spiagge, cale, luoghi di interesse</p>
              <h2 className="mt-3 text-4xl font-semibold text-white">Esplora le Pelagie</h2>
            </div>
            <div className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              {mapBusinessCount} punti di interesse
            </div>
          </div>
        </Link>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-[290px]">
        {categories.map((category) => {
          const businessCount = businesses.filter((business) => business.categoryId === category.id).length;
          const shouldPreload = category.id === "experiences" || category.id === "dining" || category.id === "info";

          return (
            <Link key={category.id} href={getCategoryRoute(category.id)} className="touch-card group h-[290px] text-left">
              <SmoothImage
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading={shouldPreload ? "eager" : "lazy"}
                fetchPriority={shouldPreload ? "high" : "auto"}
                skeletonClassName="bg-[linear-gradient(135deg,rgba(16,36,63,0.22),rgba(91,183,212,0.24))]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.1),rgba(16,36,63,0.88))]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div className="max-w-[70%]">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">{category.shortLabel}</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">{category.name}</h2>
                </div>
                <div
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                  style={{ backgroundColor: `${category.color}CC` }}
                >
                  {businessCount} attività
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </section>
  );
}
