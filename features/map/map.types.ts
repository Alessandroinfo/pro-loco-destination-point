export type PointOfInterestCategory = "Spiagge" | "Cale" | "Punti di interesse";

export type PointOfInterest = {
  id: string;
  name: string;
  category: PointOfInterestCategory;
  description: string;
  imageSrc: string;
  x: number;
  y: number;
  island: "Lampedusa" | "Linosa";
};
