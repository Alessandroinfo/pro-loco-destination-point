import type { BusinessSeed } from "@/features/catalog/catalog.types";

import { createBusinessLinks, createWhatsappContactDetails } from "./factories";

export const infoBusinessSeeds: BusinessSeed[] = [
  {
    id: "pelagie-help-desk",
    categoryId: "info",
    name: "Pelagie Help Desk",
    type: "Infopoint turistico",
    shortDescription: "Supporto per orientarsi tra spiagge, trasporti e servizi essenziali.",
    description:
      "Un punto di riferimento per consigli pratici, orari utili, servizi attivi e orientamento rapido tra Lampedusa e Linosa. Ideale per chi vuole informazioni chiare in pochi minuti.",
    openingHours: "09:00 - 21:00",
    address: "Via Roma 12, Lampedusa",
    location: { latitude: 35.516020, longitude: 12.616820 },
    contact: createWhatsappContactDetails(
      "393490001119",
      "Ciao, vorrei ricevere informazioni utili per il mio soggiorno a Lampedusa e Linosa."
    ),
    links: createBusinessLinks("pelagie-help-desk"),
    media: {
      heroImage: "/placeholders/business-info-1.svg",
      gallery: [
        "/placeholders/business-info-1.svg",
        "/placeholders/business-info-2.svg",
        "/placeholders/business-info-3.svg",
        "/placeholders/business-info-4.svg",
        "/placeholders/business-info-5.svg"
      ]
    }
  },
  {
    id: "mobilita-pelagie",
    categoryId: "info",
    name: "Mobilita Pelagie",
    type: "Trasporti e servizi",
    shortDescription: "Orari, contatti e supporto per spostamenti, imbarchi e assistenza.",
    description:
      "Informazioni pratiche su collegamenti, transfer, servizi di supporto e numeri utili per muoversi in modo semplice tra porto, centro e punti di interesse delle isole.",
    openingHours: "08:30 - 20:30",
    address: "Area Porto, Lampedusa",
    location: { latitude: 35.517460, longitude: 12.608120 },
    contact: createWhatsappContactDetails(
      "393490001120",
      "Ciao, vorrei informazioni su trasporti e servizi utili alle Pelagie."
    ),
    links: createBusinessLinks("mobilita-pelagie"),
    media: {
      heroImage: "/placeholders/business-info-6.svg",
      gallery: [
        "/placeholders/business-info-6.svg",
        "/placeholders/business-info-2.svg",
        "/placeholders/business-info-3.svg",
        "/placeholders/business-info-4.svg",
        "/placeholders/business-info-5.svg"
      ]
    }
  }
];