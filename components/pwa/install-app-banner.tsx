"use client";

import { useEffect, useState } from "react";

import { useAppMode } from "@/components/providers/app-mode-provider";
import { useLocale } from "@/components/providers/locale-provider";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

const DISMISS_STORAGE_KEY = "pro-loco-install-banner-dismissed";

export function InstallAppBanner() {
  const { isStandardMode } = useAppMode();
  const { messages } = useLocale();
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIosSafari, setIsIosSafari] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const mobileQuery = window.matchMedia("(pointer: coarse), (max-width: 767px)");
    setIsMobile(mobileQuery.matches);
    const handleMobileChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const standaloneMediaQuery = window.matchMedia("(display-mode: standalone)");
    const updateStandaloneState = () => {
      const iosStandalone = "standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
      setIsStandalone(standaloneMediaQuery.matches || iosStandalone);
    };

    updateStandaloneState();
    standaloneMediaQuery.addEventListener("change", updateStandaloneState);

    return () => {
      standaloneMediaQuery.removeEventListener("change", updateStandaloneState);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setIsDismissed(window.localStorage.getItem(DISMISS_STORAGE_KEY) === "true");

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isiOS = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /safari/.test(userAgent) && !/crios|fxios|edgios|opr\//.test(userAgent);

    setIsIosSafari(isiOS && isSafari);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || process.env.NODE_ENV !== "production") {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const dismissBanner = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISS_STORAGE_KEY, "true");
    }

    setIsDismissed(true);
  };

  const installApp = async () => {
    if (!installPromptEvent) {
      return;
    }

    await installPromptEvent.prompt();
    const userChoice = await installPromptEvent.userChoice;

    if (userChoice.outcome === "accepted") {
      setIsStandalone(true);
    }

    setInstallPromptEvent(null);
  };

  const canRender = isMounted && process.env.NODE_ENV === "production";
  const shouldShowBanner =
    canRender && isMobile && isStandardMode && !isDismissed && !isStandalone && (Boolean(installPromptEvent) || isIosSafari);

  if (!shouldShowBanner) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-[720px] sm:bottom-6">
      <div className="glass-panel soft-outline flex flex-col gap-5 rounded-[1.8rem] border px-4 py-5 shadow-[0_22px_48px_rgba(16,36,63,0.18)] sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-navy-900/48">{messages.installBanner.eyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold text-navy-950 sm:text-2xl">{messages.installBanner.title}</h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-navy-900/72">{messages.installBanner.description}</p>
          {isIosSafari ? (
            <p className="mt-3 text-sm font-medium leading-6 text-navy-900/62">
              {messages.installBanner.iosInstructions} <span className="font-semibold text-navy-950">{messages.installBanner.iosShare}</span> e poi{" "}
              <span className="font-semibold text-navy-950">{messages.installBanner.iosAddToHome}</span>.
            </p>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          {installPromptEvent ? (
            <button
              type="button"
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-navy-950 px-5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(16,36,63,0.18)] sm:w-auto"
              onClick={() => {
                void installApp();
              }}
            >
              {messages.installBanner.installButton}
            </button>
          ) : null}

          <button
            type="button"
            className="flex min-h-12 w-full items-center justify-center rounded-full border border-navy-950/12 bg-white px-5 text-sm font-semibold text-navy-950 sm:w-auto"
            onClick={dismissBanner}
          >
            {messages.installBanner.laterButton}
          </button>
        </div>
      </div>
    </div>
  );
}
