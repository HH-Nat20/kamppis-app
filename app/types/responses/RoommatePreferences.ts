import { Preferences } from "./Preferences";
import { Gender } from "../enums/GenderEnum";

export interface RoommatePreferences extends Preferences {
  id: number;
  userId: number;
  minAgePreference: number;
  maxAgePreference: number;
  preferredGenders: Gender[];
  preferredLocations: string[]; // Perhaps something else?
  preferredLifestyle: string[]; // Perhaps something else?
}
