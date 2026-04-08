import { pointOfInterestLegend, pointsOfInterest } from "@/features/map/map.data";
import type { PointOfInterest } from "@/features/map/map.types";
import type { Locale } from "@/lib/i18n/config";

type LegendItem = {
  color: string;
  key: PointOfInterest["category"];
  label: string;
};

const localizedCategoryLabels: Record<Locale, Record<PointOfInterest["category"], string>> = {
  it: {
    "Spiagge e Cale": "Spiagge e Cale",
    "Luoghi di interesse": "Luoghi di interesse"
  },
  en: {
    "Spiagge e Cale": "Beaches & Coves",
    "Luoghi di interesse": "Landmarks"
  }
};

const localizedDescriptionByValue: Record<Locale, Record<string, string>> = {
  it: {},
  en: {
    "Punto costiero di Lampedusa.": "Coastal spot in Lampedusa.",
    "Punto costiero in fase di posizionamento.": "Coastal spot currently being positioned.",
    "Luogo di interesse di Lampedusa.": "Landmark in Lampedusa.",
    "Cala Maluk": "Cala Maluk",
    "Grotta Respiro": "Breath Cave",
    "Scala colorata": "Colourful Stairway",
    "Villa di Domenico Modugno": "Villa of Domenico Modugno",
    "Isola di Lampione": "Lampione Islet",
    "Linosa": "Linosa",
    "Pozzolana di Ponente": "Pozzolana di Ponente",
    "Baia del Conte": "Baia del Conte",
    "Monte Vulcano": "Monte Vulcano",
    "Piscina Naturale": "Natural Pool"
  }
};

const localizedNamesById: Record<Locale, Record<string, string>> = {
  it: {},
  en: {
    "isola-lampione": "Lampione Islet",
    "piscina-naturale": "Natural Pool"
  }
};

export function getLocalizedPointOfInterestLegend(locale: Locale): LegendItem[] {
  return (Object.entries(pointOfInterestLegend) as Array<[PointOfInterest["category"], string]>).map(([key, color]) => ({
    color,
    key,
    label: localizedCategoryLabels[locale][key]
  }));
}

export function getLocalizedPointsOfInterest(locale: Locale): PointOfInterest[] {
  return pointsOfInterest.map((point) => ({
    ...point,
    description: localizedDescriptionByValue[locale][point.description] ?? point.description,
    name: localizedNamesById[locale][point.id] ?? point.name
  }));
}
