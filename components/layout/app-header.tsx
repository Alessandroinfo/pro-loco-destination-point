"use client";

import Image from "next/image";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLocale } from "@/components/providers/locale-provider";
import { withBasePath } from "@/lib/site";

export function AppHeader() {
  const { messages } = useLocale();

  return (
    <header className="glass-panel soft-outline sticky top-0 z-30 border-b">
      <div className="mx-auto flex min-h-28 w-full max-w-[1080px] flex-col gap-4 px-[var(--page-padding)] py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-[1.4rem] bg-white shadow-[0_14px_36px_rgba(16,36,63,0.12)]">
            <Image
              src={withBasePath("/logo-pro-loco.svg")}
              alt={messages.site.name}
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
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-navy-900/65">{messages.header.eyebrow}</p>
            <p className="text-[1.1rem] font-semibold tracking-[0.02em] text-navy-950 sm:text-[1.25rem]">{messages.header.islands}</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
          <div className="rounded-full border border-navy-950/10 bg-white/70 px-6 py-4 text-right shadow-[0_10px_30px_rgba(16,36,63,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-navy-950">{messages.header.discoveryPoint}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
