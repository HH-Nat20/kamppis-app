import { Preferences } from "./Preferences";
import { Gender } from "../enums/GenderEnum";

export interface RoommatePreferences extends Preferences {
  id: number;
  userId: number;
  minAge: number;
  maxAge: number;
  genders: Gender[];
  locations: string[]; // Perhaps something else?
  lifestyle: string[]; // Perhaps something else?
}
