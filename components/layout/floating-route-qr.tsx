"use client";

import QRCode from "qrcode";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { useAppMode } from "@/components/providers/app-mode-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { useDialogAccessibility } from "@/hooks/use-dialog-accessibility";
import { getCanonicalPathname } from "@/lib/app-mode";
import { getCurrentRouteLabel } from "@/lib/routes";
import { getRuntimeAbsoluteUrl } from "@/lib/site";

export function FloatingRouteQr({ hidden = false }: { hidden?: boolean }) {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const { locale, messages } = useLocale();
  const currentPageLabel = getCurrentRouteLabel(currentPath, locale);
  const { isTotemMode } = useAppMode();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const titleId = useId();
  const descriptionId = useId();
  const { closeButtonRef, dialogRef } = useDialogAccessibility(isOpen, () => setIsOpen(false));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);
    const canonicalPathname = getCanonicalPathname(url.pathname);
    const canonicalPageUrl = new URL(getRuntimeAbsoluteUrl(url.origin, canonicalPathname));

    canonicalPageUrl.search = url.search;
    canonicalPageUrl.hash = url.hash;

    setCurrentPageUrl(canonicalPageUrl.toString());
  }, [currentPath]);

  useEffect(() => {
    if (!isOpen) {
      setQrCodeDataUrl("");
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
      .then(setQrCodeDataUrl)
      .catch(() => setQrCodeDataUrl(""));
  }, [currentPageUrl, isOpen]);

  if (hidden || !isTotemMode) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="fixed bottom-8 right-6 z-30 flex min-h-16 items-center gap-3 rounded-full border border-navy-950/10 bg-white/92 px-5 py-3 text-left shadow-[0_18px_38px_rgba(16,36,63,0.14)] backdrop-blur"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="route-qr-dialog"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-aqua-200 text-navy-950">
          <QrIcon />
        </span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-navy-900/55">{messages.routeQr.buttonEyebrow}</span>
          <span className="mt-1 block text-sm font-semibold text-navy-950">{messages.routeQr.buttonTitle}</span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-navy-950/45 px-6 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              id="route-qr-dialog"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="glass-panel soft-outline relative w-full max-w-[620px] rounded-[2rem] border p-8 text-center"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border border-navy-950/10 bg-white text-[2rem] leading-none text-navy-950"
                onClick={() => setIsOpen(false)}
                aria-label={messages.common.close}
              >
                ×
              </button>
              <p className="text-sm uppercase tracking-[0.3em] text-navy-900/55">{messages.routeQr.modalEyebrow}</p>
              <h2 id={titleId} className="mt-3 text-3xl font-semibold text-navy-950">
                {currentPageLabel}
              </h2>
              <p id={descriptionId} className="mt-4 text-lg leading-8 text-navy-900/70">
                {messages.routeQr.modalDescription}
              </p>

              <div className="mx-auto mt-8 flex h-[320px] w-[320px] items-center justify-center rounded-[2rem] bg-white p-4 shadow-[0_18px_45px_rgba(16,36,63,0.1)]">
                {qrCodeDataUrl ? (
                  <img src={qrCodeDataUrl} alt={messages.routeQr.qrAlt} width={288} height={288} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] border border-dashed border-navy-950/12 text-sm font-medium text-navy-900/55">
                    {messages.common.loadingQr}
                  </div>
                )}
              </div>

              <p className="mt-5 break-all text-sm text-navy-900/55">{currentPageUrl}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
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
