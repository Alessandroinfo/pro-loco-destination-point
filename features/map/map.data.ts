import type { PointOfInterest } from "@/features/map/map.types";

const defaultPointOfInterestImage = "/placeholders/category-map.svg";

type PointSeed = {
  id: string;
  name: string;
  category: PointOfInterest["category"];
  latitude: number | null;
  longitude: number | null;
  mapX: number;
  mapY: number;
  island: PointOfInterest["island"];
};

export const pointOfInterestLegend = {
  "Spiagge e Cale": "#56C1D9",
  "Luoghi di interesse": "#C89A3D"
} as const;

const coastalPointSeeds: PointSeed[] = [
  { id: "isola-dei-conigli", name: "Isola dei Conigli", category: "Spiagge e Cale", latitude: 35.51345, longitude: 12.5575, mapX: 8030, mapY: 4495, island: "Lampedusa" },
  { id: "le-grottacce", name: "Le Grottacce", category: "Spiagge e Cale", latitude: 35.49414, longitude: 12.61539, mapX: 3350, mapY: 6480, island: "Lampedusa" },
  { id: "cala-greca", name: "Cala Greca", category: "Spiagge e Cale", latitude: 35.50475, longitude: 12.58467, mapX: 1159, mapY: 4051, island: "Lampedusa" },
  { id: "cala-creta", name: "Cala Creta", category: "Spiagge e Cale", latitude: 35.51076, longitude: 12.6242, mapX: 9802, mapY: 6116, island: "Lampedusa" },
  { id: "cala-pisana", name: "Cala Pisana", category: "Spiagge e Cale", latitude: 35.50436, longitude: 12.62391, mapX: 4300, mapY: 5790, island: "Lampedusa" },
  { id: "spiaggia-della-guitgia", name: "Spiaggia della Guitgia", category: "Spiagge e Cale", latitude: 35.49864, longitude: 12.59907, mapX: 6495, mapY: 7005, island: "Lampedusa" },
  { id: "punta-sottile", name: "Punta Sottile", category: "Spiagge e Cale", latitude: 35.49357, longitude: 12.63304, mapX: 1923, mapY: 3792, island: "Lampedusa" },
  { id: "cala-galera", name: "Cala Galera", category: "Spiagge e Cale", latitude: 35.5087, longitude: 12.57674, mapX: 8773, mapY: 4883, island: "Lampedusa" },
  { id: "la-tabaccara", name: "La Tabaccara", category: "Spiagge e Cale", latitude: 35.51109, longitude: 12.56814, mapX: 3045, mapY: 4190, island: "Lampedusa" },
  { id: "cala-madonna", name: "Cala Madonna", category: "Spiagge e Cale", latitude: 35.50346, longitude: 12.59045, mapX: 8549, mapY: 7930, island: "Lampedusa" },
  { id: "cala-croce", name: "Cala Croce", category: "Spiagge e Cale", latitude: 35.50164, longitude: 12.59338, mapX: 620, mapY: 4496, island: "Lampedusa" },
  { id: "scoglio-a-vela", name: "Scoglio a Vela", category: "Spiagge e Cale", latitude: 35.52903, longitude: 12.5441, mapX: 9970, mapY: 6490, island: "Lampedusa" },
  { id: "cala-pulcino", name: "Cala Pulcino", category: "Spiagge e Cale", latitude: 35.51522, longitude: 12.55179, mapX: 2375, mapY: 3710, island: "Lampedusa" },
  { id: "sciatu-persu", name: "Sciatu Persu", category: "Spiagge e Cale", latitude: 35.49567, longitude: 12.62264, mapX: 10316, mapY: 7047, island: "Lampedusa" },
  { id: "scoglio-del-sacramento", name: "Scoglio del Sacramento", category: "Spiagge e Cale", latitude: 35.52907, longitude: 12.52776, mapX: 9320, mapY: 6670, island: "Lampedusa" },
  { id: "mare-morto", name: "Mare Morto", category: "Spiagge e Cale", latitude: 35.51483, longitude: 12.62586, mapX: 3718, mapY: 6013, island: "Lampedusa" },
  { id: "muro-vecchio", name: "Muro Vecchio", category: "Spiagge e Cale", latitude: 35.5258, longitude: 12.55323, mapX: 5745, mapY: 6520, island: "Lampedusa" },
  { id: "spiaggia-di-portu-ntoni", name: "Spiaggia di Portu 'Ntoni", category: "Spiagge e Cale", latitude: 35.50166, longitude: 12.592, mapX: 4550, mapY: 5940, island: "Lampedusa" },
  { id: "cala-uccello", name: "Cala Uccello", category: "Spiagge e Cale", latitude: 35.5013, longitude: 12.62942, mapX: 9460, mapY: 4570, island: "Lampedusa" },
  { id: "cala-francese", name: "Cala Francese", category: "Spiagge e Cale", latitude: 35.49686, longitude: 12.62528, mapX: 1235, mapY: 3957, island: "Lampedusa" },
  { id: "cala-spugne", name: "Cala Spugne", category: "Spiagge e Cale", latitude: 35.49548, longitude: 12.60778, mapX: 6888, mapY: 4837, island: "Lampedusa" },
  { id: "cala-stretta", name: "Cala Stretta", category: "Spiagge e Cale", latitude: null, longitude: null, mapX: 5150, mapY: 4515, island: "Lampedusa" },
  { id: "cala-calandra", name: "Cala Calandra", category: "Spiagge e Cale", latitude: null, longitude: null, mapX: 1670, mapY: 3950, island: "Lampedusa" },
  { id: "spiaggia-dei-conigli", name: "Spiaggia dei Conigli", category: "Spiagge e Cale", latitude: null, longitude: null, mapX: 7780, mapY: 4585, island: "Lampedusa" }
];

