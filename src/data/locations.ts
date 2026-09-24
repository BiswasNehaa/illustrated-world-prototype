export type LocationId = "house" | "studio" | "archive" | "theatre";

export const locations: {
  id: LocationId;
  label: string;
  prompt: string;
  // position as a percentage of the 1600x900 viewBox, used for hover labels and zoom origin
  x: number;
  y: number;
  ready: boolean;
}[] = [
  { id: "house", label: "The House", prompt: "Meet Neha", x: 17, y: 66, ready: true },
  { id: "studio", label: "The Studio", prompt: "See the work", x: 40, y: 58, ready: false },
  { id: "archive", label: "The Archive", prompt: "Open source", x: 63, y: 55, ready: false },
  { id: "theatre", label: "The Theatre", prompt: "Watch the story", x: 84, y: 46, ready: true },
];
