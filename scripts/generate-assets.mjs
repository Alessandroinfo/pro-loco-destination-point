import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const placeholdersDir = join(root, "public", "placeholders");
const iconsDir = join(root, "public", "icons");

mkdirSync(placeholdersDir, { recursive: true });
mkdirSync(iconsDir, { recursive: true });

const assets = [
  ["public/logo-pro-loco.svg", logoSvg()],
  ["public/logo-pro-loco-white.svg", logoWhiteSvg()],
  ["public/og-image.svg", ogImageSvg()],
  ["public/icons/app-icon.svg", appIconSvg()],
  ["public/placeholders/category-experiences.svg", scenicSvg("Esperienze", "Mare, sport e luce", "#16365D", "#5BB7D4", "#C89A3D", "sea")],
  ["public/placeholders/category-dining.svg", scenicSvg("Ristorazione", "Ristoranti, Pizzerie, Trattorie", "#4B2B18", "#C89A3D", "#F6D9A6", "dining")],
  ["public/placeholders/category-hospitality.svg", scenicSvg("Ospitalità", "Hotel, B&B, Case vacanza", "#7A5A1A", "#C89A3D", "#F3E0B2", "hospitality")],
  ["public/placeholders/category-renting.svg", scenicSvg("Trasporti", "Barche, Scooter, auto, bici", "#1E5A38", "#4E9C63", "#DCEFD9", "renting")],
  ["public/placeholders/category-info.svg", scenicSvg("Info utili", "Trasporti, assistenza, servizi", "#16365D", "#5B8CB9", "#D6E8F8", "info")],
  ["public/placeholders/category-map.svg", scenicSvg("Esplora le Pelagie", "Lampedusa e Linosa illustrate", "#10243F", "#5BB7D4", "#E7C989", "map")],
  ["public/placeholders/screensaver-poster.svg", screensaverSvg()]
];

const businessThemes = [
  ["experience", "#173B63", "#5BC1D8", "#D9F7FB"],
  ["dining", "#5A3520", "#D39C42", "#F6E0B0"],
  ["hospitality", "#6E5520", "#C89A3D", "#F6EAD0"],
  ["renting", "#255B3D", "#58AE72", "#DAF1E1"],
  ["info", "#173B63", "#5B8CB9", "#E3EEF9"],
];

for (const [prefix, dark, accent, light] of businessThemes) {
  for (let index = 1; index <= 6; index += 1) {
    const filename = join("public", "placeholders", `business-${prefix}-${index}.svg`);
    assets.push([filename, businessSvg(prefix, index, dark, accent, light)]);
  }
}

