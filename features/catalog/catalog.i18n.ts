import type { Business, Category } from "@/features/catalog/catalog.types";
import { businesses } from "@/features/catalog/businesses.data";
import { categories } from "@/features/catalog/categories.data";
import { getDefaultBusinessWhatsappMessage } from "@/lib/business-actions";
import type { Locale } from "@/lib/i18n/config";

type CategoryTranslation = Pick<Category, "name" | "shortLabel" | "tagline">;

type BusinessTranslation = Partial<Pick<Business, "name" | "type" | "shortDescription" | "description">> & {
  whatsappMessage?: string;
};

const categoryTranslations: Record<Locale, Record<Category["id"], CategoryTranslation>> = {
  it: {
    experiences: {
      name: "Esperienze",
      shortLabel: "Tour in barca, diving, escursioni",
      tagline: "Scopri il lato piu emozionante dell'isola"
    },
    dining: {
      name: "Ristorazione",
      shortLabel: "Ristoranti, Pizzerie, Trattorie",
      tagline: "Ristoranti, bistrot e sapori del porto"
    },
    hospitality: {
      name: "Ospitalità",
      shortLabel: "Hotel, B&B, Case vacanza",
      tagline: "Accoglienza raffinata tra mare e pietra bianca"
    },
    renting: {
      name: "Trasporti",
      shortLabel: "Barche, Scooter, Auto, Bici",
      tagline: "Muoviti con liberta tra costa e centro"
    },
    shopping: {
      name: "Shopping",
      shortLabel: "Souvenir, Boutique, Artigianato, Abbigliamento",
      tagline: "Indirizzi selezionati tra stile isolano, idee regalo e piccole botteghe da scoprire"
    },
    info: {
      name: "Info utili",
      shortLabel: "Trasporti, assistenza, servizi",
      tagline: "Contatti e informazioni pratiche per vivere al meglio le Pelagie"
    }
  },
  en: {
    experiences: {
      name: "Experiences",
      shortLabel: "Boat tours, diving, excursions",
      tagline: "Discover the island's most exciting side"
    },
    dining: {
      name: "Dining",
      shortLabel: "Restaurants, pizzerias, trattorias",
      tagline: "Restaurants, bistros and harbour flavours"
    },
    hospitality: {
      name: "Hospitality",
      shortLabel: "Hotels, B&Bs, holiday homes",
      tagline: "Refined stays between sea and white stone"
    },
    renting: {
      name: "Transport",
      shortLabel: "Boats, scooters, cars, bikes",
      tagline: "Move freely between coast and town"
    },
    shopping: {
      name: "Shopping",
      shortLabel: "Souvenirs, boutiques, crafts, clothing",
      tagline: "Curated addresses for island style, gifts and small shops worth discovering"
    },
    info: {
      name: "Useful info",
      shortLabel: "Transport, assistance, services",
      tagline: "Practical contacts and local information to enjoy the Pelagie Islands at their best"
    }
  }
};

