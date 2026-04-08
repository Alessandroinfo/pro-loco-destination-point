import type { BusinessContact, BusinessLinks, BusinessMedia } from "@/features/catalog/catalog.types";
import { getDefaultBusinessWhatsappMessage } from "@/lib/business-actions";
import { getBusinessPlaceholderImage } from "@/lib/asset-paths";

export function createShoppingPlaceholderMedia(heroIndex: number): BusinessMedia {
  const galleryIndexes = [heroIndex, 1, 2, 3, 4, 5];
  const deduplicatedIndexes = Array.from(new Set(galleryIndexes)).slice(0, 5);

  return {
    heroImage: getBusinessPlaceholderImage("shopping", heroIndex),
    gallery: deduplicatedIndexes.map((index) => getBusinessPlaceholderImage("shopping", index))
  };
}

export function createBusinessBookingUrl(businessId: string) {
  return `https://example.com/prenota/${businessId}`;
}

export function createBusinessLinks(businessId: string): BusinessLinks {
  return {
    bookingUrl: createBusinessBookingUrl(businessId)
  };
}

export function createWhatsappContactDetails(phoneNumber: string, message: string): BusinessContact {
  return {
    phoneNumber,
    whatsappMessage: message
  };
}

export function createDefaultWhatsappContactDetails(phoneNumber: string, businessName: string): BusinessContact {
  return createWhatsappContactDetails(phoneNumber, getDefaultBusinessWhatsappMessage("contact", businessName));
}