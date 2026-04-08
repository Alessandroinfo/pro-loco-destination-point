import type { Category } from "@/features/catalog/catalog.types";
import { getCategoryPlaceholderImage } from "@/lib/asset-paths";

export const categories: Category[] = [
  {
    id: "experiences",
    name: "Esperienze",
    shortLabel: "Tour in barca, diving, escursioni",
    tagline: "Scopri il lato piu emozionante dell'isola",
    color: "#2E8AA5",
    image: getCategoryPlaceholderImage("experiences")
  },
  {
    id: "dining",
    name: "Ristorazione",
    shortLabel: "Ristoranti, Pizzerie, Trattorie",
    tagline: "Ristoranti, bistrot e sapori del porto",
    color: "#C89A3D",
    image: getCategoryPlaceholderImage("dining")
  },
  {
    id: "hospitality",
    name: "Ospitalità",
    shortLabel: "Hotel, B&B, Case vacanza",
    tagline: "Accoglienza raffinata tra mare e pietra bianca",
    color: "#C89A3D",
    image: getCategoryPlaceholderImage("hospitality")
  },
  {
    id: "renting",
    name: "Trasporti",
    shortLabel: "Barche, Scooter, Auto, Bici",
    tagline: "Muoviti con liberta tra costa e centro",
    color: "#4E9C63",
    image: getCategoryPlaceholderImage("renting")
  },
  {
    id: "shopping",
    name: "Shopping",
    shortLabel: "Souvenir, Boutique, Artigianato, Abbigliamento",
    tagline: "Indirizzi selezionati tra stile isolano, idee regalo e piccole botteghe da scoprire",
    color: "#C96F53",
    image: getCategoryPlaceholderImage("shopping")
  },
  {
    id: "info",
    name: "Info utili",
    shortLabel: "Trasporti, assistenza, servizi",
    tagline: "Contatti e informazioni pratiche per vivere al meglio le Pelagie",
    color: "#16365D",
    image: getCategoryPlaceholderImage("info")
  }
];
