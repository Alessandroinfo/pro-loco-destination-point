"use client";

export function MapCompass() {
  return (
    <div
      aria-hidden="true"
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/55 bg-white/84 shadow-[0_18px_40px_rgba(16,36,63,0.16)] backdrop-blur"
    >
      <div className="flex h-9 w-9 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
          <path d="M16 3 L21.6 16 H10.4 Z" fill="#d15b4a" />
          <path d="M16 29 L10.4 16 H21.6 Z" fill="#10243f" fillOpacity="0.74" />
        </svg>
      </div>
    </div>
  );
}
