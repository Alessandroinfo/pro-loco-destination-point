import type { Locale } from "@/lib/i18n/config";

type Messages = {
  site: {
    name: string;
    description: string;
    shortName: string;
  };
  common: {
    close: string;
    home: string;
    list: string;
    currentPage: string;
    categories: string;
    routePageLabel: string;
    loadingQr: string;
    skipToMain: string;
  };
  header: {
    eyebrow: string;
    islands: string;
    discoveryPoint: string;
    languageLabel: string;
  };
  home: {
    eyebrow: string;
    titleLead: string;
    titleLampedusa: string;
    titleConnector: string;
    titleLinosa: string;
    description: string;
  };
  featuredMap: {
    eyebrow: string;
    title: string;
    imageAlt: string;
  };
  footer: {
    poweredBy: string;
  };
  category: {
    updatingEyebrow: string;
    updatingTitle: string;
    updatingDescription: string;
  };
  business: {
    descriptionLabel: string;
    typeLabel: string;
    hoursLabel: string;
    addressLabel: string;
    imageAriaLabel: string;
    qrAltPrefix: string;
  };
  map: {
    backHome: string;
    title: string;
    legendTitle: string;
    legendAriaLabel: string;
    dragHint: string;
    zoomIn: string;
    zoomOut: string;
    interactiveMapAriaLabel: string;
    routeButton: string;
  };
  installBanner: {
    eyebrow: string;
    title: string;
    description: string;
    iosInstructions: string;
    iosShare: string;
    iosAddToHome: string;
    installButton: string;
    laterButton: string;
  };
  routeQr: {
    buttonEyebrow: string;
    buttonTitle: string;
    modalEyebrow: string;
    modalDescription: string;
    qrAlt: string;
  };
  screensaver: {
    dismissAriaLabel: string;
    logoAlt: string;
    tapToStart: string;
  };
  poiQr: {
    titlePrefix: string;
    description: string;
    qrAltPrefix: string;
  };
  contactQr: {
    eyebrow: string;
    whatsappTitle: string;
    whatsappDescription: string;
    externalTitle: string;
    externalDescriptionPrefix: string;
    externalActionLabel: string;
  };
  bookingQr: {
    bookingEyebrow: string;
    bookingWhatsappTitle: string;
    bookingWhatsappDescription: string;
    messagePreviewLabel: string;
    bookingExternalTitle: string;
    bookingExternalDescriptionPrefix: string;
    bookingExternalActionLabel: string;
    directionsEyebrow: string;
    directionsTitlePrefix: string;
    directionsDescription: string;
  };
  actions: {
    book: string;
    directions: string;
    contact: string;
  };
};

