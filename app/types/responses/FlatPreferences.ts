import { Preferences } from "./Preferences";

export interface FlatPreferences extends Preferences {
  maxRent: number;
  location: string; // Perhaps something else?
  maxPeople: number;
}
