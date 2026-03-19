"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  type AppMode,
  getCanonicalHref,
  getCanonicalPathname,
  getModeAwareHref,
  resolveAppModeFromPathname
} from "@/lib/app-mode";
import { stripBasePath } from "@/lib/site";

type AppPageContext = {
  actualPathname: string;
  canonicalPathname: string;
  mode: AppMode;
};

type AppModeContextValue = AppPageContext & {
  getCanonicalHref: (href: string) => string;
  getModeAwareHref: (href: string) => string;
  isStandardMode: boolean;
  isTotemMode: boolean;
};

type WindowWithPageContext = Window & {
  __PRO_LOCO_PAGE_CONTEXT__?: AppPageContext;
};

const AppModeContext = createContext<AppModeContextValue | null>(null);

export function AppModeProvider({ children }: { children: React.ReactNode }) {
  const pathname = stripBasePath(usePathname() ?? "/");
  const mode = resolveAppModeFromPathname(pathname);
  const canonicalPathname = getCanonicalPathname(pathname);

  const contextValue = useMemo<AppModeContextValue>(
    () => ({
      actualPathname: pathname,
      canonicalPathname,
      getCanonicalHref,
      getModeAwareHref: (href: string) => getModeAwareHref(href, mode),
      isStandardMode: mode === "standard",
      isTotemMode: mode === "totem",
      mode
    }),
    [canonicalPathname, mode, pathname]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const pageContext: AppPageContext = {
      actualPathname: pathname,
      canonicalPathname,
      mode
    };

    const htmlElement = document.documentElement;

    htmlElement.dataset.appMode = mode;
    htmlElement.dataset.canonicalPath = canonicalPathname;
    (window as WindowWithPageContext).__PRO_LOCO_PAGE_CONTEXT__ = pageContext;
    window.dispatchEvent(new CustomEvent("proloco:page-context", { detail: pageContext }));
  }, [canonicalPathname, mode, pathname]);

  return <AppModeContext.Provider value={contextValue}>{children}</AppModeContext.Provider>;
}

export function useAppMode() {
  const context = useContext(AppModeContext);

  if (!context) {
    throw new Error("useAppMode must be used within AppModeProvider.");
  }

  return context;
}
