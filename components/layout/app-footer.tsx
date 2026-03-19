"use client";

import { useAppMode } from "@/components/providers/app-mode-provider";

export function AppFooter() {
  const { isTotemMode } = useAppMode();

  return (
    <footer className="pointer-events-none relative z-10 pb-5">
      <div className="mx-auto flex w-full max-w-[1080px] justify-center px-[var(--page-padding)]">
        <p className="pointer-events-auto text-[0.68rem] font-medium tracking-[0.18em] text-navy-950/28">
          powered by{" "}
          {isTotemMode ? (
            <span className="transition">a-vendi</span>
          ) : (
            <a
              href="https://a-vendi.com"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-navy-950/55"
            >
              a-vendi
            </a>
          )}
        </p>
      </div>
    </footer>
  );
}
