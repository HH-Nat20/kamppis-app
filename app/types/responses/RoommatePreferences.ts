import { Preferences } from "./Preferences";
import { Gender } from "../enums/GenderEnum";
import { Location } from "../enums/LocationEnum";

export interface RoommatePreferences extends Preferences {
  id: number;
  userId: number;
  minAgePreference: number;
  maxAgePreference: number;
  genderPreferences: Gender[];
  locationPreferences: Location[]; // Perhaps something else?
  //preferredLifestyle: string[]; // Perhaps something else?
}