const landmarkPointSeeds: PointSeed[] = [
  { id: "aeroporto-internazionale-di-lampedusa", name: "Aeroporto Internazionale di Lampedusa", category: "Luoghi di interesse", latitude: 35.50094, longitude: 12.61856, mapX: 5501, mapY: 5737, island: "Lampedusa" },
  { id: "albero-sole", name: "Albero Sole", category: "Luoghi di interesse", latitude: 35.52828, longitude: 12.54066, mapX: 9681, mapY: 6447, island: "Lampedusa" },
  { id: "archivio-storico-lampedusa", name: "Archivio Storico Lampedusa", category: "Luoghi di interesse", latitude: 35.5005, longitude: 12.60564, mapX: 5635, mapY: 5630, island: "Lampedusa" },
  { id: "cimitero", name: "Cimitero", category: "Luoghi di interesse", latitude: 35.504, longitude: 12.62206, mapX: 4578, mapY: 5752, island: "Lampedusa" },
  { id: "vasche-romane", name: "Vasche Romane", category: "Luoghi di interesse", latitude: 35.50011, longitude: 12.60525, mapX: 5500, mapY: 5535, island: "Lampedusa" },
  { id: "santuario-di-cala-madonna", name: "Santuario di Cala Madonna", category: "Luoghi di interesse", latitude: 35.50619, longitude: 12.59069, mapX: 6013, mapY: 6710, island: "Lampedusa" },
  { id: "statua-della-madonna-di-porto-salvo", name: "Statua della Madonna di Porto Salvo", category: "Luoghi di interesse", latitude: 35.49975, longitude: 12.60535, mapX: 5480, mapY: 5655, island: "Lampedusa" },
  { id: "strada-panoramica", name: "Strada Panoramica", category: "Luoghi di interesse", latitude: 35.5236, longitude: 12.57696, mapX: 5508, mapY: 4734, island: "Lampedusa" },
  { id: "via-roma", name: "Via Roma", category: "Luoghi di interesse", latitude: 35.5025, longitude: 12.60884, mapX: 5310, mapY: 5485, island: "Lampedusa" },
  { id: "museo-archeologico-delle-pelagie", name: "Museo Archeologico delle Pelagie", category: "Luoghi di interesse", latitude: 35.5006, longitude: 12.60565, mapX: 5750, mapY: 5480, island: "Lampedusa" },
  { id: "porto-nuovo", name: "Porto Nuovo", category: "Luoghi di interesse", latitude: 35.50215, longitude: 12.60271, mapX: 5575, mapY: 6030, island: "Lampedusa" },
  { id: "riserva-naturale-orientata", name: "Riserva Naturale Orientata", category: "Luoghi di interesse", latitude: 35.51267, longitude: 12.56892, mapX: 3234, mapY: 4207, island: "Lampedusa" },
  { id: "obelisco-cassodoro", name: "Obelisco Cassodoro", category: "Luoghi di interesse", latitude: 35.50253, longitude: 12.60914, mapX: 5390, mapY: 5615, island: "Lampedusa" },
  { id: "centro-recupero-tartarughe", name: "Centro Recupero Tartarughe", category: "Luoghi di interesse", latitude: 35.49505, longitude: 12.62943, mapX: 3485, mapY: 4361, island: "Lampedusa" },
  { id: "fontana-cascella", name: "Fontana Cascella", category: "Luoghi di interesse", latitude: 35.50306, longitude: 12.60865, mapX: 5285, mapY: 5560, island: "Lampedusa" },
  { id: "faro-di-capo-grecale", name: "Faro di Capo Grecale", category: "Luoghi di interesse", latitude: 35.51749, longitude: 12.63178, mapX: 5128, mapY: 5906, island: "Lampedusa" },
  { id: "chiesa", name: "Chiesa", category: "Luoghi di interesse", latitude: 35.50333, longitude: 12.60935, mapX: 5415, mapY: 5505, island: "Lampedusa" },
  { id: "forestale", name: "Forestale", category: "Luoghi di interesse", latitude: 35.52039, longitude: 12.54045, mapX: 7097, mapY: 5668, island: "Lampedusa" },
  { id: "porta-d-europa", name: "Porta d'Europa", category: "Luoghi di interesse", latitude: 35.49368, longitude: 12.60562, mapX: 4500, mapY: 5900, island: "Lampedusa" },
  { id: "sede-area-marina-protetta", name: "Sede Area Marina Protetta", category: "Luoghi di interesse", latitude: 35.50318, longitude: 12.60566, mapX: 5670, mapY: 5565, island: "Lampedusa" },
  { id: "la-madonna-del-mare", name: "La Madonna del mare", category: "Luoghi di interesse", latitude: 35.5075, longitude: 12.5579, mapX: 5144, mapY: 5191, island: "Lampedusa" },
  { id: "casa-teresa", name: "Casa Teresa", category: "Luoghi di interesse", latitude: 35.5236, longitude: 12.54049, mapX: 8405, mapY: 6144, island: "Lampedusa" },
  { id: "porto-vecchio", name: "Porto Vecchio", category: "Luoghi di interesse", latitude: 35.49689, longitude: 12.60515, mapX: 5035, mapY: 5610, island: "Lampedusa" }
];

function buildPointDescription(point: PointSeed) {
  if (point.latitude === null || point.longitude === null) {
    return point.category === "Spiagge e Cale"
      ? "Punto costiero in fase di posizionamento."
      : "Luogo di interesse in fase di posizionamento.";
  }

  return point.category === "Spiagge e Cale"
    ? `Punto costiero di ${point.island}.`
    : `Luogo di interesse di ${point.island}.`;
}

const allPointSeeds = [...coastalPointSeeds, ...landmarkPointSeeds];

export const pointsOfInterest: PointOfInterest[] = allPointSeeds.map((point) => ({
  id: point.id,
  name: point.name,
  category: point.category,
  description: buildPointDescription(point),
  imageSrc: defaultPointOfInterestImage,
  latitude: point.latitude,
  longitude: point.longitude,
  mapX: point.mapX,
  mapY: point.mapY,
  island: point.island
}));
