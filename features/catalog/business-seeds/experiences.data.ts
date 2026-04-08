import type { BusinessSeed } from "@/features/catalog/catalog.types";

import { createBusinessLinks, createWhatsappContactDetails } from "./factories";

export const experienceBusinessSeeds: BusinessSeed[] = [
  {
    id: "mare-vivo-diving",
    categoryId: "experiences",
    name: "Mare Vivo Diving",
    type: "Diving & snorkeling",
    shortDescription: "Escursioni in barca verso cale, grotte e fondali cristallini.",
    description:
      "Un'esperienza guidata tra immersioni, snorkeling e racconti del mare di Lampedusa. Perfetto per chi vuole vivere l'isola dal suo punto di vista piu iconico: l'acqua.",
    openingHours: "08:30 - 19:00",
    address: "Molo Favaloro, Lampedusa",
    location: { latitude: 35.515420, longitude: 12.600210 },
    contact: createWhatsappContactDetails(
      "393490001112",
      "Ciao, vorrei informazioni sulle vostre esperienze mare a Lampedusa."
    ),
    links: createBusinessLinks("mare-vivo-diving"),
    media: {
      heroImage: "/placeholders/business-experience-1.svg",
      gallery: [
        "/placeholders/business-experience-1.svg",
        "/placeholders/business-experience-2.svg",
        "/placeholders/business-experience-3.svg",
        "/placeholders/business-experience-4.svg",
        "/placeholders/business-experience-5.svg"
      ]
    }
  },
  {
    id: "vento-di-scirocco",
    categoryId: "experiences",
    name: "Vento di Scirocco",
    type: "Tour costieri",
    shortDescription: "Giri dell'isola al tramonto con soste bagno e aperitivo.",
    description:
      "Navigazione costiera dal taglio elegante e rilassato, con equipaggio locale e soste nelle baie piu suggestive. Ideale per chi cerca un pomeriggio esclusivo sul mare.",
    openingHours: "10:00 - 22:00",
    address: "Banchina Vecchia, Lampedusa",
    location: { latitude: 35.518040, longitude: 12.605430 },
    contact: createWhatsappContactDetails("393490001112", "Ciao, vorrei prenotare un tour costiero al tramonto."),
    links: createBusinessLinks("vento-di-scirocco"),
    media: {
      heroImage: "/placeholders/business-experience-6.svg",
      gallery: [
        "/placeholders/business-experience-6.svg",
        "/placeholders/business-experience-2.svg",
        "/placeholders/business-experience-3.svg",
        "/placeholders/business-experience-4.svg",
        "/placeholders/business-experience-5.svg"
      ]
    }
  }
];