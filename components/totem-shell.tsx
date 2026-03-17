"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";

import { getBusiness, getCategory } from "@/lib/totem-data";

const SCREENSAVER_VIDEO = "/boat-video.mp4";
const INACTIVITY_TIMEOUT_MS = 80_000;
const SCREENSAVER_DISMISS_GUARD_MS = 600;

export function TotemShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const currentPageLabel = getCurrentPageLabel(currentPath);
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isRouteQrOpen, setIsRouteQrOpen] = useState(false);
  const [routeQrDataUrl, setRouteQrDataUrl] = useState("");
  const [currentPageUrl, setCurrentPageUrl] = useState("");
  const lastInteractionAtRef = useRef(Date.now());
  const screensaverOpenedAtRef = useRef(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setCurrentPageUrl(window.location.href);
  }, [currentPath]);

  const registerInteraction = useEffectEvent(() => {
    if (isScreensaverActive) {
      return;
    }

    lastInteractionAtRef.current = Date.now();
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

  useEffect(() => {
    if (!isRouteQrOpen) {
      setRouteQrDataUrl("");
      return;
    }

    if (!currentPageUrl) {
      return;
    }

    QRCode.toDataURL(currentPageUrl, {
      margin: 1,
      width: 320,
      color: {
        dark: "#10243f",
        light: "#ffffff"
      }
    })
      .then(setRouteQrDataUrl)
      .catch(() => setRouteQrDataUrl(""));
  }, [currentPageUrl, isRouteQrOpen]);

  const dismissScreensaver = () => {
    if (Date.now() - screensaverOpenedAtRef.current < SCREENSAVER_DISMISS_GUARD_MS) {
      return false;
    }

    lastInteractionAtRef.current = Date.now();
    setIsScreensaverActive(false);
    return true;
  };

  const openScreensaver = () => {
    screensaverOpenedAtRef.current = Date.now();
    lastInteractionAtRef.current = Date.now();
    setIsScreensaverActive(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(91,183,212,0.18),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f6fafb_48%,#edf4f7_100%)] text-slate-900">
      <div className="luxury-shell relative z-10 min-h-screen">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />

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

        <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-[1080px] flex-col px-[var(--page-padding)] pb-24 pt-8">
          {children}
        </div>

        <footer className="pointer-events-none relative z-10 pb-5">
          <div className="mx-auto flex w-full max-w-[1080px] justify-center px-[var(--page-padding)]">
            <p className="pointer-events-auto text-[0.68rem] font-medium tracking-[0.18em] text-navy-950/28">
              powered by{" "}
              <a
                href="https://a-vendi.com"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-navy-950/55"
              >
                a-vendi
              </a>
            </p>
          </div>
        </footer>
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

      {!isScreensaverActive ? (
        <button
          type="button"
          className="fixed bottom-8 right-6 z-30 flex min-h-16 items-center gap-3 rounded-full border border-navy-950/10 bg-white/92 px-5 py-3 text-left shadow-[0_18px_38px_rgba(16,36,63,0.14)] backdrop-blur"
          onClick={() => setIsRouteQrOpen(true)}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-aqua-200 text-navy-950">
            <QrIcon />
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-navy-900/55">Continua sul tuo dispositivo</span>
            <span className="mt-1 block text-sm font-semibold text-navy-950">QR della pagina attuale</span>
          </span>
        </button>
      ) : null}

      {isMounted
        ? createPortal(
            <>
              <AnimatePresence>
                {isRouteQrOpen ? (
                  <motion.div
                    className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-navy-950/45 px-6 backdrop-blur-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsRouteQrOpen(false)}
                  >
                    <motion.div
                      className="glass-panel soft-outline relative w-full max-w-[620px] rounded-[2rem] border p-8 text-center"
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-navy-950/10 bg-white text-xl text-navy-950"
                        onClick={() => setIsRouteQrOpen(false)}
                        aria-label="Chiudi modale"
                      >
                        ×
                      </button>
                      <p className="text-sm uppercase tracking-[0.3em] text-navy-900/55">Pagina attuale</p>
                      <h2 className="mt-3 text-3xl font-semibold text-navy-950">{currentPageLabel}</h2>
                      <p className="mt-4 text-lg leading-8 text-navy-900/70">
                        Inquadra il QR Code per aprire sul telefono esattamente la pagina che stai visitando in questo momento.
                      </p>

                      <div className="mx-auto mt-8 flex h-[320px] w-[320px] items-center justify-center rounded-[2rem] bg-white p-4 shadow-[0_18px_45px_rgba(16,36,63,0.1)]">
                        {routeQrDataUrl ? (
                          <img src={routeQrDataUrl} alt="QR Code della pagina corrente" width={288} height={288} />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] border border-dashed border-navy-950/12 text-sm font-medium text-navy-900/55">
                            Generazione QR Code...
                          </div>
                        )}
                      </div>

                      <p className="mt-5 break-all text-sm text-navy-900/55">{currentPageUrl}</p>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence>
                {isScreensaverActive ? (
                  <motion.div
                    role="button"
                    tabIndex={0}
                    className="fixed inset-0 overflow-hidden bg-navy-950 text-white"
                    style={{ zIndex: 2147483647 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => {
                      if (dismissScreensaver()) {
                        router.push("/");
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        if (dismissScreensaver()) {
                          router.push("/");
                        }
                      }
                    }}
                  >
                    <div className="absolute inset-0">
                      <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster="/placeholders/screensaver-poster.svg">
                        <source src={SCREENSAVER_VIDEO} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.25),rgba(16,36,63,0.75))]" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                      <div className="relative h-28 w-28 overflow-hidden border-white/20">
                        <Image
                          src="/logo-pro-loco-white.svg"
                          alt="Logo Pro Loco"
                          fill
                          sizes="112px"
                          className="object-contain p-3"
                          preload
                          loading="eager"
                          fetchPriority="high"
                          unoptimized
                        />
                      </div>
                      <p className="mt-2 text-sm uppercase tracking-[0.36em] text-white/65">Pro Loco</p>
                      <h2 className="font-title mt-5 text-7xl font-semibold italic tracking-[0.02em] text-white">
                        Lampedusa &amp; Linosa
                      </h2>
                      <p className="pulse-invite mt-12 text-2xl font-semibold tracking-[0.12em] text-gold-300 font-thin">Tocca per iniziare</p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </>,
            document.body
          )
        : null}
    </main>
  );
}

function QrIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4H10V10H4V4Z" fill="currentColor" />
      <path d="M14 4H20V10H14V4Z" fill="currentColor" />
      <path d="M4 14H10V20H4V14Z" fill="currentColor" />
      <path d="M14 14H16V16H14V14Z" fill="currentColor" />
      <path d="M18 14H20V16H18V14Z" fill="currentColor" />
      <path d="M16 16H18V18H16V16Z" fill="currentColor" />
      <path d="M14 18H16V20H14V18Z" fill="currentColor" />
      <path d="M18 18H20V20H18V18Z" fill="currentColor" />
    </svg>
  );
}

function getCurrentPageLabel(pathname: string) {
  const normalizedPathname = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (normalizedPathname === "/") {
    return "Home";
  }

  if (normalizedPathname === "/mappa") {
    return "Esplora le Pelagie";
  }

  const segments = normalizedPathname.split("/").filter(Boolean);

  if (segments[0] !== "categorie") {
    return "Pagina corrente";
  }

  const categoryId = segments[1];

  if (!categoryId) {
    return "Categorie";
  }

  if (segments.length === 2) {
    return getCategory(categoryId)?.name ?? "Categoria";
  }

  const businessId = segments[2];

  if (!businessId) {
    return getCategory(categoryId)?.name ?? "Categoria";
  }

  return getBusiness(categoryId, businessId)?.name ?? "Dettaglio attività";
}
