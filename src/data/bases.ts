// src/data/bases.ts

export interface BaseInfo {
  id: string;
  name: string;
  fullName: string;
  location: string;
  region: string;
  nearbyTowns: string[];
}

export const BASES: BaseInfo[] = [
  {
    id: "stuttgart",
    name: "USAG Stuttgart",
    fullName: "United States Army Garrison Stuttgart",
    location: "Stuttgart, Baden-Württemberg",
    region: "Southwest Germany",
    nearbyTowns: ["Sindelfingen", "Böblingen", "Vaihingen", "Ludwigsburg"],
  },
  {
    id: "ramstein",
    name: "Ramstein Air Base",
    fullName: "Ramstein Air Base",
    location: "Ramstein-Miesenbach, Rhineland-Palatinate",
    region: "Southwest Germany",
    nearbyTowns: ["Kaiserslautern", "Landstuhl", "Ramstein-Miesenbach"],
  },
  {
    id: "kaiserslautern",
    name: "Kaiserslautern",
    fullName: "Kaiserslautern Military Community",
    location: "Kaiserslautern, Rhineland-Palatinate",
    region: "Southwest Germany",
    nearbyTowns: ["Kaiserslautern", "Landstuhl", "Vogelweh", "Kleber"],
  },
  {
    id: "grafenwoehr",
    name: "Grafenwöhr",
    fullName: "USAG Bavaria - Grafenwöhr",
    location: "Grafenwöhr, Bavaria",
    region: "Southeast Germany",
    nearbyTowns: ["Grafenwöhr", "Vilseck", "Amberg", "Weiden"],
  },
  {
    id: "spangdahlem",
    name: "Spangdahlem Air Base",
    fullName: "Spangdahlem Air Base",
    location: "Spangdahlem, Rhineland-Palatinate",
    region: "Western Germany",
    nearbyTowns: ["Spangdahlem", "Bitburg", "Trier", "Wittlich"],
  },
  {
    id: "wiesbaden",
    name: "USAG Wiesbaden",
    fullName: "United States Army Garrison Wiesbaden",
    location: "Wiesbaden, Hesse",
    region: "Central Germany",
    nearbyTowns: ["Wiesbaden", "Mainz", "Frankfurt", "Rüsselsheim"],
  },
];

export const DEFAULT_BASE = "stuttgart";

export function getBaseById(id: string): BaseInfo | undefined {
  return BASES.find((base) => base.id === id);
}

export function getBasesByRegion(region: string): BaseInfo[] {
  return BASES.filter((base) => base.region === region);
}
