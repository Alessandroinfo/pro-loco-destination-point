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
  const decorative = {
    sea: `<circle cx="545" cy="132" r="56" fill="${warm}" opacity="0.28"/>
      <path d="M94 388C178 368 250 370 330 395C405 419 476 438 560 434C618 431 657 421 684 410" fill="none" stroke="rgba(255,255,255,0.52)" stroke-width="10" stroke-linecap="round"/>
      <path d="M96 427C178 410 244 415 325 438C405 462 488 478 575 470C630 465 665 455 689 445" fill="none" stroke="${warm}" stroke-width="8" stroke-linecap="round" opacity="0.72"/>
      <path d="M176 344H548C560 344 570 354 568 366C563 392 542 412 513 421C467 435 390 440 320 431C254 423 205 400 178 371C169 362 167 344 176 344Z" fill="rgba(255,255,255,0.16)"/>
      <path d="M330 198L408 314H252L330 198Z" fill="rgba(255,255,255,0.9)"/>
      <path d="M336 172V352" stroke="rgba(255,255,255,0.92)" stroke-width="8" stroke-linecap="round"/>
      <path d="M336 238L424 314" stroke="${warm}" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
      <path d="M344 317H500C512 317 523 326 526 338C532 363 520 389 497 402C469 418 416 427 363 425C314 423 270 413 237 394C217 382 204 362 208 342C210 328 221 317 235 317H344Z" fill="rgba(255,255,255,0.88)"/>`,
    dining: `<circle cx="372" cy="252" r="104" fill="rgba(255,255,255,0.15)"/>
      <circle cx="372" cy="252" r="80" stroke="rgba(255,255,255,0.88)" stroke-width="12"/>
      <path d="M215 160V348" stroke="rgba(255,255,255,0.88)" stroke-width="12" stroke-linecap="round"/>
      <path d="M190 160V218" stroke="rgba(255,255,255,0.88)" stroke-width="10" stroke-linecap="round"/>
      <path d="M215 160V218" stroke="rgba(255,255,255,0.88)" stroke-width="10" stroke-linecap="round"/>
      <path d="M240 160V218" stroke="rgba(255,255,255,0.88)" stroke-width="10" stroke-linecap="round"/>
      <path d="M503 160V348" stroke="rgba(255,255,255,0.88)" stroke-width="12" stroke-linecap="round"/>
      <path d="M503 160C536 196 540 232 515 260" fill="none" stroke="${warm}" stroke-width="10" stroke-linecap="round"/>
      <circle cx="540" cy="162" r="36" fill="${warm}" opacity="0.2"/>`,
    hospitality: `<rect x="138" y="262" width="432" height="112" rx="34" fill="rgba(255,255,255,0.18)"/>
      <rect x="164" y="228" width="138" height="92" rx="32" fill="rgba(255,255,255,0.28)"/>
      <rect x="312" y="284" width="214" height="58" rx="29" fill="rgba(255,255,255,0.92)"/>
      <rect x="312" y="348" width="228" height="34" rx="17" fill="${warm}" opacity="0.72"/>
      <path d="M502 150C502 120 527 95 557 95C544 108 537 124 537 140C537 166 556 189 582 195C574 200 563 204 551 204C524 204 502 181 502 150Z" fill="rgba(255,255,255,0.76)"/>
      <rect x="170" y="122" width="124" height="84" rx="24" fill="rgba(255,255,255,0.14)"/>
      <path d="M232 122V206" stroke="rgba(255,255,255,0.3)" stroke-width="8"/>
      <path d="M170 164H294" stroke="rgba(255,255,255,0.3)" stroke-width="8"/>`,
    renting: `<path d="M132 392C193 373 255 369 333 388C412 407 482 412 548 405C602 400 644 388 677 372" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="10" stroke-linecap="round"/>
      <path d="M168 336H460C485 336 506 353 511 377H149C153 354 144 336 168 336Z" fill="rgba(255,255,255,0.9)"/>
      <path d="M194 296C224 264 255 249 294 249H376C411 249 434 259 458 281L492 320H181L194 296Z" fill="rgba(255,255,255,0.16)"/>
      <circle cx="219" cy="384" r="35" fill="${warm}" opacity="0.86"/>
      <circle cx="219" cy="384" r="18" fill="${dark}"/>
      <circle cx="434" cy="384" r="35" fill="${warm}" opacity="0.86"/>
      <circle cx="434" cy="384" r="18" fill="${dark}"/>
      <path d="M516 198L577 252H471L516 198Z" fill="rgba(255,255,255,0.82)"/>
      <path d="M516 198V302" stroke="rgba(255,255,255,0.9)" stroke-width="8" stroke-linecap="round"/>
      <path d="M486 316C529 307 572 307 616 321" fill="none" stroke="${warm}" stroke-width="8" stroke-linecap="round" opacity="0.76"/>`,
    info: `<circle cx="360" cy="250" r="92" fill="rgba(255,255,255,0.12)"/>
      <circle cx="360" cy="250" r="74" stroke="rgba(255,255,255,0.88)" stroke-width="12"/>
      <circle cx="360" cy="210" r="12" fill="${warm}"/>
      <path d="M360 240V305" stroke="rgba(255,255,255,0.92)" stroke-width="14" stroke-linecap="round"/>
      <path d="M212 364C257 340 305 328 361 328C419 328 474 343 525 372" fill="none" stroke="rgba(255,255,255,0.36)" stroke-width="10" stroke-linecap="round"/>
      <path d="M178 166H248" stroke="rgba(255,255,255,0.7)" stroke-width="10" stroke-linecap="round"/>
      <path d="M178 202H278" stroke="rgba(255,255,255,0.5)" stroke-width="10" stroke-linecap="round"/>
      <path d="M472 182H548" stroke="rgba(255,255,255,0.7)" stroke-width="10" stroke-linecap="round"/>
      <path d="M448 220H548" stroke="rgba(255,255,255,0.5)" stroke-width="10" stroke-linecap="round"/>`,
    map: `<path d="M110 272C167 186 254 153 350 155C445 157 502 202 598 189C645 183 683 162 720 126V420H80L110 272Z" fill="rgba(255,255,255,0.16)"/>
      <path d="M494 382C517 359 555 356 580 376C605 396 606 433 582 456C557 478 516 480 489 458C466 438 467 403 494 382Z" fill="rgba(231,201,137,0.72)"/>`
  }[mode];

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540" fill="none">
  <rect width="720" height="540" fill="url(#bg)"/>
  <circle cx="587" cy="121" r="88" fill="${warm}" opacity="0.2"/>
  ${decorative}
  <rect x="52" y="52" width="616" height="436" rx="36" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  <text x="64" y="426" fill="#FFFFFF" fill-opacity="0.64" font-size="22" letter-spacing="5" font-family="Arial, sans-serif">${safeSubtitle}</text>
  <text x="64" y="470" fill="#FFFFFF" font-size="52" font-weight="700" font-family="Arial, sans-serif">${safeTitle}</text>
  <defs>
    <linearGradient id="bg" x1="38" y1="34" x2="684" y2="506" gradientUnits="userSpaceOnUse">
      <stop stop-color="${dark}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
  </defs>
</svg>`.trim();
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
