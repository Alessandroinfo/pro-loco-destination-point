"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { FloatingRouteQr } from "@/components/layout/floating-route-qr";
import { ScreensaverOverlay } from "@/components/layout/screensaver-overlay";

const INACTIVITY_TIMEOUT_MS = 80_000;
const SCREENSAVER_DISMISS_GUARD_MS = 600;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const lastInteractionAtRef = useRef(Date.now());
  const screensaverOpenedAtRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const registerInteraction = useEffectEvent(() => {
    if (isScreensaverActive) {
      return;
    }

    lastInteractionAtRef.current = Date.now();
  });

  const openScreensaver = useEffectEvent(() => {
    screensaverOpenedAtRef.current = Date.now();
    lastInteractionAtRef.current = Date.now();
    setIsScreensaverActive(true);
  });

  const checkInactivity = useEffectEvent(() => {
    if (isScreensaverActive) {
      return;
    }

    if (Date.now() - lastInteractionAtRef.current < INACTIVITY_TIMEOUT_MS) {
      return;
    }

    openScreensaver();
  });

  useEffect(() => {
    const events: Array<keyof WindowEventMap> = ["pointerdown", "pointermove", "touchstart"];

    registerInteraction();

    events.forEach((eventName) => {
      window.addEventListener(eventName, registerInteraction, { passive: true });
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        registerInteraction();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intervalId = window.setInterval(() => {
      checkInactivity();
    }, 1000);

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, registerInteraction);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(intervalId);
    };
  }, [checkInactivity, registerInteraction]);

  useEffect(() => {
    document.body.style.overflow = isScreensaverActive ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isScreensaverActive]);

  const dismissScreensaver = () => {
    if (Date.now() - screensaverOpenedAtRef.current < SCREENSAVER_DISMISS_GUARD_MS) {
      return false;
    }

    lastInteractionAtRef.current = Date.now();
    setIsScreensaverActive(false);
    return true;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(91,183,212,0.18),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f6fafb_48%,#edf4f7_100%)] text-slate-900">
      <div className="luxury-shell relative z-10 min-h-screen">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
        <AppHeader />
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-[1080px] flex-col px-[var(--page-padding)] pb-24 pt-8"
        >
          {children}
        </main>
        <AppFooter />
      </div>

      {process.env.NODE_ENV === "development" && !isScreensaverActive ? (
        <button
          type="button"
          className="fixed bottom-8 left-6 z-30 rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(16,36,63,0.16)]"
          onClick={openScreensaver}
        >
          Test screensaver
        </button>
      ) : null}

      <FloatingRouteQr hidden={isScreensaverActive} />

      {isMounted
        ? createPortal(<ScreensaverOverlay isActive={isScreensaverActive} onDismiss={dismissScreensaver} />, document.body)
        : null}
    </div>
  );
}