const businessTranslations: Record<Locale, Record<string, BusinessTranslation>> = {
  it: {},
  en: {
    "isola-di-lino": {
      shortDescription: "Kaftans, linen and lightweight pieces inspired by Mediterranean colours.",
      description:
        "A boutique dedicated to resortwear, linen and fresh fabrics designed to experience the island with a relaxed yet refined style. A curated selection for those seeking simple elegance and a holiday wardrobe without excess."
    },
    "bottega-del-porto": {
      shortDescription: "Gift items, magnets, postcards and easy souvenirs to take home.",
      description:
        "A bright and tidy shop with a selection of souvenirs, small gifts and travel objects inspired by Lampedusa. Perfect if you want to take home an immediate memory of the island."
    },
    "coralli-boutique": {
      type: "Beachwear",
      shortDescription: "Beachwear, swimsuits and accessories in a refined selection.",
      description:
        "A space devoted to beach fashion, with swimsuits, cover-ups and accessories chosen with care. Ideal for anyone who wants to complete a holiday wardrobe with light lines and Mediterranean palettes."
    },
    "pelagie-concept-store": {
      shortDescription: "Objects, accessories and small editions inspired by island style.",
      description:
        "A concept store combining lifestyle pieces, accessories and small design objects with a contemporary sensibility. The selection blends local taste with a more editorial image of the Mediterranean."
    },
    "casa-grecale": {
      type: "Textile craftsmanship",
      shortDescription: "Textiles, embroidery and home pieces inspired by the island.",
      description:
        "A selection of textiles, table linens, embroidery and home details that tells the island's softer, more artisanal side. Perfect if you are looking for a useful, well-made keepsake."
    },
    "sette-venti": {
      type: "Men's and women's clothing",
      shortDescription: "Casual pieces, summer lines and accessories for strolling and holidays.",
      description:
        "A clothing store with summer lines, easy-to-wear pieces and options for both men and women. Ideal if you want to buy something practical yet well finished during your stay."
    },
    "cala-bianca-souvenir": {
      shortDescription: "Travel keepsakes, small prints and easy gift ideas.",
      description:
        "A space dedicated to souvenirs, small prints, travel objects and gifts you can buy quickly. A convenient stop for anyone looking for a simple but well curated memento."
    },
    "lab-mediterraneo": {
      type: "Ceramics and handmade",
      shortDescription: "Decorative ceramics, handmade objects and small local editions.",
      description:
        "A workshop-boutique with ceramics, handmade objects and small collections inspired by sea colours. Designed for those who love a more artisanal and less touristy purchase."
    },
    "sabbia-chiara-kids": {
      type: "Kids' beachwear",
      shortDescription: "Beachwear and accessories designed for little ones.",
      description:
        "A shop dedicated to children with beachwear, hats, sandals and useful seaside accessories. Light colours, airy materials and a practical selection for families on holiday."
    },
    "via-roma-boutique": {
      shortDescription: "Dresses, light sets and accessories for the town centre and evenings.",
      description:
        "A more urban-style boutique with fashion options for strolling, aperitivo and evening plans. An orderly selection of light garments and accessories that are easy to wear on holiday too."
    },
    "blu-cobalto-atelier": {
      type: "Handmade jewellery",
      shortDescription: "Small jewels, enamelled details and sea-inspired pieces.",
      description:
        "An atelier dedicated to jewellery, small accessories and enamel details in marine tones. Perfect if you are looking for a more personal purchase and a less conventional keepsake."
    },
    "porto-piccolo-market": {
      type: "Accessories & beach essentials",
      shortDescription: "Towels, beach bags, useful accessories and last-minute essentials.",
      description:
        "A practical shop for beach accessories, towels, bags, hats and small items you can use straight away. Designed for travellers who want to complete the essentials without wasting time."
    },
    "pozzolana-store": {
      shortDescription: "Decorative objects, home fragrances and details for the house.",
      description:
        "A store devoted to decorative pieces, fragrances and home details with a soft Mediterranean taste. An ideal choice if you are looking for something a little more refined."
    },
    "linosa-made": {
      type: "Local craftsmanship",
      shortDescription: "Objects, prints and handcrafted pieces inspired by Linosa's nature.",
      description:
        "A selection of handcrafted objects, prints and small productions dedicated to the identity of Linosa. Ideal for anyone wanting a more authentic souvenir tied to the Pelagie Islands."
    },
    "isola-sunwear": {
      type: "Sunglasses and hats",
      shortDescription: "Sun accessories and beachwear selected for the island climate.",
      description:
        "Sunglasses, hats, lightweight bags and sun accessories gathered in a simple, well-stocked space. A useful stop if you are looking for functional items with a good aesthetic touch."
    },
    "filo-di-sale": {
      type: "Bags and accessories",
      shortDescription: "Light bags, pouches and textile details for travel and the beach.",
      description:
        "A small boutique of bags, pouches and textile accessories designed for travel and the beach. Light materials, sandy tones and a clean, well curated visual identity."
    },
    "marea-boutique": {
      type: "Women's clothing",
      shortDescription: "Feminine lines, summer fabrics and accessories for the evening.",
      description:
        "A women's boutique with a summer selection of flowing dresses, light garments and easy accessories. A proposal designed for holidays yet with a more refined touch."
    },
    "tramontana-shop": {
      type: "T-shirts and souvenirs",
      shortDescription: "Graphic T-shirts, light sweatshirts and contemporary souvenirs.",
      description:
        "A shop dedicated to T-shirts, lightweight sweatshirts and graphic souvenirs inspired by the islands. Ideal if you want a youthful, simple keepsake you can wear straight away."
    },
    "nasse-e-trame": {
      type: "Textiles and embroidery",
      shortDescription: "Embroidery, textile details and pieces inspired by local tradition.",
      description:
        "A compact space devoted to fabrics, embroidery and crafted pieces that reinterpret island tradition with a more current taste. An ideal stop for anyone who loves material and detail."
    },
    "pelagos-wear": {
      shortDescription: "Holiday clothing, accessories and easywear designed for the island.",
      description:
        "A resort shop with a selection of easywear, accessories and light clothing suited to the long, bright days of Lampedusa. An orderly space that is easy to browse."
    },
    "mare-vivo-diving": {
      shortDescription: "Boat trips to coves, caves and crystal-clear seabeds.",
      description:
        "A guided experience through diving, snorkelling and stories from the sea of Lampedusa. Perfect for anyone who wants to live the island from its most iconic point of view: the water.",
      whatsappMessage: "Hi, I would like information about your sea experiences in Lampedusa."
    },
    "vento-di-scirocco": {
      type: "Coastal tours",
      shortDescription: "Sunset island tours with swimming stops and aperitif.",
      description:
        "Elegant and relaxed coastal navigation with a local crew and stops in the island's most evocative bays. Ideal for anyone looking for an exclusive afternoon at sea.",
      whatsappMessage: "Hi, I would like to book a sunset coastal tour."
    },
    "porto-doro": {
      type: "Seafood restaurant",
      shortDescription: "Contemporary Lampedusa cuisine with harbour views.",
      description:
        "A menu inspired by the catch of the day, bright interiors and attentive service. A table designed to tell Mediterranean tradition with a more contemporary sensibility.",
      whatsappMessage: "Hi, I would like to book a table at Porto d'Oro."
    },
    "cala-bianca-bistrot": {
      type: "Mediterranean bistro",
      shortDescription: "Fresh dishes, raw seafood and evening cocktails.",
      description:
        "A refined bistro for light daytime breaks and more intimate dinners at sunset. The menu combines local ingredients, essential plating and a relaxed atmosphere.",
      whatsappMessage: "Hi, I would like to check availability for Cala Bianca Bistrot."
    },
    "suites-dei-coralli": {
      type: "Boutique stay",
      shortDescription: "Bright rooms with private terraces and premium services.",
      description:
        "A contemporary property with natural materials, golden details and a strong visual connection to Mediterranean colours. Designed for a relaxing and carefully curated stay.",
      whatsappMessage: "Hi, I would like information about a stay at Suites dei Coralli."
    },
    "linosa-casa-luce": {
      type: "Guest house",
      shortDescription: "Quiet, intimate hospitality for travellers seeking authenticity.",
      description:
        "A guest house inspired by the elegant simplicity of the smaller islands, with essential interiors and open views over the blue. Ideal for anyone looking for a slow and authentic break.",
      whatsappMessage: "Hi, I would like information about Linosa Casa Luce."
    },
    "island-rent-premium": {
      type: "Scooter & city mobility",
      shortDescription: "Scooters and city cars to move around the island independently.",
      description:
        "An up-to-date fleet, fast assistance and flexible delivery at the island's busiest spots. A solution designed for dynamic tourism without unnecessary stress.",
      whatsappMessage: "Hi, I would like to rent a scooter in Lampedusa."
    },
    "vento-lounge-charter": {
      type: "Boat charter",
      shortDescription: "Boat rental for private days among beaches and coves.",
      description:
        "Comfortable, well-kept boats for anyone who wants to explore the outline of Lampedusa independently or with a skipper. A service dedicated to sea days with a free rhythm.",
      whatsappMessage: "Hi, I would like information about boat rental."
    },
    "pelagie-help-desk": {
      type: "Tourist info point",
      shortDescription: "Support to navigate beaches, transport and essential services.",
      description:
        "A reference point for practical advice, useful timetables, active services and quick orientation between Lampedusa and Linosa. Ideal if you want clear information in just a few minutes.",
      whatsappMessage: "Hi, I would like useful information for my stay in Lampedusa and Linosa."
    },
    "mobilita-pelagie": {
      type: "Transport and services",
      shortDescription: "Timetables, contacts and support for transfers, boarding and assistance.",
      description:
        "Practical information on connections, transfers, support services and useful contacts to move easily between the harbour, town centre and points of interest across the islands.",
      whatsappMessage: "Hi, I would like information about transport and useful services in the Pelagie Islands."
    }
  }
};

