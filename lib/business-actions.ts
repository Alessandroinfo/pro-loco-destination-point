import type {
  BusinessAction,
  BusinessActionSlot,
  BusinessActionTotemBehavior,
  ExternalLinkAction,
  DirectionsGoogleMapsAction
} from "@/features/catalog/catalog.types";
import type { WhatsappAction } from "@/features/catalog/catalog.types";
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

export function createWhatsappAction({
  phoneNumber,
  message,
  label,
  totemBehavior
}: Omit<WhatsappAction, "kind">): WhatsappAction {
  return {
    kind: "whatsapp",
    label,
    message,
    phoneNumber,
    totemBehavior
  };
}

export function createExternalLinkAction({
  url,
  label,
  totemBehavior
}: Omit<ExternalLinkAction, "kind">): ExternalLinkAction {
  return {
    kind: "external-link",
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
    case "whatsapp":
      return `https://wa.me/${action.phoneNumber}?text=${encodeURIComponent(action.message)}`;
    case "external-link":
      return action.url;
    case "directions-google-maps":
      return `https://www.google.com/maps/search/?api=1&query=${action.latitude},${action.longitude}`;
    default:
      return exhaustiveCheck(action);
  }
}

export function getBusinessActionLabel(action: BusinessAction, slot: BusinessActionSlot, locale: Locale = "it") {
  if (action.label) {
    return action.label;
  }

  const messages = getMessages(locale);

  switch (slot) {
    case "booking":
      return messages.actions.book;
    case "directions":
      return messages.actions.directions;
    case "contact":
      return messages.actions.contact;
    default:
      return exhaustiveCheck(slot);
  }
}

export function getBusinessActionTotemBehavior(action: BusinessAction, slot: BusinessActionSlot): BusinessActionTotemBehavior {
  if (action.totemBehavior) {
    return action.totemBehavior;
  }

  switch (slot) {
    case "booking":
      return "qr";
    case "contact":
      return "qr";
    case "directions":
      return "qr";
    default:
      return exhaustiveCheck(slot);
  }
}

export function getBusinessActionQrModalContent(
  action: BusinessAction,
  slot: BusinessActionSlot,
  businessName: string,
  locale: Locale = "it"
): BusinessActionQrModalContent {
  const messages = getMessages(locale);

  switch (slot) {
    case "booking":
      switch (action.kind) {
        case "whatsapp":
          return {
            eyebrow: messages.bookingQr.bookingEyebrow,
            title: messages.bookingQr.bookingWhatsappTitle,
            description: messages.bookingQr.bookingWhatsappDescription
          };
        case "external-link":
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
    case "directions":
      return {
        eyebrow: messages.bookingQr.directionsEyebrow,
        title: `${messages.bookingQr.directionsTitlePrefix} ${businessName}`,
        description: messages.bookingQr.directionsDescription
      };
    case "contact":
      switch (action.kind) {
        case "whatsapp":
          return {
            eyebrow: messages.contactQr.eyebrow,
            title: messages.contactQr.whatsappTitle,
            description: messages.contactQr.whatsappDescription,
            previewLabel: messages.bookingQr.messagePreviewLabel,
            previewValue: action.message
          };
        case "external-link":
          return {
            eyebrow: messages.contactQr.eyebrow,
            title: messages.contactQr.externalTitle,
            description:
              locale === "en"
                ? `${messages.contactQr.externalDescriptionPrefix} ${businessName} and continue the conversation.`
                : `${messages.contactQr.externalDescriptionPrefix} ${businessName} e continuare il contatto.`,
            actionHref: getBusinessActionHref(action),
            actionHrefLabel: messages.contactQr.externalActionLabel
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
    default:
      return exhaustiveCheck(slot);
  }
}

export function getDefaultBusinessWhatsappMessage(slot: BusinessActionSlot, businessName: string, locale: Locale = "it") {
  switch (slot) {
    case "booking":
      return locale === "en" ? `Hi, I would like to book ${businessName}.` : `Ciao, vorrei prenotare ${businessName}.`;
    case "contact":
      return locale === "en" ? `Hi, I would like to contact ${businessName}.` : `Ciao, vorrei contattare ${businessName}.`;
    case "directions":
      return locale === "en"
        ? `Hi, I would like directions to reach ${businessName}.`
        : `Ciao, vorrei indicazioni per raggiungere ${businessName}.`;
    default:
      return exhaustiveCheck(slot);
  }
}

function exhaustiveCheck(value: never): never {
  throw new Error(`Unsupported business action: ${JSON.stringify(value)}`);
}
