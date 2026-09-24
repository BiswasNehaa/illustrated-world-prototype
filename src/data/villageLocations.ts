export type VillageLocationId = "house" | "studio" | "lab" | "archive" | "theatre";

export const villageLocations: {
  id: VillageLocationId;
  label: string;
  subtitle: string;
  // position as a percentage of the image, tuned by eye against the artwork
  x: number;
  y: number;
}[] = [
  { id: "house", label: "House", subtitle: "About Neha", x: 13, y: 40 },
  { id: "studio", label: "Studio", subtitle: "Projects", x: 45, y: 39 },
  { id: "lab", label: "Lab", subtitle: "Systems", x: 84, y: 76 },
  { id: "archive", label: "Archive", subtitle: "Open Source", x: 95, y: 46 },
  { id: "theatre", label: "Theatre", subtitle: "The Story", x: 86, y: 15 },
];
