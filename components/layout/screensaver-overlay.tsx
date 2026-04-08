"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { useLocale } from "@/components/providers/locale-provider";
import { brandAssetPaths, videoAssetPaths } from "@/lib/asset-paths";
import { withBasePath } from "@/lib/site";

const SCREENSAVER_VIDEO = withBasePath(videoAssetPaths.screensaverLoop);
const SCREENSAVER_POSTER = withBasePath(videoAssetPaths.screensaverPoster);

export function ScreensaverOverlay({
  isActive,
  onDismiss
}: {
  isActive: boolean;
  onDismiss: () => boolean;
}) {
  const overlayRef = useRef<HTMLButtonElement>(null);
  const { messages } = useLocale();

  useEffect(() => {
    if (!isActive) {
      return;
    }

    overlayRef.current?.focus();
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive ? (
        <motion.button
          ref={overlayRef}
          type="button"
          className="fixed inset-0 overflow-hidden bg-navy-950 text-white"
          style={{ zIndex: 2147483647 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-label={messages.screensaver.dismissAriaLabel}
          onClick={() => {
            onDismiss();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
              event.preventDefault();
              onDismiss();
            }
          }}
        >
          <div className="absolute inset-0">
            <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={SCREENSAVER_POSTER} aria-hidden="true">
              <source src={SCREENSAVER_VIDEO} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.25),rgba(16,36,63,0.75))]" />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
            <div className="relative h-28 w-28 overflow-hidden border-white/20">
              <Image
                src={withBasePath(brandAssetPaths.logoWhite)}
                alt={messages.screensaver.logoAlt}
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
            <h2 className="font-title mt-5 text-7xl font-semibold italic tracking-[0.02em] text-white">Lampedusa &amp; Linosa</h2>
            <p className="pulse-invite mt-12 text-2xl font-thin font-semibold tracking-[0.12em] text-gold-300">{messages.screensaver.tapToStart}</p>
          </div>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
