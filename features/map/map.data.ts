import type { PointOfInterest } from "@/features/map/map.types";

const defaultPointOfInterestImage = "/placeholders/category-map.svg";

export const pointOfInterestLegend = {
  Spiagge: "#56C1D9",
  Cale: "#1A3F73",
  "Punti di interesse": "#C89A3D"
} as const;

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: "conigli",
    name: "Spiaggia dei Conigli",
    category: "Spiagge",
    description: "La baia simbolo dell'isola, celebre per sabbia chiara e mare trasparente.",
    imageSrc: defaultPointOfInterestImage,
    mapX: 3350,
    mapY: 6480,
    island: "Lampedusa"
  },
  {
    id: "tabaccara",
    name: "Cala Tabaccara",
    category: "Cale",
    description: "Acqua turchese e fondali chiari raggiungibili dal mare.",
    imageSrc: defaultPointOfInterestImage,
    mapX: 4540,
    mapY: 5940,
    island: "Lampedusa"
  },
  {
    id: "porto-nuovo",
    name: "Porto Nuovo",
    category: "Punti di interesse",
    description: "Cuore dei collegamenti marittimi e punto di partenza per molte escursioni.",
    imageSrc: defaultPointOfInterestImage,
    mapX: 7720,
    mapY: 5760,
    island: "Lampedusa"
  },
  {
    id: "centro-storico",
    name: "Centro di Lampedusa",
    category: "Punti di interesse",
    description: "La zona piu vivace per passeggio, shopping e vita serale.",
    imageSrc: defaultPointOfInterestImage,
    mapX: 8180,
    mapY: 4850,
    island: "Lampedusa"
  },
  {
    id: "capo-grecale",
    name: "Capo Grecale",
    category: "Punti di interesse",
    description: "Scorci rocciosi e orizzonti aperti verso il Mediterraneo.",
    imageSrc: defaultPointOfInterestImage,
    mapX: 9640,
    mapY: 4560,
    island: "Lampedusa"
  },
  {
    id: "porta-europa",
    name: "Porta d'Europa",
    category: "Punti di interesse",
    description: "Installazione iconica che guarda il mare e accoglie chi arriva.",
    imageSrc: defaultPointOfInterestImage,
    mapX: 8920,
    mapY: 6410,
    island: "Lampedusa"
  },
  {
    id: "linosa-centro",
    name: "Centro di Linosa",
    category: "Punti di interesse",
    description: "Case colorate e atmosfera raccolta nel cuore dell'isola vulcanica.",
    imageSrc: defaultPointOfInterestImage,
    mapX: 12790,
    mapY: 1210,
    island: "Linosa"
  },
  {
    id: "faraglioni-linosa",
    name: "Costa vulcanica di Linosa",
    category: "Punti di interesse",
    description: "Una linea di costa scura e affascinante, segnata dall'origine vulcanica.",
    imageSrc: defaultPointOfInterestImage,
    mapX: 13620,
    mapY: 2480,
    island: "Linosa"
  }
];
