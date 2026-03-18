"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId } from "react";

import { useDialogAccessibility } from "@/hooks/use-dialog-accessibility";

export function BookingQrModal({
  isOpen,
  qrCodeDataUrl,
  businessName,
  whatsappMessage,
  onClose
}: {
  isOpen: boolean;
  qrCodeDataUrl: string;
  businessName: string;
  whatsappMessage: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const { closeButtonRef, dialogRef } = useDialogAccessibility(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-navy-950/45 px-6 backdrop-blur-lg"
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
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-navy-950/10 bg-white text-xl text-navy-950"
              onClick={onClose}
              aria-label="Chiudi modale"
            >
              ×
            </button>
            <p className="text-sm uppercase tracking-[0.3em] text-navy-900/55">Prenotazione</p>
            <h2 id={titleId} className="mt-3 text-3xl font-semibold text-navy-950">
              Apri QR per inviare richiesta disponibilita
            </h2>
            <p id={descriptionId} className="mt-4 text-lg leading-8 text-navy-900/70">
              Inquadra il QR Code con il telefono per aprire WhatsApp e inviare subito una richiesta di disponibilita alla struttura.
            </p>

            <div className="mx-auto mt-8 flex h-[320px] w-[320px] items-center justify-center rounded-[2rem] bg-white p-4 shadow-[0_18px_45px_rgba(16,36,63,0.1)]">
              {qrCodeDataUrl ? (
                <img src={qrCodeDataUrl} alt={`QR Code per ${businessName}`} width={288} height={288} />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] border border-dashed border-navy-950/12 text-sm font-medium text-navy-900/55">
                  Generazione QR Code...
                </div>
              )}
            </div>

            <p className="mt-5 text-sm text-navy-900/55">
              <span className="font-semibold text-navy-950">Anteprima messaggio:</span> {whatsappMessage}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
