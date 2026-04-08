"use client";

import QRCode from "qrcode";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

import { useLocale } from "@/components/providers/locale-provider";
import type { PointOfInterest } from "@/features/map/map.types";
import { useDialogAccessibility } from "@/hooks/use-dialog-accessibility";

type PoiRouteQrModalProps = {
  isOpen: boolean;
  point: PointOfInterest | null;
  onClose: () => void;
};

export function getGoogleMapsUrl(point: PointOfInterest | null) {
  if (!point || point.latitude === null || point.longitude === null) {
    return "";
  }

  return `https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`;
}

export function PoiRouteQrModal({ isOpen, point, onClose }: PoiRouteQrModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const titleId = useId();
  const descriptionId = useId();
  const { messages } = useLocale();
  const { closeButtonRef, dialogRef } = useDialogAccessibility(isOpen, onClose);
  const googleMapsUrl = getGoogleMapsUrl(point);

  useEffect(() => {
    if (!isOpen || !googleMapsUrl) {
      setQrCodeDataUrl("");
      return;
    }

    QRCode.toDataURL(googleMapsUrl, {
      margin: 1,
      width: 320,
      color: {
        dark: "#10243f",
        light: "#ffffff"
      }
    })
      .then(setQrCodeDataUrl)
      .catch(() => setQrCodeDataUrl(""));
  }, [googleMapsUrl, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && point && googleMapsUrl ? (
        <motion.div
          className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-navy-950/45 px-6 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
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
              onClick={onClose}
              aria-label={messages.common.close}
            >
              ×
            </button>
            <h2 id={titleId} className="mt-3 text-3xl font-semibold text-navy-950">
              {messages.poiQr.titlePrefix} {point.name}
            </h2>
            <p id={descriptionId} className="mt-4 text-lg leading-8 text-navy-900/70">
              {messages.poiQr.description}
            </p>

              <div className="mx-auto mt-8 flex h-[320px] w-[320px] items-center justify-center rounded-[2rem] bg-white p-4 shadow-[0_18px_45px_rgba(16,36,63,0.1)]">
              {qrCodeDataUrl ? (
                <img src={qrCodeDataUrl} alt={`${messages.poiQr.qrAltPrefix} ${point.name}`} width={288} height={288} />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] border border-dashed border-navy-950/12 text-sm font-medium text-navy-900/55">
                  {messages.common.loadingQr}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
