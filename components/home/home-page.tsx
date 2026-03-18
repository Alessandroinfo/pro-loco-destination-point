import { categories } from "@/features/catalog/categories.data";
import { CategoryCard } from "@/components/home/category-card";
import { FeaturedMapCard } from "@/components/home/featured-map-card";

export function HomePage() {
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

      <FeaturedMapCard />

      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-[290px]">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            preload={category.id === "experiences" || category.id === "dining" || category.id === "info"}
          />
        ))}
      </section>
    </section>
  );
}
