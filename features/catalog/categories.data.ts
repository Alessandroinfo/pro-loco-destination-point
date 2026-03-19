import type { Category } from "@/features/catalog/catalog.types";

export const categories: Category[] = [
  {
    id: "experiences",
    name: "Esperienze",
    shortLabel: "Tour in barca, diving, escursioni",
    tagline: "Scopri il lato piu emozionante dell'isola",
    color: "#2E8AA5",
    image: "/placeholders/category-experiences.svg"
  },
  {
    id: "dining",
    name: "Ristorazione",
    shortLabel: "Ristoranti, Pizzerie, Trattorie",
    tagline: "Ristoranti, bistrot e sapori del porto",
    color: "#C89A3D",
    image: "/placeholders/category-dining.svg"
  },
  {
    id: "hospitality",
    name: "Ospitalità",
    shortLabel: "Hotel, B&B, Case vacanza",
    tagline: "Accoglienza raffinata tra mare e pietra bianca",
    color: "#C89A3D",
    image: "/placeholders/category-hospitality.svg"
  },
  {
    id: "renting",
    name: "Trasporti",
    shortLabel: "Barche, Scooter, Auto, Bici",
    tagline: "Muoviti con liberta tra costa e centro",
    color: "#4E9C63",
    image: "/placeholders/category-renting.svg"
  },
  {
    id: "shopping",
    name: "Shopping",
    shortLabel: "Souvenir, Boutique, Artigianato, Abbigliamento",
    tagline: "Indirizzi selezionati tra stile isolano, idee regalo e piccole botteghe da scoprire",
    color: "#C96F53",
    image: "/placeholders/category-shopping.svg"
  },
  {
    id: "info",
    name: "Info utili",
    shortLabel: "Trasporti, assistenza, servizi",
    tagline: "Contatti e informazioni pratiche per vivere al meglio le Pelagie",
    color: "#16365D",
    image: "/placeholders/category-info.svg"
  }
];
