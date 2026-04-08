import type {
  BookExternalAction,
  BookWhatsappAction,
  BusinessAction,
  BusinessActionTotemBehavior,
  DirectionsGoogleMapsAction
} from "@/features/catalog/catalog.types";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

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

export function getBusinessActionLabel(action: BusinessAction, locale: Locale = "it") {
  if (action.label) {
    return action.label;
  }

  const messages = getMessages(locale);

  return action.kind === "directions-google-maps" ? messages.actions.directions : messages.actions.book;
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

export function getBusinessActionQrModalContent(
  action: BusinessAction,
  businessName: string,
  locale: Locale = "it"
): BusinessActionQrModalContent {
  const messages = getMessages(locale);

  switch (action.kind) {
    case "book-whatsapp":
      return {
        eyebrow: messages.bookingQr.bookingEyebrow,
        title: messages.bookingQr.bookingWhatsappTitle,
        description: messages.bookingQr.bookingWhatsappDescription,
        previewLabel: messages.bookingQr.messagePreviewLabel,
        previewValue: action.message
      };
    case "book-external":
      return {
        eyebrow: messages.bookingQr.bookingEyebrow,
        title: messages.bookingQr.bookingExternalTitle,
        description:
          locale === "en"
            ? `${messages.bookingQr.bookingExternalDescriptionPrefix} ${businessName} and complete your booking.`
            : `${messages.bookingQr.bookingExternalDescriptionPrefix} ${businessName} e completare la prenotazione.`,
        actionHref: getBusinessActionHref(action),
        actionHrefLabel: messages.bookingQr.bookingExternalActionLabel
      };
    case "directions-google-maps":
      return {
        eyebrow: messages.bookingQr.directionsEyebrow,
        title: `${messages.bookingQr.directionsTitlePrefix} ${businessName}`,
        description: messages.bookingQr.directionsDescription
      };
    default:
      return exhaustiveCheck(action);
  }
}

function exhaustiveCheck(value: never): never {
  throw new Error(`Unsupported business action: ${JSON.stringify(value)}`);
}
