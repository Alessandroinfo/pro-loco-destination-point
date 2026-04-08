"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

import {
  getBusinessActionHref,
  getBusinessActionLabel,
  getBusinessActionQrModalContent,
  getBusinessActionTotemBehavior
} from "@/lib/business-actions";
import type { Business, BusinessAction, BusinessActionSlot, Category } from "@/features/catalog/catalog.types";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getCategoryRoute } from "@/lib/routes";
import { useAppMode } from "@/components/providers/app-mode-provider";
import { BackLink } from "@/components/shared/back-link";
import { SmoothImage } from "@/components/shared/smooth-image";
import { BusinessActionQrModal } from "@/components/business/business-action-qr-modal";
import { formatBusinessGalleryButtonLabel, formatBusinessGalleryImageAlt } from "@/lib/i18n/messages";

export function BusinessDetailPage({
  business,
  category,
  locale
}: {
  business: Business;
  category: Category;
  locale: Locale;
}) {
  const [selectedImage, setSelectedImage] = useState(business.heroImage);
  const [activeQrAction, setActiveQrAction] = useState<{ action: BusinessAction; slot: BusinessActionSlot } | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const { isTotemMode } = useAppMode();
  const messages = getMessages(locale);

  const actionEntries: Array<{ action: BusinessAction; slot: BusinessActionSlot }> = [
    business.actions.booking ? { action: business.actions.booking, slot: "booking" } : null,
    business.actions.directions ? { action: business.actions.directions, slot: "directions" } : null,
    business.actions.contact ? { action: business.actions.contact, slot: "contact" } : null
  ].filter((entry): entry is { action: BusinessAction; slot: BusinessActionSlot } => entry !== null);

  const activeQrActionHref = activeQrAction ? getBusinessActionHref(activeQrAction.action) : "";
  const activeQrModalContent = activeQrAction
    ? getBusinessActionQrModalContent(activeQrAction.action, activeQrAction.slot, business.name, locale)
    : null;
  const activeQrActionLabel = activeQrAction ? getBusinessActionLabel(activeQrAction.action, activeQrAction.slot, locale) : "";

  useEffect(() => {
    setSelectedImage(business.heroImage);
  }, [business.heroImage]);

  useEffect(() => {
    if (!activeQrAction || !isTotemMode || getBusinessActionTotemBehavior(activeQrAction.action, activeQrAction.slot) !== "qr") {
      setQrCodeDataUrl("");
      return;
    }

    QRCode.toDataURL(activeQrActionHref, {
      margin: 1,
      width: 320,
      color: {
        dark: "#10243f",
        light: "#ffffff"
      }
    })
      .then(setQrCodeDataUrl)
      .catch(() => setQrCodeDataUrl(""));
  }, [activeQrAction, activeQrActionHref, isTotemMode]);

  useEffect(() => {
    setActiveQrAction(null);
  }, [business.id]);

  return (
    <>
      <section className="flex flex-1 flex-col gap-6">
        <BackLink href={getCategoryRoute(category.id)} label={messages.common.list} />

        <section className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_28px_80px_rgba(16,36,63,0.14)]">
          <div className="relative min-h-[360px]">
            <SmoothImage
              src={selectedImage}
              alt={business.name}
              fill
              className="object-cover"
              sizes="100vw"
              preload
              skeletonClassName="bg-[linear-gradient(135deg,rgba(16,36,63,0.22),rgba(255,255,255,0.14))]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,36,63,0.1),rgba(16,36,63,0.88))]" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-white/65">{business.type}</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">{business.name}</h1>
            </div>
          </div>
        </section>

        <section className="glass-panel soft-outline rounded-[2rem] border p-6">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {business.gallery.map((image, index) => {
              const isActive = image === selectedImage;

              return (
                <button
                  key={image}
                  type="button"
                  className={`relative h-28 min-w-40 overflow-hidden rounded-[1.3rem] border-2 transition ${
                    isActive ? "border-gold-500 shadow-[0_10px_30px_rgba(200,154,61,0.22)]" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={formatBusinessGalleryButtonLabel(locale, business.name, index + 1)}
                  aria-pressed={isActive}
                >
                  <SmoothImage
                    src={image}
                    alt={formatBusinessGalleryImageAlt(locale, business.name, index + 1)}
                    fill
                    className="object-cover"
                    sizes="160px"
                    loading={index < 3 ? "eager" : "lazy"}
                    fetchPriority={index < 2 ? "high" : "auto"}
                    skeletonClassName="bg-[linear-gradient(135deg,rgba(16,36,63,0.2),rgba(255,255,255,0.12))]"
                  />
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
          <article className="glass-panel soft-outline rounded-[2rem] border p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-navy-900/55">{messages.business.descriptionLabel}</p>
            <p className="mt-4 text-lg leading-8 text-navy-900/78">{business.description}</p>
          </article>

          <aside className="glass-panel soft-outline rounded-[2rem] border p-7">
            <div className="space-y-5">
              <InfoRow icon={<SparkIcon />} label={messages.business.typeLabel} value={business.type} />
              <InfoRow icon={<ClockIcon />} label={messages.business.hoursLabel} value={business.hours} />
              <InfoRow icon={<PinIcon />} label={messages.business.addressLabel} value={business.address} />
            </div>

            {actionEntries.length ? (
              <div className="mt-8 flex flex-col gap-3">
                {actionEntries.map(({ action, slot }) => {
                  const actionLabel = getBusinessActionLabel(action, slot, locale);
                  const actionHref = getBusinessActionHref(action);
                  const shouldOpenQrInTotem = isTotemMode && getBusinessActionTotemBehavior(action, slot) === "qr";
                  const actionClassName = getBusinessActionButtonClassName(slot);

                  if (shouldOpenQrInTotem) {
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={actionClassName}
                        onClick={() => setActiveQrAction({ action, slot })}
                        aria-haspopup="dialog"
                        aria-expanded={activeQrAction?.slot === slot}
                      >
                        {actionLabel}
                      </button>
                    );
                  }

                  return (
                    <a
                      key={slot}
                      href={actionHref}
                      target="_blank"
                      rel="noreferrer"
                      className={actionClassName}
                    >
                      {actionLabel}
                    </a>
                  );
                })}
              </div>
            ) : null}
          </aside>
        </section>
      </section>

      {activeQrAction && activeQrModalContent ? (
        <BusinessActionQrModal
          isOpen={true}
          qrCodeDataUrl={qrCodeDataUrl}
          actionAltText={`${messages.business.qrAltPrefix} ${activeQrActionLabel} ${business.name}`}
          eyebrow={activeQrModalContent.eyebrow}
          title={activeQrModalContent.title}
          description={activeQrModalContent.description}
          previewLabel={activeQrModalContent.previewLabel}
          previewValue={activeQrModalContent.previewValue}
          actionHref={activeQrModalContent.actionHref}
          actionHrefLabel={activeQrModalContent.actionHrefLabel}
          onClose={() => setActiveQrAction(null)}
        />
      ) : null}
    </>
  );
}

function getBusinessActionButtonClassName(slot: BusinessActionSlot) {
  const baseClassName =
    "flex min-h-16 w-full items-center justify-center rounded-[1.35rem] px-6 text-lg font-semibold shadow-[0_18px_40px_rgba(16,36,63,0.18)] transition active:scale-[0.985]";

  switch (slot) {
    case "booking":
      return `${baseClassName} bg-[#168aad] text-white shadow-[0_18px_40px_rgba(22,138,173,0.3)]`;
    case "directions":
      return `${baseClassName} bg-navy-950 text-white shadow-[0_18px_40px_rgba(16,36,63,0.25)]`;
    case "contact":
      return `${baseClassName} bg-[#20b15a] text-white shadow-[0_18px_40px_rgba(32,177,90,0.25)]`;
    default:
      return baseClassName;
  }
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-[1.35rem] border border-navy-950/8 bg-white/80 p-4">
      <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-aqua-200 p-3 text-navy-950">{icon}</div>
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-navy-900/48">{label}</p>
        <p className="mt-2 text-lg font-semibold leading-7 text-navy-950">{value}</p>
      </div>
    </div>
  );
}

function SparkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L14.7 9.3L22 12L14.7 14.7L12 22L9.3 14.7L2 12L9.3 9.3L12 2Z" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7V12L15.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21C15.8 16.4 18 13.3 18 10C18 6.7 15.3 4 12 4C8.7 4 6 6.7 6 10C6 13.3 8.2 16.4 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
    </svg>
  );
}