for (const [file, content] of assets) {
  writeFileSync(join(root, file), content, "utf8");
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function logoSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <g stroke="#172C97" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 21C21 31 13 39 3 39" stroke-width="5.8"/>
    <path d="M39 21C39 31 31 39 21 39" stroke-width="5.8"/>
    <path d="M57 21C57 31 49 39 39 39" stroke-width="5.8"/>
    <path d="M75 21C75 31 67 39 57 39" stroke-width="5.8"/>
    <path d="M93 21C93 31 85 39 75 39" stroke-width="5.8"/>
    <path d="M111 21C111 31 103 39 93 39" stroke-width="5.8"/>
    <path d="M21 39C21 49 13 57 3 57" stroke-width="5.8"/>
    <path d="M39 39C39 49 31 57 21 57" stroke-width="5.8"/>
    <path d="M57 39C57 49 49 57 39 57" stroke-width="5.8"/>
    <path d="M75 39C75 49 67 57 57 57" stroke-width="5.8"/>
    <path d="M93 39C93 49 85 57 75 57" stroke-width="5.8"/>
    <path d="M111 39C111 49 103 57 93 57" stroke-width="5.8"/>
    <path d="M21 57C21 67 13 75 3 75" stroke-width="5.8"/>
    <path d="M39 57C39 67 31 75 21 75" stroke-width="5.8"/>
    <path d="M57 57C57 67 49 75 39 75" stroke-width="5.8"/>
    <path d="M75 57C75 67 67 75 57 75" stroke-width="5.8"/>
    <path d="M93 57C93 67 85 75 75 75" stroke-width="5.8"/>
    <path d="M111 57C111 67 103 75 93 75" stroke-width="5.8"/>
    <path d="M3 85C15 85 21 80 30 80C39 80 45 85 57 85C69 85 75 80 84 80C93 80 99 85 111 85" stroke-width="5.2"/>
    <path d="M3 95C15 95 21 90 30 90C39 90 45 95 57 95C69 95 75 90 84 90C93 90 99 95 111 95" stroke-width="5.2"/>
    <path d="M3 105C15 105 21 100 30 100C39 100 45 105 57 105C69 105 75 100 84 100C93 100 99 105 111 105" stroke-width="5.2"/>
    <path d="M3 115C15 115 21 110 30 110C39 110 45 115 57 115C69 115 75 110 84 110C93 110 99 115 111 115" stroke-width="5.2"/>
  </g>
</svg>`.trim();
}

function ogImageSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none">
  <rect width="1200" height="630" fill="#F5FAFC"/>
  <rect x="40" y="40" width="1120" height="550" rx="40" fill="url(#panel)"/>
  <circle cx="952" cy="146" r="104" fill="#C89A3D" opacity="0.18"/>
  <circle cx="188" cy="506" r="140" fill="#5BB7D4" opacity="0.16"/>
  <rect x="94" y="90" width="104" height="104" rx="26" fill="#FFF"/>
  <image href="/logo-pro-loco.svg" x="94" y="90" width="104" height="104"/>
  <text x="94" y="274" fill="#E7C989" font-size="28" font-family="Georgia, serif" font-style="italic">Lampedusa</text>
  <text x="94" y="334" fill="#FFFFFF" font-size="56" font-family="Manrope, Arial, sans-serif" font-weight="700">Hub Turistico Pro Loco</text>
  <text x="94" y="394" fill="#D5E9EF" font-size="56" font-family="Manrope, Arial, sans-serif" font-weight="700">Lampedusa e Linosa</text>
  <text x="94" y="468" fill="#FFFFFF" fill-opacity="0.78" font-size="28" font-family="Manrope, Arial, sans-serif">PWA statica per totem touch screen con mappa offline e QR WhatsApp.</text>
  <defs>
    <linearGradient id="panel" x1="62" y1="54" x2="1150" y2="578" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10243F"/>
      <stop offset="0.56" stop-color="#1B456D"/>
      <stop offset="1" stop-color="#305E89"/>
    </linearGradient>
  </defs>
</svg>`.trim();
}

function logoWhiteSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <g stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 21C21 31 13 39 3 39" stroke-width="5.8"/>
    <path d="M39 21C39 31 31 39 21 39" stroke-width="5.8"/>
    <path d="M57 21C57 31 49 39 39 39" stroke-width="5.8"/>
    <path d="M75 21C75 31 67 39 57 39" stroke-width="5.8"/>
    <path d="M93 21C93 31 85 39 75 39" stroke-width="5.8"/>
    <path d="M111 21C111 31 103 39 93 39" stroke-width="5.8"/>
    <path d="M21 39C21 49 13 57 3 57" stroke-width="5.8"/>
    <path d="M39 39C39 49 31 57 21 57" stroke-width="5.8"/>
    <path d="M57 39C57 49 49 57 39 57" stroke-width="5.8"/>
    <path d="M75 39C75 49 67 57 57 57" stroke-width="5.8"/>
    <path d="M93 39C93 49 85 57 75 57" stroke-width="5.8"/>
    <path d="M111 39C111 49 103 57 93 57" stroke-width="5.8"/>
    <path d="M21 57C21 67 13 75 3 75" stroke-width="5.8"/>
    <path d="M39 57C39 67 31 75 21 75" stroke-width="5.8"/>
    <path d="M57 57C57 67 49 75 39 75" stroke-width="5.8"/>
    <path d="M75 57C75 67 67 75 57 75" stroke-width="5.8"/>
    <path d="M93 57C93 67 85 75 75 75" stroke-width="5.8"/>
    <path d="M111 57C111 67 103 75 93 75" stroke-width="5.8"/>
    <path d="M3 85C15 85 21 80 30 80C39 80 45 85 57 85C69 85 75 80 84 80C93 80 99 85 111 85" stroke-width="5.2"/>
    <path d="M3 95C15 95 21 90 30 90C39 90 45 95 57 95C69 95 75 90 84 90C93 90 99 95 111 95" stroke-width="5.2"/>
    <path d="M3 105C15 105 21 100 30 100C39 100 45 105 57 105C69 105 75 100 84 100C93 100 99 105 111 105" stroke-width="5.2"/>
    <path d="M3 115C15 115 21 110 30 110C39 110 45 115 57 115C69 115 75 110 84 110C93 110 99 115 111 115" stroke-width="5.2"/>
  </g>
