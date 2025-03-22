import { Preferences } from "./Preferences";

export interface FlatPreferences extends Preferences {
  maxRent: string; // "HIGH" | "MEDIUM" | "LOW";
  location: string; // Perhaps something else?
  maxPeople: number;
}
