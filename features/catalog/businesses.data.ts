import type { Business } from "@/features/catalog/catalog.types";

export const businesses: Business[] = [
  {
    id: "mare-vivo-diving",
    categoryId: "experiences",
    name: "Mare Vivo Diving",
    type: "Diving & snorkeling",
    shortDescription: "Escursioni in barca verso cale, grotte e fondali cristallini.",
    description:
      "Un'esperienza guidata tra immersioni, snorkeling e racconti del mare di Lampedusa. Perfetto per chi vuole vivere l'isola dal suo punto di vista piu iconico: l'acqua.",
    hours: "08:30 - 19:00",
    address: "Molo Favaloro, Lampedusa",
    whatsappNumber: "393490001111",
    whatsappMessage: "Ciao, vorrei informazioni sulle vostre esperienze mare a Lampedusa.",
    heroImage: "/placeholders/business-experience-1.svg",
    gallery: [
      "/placeholders/business-experience-1.svg",
      "/placeholders/business-experience-2.svg",
      "/placeholders/business-experience-3.svg",
      "/placeholders/business-experience-4.svg",
      "/placeholders/business-experience-5.svg"
    ]
  },
  {
    id: "vento-di-scirocco",
    categoryId: "experiences",
    name: "Vento di Scirocco",
    type: "Tour costieri",
    shortDescription: "Giri dell'isola al tramonto con soste bagno e aperitivo.",
    description:
      "Navigazione costiera dal taglio elegante e rilassato, con equipaggio locale e soste nelle baie piu suggestive. Ideale per chi cerca un pomeriggio esclusivo sul mare.",
    hours: "10:00 - 22:00",
    address: "Banchina Vecchia, Lampedusa",
    whatsappNumber: "393490001112",
    whatsappMessage: "Ciao, vorrei prenotare un tour costiero al tramonto.",
    heroImage: "/placeholders/business-experience-6.svg",
    gallery: [
      "/placeholders/business-experience-6.svg",
      "/placeholders/business-experience-2.svg",
      "/placeholders/business-experience-3.svg",
      "/placeholders/business-experience-4.svg",
      "/placeholders/business-experience-5.svg"
    ]
  },
  {
    id: "porto-doro",
    categoryId: "dining",
    name: "Porto d'Oro",
    type: "Ristorante di mare",
    shortDescription: "Cucina lampedusana contemporanea con vista porto.",
    description:
      "Menu ispirato al pescato del giorno, ambienti luminosi e servizio curato. Una tavola pensata per raccontare la tradizione mediterranea con una sensibilita piu attuale.",
    hours: "12:30 - 15:00 • 19:00 - 23:30",
    address: "Via Roma 18, Lampedusa",
    whatsappNumber: "393490001113",
    whatsappMessage: "Ciao, vorrei prenotare un tavolo al Porto d'Oro.",
    heroImage: "/placeholders/business-dining-1.svg",
    gallery: [
      "/placeholders/business-dining-1.svg",
      "/placeholders/business-dining-2.svg",
      "/placeholders/business-dining-3.svg",
      "/placeholders/business-dining-4.svg",
      "/placeholders/business-dining-5.svg"
    ]
  },
  {
    id: "cala-bianca-bistrot",
    categoryId: "dining",
    name: "Cala Bianca Bistrot",
    type: "Bistrot mediterraneo",
    shortDescription: "Piatti freschi, crudi di pesce e cocktail vista sera.",
    description:
      "Un bistrot raffinato per pause leggere durante il giorno e cene piu intime al calare del sole. Il menu unisce ingredienti locali, impiattamento essenziale e atmosfera rilassata.",
    hours: "11:30 - 00:00",
    address: "Lungomare Luigi Rizzo 7, Lampedusa",
    whatsappNumber: "393490001114",
    whatsappMessage: "Ciao, vorrei ricevere disponibilita per Cala Bianca Bistrot.",
    heroImage: "/placeholders/business-dining-6.svg",
    gallery: [
      "/placeholders/business-dining-6.svg",
      "/placeholders/business-dining-2.svg",
      "/placeholders/business-dining-3.svg",
      "/placeholders/business-dining-4.svg",
      "/placeholders/business-dining-5.svg"
    ]
  },
  {
    id: "suites-dei-coralli",
    categoryId: "hospitality",
    name: "Suites dei Coralli",
    type: "Boutique stay",
    shortDescription: "Camere luminose con terrazze private e servizi premium.",
    description:
      "Una struttura dal gusto contemporaneo, con materiali naturali, dettagli dorati e una forte connessione visiva con i colori del Mediterraneo. Pensata per un soggiorno rilassante e curato.",
    hours: "Check-in 14:00 • Check-out 10:30",
    address: "Via Grecale 25, Lampedusa",
    whatsappNumber: "393490001115",
    whatsappMessage: "Ciao, vorrei informazioni per un soggiorno alle Suites dei Coralli.",
    heroImage: "/placeholders/business-hospitality-1.svg",
    gallery: [
      "/placeholders/business-hospitality-1.svg",
      "/placeholders/business-hospitality-2.svg",
      "/placeholders/business-hospitality-3.svg",
      "/placeholders/business-hospitality-4.svg",
      "/placeholders/business-hospitality-5.svg"
    ]
  },
  {
    id: "linosa-casa-luce",
    categoryId: "hospitality",
    name: "Linosa Casa Luce",
    type: "Guest house",
    shortDescription: "Ospitalita intima e silenziosa per chi cerca autenticita.",
    description:
      "Una guest house ispirata alla semplicita elegante delle isole minori, con ambienti essenziali e una vista aperta sul blu. Ideale per chi desidera una pausa lenta e autentica.",
    hours: "Check-in 15:00 • Check-out 10:00",
    address: "Via Pozzolana di Ponente 4, Linosa",
    whatsappNumber: "393490001116",
    whatsappMessage: "Ciao, vorrei informazioni su Linosa Casa Luce.",
    heroImage: "/placeholders/business-hospitality-6.svg",
    gallery: [
      "/placeholders/business-hospitality-6.svg",
      "/placeholders/business-hospitality-2.svg",
      "/placeholders/business-hospitality-3.svg",
      "/placeholders/business-hospitality-4.svg",
      "/placeholders/business-hospitality-5.svg"
    ]
  },
  {
    id: "island-rent-premium",
    categoryId: "renting",
    name: "Island Rent Premium",
    type: "Scooter & city mobility",
    shortDescription: "Scooter e city car per muoversi in autonomia sull'isola.",
    description:
      "Flotta aggiornata, assistenza rapida e consegna flessibile nei punti piu frequentati. Una soluzione pensata per un turismo dinamico ma senza stress.",
    hours: "08:00 - 21:00",
    address: "Via Vittorio Emanuele 33, Lampedusa",
    whatsappNumber: "393490001117",
    whatsappMessage: "Ciao, vorrei noleggiare uno scooter a Lampedusa.",
    heroImage: "/placeholders/business-renting-1.svg",
    gallery: [
      "/placeholders/business-renting-1.svg",
      "/placeholders/business-renting-2.svg",
      "/placeholders/business-renting-3.svg",
      "/placeholders/business-renting-4.svg",
      "/placeholders/business-renting-5.svg"
    ]
  },
  {
    id: "vento-lounge-charter",
    categoryId: "renting",
    name: "Vento Lounge Charter",
    type: "Boat charter",
    shortDescription: "Noleggio barche per giornate private tra spiagge e cale.",
    description:
      "Barche comode e curate per chi vuole esplorare il profilo di Lampedusa in piena autonomia o con skipper. Un servizio dedicato a giornate di mare dal ritmo libero.",
    hours: "09:00 - 18:30",
    address: "Porto Nuovo, Lampedusa",
    whatsappNumber: "393490001118",
    whatsappMessage: "Ciao, vorrei informazioni per il noleggio barca.",
    heroImage: "/placeholders/business-renting-6.svg",
    gallery: [
      "/placeholders/business-renting-6.svg",
      "/placeholders/business-renting-2.svg",
      "/placeholders/business-renting-3.svg",
      "/placeholders/business-renting-4.svg",
      "/placeholders/business-renting-5.svg"
    ]
  },
  {
    id: "pelagie-help-desk",
    categoryId: "info",
    name: "Pelagie Help Desk",
    type: "Infopoint turistico",
    shortDescription: "Supporto per orientarsi tra spiagge, trasporti e servizi essenziali.",
    description:
      "Un punto di riferimento per consigli pratici, orari utili, servizi attivi e orientamento rapido tra Lampedusa e Linosa. Ideale per chi vuole informazioni chiare in pochi minuti.",
    hours: "09:00 - 21:00",
    address: "Via Roma 12, Lampedusa",
    whatsappNumber: "393490001119",
    whatsappMessage: "Ciao, vorrei ricevere informazioni utili per il mio soggiorno a Lampedusa e Linosa.",
    heroImage: "/placeholders/business-info-1.svg",
    gallery: [
      "/placeholders/business-info-1.svg",
      "/placeholders/business-info-2.svg",
      "/placeholders/business-info-3.svg",
      "/placeholders/business-info-4.svg",
      "/placeholders/business-info-5.svg"
    ]
  },
  {
    id: "mobilita-pelagie",
    categoryId: "info",
    name: "Mobilita Pelagie",
    type: "Trasporti e servizi",
    shortDescription: "Orari, contatti e supporto per spostamenti, imbarchi e assistenza.",
    description:
      "Informazioni pratiche su collegamenti, transfer, servizi di supporto e numeri utili per muoversi in modo semplice tra porto, centro e punti di interesse delle isole.",
    hours: "08:30 - 20:30",
    address: "Area Porto, Lampedusa",
    whatsappNumber: "393490001120",
    whatsappMessage: "Ciao, vorrei informazioni su trasporti e servizi utili alle Pelagie.",
    heroImage: "/placeholders/business-info-6.svg",
    gallery: [
      "/placeholders/business-info-6.svg",
      "/placeholders/business-info-2.svg",
      "/placeholders/business-info-3.svg",
      "/placeholders/business-info-4.svg",
      "/placeholders/business-info-5.svg"
    ]
  }
];
