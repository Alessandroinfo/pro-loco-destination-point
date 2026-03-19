export type PointOfInterestCategory = "Spiagge e Cale" | "Luoghi di interesse";

export type PointOfInterest = {
  id: string;
  name: string;
  category: PointOfInterestCategory;
  description: string;
  imageSrc: string;
  latitude: number | null;
  longitude: number | null;
  mapX: number;
  mapY: number;
  island: "Lampedusa" | "Linosa" | "Lampione";
};
