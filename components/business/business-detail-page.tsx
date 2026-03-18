"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

import type { Business, Category } from "@/features/catalog/catalog.types";
import { getCategoryRoute } from "@/lib/routes";
import { BackLink } from "@/components/shared/back-link";
import { SmoothImage } from "@/components/shared/smooth-image";
import { BookingQrModal } from "@/components/business/booking-qr-modal";

export function BusinessDetailPage({
  business,
  category
}: {
  business: Business;
  category: Category;
}) {
  const [selectedImage, setSelectedImage] = useState(business.heroImage);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  const whatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(business.whatsappMessage)}`;

  useEffect(() => {
    setSelectedImage(business.heroImage);
  }, [business.heroImage]);

  useEffect(() => {
    if (!isQrOpen) {
      setQrCodeDataUrl("");
      return;
    }

    QRCode.toDataURL(whatsappLink, {
      margin: 1,
      width: 320,
      color: {
        dark: "#10243f",
        light: "#ffffff"
      }
    })
      .then(setQrCodeDataUrl)
      .catch(() => setQrCodeDataUrl(""));
  }, [isQrOpen, whatsappLink]);

  return (
    <>
      <section className="flex flex-1 flex-col gap-6">
        <BackLink href={getCategoryRoute(category.id)} label="Lista" />

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
                  aria-label={`Apri immagine ${index + 1}`}
                  aria-pressed={isActive}
                >
                  <SmoothImage
                    src={image}
                    alt={`${business.name} gallery ${index + 1}`}
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
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-navy-900/55">Descrizione</p>
            <p className="mt-4 text-lg leading-8 text-navy-900/78">{business.description}</p>
          </article>

          <aside className="glass-panel soft-outline rounded-[2rem] border p-7">
            <div className="space-y-5">
              <InfoRow icon={<SparkIcon />} label="Tipo di attività" value={business.type} />
              <InfoRow icon={<ClockIcon />} label="Orari" value={business.hours} />
              <InfoRow icon={<PinIcon />} label="Indirizzo" value={business.address} />
            </div>

            <button
              type="button"
              className="mt-8 flex min-h-16 w-full items-center justify-center rounded-[1.35rem] bg-[#20b15a] px-6 text-lg font-semibold text-white shadow-[0_18px_40px_rgba(32,177,90,0.25)] transition active:scale-[0.985]"
              onClick={() => setIsQrOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isQrOpen}
            >
              Prenota
            </button>
          </aside>
        </section>
      </section>

      <BookingQrModal
        isOpen={isQrOpen}
        qrCodeDataUrl={qrCodeDataUrl}
        businessName={business.name}
        whatsappMessage={business.whatsappMessage}
        onClose={() => setIsQrOpen(false)}
      />
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-[1.35rem] border border-navy-950/8 bg-white/80 p-4">
      <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-aqua-200 text-navy-950">{icon}</div>
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
