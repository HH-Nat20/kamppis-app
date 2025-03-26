import { Preferences } from "./Preferences";
import { Location } from "../enums/LocationEnum";

export interface RoomPreferences extends Preferences {
  maxRent: number;
  locationPreferences: Location[];
  //maxPeople: number;
}
