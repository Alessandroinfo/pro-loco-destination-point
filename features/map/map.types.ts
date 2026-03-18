export type PointOfInterestCategory = "Spiagge" | "Natura" | "Porto" | "Monumenti" | "Centro";

export type PointOfInterest = {
  id: string;
  name: string;
  category: PointOfInterestCategory;
  description: string;
  x: number;
  y: number;
  island: "Lampedusa" | "Linosa";
};
