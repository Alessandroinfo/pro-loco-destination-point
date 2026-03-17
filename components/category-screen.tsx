import Link from "next/link";

import { BackLink } from "@/components/back-link";
import { SmoothImage } from "@/components/smooth-image";
import { getBusinessesByCategory, getBusinessRoute, type Category } from "@/lib/totem-data";

export function CategoryScreen({ category }: { category: Category }) {
  const businessesInCategory = getBusinessesByCategory(category.id);

  return (
    <section className="flex flex-col gap-8">
      <BackLink href="/" label="Home" />

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

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:auto-rows-[320px]">
        {businessesInCategory.map((business, index) => (
          <Link
            key={business.id}
            href={getBusinessRoute(category.id, business.id)}
            className="touch-card h-[320px] text-left"
          >
            <SmoothImage
              src={business.heroImage}
              alt={business.name}
              fill
              className="object-cover"
              sizes="50vw"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              skeletonClassName="bg-[linear-gradient(135deg,rgba(16,36,63,0.16),rgba(255,255,255,0.14))]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.08),rgba(16,36,63,0.9))]" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-white/65">{business.type}</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{business.name}</h2>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}