const messages: Record<Locale, Messages> = {
  it: {
    site: {
      name: "Pro Loco - Lampedusa & Linosa - Discovery Point",
      description: "Discovery Point della Pro Loco di Lampedusa e Linosa.",
      shortName: "Discovery Point"
    },
    common: {
      close: "Chiudi",
      home: "Home",
      list: "Lista",
      currentPage: "Pagina corrente",
      categories: "Categorie",
      routePageLabel: "Pagina attuale",
      loadingQr: "Generazione QR Code...",
      skipToMain: "Vai al contenuto principale"
    },
    header: {
      eyebrow: "Pro Loco",
      islands: "Lampedusa e Linosa",
      discoveryPoint: "Discovery Point",
      languageLabel: "Lingua"
    },
    home: {
      eyebrow: "Benvenuti nelle Pelagie",
      titleLead: "Scopri",
      titleLampedusa: "Lampedusa",
      titleConnector: "e",
      titleLinosa: "Linosa",
      description: "Un accesso immediato alle migliori esperienze, ai luoghi da vivere e ai servizi da contattare in pochi tocchi."
    },
    featuredMap: {
      eyebrow: "Spiagge e cale, punti di interesse",
      title: "Esplora le Pelagie",
      imageAlt: "Illustrazione delle isole Pelagie"
    },
    footer: {
      poweredBy: "Powered by"
    },
    category: {
      updatingEyebrow: "Sezione in aggiornamento",
      updatingTitle: "Stiamo preparando le attivita di questa categoria",
      updatingDescription: "Torna presto per trovare una selezione curata di indirizzi consigliati a Lampedusa e Linosa."
    },
    business: {
      descriptionLabel: "Descrizione",
      typeLabel: "Tipo di attività",
      hoursLabel: "Orari",
      addressLabel: "Indirizzo",
      imageAriaLabel: "Apri immagine",
      qrAltPrefix: "QR Code per"
    },
    map: {
      backHome: "Home",
      title: "Mappa interattiva",
      legendTitle: "Legenda mappa",
      legendAriaLabel: "Legenda dei punti di interesse",
      dragHint: "Trascina con mouse o touch",
      zoomIn: "Aumenta lo zoom",
      zoomOut: "Riduci lo zoom",
      interactiveMapAriaLabel: "Mappa interattiva di Lampedusa, Linosa e Lampione",
      routeButton: "Portami li"
    },
    installBanner: {
      eyebrow: "Installa l'app",
      title: "Usala offline sul tuo dispositivo",
      description: "Aggiungi il sito alla schermata Home per aprirlo come app e consultarlo anche senza connessione.",
      iosInstructions: "Su iOS: tocca",
      iosShare: "Condividi",
      iosAddToHome: "Aggiungi a Home",
      installButton: "Installa app",
      laterButton: "Non ora"
    },
    routeQr: {
      buttonEyebrow: "Continua sul tuo dispositivo",
      buttonTitle: "QR della pagina attuale",
      modalEyebrow: "Pagina attuale",
      modalDescription: "Inquadra il QR Code per aprire sul telefono esattamente la pagina che stai visitando in questo momento.",
      qrAlt: "QR Code della pagina corrente"
    },
    screensaver: {
      dismissAriaLabel: "Chiudi lo screensaver e torna alla pagina corrente",
      logoAlt: "Logo Pro Loco",
      tapToStart: "Tocca per iniziare"
    },
    poiQr: {
      titlePrefix: "Portami a",
      description: "Inquadra il QR Code per aprire Google Maps sul telefono e raggiungere direttamente questo punto.",
      qrAltPrefix: "QR Code per"
    },
    contactQr: {
      eyebrow: "Contatto",
      whatsappTitle: "Apri QR per contattare l'attivita",
      whatsappDescription: "Inquadra il QR Code con il telefono per aprire WhatsApp e contattare direttamente l'attivita.",
      externalTitle: "Apri QR per continuare il contatto",
      externalDescriptionPrefix: "Inquadra il QR Code con il telefono per aprire il canale di contatto di",
      externalActionLabel: "Apri il contatto"
    },
    bookingQr: {
      bookingEyebrow: "Prenotazione",
      bookingWhatsappTitle: "Apri QR per inviare richiesta disponibilita",
      bookingWhatsappDescription:
        "Inquadra il QR Code con il telefono per aprire WhatsApp e inviare subito una richiesta di disponibilita alla struttura.",
      messagePreviewLabel: "Anteprima messaggio:",
      bookingExternalTitle: "Apri QR per continuare la prenotazione",
      bookingExternalDescriptionPrefix: "Inquadra il QR Code con il telefono per aprire il portale di",
      bookingExternalActionLabel: "Apri il portale",
      directionsEyebrow: "Navigazione",
      directionsTitlePrefix: "Portami a",
      directionsDescription: "Inquadra il QR Code con il telefono per aprire Google Maps e raggiungere direttamente questa attivita."
    },
    actions: {
      book: "Prenota",
      directions: "Portami li",
      contact: "Contatta"
    }
  },
  en: {
    site: {
      name: "Pro Loco - Lampedusa & Linosa - Discovery Point",
      description: "Discovery Point by the Pro Loco of Lampedusa and Linosa.",
      shortName: "Discovery Point"
    },
    common: {
      close: "Close",
      home: "Home",
      list: "List",
      currentPage: "Current page",
      categories: "Categories",
      routePageLabel: "Current page",
      loadingQr: "Generating QR code...",
      skipToMain: "Skip to main content"
    },
    header: {
      eyebrow: "Pro Loco",
      islands: "Lampedusa and Linosa",
      discoveryPoint: "Discovery Point",
      languageLabel: "Language"
    },
    home: {
      eyebrow: "Welcome to the Pelagie Islands",
      titleLead: "Discover",
      titleLampedusa: "Lampedusa",
      titleConnector: "and",
      titleLinosa: "Linosa",
      description: "Immediate access to the best experiences, places to enjoy and services to contact in just a few taps."
    },
    featuredMap: {
      eyebrow: "Beaches and coves, landmarks",
      title: "Explore Pelagie",
      imageAlt: "Illustration of the Pelagie islands"
    },
    footer: {
      poweredBy: "Powered by"
    },
    category: {
      updatingEyebrow: "Section in progress",
      updatingTitle: "We are preparing the activities for this category",
      updatingDescription: "Check back soon to find a curated selection of recommended places in Lampedusa and Linosa."
    },
    business: {
      descriptionLabel: "Description",
      typeLabel: "Activity type",
      hoursLabel: "Opening hours",
      addressLabel: "Address",
      imageAriaLabel: "Open image",
      qrAltPrefix: "QR code for"
    },
    map: {
      backHome: "Home",
      title: "Interactive map",
      legendTitle: "Map legend",
      legendAriaLabel: "Legend of points of interest",
      dragHint: "Drag with mouse or touch",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      interactiveMapAriaLabel: "Interactive map of Lampedusa, Linosa and Lampione",
      routeButton: "Take me there"
    },
    installBanner: {
      eyebrow: "Install the app",
      title: "Use it offline on your device",
      description: "Add the site to your Home Screen to open it like an app and browse it even without a connection.",
      iosInstructions: "On iOS: tap",
      iosShare: "Share",
      iosAddToHome: "Add to Home Screen",
      installButton: "Install app",
      laterButton: "Maybe later"
    },
    routeQr: {
      buttonEyebrow: "Continue on your device",
      buttonTitle: "QR of the current page",
      modalEyebrow: "Current page",
      modalDescription: "Scan the QR code to open on your phone exactly the page you are currently viewing.",
      qrAlt: "QR code of the current page"
    },
    screensaver: {
      dismissAriaLabel: "Close the screensaver and return to the current page",
      logoAlt: "Pro Loco logo",
      tapToStart: "Tap to start"
    },
    poiQr: {
      titlePrefix: "Take me to",
      description: "Scan the QR code to open Google Maps on your phone and reach this place directly.",
      qrAltPrefix: "QR code for"
    },
    contactQr: {
      eyebrow: "Contact",
      whatsappTitle: "Open the QR code to contact the business",
      whatsappDescription: "Scan the QR code with your phone to open WhatsApp and contact the business directly.",
      externalTitle: "Open the QR code to continue contacting",
      externalDescriptionPrefix: "Scan the QR code with your phone to open the contact channel of",
      externalActionLabel: "Open contact"
    },
    bookingQr: {
      bookingEyebrow: "Booking",
      bookingWhatsappTitle: "Open the QR code to send an availability request",
      bookingWhatsappDescription:
        "Scan the QR code with your phone to open WhatsApp and send an availability request to the property straight away.",
      messagePreviewLabel: "Message preview:",
      bookingExternalTitle: "Open the QR code to continue booking",
      bookingExternalDescriptionPrefix: "Scan the QR code with your phone to open the booking portal of",
      bookingExternalActionLabel: "Open portal",
      directionsEyebrow: "Navigation",
      directionsTitlePrefix: "Take me to",
      directionsDescription: "Scan the QR code with your phone to open Google Maps and go straight to this activity."
    },
    actions: {
      book: "Book now",
      directions: "Take me there",
      contact: "Contact"
    }
  }
};

export function getMessages(locale: Locale) {
  return messages[locale];
}

export function formatBusinessCount(locale: Locale, count: number) {
  if (locale === "en") {
    return `${count} ${count === 1 ? "available business" : "available businesses"}`;
  }

  return `${count} ${count === 1 ? "struttura disponibile" : "strutture disponibili"}`;
}

export function formatActivityCount(locale: Locale, count: number) {
  if (locale === "en") {
    return `${count} ${count === 1 ? "available activity" : "available activities"}`;
  }

  return `${count} attività`;
}

export function formatPoiCount(locale: Locale, count: number) {
  if (locale === "en") {
    return `${count} ${count === 1 ? "point of interest" : "points of interest"}`;
  }

  return `${count} punti di interesse`;
}

export function formatBusinessGalleryImageAlt(locale: Locale, businessName: string, index: number) {
  if (locale === "en") {
    return `${businessName}, gallery image ${index}`;
  }

  return `${businessName}, immagine della galleria ${index}`;
}

export function formatBusinessGalleryButtonLabel(locale: Locale, businessName: string, index: number) {
  if (locale === "en") {
    return `Open image ${index} of ${businessName}`;
  }

  return `Apri immagine ${index} di ${businessName}`;
}
