"use client";

import { useState } from "react";

import { pointOfInterestLegend, pointsOfInterest } from "@/features/map/map.data";

export function IslandMapCanvas() {
  const [activePoiId, setActivePoiId] = useState(pointsOfInterest[0]?.id ?? "");

  return (
    <div className="relative isolate h-full min-h-[650px] overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(223,244,250,0.65))]">
      <div className="absolute inset-0 scale-[1.14] transform-gpu">
        <svg viewBox="0 0 1000 720" className="absolute inset-0 h-full w-full" aria-label="Mappa stilizzata di Lampedusa e Linosa" role="img">
          <defs>
            <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EAF7FB" />
              <stop offset="100%" stopColor="#CFEAF2" />
            </linearGradient>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8F2E6" />
              <stop offset="100%" stopColor="#E4D4B0" />
            </linearGradient>
            <filter id="mapShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="24" stdDeviation="30" floodColor="#10243f" floodOpacity="0.16" />
            </filter>
          </defs>

          <rect width="1000" height="720" fill="url(#seaGradient)" />
          <path
            d="M95.0 317.4 L103.1 328.3 L166.3 347.7 L201.8 343.2 L272.1 357.9 L284.6 349.2 L299.4 366.1 L310.1 358.9 L373.5 368.3 L385.2 395.1 L418.4 403.0 L423.1 384.6 L426.9 398.3 L446.0 403.8 L439.9 413.9 L464.6 406.0 L469.4 428.9 L495.6 413.3 L487.5 435.1 L499.6 439.8 L510.1 422.4 L511.8 442.6 L544.1 456.6 L546.4 436.2 L570.2 441.2 L554.7 424.5 L572.4 415.9 L571.2 434.5 L596.7 439.3 L567.6 452.1 L577.4 470.0 L594.2 469.9 L592.9 456.2 L618.5 454.6 L626.3 467.8 L640.7 460.2 L678.0 465.9 L673.0 455.6 L685.5 449.3 L695.5 466.5 L730.5 466.8 L707.6 452.4 L732.5 447.1 L720.8 434.3 L735.0 423.4 L709.8 424.6 L719.2 413.8 L669.6 406.1 L697.4 398.5 L673.1 365.7 L689.1 362.4 L694.4 345.6 L701.9 353.0 L726.3 345.5 L728.3 335.2 L663.9 309.3 L634.2 310.6 L630.6 319.0 L570.3 290.3 L544.8 298.1 L539.5 314.9 L508.1 318.8 L496.2 311.1 L497.9 318.1 L452.6 302.2 L376.3 301.1 L351.5 287.7 L299.9 295.7 L284.3 282.5 L170.8 271.2 L139.0 278.4 L95.0 317.4 Z"
            fill="url(#landGradient)"
            filter="url(#mapShadow)"
          />
          <path
            d="M760.0 451.1 L770.2 458.5 L775.1 453.3 L782.9 455.4 L781.3 464.6 L786.9 472.7 L776.2 471.4 L780.4 479.0 L787.5 482.6 L793.2 497.9 L804.5 506.3 L808.7 507.2 L810.2 503.7 L822.3 505.6 L824.7 500.5 L830.2 504.2 L825.6 504.8 L842.4 506.2 L852.2 502.1 L855.0 503.8 L863.2 498.0 L876.7 507.8 L879.1 504.9 L882.9 507.3 L890.3 504.7 L899.5 510.0 L909.2 498.3 L910.0 486.6 L896.2 460.4 L900.4 453.1 L891.6 451.1 L893.8 448.9 L891.0 441.7 L894.8 441.0 L890.6 437.6 L897.5 430.7 L890.6 431.0 L885.6 422.5 L867.6 420.2 L865.2 424.1 L849.9 421.8 L830.2 423.8 L819.1 418.8 L807.9 419.7 L807.8 424.1 L798.7 425.0 L783.1 437.2 L764.9 437.5 L760.0 451.1 Z"
            fill="#E5D4AF"
            filter="url(#mapShadow)"
          />
          <path d="M154 404C255 372 355 383 442 395" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" opacity="0.55" />
          <path d="M792 472C816 469 838 477 852 493" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" opacity="0.48" />
        </svg>

        {pointsOfInterest.map((poi) => {
          const color = pointOfInterestLegend[poi.category];
          const isActive = poi.id === activePoiId;

          return (
            <button
              key={poi.id}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${poi.x}%`, top: `${poi.y}%`, zIndex: isActive ? 40 : 10 }}
              onClick={() => setActivePoiId(poi.id)}
              aria-label={poi.name}
              aria-pressed={isActive}
              aria-describedby={isActive ? `poi-tooltip-${poi.id}` : undefined}
            >
              <div className="relative flex flex-col items-center">
                {isActive ? (
                  <div
                    id={`poi-tooltip-${poi.id}`}
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-56 -translate-x-1/2 rounded-[1.2rem] bg-white/96 p-4 text-left shadow-[0_18px_40px_rgba(16,36,63,0.16)]"
                  >
                    <p className="text-sm font-semibold text-navy-950">{poi.name}</p>
                    <p className="mt-2 text-sm leading-6 text-navy-900/70">{poi.description}</p>
                  </div>
                ) : null}
                <span className="absolute h-7 w-7 rounded-full opacity-25 blur-md" style={{ backgroundColor: color }} />
                <span
                  className={`relative flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white text-[0.55rem] text-white shadow-[0_10px_24px_rgba(16,36,63,0.18)] transition ${
                    isActive ? "scale-110" : ""
                  }`}
                  style={{ backgroundColor: color }}
                >
                  •
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
