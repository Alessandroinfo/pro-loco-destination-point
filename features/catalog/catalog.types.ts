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
export type BusinessActionSlot = "booking" | "directions" | "contact";

type BusinessActionBase = {
  label?: string;
  totemBehavior?: BusinessActionTotemBehavior;
};

export type WhatsappAction = BusinessActionBase & {
  kind: "whatsapp";
  phoneNumber: string;
  message: string;
};

export type ExternalLinkAction = BusinessActionBase & {
  kind: "external-link";
  url: string;
};

export type DirectionsGoogleMapsAction = BusinessActionBase & {
  kind: "directions-google-maps";
  latitude: number;
  longitude: number;
};

export type BusinessAction = WhatsappAction | ExternalLinkAction | DirectionsGoogleMapsAction;

export type BusinessActions = {
  booking?: BusinessAction;
  directions?: DirectionsGoogleMapsAction;
  contact?: BusinessAction;
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
  actions: BusinessActions;
  heroImage: string;
  gallery: string[];
};