</svg>`.trim();
}

function appIconSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <rect width="512" height="512" rx="132" fill="url(#bg)"/>
  <circle cx="390" cy="132" r="46" fill="#E7C989"/>
  <path d="M88 316C150 258 218 236 312 201C359 183 406 157 438 118V418H88V316Z" fill="url(#sea)"/>
  <path d="M147 156C174 125 214 108 256 108C331 108 392 168 392 245C392 325 328 386 249 386C209 386 170 375 138 351C162 351 181 342 198 323C216 301 225 267 225 238C225 214 218 193 203 177C188 160 169 150 147 150V156Z" fill="#F8F2E6"/>
  <defs>
    <linearGradient id="bg" x1="58" y1="46" x2="454" y2="468" gradientUnits="userSpaceOnUse">
      <stop stop-color="#10243F"/>
      <stop offset="1" stop-color="#214F7C"/>
    </linearGradient>
    <linearGradient id="sea" x1="88" y1="174" x2="438" y2="407" gradientUnits="userSpaceOnUse">
      <stop stop-color="#5BB7D4"/>
      <stop offset="1" stop-color="#C89A3D"/>
    </linearGradient>
  </defs>
</svg>`.trim();
}

function scenicSvg(title, subtitle, dark, accent, warm, mode) {
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle.toUpperCase());
  const decorative = scenicIllustration(mode, dark, accent, warm);

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540" fill="none">
  <rect width="720" height="540" fill="url(#bg)"/>
  <circle cx="590" cy="116" r="92" fill="${warm}" opacity="0.18"/>
  <circle cx="132" cy="104" r="116" fill="#FFFFFF" opacity="0.05"/>
  <path d="M0 392C84 352 176 340 264 349C339 357 406 381 479 387C555 394 634 380 720 332V540H0V392Z" fill="rgba(255,255,255,0.08)"/>
  ${decorative}
  <rect x="52" y="52" width="616" height="436" rx="36" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  <rect x="0" y="336" width="720" height="204" fill="url(#bottomFade)"/>
  <text x="64" y="426" fill="#FFFFFF" fill-opacity="0.64" font-size="22" letter-spacing="5" font-family="Arial, sans-serif">${safeSubtitle}</text>
  <text x="64" y="470" fill="#FFFFFF" font-size="52" font-weight="700" font-family="Arial, sans-serif">${safeTitle}</text>
  <defs>
    <linearGradient id="bg" x1="38" y1="34" x2="684" y2="506" gradientUnits="userSpaceOnUse">
      <stop stop-color="${dark}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
    <linearGradient id="bottomFade" x1="360" y1="336" x2="360" y2="540" gradientUnits="userSpaceOnUse">
      <stop stop-color="rgba(16,36,63,0)"/>
      <stop offset="1" stop-color="rgba(16,36,63,0.44)"/>
    </linearGradient>
  </defs>
