import type { Business } from "@/features/catalog/catalog.types";

type ShoppingBusinessSeed = Omit<
  Business,
  "categoryId" | "gallery" | "heroImage"
> & {
  heroIndex: number;
};

function createShoppingGallery(heroIndex: number) {
  const galleryIndexes = [heroIndex, 1, 2, 3, 4, 5];
  const deduplicatedIndexes = Array.from(new Set(galleryIndexes)).slice(0, 5);

  return deduplicatedIndexes.map((index) => `/placeholders/business-shopping-${index}.svg`);
}

const shoppingBusinessSeeds: ShoppingBusinessSeed[] = [
  {
    id: "isola-di-lino",
    name: "Isola di Lino",
    type: "Boutique resortwear",
    shortDescription: "Caftani, lino e capi leggeri ispirati ai colori del Mediterraneo.",
    description:
      "Una boutique dedicata a resortwear, lino e tessuti freschi pensati per vivere l'isola con uno stile rilassato ma curato. Collezioni selezionate per chi cerca eleganza semplice e vacanza senza eccessi.",
    hours: "10:00 - 13:00 • 18:00 - 23:00",
    address: "Via Roma 5, Lampedusa",
    whatsappNumber: "393490001121",
    whatsappMessage: "Ciao, vorrei informazioni sui capi resortwear di Isola di Lino.",
    heroIndex: 1
  },
  {
    id: "bottega-del-porto",
    name: "Bottega del Porto",
    type: "Souvenir & gift shop",
    shortDescription: "Oggetti da regalo, calamite, cartoline e idee da portare a casa.",
    description:
      "Una bottega luminosa e ordinata con una selezione di souvenir, piccoli regali e oggetti da viaggio ispirati a Lampedusa. Perfetta per chi vuole portare con sé un ricordo immediato dell'isola.",
    hours: "09:30 - 13:00 • 17:30 - 23:30",
    address: "Lungomare Luigi Rizzo 14, Lampedusa",
    whatsappNumber: "393490001122",
    whatsappMessage: "Ciao, vorrei informazioni sui souvenir disponibili alla Bottega del Porto.",
    heroIndex: 2
  },
  {
    id: "coralli-boutique",
    name: "Coralli Boutique",
    type: "Moda mare",
    shortDescription: "Beachwear, costumi e accessori in una selezione raffinata.",
    description:
      "Uno spazio dedicato alla moda mare con costumi, copricostume e accessori curati nei dettagli. Ideale per chi vuole completare il proprio guardaroba da vacanza con linee leggere e palette mediterranee.",
    hours: "10:00 - 13:00 • 18:30 - 23:00",
    address: "Via Vittorio Emanuele 21, Lampedusa",
    whatsappNumber: "393490001123",
    whatsappMessage: "Ciao, vorrei ricevere informazioni sulla collezione moda mare di Coralli Boutique.",
    heroIndex: 3
  },
  {
    id: "pelagie-concept-store",
    name: "Pelagie Concept Store",
    type: "Lifestyle store",
    shortDescription: "Oggetti, accessori e piccole edizioni dedicate allo stile dell'isola.",
    description:
      "Un concept store che unisce lifestyle, accessori e piccoli pezzi di design con una sensibilita contemporanea. La selezione mette insieme gusto locale e un'immagine piu editoriale del Mediterraneo.",
    hours: "10:30 - 13:00 • 18:00 - 22:30",
    address: "Via Maccaferri 3, Lampedusa",
    whatsappNumber: "393490001124",
    whatsappMessage: "Ciao, vorrei informazioni sugli articoli disponibili da Pelagie Concept Store.",
    heroIndex: 4
  },
  {
    id: "casa-grecale",
    name: "Casa Grecale",
    type: "Artigianato tessile",
    shortDescription: "Tessili, ricami e oggetti per la casa ispirati all'isola.",
    description:
      "Una selezione di tessili, tovaglie, ricami e dettagli per la casa che raccontano il lato piu delicato e artigianale dell'isola. Perfetta per chi cerca un ricordo utile e ben fatto.",
    hours: "09:30 - 13:00 • 18:00 - 22:00",
    address: "Via Grecale 11, Lampedusa",
    whatsappNumber: "393490001125",
    whatsappMessage: "Ciao, vorrei informazioni sugli articoli tessili di Casa Grecale.",
    heroIndex: 5
  },
  {
    id: "sette-venti",
    name: "Sette Venti",
    type: "Abbigliamento uomo e donna",
    shortDescription: "Capi casual, linee estive e accessori per passeggio e vacanza.",
    description:
      "Un negozio di abbigliamento con linee estive, capi facili da indossare e proposte per uomo e donna. Ideale per chi vuole acquistare qualcosa di pratico ma ben rifinito durante il soggiorno.",
    hours: "10:00 - 13:00 • 18:00 - 23:00",
    address: "Via Roma 32, Lampedusa",
    whatsappNumber: "393490001126",
    whatsappMessage: "Ciao, vorrei informazioni sui capi disponibili da Sette Venti.",
    heroIndex: 6
  },
  {
    id: "cala-bianca-souvenir",
    name: "Cala Bianca Souvenir",
    type: "Souvenir shop",
    shortDescription: "Ricordi di viaggio, piccole stampe e idee regalo immediate.",
    description:
      "Uno spazio dedicato a souvenir, piccole stampe, oggetti da viaggio e idee regalo da acquistare con rapidita. Una tappa comoda per chi cerca un ricordo semplice ma curato.",
    hours: "09:30 - 13:00 • 18:30 - 23:30",
    address: "Via Roma 48, Lampedusa",
    whatsappNumber: "393490001127",
    whatsappMessage: "Ciao, vorrei informazioni su Cala Bianca Souvenir.",
    heroIndex: 1
  },
  {
    id: "lab-mediterraneo",
    name: "Lab Mediterraneo",
    type: "Ceramiche e handmade",
    shortDescription: "Ceramiche decorative, oggetti fatti a mano e piccole serie locali.",
    description:
      "Un laboratorio-bottega con ceramiche, oggetti handmade e piccole serie ispirate ai colori marini. Pensato per chi ama un acquisto piu artigianale e meno turistico.",
    hours: "10:30 - 13:00 • 18:00 - 22:30",
    address: "Via Cameroni 8, Lampedusa",
    whatsappNumber: "393490001128",
    whatsappMessage: "Ciao, vorrei informazioni sulle ceramiche di Lab Mediterraneo.",
    heroIndex: 2
  },
  {
    id: "sabbia-chiara-kids",
    name: "Sabbia Chiara Kids",
    type: "Beachwear bambini",
    shortDescription: "Abbigliamento mare e accessori pensati per i piu piccoli.",
    description:
      "Un punto vendita dedicato ai piu piccoli con beachwear, cappelli, sandali e accessori utili per il mare. Colori chiari, materiali leggeri e una selezione pratica per famiglie in vacanza.",
    hours: "10:00 - 13:00 • 18:00 - 22:00",
    address: "Via Cala Croce 6, Lampedusa",
    whatsappNumber: "393490001129",
    whatsappMessage: "Ciao, vorrei informazioni sui prodotti per bambini di Sabbia Chiara Kids.",
    heroIndex: 3
  },
  {
    id: "via-roma-boutique",
    name: "Via Roma Boutique",
    type: "Fashion boutique",
    shortDescription: "Abiti, completi leggeri e accessori per il centro e la sera.",
    description:
      "Una boutique dal taglio piu cittadino con proposte moda per passeggio, aperitivo e serata. Una selezione ordinata di capi leggeri e accessori facili da indossare anche in vacanza.",
    hours: "10:30 - 13:00 • 18:30 - 23:00",
    address: "Via Roma 61, Lampedusa",
    whatsappNumber: "393490001130",
    whatsappMessage: "Ciao, vorrei informazioni sui capi disponibili da Via Roma Boutique.",
    heroIndex: 4
  },
  {
    id: "blu-cobalto-atelier",
    name: "Blu Cobalto Atelier",
    type: "Gioielli artigianali",
    shortDescription: "Piccoli gioielli, dettagli smaltati e lavorazioni ispirate al mare.",
    description:
      "Atelier dedicato a gioielli, piccoli accessori e dettagli smaltati dalle tonalita marine. Perfetto per chi cerca un acquisto piu personale e un ricordo meno convenzionale.",
    hours: "11:00 - 13:00 • 18:30 - 22:30",
    address: "Via Grecale 29, Lampedusa",
    whatsappNumber: "393490001131",
    whatsappMessage: "Ciao, vorrei informazioni sui gioielli di Blu Cobalto Atelier.",
    heroIndex: 5
  },
  {
    id: "porto-piccolo-market",
    name: "Porto Piccolo Market",
    type: "Accessori & beach essentials",
    shortDescription: "Teli, borse mare, accessori utili e piccoli acquisti dell'ultimo minuto.",
    description:
      "Un punto vendita pratico per accessori mare, teli, borse, cappelli e piccoli articoli da usare subito. Pensato per chi vuole completare il necessario senza perdere tempo.",
    hours: "09:00 - 13:00 • 17:30 - 23:30",
    address: "Area Porto, Lampedusa",
    whatsappNumber: "393490001132",
    whatsappMessage: "Ciao, vorrei informazioni sugli accessori disponibili da Porto Piccolo Market.",
    heroIndex: 6
  },
  {
    id: "pozzolana-store",
    name: "Pozzolana Store",
    type: "Home decor",
    shortDescription: "Oggetti decorativi, profumi ambiente e dettagli per la casa.",
    description:
      "Uno store dedicato a oggetti decorativi, fragranze e dettagli per la casa con un gusto morbido e mediterraneo. Una scelta ideale per chi cerca un acquisto piu raffinato.",
    hours: "10:00 - 13:00 • 18:00 - 22:30",
    address: "Via Pozzo Monaco 4, Lampedusa",
    whatsappNumber: "393490001133",
    whatsappMessage: "Ciao, vorrei informazioni sugli articoli home decor di Pozzolana Store.",
    heroIndex: 1
  },
  {
    id: "linosa-made",
    name: "Linosa Made",
    type: "Artigianato locale",
    shortDescription: "Oggetti, stampe e lavorazioni ispirate alla natura di Linosa.",
    description:
      "Una selezione di oggetti artigianali, stampe e piccole produzioni dedicate all'identita di Linosa. Ideale per chi vuole un ricordo piu autentico e legato alle Pelagie.",
    hours: "10:30 - 13:00 • 18:00 - 21:30",
    address: "Via Pozzolana di Ponente 9, Linosa",
    whatsappNumber: "393490001134",
    whatsappMessage: "Ciao, vorrei informazioni sui prodotti di Linosa Made.",
    heroIndex: 2
  },
  {
    id: "isola-sunwear",
    name: "Isola Sunwear",
    type: "Occhiali e cappelli",
    shortDescription: "Accessori sole e beachwear selezionati per il clima delle isole.",
    description:
      "Occhiali, cappelli, borse leggere e accessori da sole raccolti in uno spazio semplice e ben assortito. Una fermata utile per chi cerca articoli funzionali ma con un buon taglio estetico.",
    hours: "10:00 - 13:00 • 18:00 - 22:30",
    address: "Via Roma 74, Lampedusa",
    whatsappNumber: "393490001135",
    whatsappMessage: "Ciao, vorrei informazioni sugli accessori di Isola Sunwear.",
    heroIndex: 3
  },
  {
    id: "filo-di-sale",
    name: "Filo di Sale",
    type: "Borse e accessori",
    shortDescription: "Borse leggere, pouch e dettagli tessili per viaggio e spiaggia.",
    description:
      "Una piccola boutique di borse, pouch e accessori tessili pensati per il viaggio e la spiaggia. Materiali leggeri, colori sabbia e un'identita visiva pulita e curata.",
    hours: "10:30 - 13:00 • 18:30 - 22:30",
    address: "Via Cameroni 17, Lampedusa",
    whatsappNumber: "393490001136",
    whatsappMessage: "Ciao, vorrei informazioni sugli accessori disponibili da Filo di Sale.",
    heroIndex: 4
  },
  {
    id: "marea-boutique",
    name: "Marea Boutique",
    type: "Abbigliamento donna",
    shortDescription: "Linee femminili, tessuti estivi e accessori per la sera.",
    description:
      "Boutique donna con una selezione estiva fatta di abiti fluidi, capi leggeri e accessori facili da abbinare. Una proposta pensata per la vacanza ma con un tocco piu ricercato.",
    hours: "10:00 - 13:00 • 18:30 - 23:00",
    address: "Via Roma 83, Lampedusa",
    whatsappNumber: "393490001137",
    whatsappMessage: "Ciao, vorrei informazioni sulla collezione di Marea Boutique.",
    heroIndex: 5
  },
  {
    id: "tramontana-shop",
    name: "Tramontana Shop",
    type: "T-shirt e souvenir",
    shortDescription: "T-shirt grafiche, felpe leggere e souvenir dal taglio contemporaneo.",
    description:
      "Uno shop dedicato a T-shirt, felpe leggere e souvenir grafici ispirati alle isole. Ideale per chi vuole un ricordo giovane, semplice e subito indossabile.",
    hours: "09:30 - 13:00 • 18:00 - 23:00",
    address: "Via Vittorio Emanuele 9, Lampedusa",
    whatsappNumber: "393490001138",
    whatsappMessage: "Ciao, vorrei informazioni sulle t-shirt disponibili da Tramontana Shop.",
    heroIndex: 6
  },
  {
    id: "nasse-e-trame",
    name: "Nasse & Trame",
    type: "Tessuti e ricami",
    shortDescription: "Ricami, dettagli tessili e manufatti ispirati alla tradizione locale.",
    description:
      "Uno spazio raccolto dedicato a tessuti, ricami e manufatti che reinterpretano la tradizione isolana con gusto piu attuale. Una tappa ideale per chi ama la materia e il dettaglio.",
    hours: "10:30 - 13:00 • 18:00 - 22:00",
    address: "Via Grecale 42, Lampedusa",
    whatsappNumber: "393490001139",
    whatsappMessage: "Ciao, vorrei informazioni sugli articoli di Nasse & Trame.",
    heroIndex: 1
  },
  {
    id: "pelagos-wear",
    name: "Pelagos Wear",
    type: "Resort shop",
    shortDescription: "Abbigliamento vacanza, accessori e capi easywear per l'isola.",
    description:
      "Resort shop con una selezione di capi easywear, accessori e abbigliamento leggero adatto alle giornate lunghe e luminose di Lampedusa. Uno spazio ordinato e facile da leggere.",
    hours: "10:00 - 13:00 • 18:00 - 22:30",
    address: "Via Roma 91, Lampedusa",
    whatsappNumber: "393490001140",
    whatsappMessage: "Ciao, vorrei informazioni sui prodotti disponibili da Pelagos Wear.",
    heroIndex: 2
  }
];

const shoppingBusinesses: Business[] = shoppingBusinessSeeds.map((seed) => ({
  ...seed,
  categoryId: "shopping",
  heroImage: `/placeholders/business-shopping-${seed.heroIndex}.svg`,
  gallery: createShoppingGallery(seed.heroIndex)
}));

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
  },
  ...shoppingBusinesses
];
