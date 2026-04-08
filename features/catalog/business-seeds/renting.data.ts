import type { BusinessSeed } from "@/features/catalog/catalog.types";

import { createBusinessLinks, createWhatsappContactDetails } from "./factories";

export const rentingBusinessSeeds: BusinessSeed[] = [
  {
    id: "island-rent-premium",
    categoryId: "renting",
    name: "Island Rent Premium",
    type: "Scooter & city mobility",
    shortDescription: "Scooter e city car per muoversi in autonomia sull'isola.",
    description:
      "Flotta aggiornata, assistenza rapida e consegna flessibile nei punti piu frequentati. Una soluzione pensata per un turismo dinamico ma senza stress.",
    openingHours: "08:00 - 21:00",
    address: "Via Vittorio Emanuele 33, Lampedusa",
    location: { latitude: 35.515670, longitude: 12.616010 },
    contact: createWhatsappContactDetails("393490001117", "Ciao, vorrei noleggiare uno scooter a Lampedusa."),
    links: createBusinessLinks("island-rent-premium"),
    media: {
      heroImage: "/placeholders/business-renting-1.svg",
      gallery: [
        "/placeholders/business-renting-1.svg",
        "/placeholders/business-renting-2.svg",
        "/placeholders/business-renting-3.svg",
        "/placeholders/business-renting-4.svg",
        "/placeholders/business-renting-5.svg"
      ]
    }
  },
  {
    id: "vento-lounge-charter",
    categoryId: "renting",
    name: "Vento Lounge Charter",
    type: "Boat charter",
    shortDescription: "Noleggio barche per giornate private tra spiagge e cale.",
    description:
      "Barche comode e curate per chi vuole esplorare il profilo di Lampedusa in piena autonomia o con skipper. Un servizio dedicato a giornate di mare dal ritmo libero.",
    openingHours: "09:00 - 18:30",
    address: "Porto Nuovo, Lampedusa",
    location: { latitude: 35.517190, longitude: 12.607510 },
    contact: createWhatsappContactDetails("393490001118", "Ciao, vorrei informazioni per il noleggio barca."),
    links: createBusinessLinks("vento-lounge-charter"),
    media: {
      heroImage: "/placeholders/business-renting-6.svg",
      gallery: [
        "/placeholders/business-renting-6.svg",
        "/placeholders/business-renting-2.svg",
        "/placeholders/business-renting-3.svg",
        "/placeholders/business-renting-4.svg",
        "/placeholders/business-renting-5.svg"
      ]
    }
  }
];