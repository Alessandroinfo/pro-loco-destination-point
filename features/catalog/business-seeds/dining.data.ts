import type { BusinessSeed } from "@/features/catalog/catalog.types";

import { createBusinessLinks, createWhatsappContactDetails } from "./factories";

export const diningBusinessSeeds: BusinessSeed[] = [
  {
    id: "porto-doro",
    categoryId: "dining",
    name: "Porto d'Oro",
    type: "Ristorante di mare",
    shortDescription: "Cucina lampedusana contemporanea con vista porto.",
    description:
      "Menu ispirato al pescato del giorno, ambienti luminosi e servizio curato. Una tavola pensata per raccontare la tradizione mediterranea con una sensibilita piu attuale.",
    openingHours: "12:30 - 15:00 • 19:00 - 23:30",
    address: "Via Roma 18, Lampedusa",
    location: { latitude: 35.516330, longitude: 12.611860 },
    contact: createWhatsappContactDetails("393490001113", "Ciao, vorrei prenotare un tavolo al Porto d'Oro."),
    links: createBusinessLinks("porto-doro"),
    media: {
      heroImage: "/placeholders/business-dining-1.svg",
      gallery: [
        "/placeholders/business-dining-1.svg",
        "/placeholders/business-dining-2.svg",
        "/placeholders/business-dining-3.svg",
        "/placeholders/business-dining-4.svg",
        "/placeholders/business-dining-5.svg"
      ]
    }
  },
  {
    id: "cala-bianca-bistrot",
    categoryId: "dining",
    name: "Cala Bianca Bistrot",
    type: "Bistrot mediterraneo",
    shortDescription: "Piatti freschi, crudi di pesce e cocktail vista sera.",
    description:
      "Un bistrot raffinato per pause leggere durante il giorno e cene piu intime al calare del sole. Il menu unisce ingredienti locali, impiattamento essenziale e atmosfera rilassata.",
    openingHours: "11:30 - 00:00",
    address: "Lungomare Luigi Rizzo 7, Lampedusa",
    location: { latitude: 35.515980, longitude: 12.610940 },
    contact: createWhatsappContactDetails(
      "393490001114",
      "Ciao, vorrei ricevere disponibilita per Cala Bianca Bistrot."
    ),
    links: createBusinessLinks("cala-bianca-bistrot"),
    media: {
      heroImage: "/placeholders/business-dining-6.svg",
      gallery: [
        "/placeholders/business-dining-6.svg",
        "/placeholders/business-dining-2.svg",
        "/placeholders/business-dining-3.svg",
        "/placeholders/business-dining-4.svg",
        "/placeholders/business-dining-5.svg"
      ]
    }
  }
];