export function getLocalizedCategory(category: Category, locale: Locale): Category {
  const translation = categoryTranslations[locale][category.id];

  return {
    ...category,
    ...translation
  };
}

export function getLocalizedCategories(locale: Locale) {
  return categories.map((category) => getLocalizedCategory(category, locale));
}

export function getLocalizedCategoryById(categoryId: string, locale: Locale) {
  const category = categories.find((entry) => entry.id === categoryId);

  return category ? getLocalizedCategory(category, locale) : undefined;
}

export function getLocalizedBusiness(business: Business, locale: Locale): Business {
  const translation = businessTranslations[locale][business.id];

  if (!translation) {
    return business;
  }

  const localizedBusiness: Business = {
    ...business,
    description: translation.description ?? business.description,
    name: translation.name ?? business.name,
    shortDescription: translation.shortDescription ?? business.shortDescription,
    type: translation.type ?? business.type
  };

  if (localizedBusiness.actions.contact?.kind === "whatsapp") {
    localizedBusiness.actions = {
      ...localizedBusiness.actions,
      contact: {
        ...localizedBusiness.actions.contact,
        message: translation.whatsappMessage ?? getDefaultBusinessWhatsappMessage("contact", localizedBusiness.name, locale)
      }
    };
  }

  return localizedBusiness;
}

export function getLocalizedBusinesses(locale: Locale) {
  return businesses.map((business) => getLocalizedBusiness(business, locale));
}

export function getLocalizedBusinessesByCategoryId(categoryId: Category["id"], locale: Locale) {
  return getLocalizedBusinesses(locale).filter((business) => business.categoryId === categoryId);
}

export function getLocalizedBusinessBySlug(categoryId: string, businessId: string, locale: Locale) {
  const business = businesses.find((entry) => entry.categoryId === categoryId && entry.id === businessId);

  return business ? getLocalizedBusiness(business, locale) : undefined;
}
