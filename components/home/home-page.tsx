import { getLocalizedCategories } from "@/features/catalog/catalog.i18n";
import { CategoryCard } from "@/components/home/category-card";
import { FeaturedMapCard } from "@/components/home/featured-map-card";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export function HomePage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const categories = getLocalizedCategories(locale);

  return (
    <section className="flex flex-col">
      <section className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(16,36,63,0.96),rgba(22,54,93,0.84)),radial-gradient(circle_at_top_left,rgba(231,201,137,0.36),transparent_38%)] text-white shadow-[0_34px_90px_rgba(16,36,63,0.16)]">
          <div className="float-layer pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.07))]" />
          <div className="mx-auto w-full max-w-[1080px] px-[var(--page-padding)] py-12">
            <p className="text-sm uppercase tracking-[0.34em] text-white/70">{messages.home.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
              {messages.home.titleLead}{" "}
              <span className="font-title text-[4.3rem] italic text-gold-300 sm:text-[5.2rem]">{messages.home.titleLampedusa}</span>{" "}
              {messages.home.titleConnector}{" "}
              <span className="font-title text-[4.3rem] italic text-gold-300 sm:text-[5.2rem]">{messages.home.titleLinosa}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">{messages.home.description}</p>
          </div>
        </div>
      </section>

      <FeaturedMapCard locale={locale} />

      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-[290px]">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            locale={locale}
            preload={category.id === "experiences" || category.id === "dining" || category.id === "info"}
          />
        ))}
      </section>
    </section>
  );
}
