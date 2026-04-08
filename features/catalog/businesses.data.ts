import type { Business, BusinessContact, BusinessSeed } from "@/features/catalog/catalog.types";
import { diningBusinessSeeds } from "@/features/catalog/business-seeds/dining.data";
import { experienceBusinessSeeds } from "@/features/catalog/business-seeds/experiences.data";
import { hospitalityBusinessSeeds } from "@/features/catalog/business-seeds/hospitality.data";
import { infoBusinessSeeds } from "@/features/catalog/business-seeds/info.data";
import { rentingBusinessSeeds } from "@/features/catalog/business-seeds/renting.data";
import { shoppingBusinessSeeds } from "@/features/catalog/business-seeds/shopping.data";
import { createExternalLinkAction, createGoogleMapsDirectionsAction, createWhatsappAction, getDefaultBusinessWhatsappMessage } from "@/lib/business-actions";
import { normalizeLegacyAssetPath } from "@/lib/asset-paths";

function normalizeBusinessAssetList(assetPaths: string[]) {
  return assetPaths.map((assetPath) => normalizeLegacyAssetPath(assetPath));
}

function createBusinessContactAction(businessName: string, contact?: BusinessContact) {
  if (!contact?.phoneNumber) {
    return undefined;
  }

  return createWhatsappAction({
    phoneNumber: contact.phoneNumber,
    message: contact.whatsappMessage ?? getDefaultBusinessWhatsappMessage("contact", businessName)
  });
}

function createBusinessFromSeed(seed: BusinessSeed): Business {
  const { location, media, links, contact, ...business } = seed;

  return {
    ...business,
    location,
    contact,
    links,
    heroImage: normalizeLegacyAssetPath(media.heroImage),
    gallery: normalizeBusinessAssetList(media.gallery),
    actions: {
      booking: links?.bookingUrl ? createExternalLinkAction({ url: links.bookingUrl }) : undefined,
      directions: createGoogleMapsDirectionsAction({
        latitude: location.latitude,
        longitude: location.longitude
      }),
      contact: createBusinessContactAction(business.name, contact)
    }
  };
}

const businessSeeds: BusinessSeed[] = [
  ...experienceBusinessSeeds,
  ...diningBusinessSeeds,
  ...hospitalityBusinessSeeds,
  ...rentingBusinessSeeds,
  ...shoppingBusinessSeeds,
  ...infoBusinessSeeds
];

export const businesses: Business[] = businessSeeds.map(createBusinessFromSeed);