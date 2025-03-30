import { Gender } from "../enums/GenderEnum";
import { Location } from "../enums/LocationEnum";

export type PreferencesForm = {
  maxRent: number;
  minAgePreference: number;
  maxAgePreference: number;
  genderPreferences: Gender[];
  locationPreferences: Location[];
};
