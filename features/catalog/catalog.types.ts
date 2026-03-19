export type CategoryId = "experiences" | "dining" | "hospitality" | "renting" | "shopping" | "info";

export type Category = {
  id: CategoryId;
  name: string;
  shortLabel: string;
  tagline: string;
  color: string;
  image: string;
};

export type Business = {
  id: string;
  categoryId: CategoryId;
  name: string;
  type: string;
  shortDescription: string;
  description: string;
  hours: string;
  address: string;
  whatsappNumber: string;
  whatsappMessage: string;
  heroImage: string;
  gallery: string[];
};
