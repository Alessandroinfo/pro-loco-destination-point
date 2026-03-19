export type CategoryId = "experiences" | "dining" | "hospitality" | "renting" | "shopping" | "info";

export type Category = {
  id: CategoryId;
  name: string;
  shortLabel: string;
  tagline: string;
  color: string;
  image: string;
};

export type BusinessActionTotemBehavior = "link" | "qr";

type BusinessActionBase = {
  label?: string;
  totemBehavior?: BusinessActionTotemBehavior;
};

export type BookWhatsappAction = BusinessActionBase & {
  kind: "book-whatsapp";
  phoneNumber: string;
  message: string;
};

export type BookExternalAction = BusinessActionBase & {
  kind: "book-external";
  url: string;
};

export type DirectionsGoogleMapsAction = BusinessActionBase & {
  kind: "directions-google-maps";
  latitude: number;
  longitude: number;
};

export type BusinessAction = BookWhatsappAction | BookExternalAction | DirectionsGoogleMapsAction;

export type Business = {
  id: string;
  categoryId: CategoryId;
  name: string;
  type: string;
  shortDescription: string;
  description: string;
  hours: string;
  address: string;
  primaryAction: BusinessAction;
  heroImage: string;
  gallery: string[];
};