</svg>`.trim();
}

function scenicIllustration(mode, dark, accent, warm) {
  const white = "rgba(255,255,255,0.94)";
  const soft = "rgba(255,255,255,0.18)";
  const mist = "rgba(255,255,255,0.1)";
  const line = "rgba(255,255,255,0.72)";
  const shadow = "rgba(16,36,63,0.16)";

  if (mode === "sea") {
    return `
      <path d="M0 324C88 301 179 299 267 316C354 333 440 356 525 355C595 354 661 339 720 312V540H0V324Z" fill="rgba(255,255,255,0.12)"/>
      <path d="M0 364C94 345 184 346 271 364C357 382 447 398 539 395C601 393 661 382 720 359V540H0V364Z" fill="rgba(91,183,212,0.2)"/>
      <path d="M112 378C184 362 253 362 323 377C404 394 491 403 583 393C632 388 678 379 720 364" fill="none" stroke="${line}" stroke-width="8" stroke-linecap="round"/>
      <path d="M136 410C202 399 266 400 332 414C409 430 493 438 583 429C632 424 678 416 720 400" fill="none" stroke="${warm}" stroke-width="6" stroke-linecap="round" opacity="0.82"/>
      <g transform="translate(144 124)">
        <ellipse cx="212" cy="140" rx="172" ry="102" fill="${soft}"/>
        <path d="M214 80V248" stroke="${white}" stroke-width="7" stroke-linecap="round"/>
        <path d="M214 88L314 246H214V88Z" fill="${white}"/>
        <path d="M214 116L148 234H214V116Z" fill="rgba(255,255,255,0.82)"/>
        <path d="M116 248H388C377 274 352 293 314 305C266 319 203 321 151 308C116 299 90 283 76 261C69 251 76 248 116 248Z" fill="${white}"/>
        <path d="M146 248C178 240 212 236 251 236C296 236 335 241 372 252" fill="none" stroke="${shadow}" stroke-width="4" stroke-linecap="round"/>
        <path d="M165 278C196 271 227 268 262 268C297 268 328 272 358 280" fill="none" stroke="rgba(255,255,255,0.56)" stroke-width="5" stroke-linecap="round"/>
        <path d="M150 247H300" stroke="${warm}" stroke-width="5" stroke-linecap="round" opacity="0.76"/>
      </g>
    `.trim();
  }

  if (mode === "dining") {
    return `
      <ellipse cx="360" cy="246" rx="196" ry="118" fill="${soft}"/>
      <circle cx="360" cy="246" r="102" fill="none" stroke="${white}" stroke-width="12"/>
      <circle cx="360" cy="246" r="70" fill="none" stroke="rgba(255,255,255,0.34)" stroke-width="3"/>
      <path d="M205 156V352" stroke="${white}" stroke-width="10" stroke-linecap="round"/>
      <path d="M182 156V211" stroke="${white}" stroke-width="7.5" stroke-linecap="round"/>
      <path d="M205 156V211" stroke="${white}" stroke-width="7.5" stroke-linecap="round"/>
      <path d="M228 156V211" stroke="${white}" stroke-width="7.5" stroke-linecap="round"/>
      <path d="M516 156V352" stroke="${white}" stroke-width="10" stroke-linecap="round"/>
      <path d="M516 156C541 189 545 224 526 250" fill="none" stroke="${white}" stroke-width="8.5" stroke-linecap="round"/>
      <circle cx="360" cy="246" r="13" fill="${warm}" opacity="0.88"/>
      <path d="M268 338C298 325 329 319 360 319C393 319 423 325 454 338" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="5" stroke-linecap="round"/>
    `.trim();
  }

  if (mode === "hospitality") {
    return `
      <path d="M140 166C140 132 168 104 202 104H300V274H140V166Z" fill="${mist}"/>
      <path d="M312 128C312 96 338 70 370 70H470V246H312V128Z" fill="rgba(255,255,255,0.12)"/>
      <path d="M482 164C482 135 506 112 535 112H596V280H482V164Z" fill="${soft}"/>
      <g transform="translate(146 206)">
        <rect x="0" y="120" width="430" height="98" rx="32" fill="${white}"/>
        <rect x="0" y="64" width="134" height="82" rx="28" fill="rgba(255,255,255,0.72)"/>
        <rect x="296" y="64" width="134" height="82" rx="28" fill="rgba(255,255,255,0.72)"/>
        <rect x="118" y="108" width="194" height="86" rx="28" fill="rgba(255,255,255,0.86)"/>
        <rect x="26" y="140" width="120" height="54" rx="24" fill="rgba(16,36,63,0.1)"/>
        <rect x="284" y="140" width="120" height="54" rx="24" fill="rgba(16,36,63,0.1)"/>
        <path d="M24 219C109 203 197 200 283 211C338 218 387 230 429 248" fill="none" stroke="${warm}" stroke-width="7" stroke-linecap="round" opacity="0.84"/>
      </g>
      <path d="M518 128C518 102 539 81 565 81C554 93 548 107 548 121C548 143 565 161 586 166C579 171 570 174 560 174C537 174 518 155 518 128Z" fill="rgba(255,255,255,0.72)"/>
    `.trim();
  }

  if (mode === "renting") {
    return `
      <path d="M0 380C96 355 190 353 278 370C367 388 457 406 548 404C609 402 667 389 720 368V540H0V380Z" fill="rgba(255,255,255,0.1)"/>
      <g transform="translate(352 124)">
        <rect x="0" y="56" width="206" height="118" rx="30" fill="${soft}"/>
        <rect x="20" y="77" width="58" height="34" rx="10" fill="rgba(255,255,255,0.46)"/>
        <rect x="88" y="77" width="58" height="34" rx="10" fill="rgba(255,255,255,0.46)"/>
        <rect x="156" y="77" width="30" height="34" rx="10" fill="rgba(255,255,255,0.46)"/>
        <path d="M20 134H186" stroke="${line}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="46" cy="184" r="22" fill="${warm}" opacity="0.9"/>
        <circle cx="46" cy="184" r="11" fill="${dark}"/>
        <circle cx="160" cy="184" r="22" fill="${warm}" opacity="0.9"/>
        <circle cx="160" cy="184" r="11" fill="${dark}"/>
      </g>
      <g transform="translate(138 236)">
        <circle cx="78" cy="120" r="34" fill="${warm}" opacity="0.92"/>
        <circle cx="78" cy="120" r="16" fill="${dark}"/>
        <circle cx="246" cy="120" r="34" fill="${warm}" opacity="0.92"/>
        <circle cx="246" cy="120" r="16" fill="${dark}"/>
        <path d="M89 74C112 46 136 32 170 32H210C231 32 248 39 260 54L285 87H180C161 87 147 95 136 108L120 128H92C77 128 65 117 65 102C65 89 75 78 89 74Z" fill="${white}"/>
        <path d="M169 32L148 84H254" fill="none" stroke="${line}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M126 128H217" stroke="${line}" stroke-width="6" stroke-linecap="round"/>
      </g>
    `.trim();
  }

  if (mode === "info") {
    return `
      <circle cx="360" cy="238" r="126" fill="${soft}"/>
      <circle cx="360" cy="238" r="92" fill="none" stroke="${white}" stroke-width="12"/>
      <circle cx="360" cy="190" r="12" fill="${warm}"/>
      <path d="M360 222V306" stroke="${white}" stroke-width="14" stroke-linecap="round"/>
      <circle cx="360" cy="238" r="148" fill="none" stroke="rgba(255,255,255,0.24)" stroke-width="2"/>
    `.trim();
  }

  return `
    <ellipse cx="356" cy="246" rx="238" ry="142" fill="${soft}"/>
    <g transform="translate(118 148) scale(0.48)">
      <path
        d="M95.0 317.4 L103.1 328.3 L166.3 347.7 L201.8 343.2 L272.1 357.9 L284.6 349.2 L299.4 366.1 L310.1 358.9 L373.5 368.3 L385.2 395.1 L418.4 403.0 L423.1 384.6 L426.9 398.3 L446.0 403.8 L439.9 413.9 L464.6 406.0 L469.4 428.9 L495.6 413.3 L487.5 435.1 L499.6 439.8 L510.1 422.4 L511.8 442.6 L544.1 456.6 L546.4 436.2 L570.2 441.2 L554.7 424.5 L572.4 415.9 L571.2 434.5 L596.7 439.3 L567.6 452.1 L577.4 470.0 L594.2 469.9 L592.9 456.2 L618.5 454.6 L626.3 467.8 L640.7 460.2 L678.0 465.9 L673.0 455.6 L685.5 449.3 L695.5 466.5 L730.5 466.8 L707.6 452.4 L732.5 447.1 L720.8 434.3 L735.0 423.4 L709.8 424.6 L719.2 413.8 L669.6 406.1 L697.4 398.5 L673.1 365.7 L689.1 362.4 L694.4 345.6 L701.9 353.0 L726.3 345.5 L728.3 335.2 L663.9 309.3 L634.2 310.6 L630.6 319.0 L570.3 290.3 L544.8 298.1 L539.5 314.9 L508.1 318.8 L496.2 311.1 L497.9 318.1 L452.6 302.2 L376.3 301.1 L351.5 287.7 L299.9 295.7 L284.3 282.5 L170.8 271.2 L139.0 278.4 L95.0 317.4 Z"
        fill="${white}"
      />
      <path d="M154 404C255 372 355 383 442 395" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="10" stroke-linecap="round" />
    </g>
    <g transform="translate(308 92) scale(0.31)">
      <path
        d="M760.0 451.1 L770.2 458.5 L775.1 453.3 L782.9 455.4 L781.3 464.6 L786.9 472.7 L776.2 471.4 L780.4 479.0 L787.5 482.6 L793.2 497.9 L804.5 506.3 L808.7 507.2 L810.2 503.7 L822.3 505.6 L824.7 500.5 L830.2 504.2 L825.6 504.8 L842.4 506.2 L852.2 502.1 L855.0 503.8 L863.2 498.0 L876.7 507.8 L879.1 504.9 L882.9 507.3 L890.3 504.7 L899.5 510.0 L909.2 498.3 L910.0 486.6 L896.2 460.4 L900.4 453.1 L891.6 451.1 L893.8 448.9 L891.0 441.7 L894.8 441.0 L890.6 437.6 L897.5 430.7 L890.6 431.0 L885.6 422.5 L867.6 420.2 L865.2 424.1 L849.9 421.8 L830.2 423.8 L819.1 418.8 L807.9 419.7 L807.8 424.1 L798.7 425.0 L783.1 437.2 L764.9 437.5 L760.0 451.1 Z"
        fill="${warm}"
        opacity="0.88"
      />
      <path d="M792 472C816 469 838 477 852 493" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="8" stroke-linecap="round" />
    </g>
    <circle cx="248" cy="300" r="10" fill="${warm}" opacity="0.9"/>
    <circle cx="336" cy="290" r="10" fill="${warm}" opacity="0.9"/>
    <circle cx="398" cy="328" r="10" fill="${warm}" opacity="0.9"/>
    <circle cx="582" cy="238" r="10" fill="${warm}" opacity="0.9"/>
  `.trim();
}

function screensaverSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" fill="none">
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="844" cy="364" r="202" fill="#E7C989" opacity="0.18"/>
  <path d="M0 1180C164 1050 294 1014 470 1025C655 1036 778 1111 965 1108C1007 1107 1046 1102 1080 1090V1920H0V1180Z" fill="rgba(255,255,255,0.18)"/>
  <path d="M0 1276C152 1202 320 1214 456 1270C613 1334 745 1426 931 1412C986 1408 1038 1397 1080 1382V1920H0V1276Z" fill="rgba(91,183,212,0.4)"/>
  <path d="M0 1438C187 1385 346 1406 509 1464C684 1526 835 1601 1080 1560V1920H0V1438Z" fill="rgba(16,36,63,0.34)"/>
  <defs>
    <linearGradient id="bg" x1="102" y1="58" x2="946" y2="1856" gradientUnits="userSpaceOnUse">
      <stop stop-color="#326F94"/>
      <stop offset="0.55" stop-color="#184A75"/>
      <stop offset="1" stop-color="#10243F"/>
    </linearGradient>
  </defs>
</svg>`.trim();
}

