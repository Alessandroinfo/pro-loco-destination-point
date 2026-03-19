import type {
  BookExternalAction,
  BookWhatsappAction,
  BusinessAction,
  BusinessActionTotemBehavior,
  DirectionsGoogleMapsAction
} from "@/features/catalog/catalog.types";

export type BusinessActionQrModalContent = {
  eyebrow: string;
  title: string;
  description: string;
  previewLabel?: string;
  previewValue?: string;
  actionHref?: string;
  actionHrefLabel?: string;
};

export function createWhatsappBookingAction({
  phoneNumber,
  message,
  label,
  totemBehavior
}: Omit<BookWhatsappAction, "kind">): BookWhatsappAction {
  return {
    kind: "book-whatsapp",
    label,
    message,
    phoneNumber,
    totemBehavior
  };
}

export function createExternalBookingAction({
  url,
  label,
  totemBehavior
}: Omit<BookExternalAction, "kind">): BookExternalAction {
  return {
    kind: "book-external",
    label,
    totemBehavior,
    url
  };
}

export function createGoogleMapsDirectionsAction({
  latitude,
  longitude,
  label,
  totemBehavior
}: Omit<DirectionsGoogleMapsAction, "kind">): DirectionsGoogleMapsAction {
  return {
    kind: "directions-google-maps",
    label,
    latitude,
    longitude,
    totemBehavior
  };
}

export function getBusinessActionHref(action: BusinessAction) {
  switch (action.kind) {
    case "book-whatsapp":
      return `https://wa.me/${action.phoneNumber}?text=${encodeURIComponent(action.message)}`;
    case "book-external":
      return action.url;
    case "directions-google-maps":
      return `https://www.google.com/maps/search/?api=1&query=${action.latitude},${action.longitude}`;
    default:
      return exhaustiveCheck(action);
  }
}

export function getBusinessActionLabel(action: BusinessAction) {
  if (action.label) {
    return action.label;
  }

  return action.kind === "directions-google-maps" ? "Portami li" : "Prenota";
}

export function getBusinessActionTotemBehavior(action: BusinessAction): BusinessActionTotemBehavior {
  if (action.totemBehavior) {
    return action.totemBehavior;
  }

  switch (action.kind) {
    case "book-whatsapp":
      return "qr";
    case "book-external":
      return "link";
    case "directions-google-maps":
      return "qr";
    default:
      return exhaustiveCheck(action);
  }
}

export function getBusinessActionQrModalContent(action: BusinessAction, businessName: string): BusinessActionQrModalContent {
  switch (action.kind) {
    case "book-whatsapp":
      return {
        eyebrow: "Prenotazione",
        title: "Apri QR per inviare richiesta disponibilita",
        description:
          "Inquadra il QR Code con il telefono per aprire WhatsApp e inviare subito una richiesta di disponibilita alla struttura.",
        previewLabel: "Anteprima messaggio:",
        previewValue: action.message
      };
    case "book-external":
      return {
        eyebrow: "Prenotazione",
        title: "Apri QR per continuare la prenotazione",
        description: `Inquadra il QR Code con il telefono per aprire il portale di ${businessName} e completare la prenotazione.`,
        actionHref: getBusinessActionHref(action),
        actionHrefLabel: "Apri il portale"
      };
    case "directions-google-maps":
      return {
        eyebrow: "Navigazione",
        title: `Portami a ${businessName}`,
        description:
          "Inquadra il QR Code con il telefono per aprire Google Maps e raggiungere direttamente questa attivita.",
        previewLabel: "Coordinate Google Maps mock:",
        previewValue: `${formatCoordinate(action.latitude)}, ${formatCoordinate(action.longitude)}`,
        actionHref: getBusinessActionHref(action),
        actionHrefLabel: "Apri in Google Maps"
      };
    default:
      return exhaustiveCheck(action);
  }
}

function formatCoordinate(value: number) {
  return value.toFixed(6);
}

function exhaustiveCheck(value: never): never {
  throw new Error(`Unsupported business action: ${JSON.stringify(value)}`);
}
