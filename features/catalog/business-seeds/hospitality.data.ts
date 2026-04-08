import type { BusinessSeed } from "@/features/catalog/catalog.types";

import { createBusinessLinks, createWhatsappContactDetails } from "./factories";

export const hospitalityBusinessSeeds: BusinessSeed[] = [
  {
    id: "suites-dei-coralli",
    categoryId: "hospitality",
    name: "Suites dei Coralli",
    type: "Boutique stay",
    shortDescription: "Camere luminose con terrazze private e servizi premium.",
    description:
      "Una struttura dal gusto contemporaneo, con materiali naturali, dettagli dorati e una forte connessione visiva con i colori del Mediterraneo. Pensata per un soggiorno rilassante e curato.",
    openingHours: "Check-in 14:00 • Check-out 10:30",
    address: "Via Grecale 25, Lampedusa",
    location: { latitude: 35.519180, longitude: 12.626740 },
    contact: createWhatsappContactDetails(
      "393490001115",
      "Ciao, vorrei informazioni per un soggiorno alle Suites dei Coralli."
    ),
    links: createBusinessLinks("suites-dei-coralli"),
    media: {
      heroImage: "/placeholders/business-hospitality-1.svg",
      gallery: [
        "/placeholders/business-hospitality-1.svg",
        "/placeholders/business-hospitality-2.svg",
        "/placeholders/business-hospitality-3.svg",
        "/placeholders/business-hospitality-4.svg",
        "/placeholders/business-hospitality-5.svg"
      ]
    }
  },
  {
    id: "linosa-casa-luce",
    categoryId: "hospitality",
    name: "Linosa Casa Luce",
    type: "Guest house",
    shortDescription: "Ospitalita intima e silenziosa per chi cerca autenticita.",
    description:
      "Una guest house ispirata alla semplicita elegante delle isole minori, con ambienti essenziali e una vista aperta sul blu. Ideale per chi desidera una pausa lenta e autentica.",
    openingHours: "Check-in 15:00 • Check-out 10:00",
    address: "Via Pozzolana di Ponente 4, Linosa",
    location: { latitude: 35.864220, longitude: 12.863780 },
    contact: createWhatsappContactDetails("393490001116", "Ciao, vorrei informazioni su Linosa Casa Luce."),
    links: createBusinessLinks("linosa-casa-luce"),
    media: {
      heroImage: "/placeholders/business-hospitality-6.svg",
      gallery: [
        "/placeholders/business-hospitality-6.svg",
        "/placeholders/business-hospitality-2.svg",
        "/placeholders/business-hospitality-3.svg",
        "/placeholders/business-hospitality-4.svg",
        "/placeholders/business-hospitality-5.svg"
      ]
    }
  }
];