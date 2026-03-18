import type { PointOfInterest } from "@/features/map/map.types";

export const pointOfInterestLegend = {
  Spiagge: "#56C1D9",
  Natura: "#5EA970",
  Porto: "#1A3F73",
  Monumenti: "#C89A3D",
  Centro: "#945B9B"
} as const;

export const pointsOfInterest: PointOfInterest[] = [
  {
    id: "conigli",
    name: "Spiaggia dei Conigli",
    category: "Spiagge",
    description: "La baia simbolo dell'isola, celebre per sabbia chiara e mare trasparente.",
    x: 29,
    y: 58,
    island: "Lampedusa"
  },
  {
    id: "tabaccara",
    name: "Cala Tabaccara",
    category: "Spiagge",
    description: "Acqua turchese e fondali chiari raggiungibili dal mare.",
    x: 35,
    y: 52,
    island: "Lampedusa"
  },
  {
    id: "porto-nuovo",
    name: "Porto Nuovo",
    category: "Porto",
    description: "Cuore dei collegamenti marittimi e punto di partenza per molte escursioni.",
    x: 55,
    y: 51,
    island: "Lampedusa"
  },
  {
    id: "centro-storico",
    name: "Centro di Lampedusa",
    category: "Centro",
    description: "La zona piu vivace per passeggio, shopping e vita serale.",
    x: 58,
    y: 45,
    island: "Lampedusa"
  },
  {
    id: "capo-grecale",
    name: "Capo Grecale",
    category: "Natura",
    description: "Scorci rocciosi e orizzonti aperti verso il Mediterraneo.",
    x: 69,
    y: 36,
    island: "Lampedusa"
  },
  {
    id: "porta-europa",
    name: "Porta d'Europa",
    category: "Monumenti",
    description: "Installazione iconica che guarda il mare e accoglie chi arriva.",
    x: 63,
    y: 56,
    island: "Lampedusa"
  },
  {
    id: "linosa-centro",
    name: "Centro di Linosa",
    category: "Centro",
    description: "Case colorate e atmosfera raccolta nel cuore dell'isola vulcanica.",
    x: 84,
    y: 63,
    island: "Linosa"
  },
  {
    id: "faraglioni-linosa",
    name: "Costa vulcanica di Linosa",
    category: "Natura",
    description: "Una linea di costa scura e affascinante, segnata dall'origine vulcanica.",
    x: 89,
    y: 71,
    island: "Linosa"
  }
];
