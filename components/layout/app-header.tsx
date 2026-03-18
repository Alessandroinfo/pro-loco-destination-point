import Image from "next/image";

export function AppHeader() {
  return (
    <header className="glass-panel soft-outline sticky top-0 z-30 border-b">
      <div className="mx-auto flex min-h-28 w-full max-w-[1080px] items-center justify-between gap-6 px-[var(--page-padding)] py-5">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-[1.4rem] bg-white shadow-[0_14px_36px_rgba(16,36,63,0.12)]">
            <Image
              src="/logo-pro-loco.svg"
              alt="Logo Pro Loco Lampedusa e Linosa"
              fill
              sizes="64px"
              className="object-contain p-2"
              preload
              loading="eager"
              fetchPriority="high"
              unoptimized
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-navy-900/65">Pro Loco</p>
            <p className="text-[1.1rem] font-semibold tracking-[0.02em] text-navy-950 sm:text-[1.25rem]">Lampedusa e Linosa</p>
          </div>
        </div>

        <div className="rounded-full border border-navy-950/10 bg-white/70 px-6 py-4 text-right shadow-[0_10px_30px_rgba(16,36,63,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-950">Discovery Point</p>
        </div>
      </div>
    </header>
  );
}
