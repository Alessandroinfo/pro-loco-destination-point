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

  if (mode === "sea") {
    return `
      <path d="M0 304C77 280 159 277 239 294C317 310 392 339 476 343C552 347 633 327 720 277V540H0V304Z" fill="rgba(255,255,255,0.12)"/>
      <path d="M0 344C88 322 176 322 264 343C350 363 432 390 517 389C589 388 657 370 720 334V540H0V344Z" fill="rgba(91,183,212,0.2)"/>
      <path d="M132 400C213 381 287 383 357 407C435 434 518 446 607 432C650 425 688 414 720 397" fill="none" stroke="${warm}" stroke-width="7" stroke-linecap="round" opacity="0.78"/>
      <path d="M122 366C196 347 270 347 344 370C425 395 513 409 604 399C647 394 687 384 720 370" fill="none" stroke="rgba(255,255,255,0.56)" stroke-width="9" stroke-linecap="round"/>
      <path d="M210 310C240 262 294 231 360 231C406 231 444 245 474 273C503 300 518 336 519 377H205C204 352 205 332 210 310Z" fill="${white}"/>
      <path d="M218 376C251 390 293 399 341 401C415 405 484 390 532 352" fill="none" stroke="${dark}" stroke-width="4.5" stroke-linecap="round" opacity="0.18"/>
      <path d="M334 156L414 305H268L334 156Z" fill="${white}"/>
      <path d="M338 144V385" stroke="${white}" stroke-width="8" stroke-linecap="round"/>
      <path d="M338 217L432 306" stroke="${warm}" stroke-width="7" stroke-linecap="round" opacity="0.9"/>
      <path d="M232 388C270 372 319 367 376 372C431 377 473 393 506 420" fill="none" stroke="rgba(255,255,255,0.72)" stroke-width="6" stroke-linecap="round"/>
      <path d="M238 402C270 395 299 397 326 405C349 412 372 427 390 445" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="5" stroke-linecap="round"/>
    `.trim();
  }

  if (mode === "dining") {
    return `
      <ellipse cx="362" cy="282" rx="186" ry="112" fill="${soft}"/>
      <circle cx="362" cy="276" r="98" fill="none" stroke="${white}" stroke-width="14"/>
      <circle cx="362" cy="276" r="70" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.34)" stroke-width="3"/>
      <path d="M210 170V370" stroke="${white}" stroke-width="12" stroke-linecap="round"/>
      <path d="M184 170V228" stroke="${white}" stroke-width="9" stroke-linecap="round"/>
      <path d="M210 170V228" stroke="${white}" stroke-width="9" stroke-linecap="round"/>
      <path d="M236 170V228" stroke="${white}" stroke-width="9" stroke-linecap="round"/>
      <path d="M520 168V370" stroke="${white}" stroke-width="12" stroke-linecap="round"/>
      <path d="M520 170C555 208 557 244 530 274" fill="none" stroke="${white}" stroke-width="10" stroke-linecap="round"/>
      <path d="M310 282C328 255 356 240 390 240C417 240 443 250 467 272C449 301 427 320 390 326C356 331 327 315 310 282Z" fill="${warm}" opacity="0.9"/>
      <path d="M310 282C329 294 352 301 380 301C409 301 432 292 452 277" fill="none" stroke="${dark}" stroke-width="4.5" stroke-linecap="round" opacity="0.18"/>
      <path d="M343 240C353 219 370 205 395 198" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="5" stroke-linecap="round"/>
      <circle cx="548" cy="154" r="30" fill="${warm}" opacity="0.22"/>
    `.trim();
  }

  if (mode === "hospitality") {
    return `
      <path d="M112 368C160 314 221 286 292 286H510C541 286 570 299 592 322C615 345 628 376 628 410H112V368Z" fill="${soft}"/>
      <path d="M154 235C154 196 186 164 226 164H499C539 164 572 196 572 235V410H154V235Z" fill="${white}"/>
      <path d="M154 242H572" stroke="rgba(16,36,63,0.08)" stroke-width="4"/>
      <path d="M186 235C186 215 202 198 222 198H285V410H186V235Z" fill="rgba(16,36,63,0.05)"/>
      <path d="M302 235C302 215 318 198 338 198H402C422 198 438 215 438 235V410H302V235Z" fill="rgba(16,36,63,0.05)"/>
      <path d="M455 235C455 215 471 198 491 198H540V410H455V235Z" fill="rgba(16,36,63,0.05)"/>
      <path d="M210 410V334C210 317 223 304 240 304H282V410H210Z" fill="${white}" opacity="0.94"/>
      <path d="M322 410V282C322 266 335 253 352 253C369 253 382 266 382 282V410H322Z" fill="${white}" opacity="0.9"/>
      <path d="M474 410V324C474 307 487 294 504 294H540V410H474Z" fill="${white}" opacity="0.94"/>
      <path d="M114 410H628" stroke="${warm}" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
      <path d="M508 140C508 111 531 88 560 88C548 101 542 117 542 132C542 157 560 178 584 184C576 190 566 194 555 194C529 194 508 172 508 140Z" fill="rgba(255,255,255,0.76)"/>
      <path d="M134 432C188 420 241 420 295 434" fill="none" stroke="rgba(255,255,255,0.48)" stroke-width="6" stroke-linecap="round"/>
    `.trim();
  }

  if (mode === "renting") {
    return `
      <path d="M0 356C81 334 170 333 260 351C343 368 429 391 517 392C592 392 662 377 720 350V540H0V356Z" fill="rgba(255,255,255,0.1)"/>
      <path d="M152 348H424C451 348 474 366 480 392H138C142 367 129 348 152 348Z" fill="${white}"/>
      <path d="M184 308C217 272 251 254 294 254H365C401 254 432 267 458 291L485 322H171L184 308Z" fill="${mist}"/>
      <circle cx="221" cy="398" r="36" fill="${warm}" opacity="0.92"/>
      <circle cx="221" cy="398" r="18" fill="${dark}"/>
      <circle cx="413" cy="398" r="36" fill="${warm}" opacity="0.92"/>
      <circle cx="413" cy="398" r="18" fill="${dark}"/>
      <path d="M507 231L571 284H463L507 231Z" fill="${white}"/>
      <path d="M507 232V338" stroke="${white}" stroke-width="7" stroke-linecap="round"/>
      <path d="M482 343C531 334 579 336 627 352" fill="none" stroke="${warm}" stroke-width="7" stroke-linecap="round" opacity="0.78"/>
      <circle cx="618" cy="370" r="45" fill="rgba(255,255,255,0.14)"/>
      <circle cx="618" cy="370" r="26" stroke="${white}" stroke-width="8"/>
      <path d="M618 326V414" stroke="${white}" stroke-width="6" stroke-linecap="round"/>
      <path d="M574 370H662" stroke="${white}" stroke-width="6" stroke-linecap="round"/>
    `.trim();
  }

  if (mode === "info") {
    return `
      <circle cx="360" cy="245" r="104" fill="${soft}"/>
      <circle cx="360" cy="245" r="80" fill="none" stroke="${white}" stroke-width="12"/>
      <circle cx="360" cy="203" r="12" fill="${warm}"/>
      <path d="M360 234V303" stroke="${white}" stroke-width="14" stroke-linecap="round"/>
      <path d="M196 356C243 334 296 322 360 322C424 322 480 339 534 372" fill="none" stroke="rgba(255,255,255,0.38)" stroke-width="9" stroke-linecap="round"/>
      <path d="M176 176H252L284 152" stroke="${white}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M176 220H274L304 245" stroke="rgba(255,255,255,0.66)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M460 182H552L578 160" stroke="${white}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M446 226H542L575 251" stroke="rgba(255,255,255,0.66)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="164" y="154" width="20" height="94" rx="10" fill="rgba(255,255,255,0.3)"/>
      <rect x="552" y="154" width="20" height="104" rx="10" fill="rgba(255,255,255,0.3)"/>
    `.trim();
  }

  return `
    <path d="M94 290C144 208 236 157 340 157C437 157 520 197 610 188C647 184 685 173 720 152V418H82L94 290Z" fill="rgba(255,255,255,0.16)"/>
    <path d="M128 304C187 235 259 201 348 201C419 201 486 230 565 228C616 226 668 210 720 177V430H116L128 304Z" fill="rgba(255,255,255,0.12)"/>
    <path d="M202 265L244 252L289 274L334 249L391 266L448 241L493 265L548 250L603 270" fill="none" stroke="${white}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M505 379C528 356 566 354 591 374C616 394 617 431 593 454C568 476 527 478 500 456C477 436 478 401 505 379Z" fill="${warm}" opacity="0.78"/>
    <path d="M514 397L548 412L590 390" fill="none" stroke="${dark}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.22"/>
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