function businessSvg(prefix, index, dark, accent, light) {
  const label = `${prefix.charAt(0).toUpperCase()}${prefix.slice(1)} ${index}`;
  const horizon = 220 + index * 12;
  const circleX = 520 - index * 22;
  const circleY = 128 + index * 10;
  const band = 60 + index * 8;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" fill="none">
  <rect width="1200" height="900" fill="url(#bg)"/>
  <circle cx="${circleX}" cy="${circleY}" r="${band}" fill="${light}" opacity="0.24"/>
  <path d="M0 ${horizon}C151 ${horizon - 68} 300 ${horizon - 80} 458 ${horizon - 20}C625 ${horizon + 42} 744 ${horizon + 77} 920 ${horizon + 20}C1038 ${horizon - 18} 1128 ${horizon - 16} 1200 ${horizon}" fill="rgba(255,255,255,0.1)"/>
  <path d="M0 ${horizon + 112}C179 ${horizon + 42} 298 ${horizon + 56} 467 ${horizon + 118}C648 ${horizon + 184} 816 ${horizon + 218} 972 ${horizon + 165}C1070 ${horizon + 132} 1140 ${horizon + 124} 1200 ${horizon + 136}V900H0V${horizon + 112}Z" fill="${accent}" opacity="0.4"/>
  <path d="M0 ${horizon + 190}C155 ${horizon + 146} 289 ${horizon + 159} 463 ${horizon + 223}C646 ${horizon + 291} 836 ${horizon + 364} 1200 ${horizon + 297}V900H0V${horizon + 190}Z" fill="rgba(16,36,63,0.34)"/>
  <rect x="60" y="60" width="1080" height="780" rx="36" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
  <text x="82" y="728" fill="#FFFFFF" fill-opacity="0.66" font-size="28" letter-spacing="7" font-family="Arial, sans-serif">PLACEHOLDER VISUAL</text>
  <text x="82" y="788" fill="#FFFFFF" font-size="64" font-weight="700" font-family="Arial, sans-serif">${label}</text>
  <defs>
    <linearGradient id="bg" x1="42" y1="48" x2="1120" y2="852" gradientUnits="userSpaceOnUse">
      <stop stop-color="${dark}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
  </defs>
</svg>`.trim();
}
