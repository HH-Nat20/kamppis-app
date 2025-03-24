import { Preferences } from "./Preferences";
import { MaxRent } from "../enums/MaxRentEnum";
import { Location } from "../enums/LocationEnum";

export interface RoomPreferences extends Preferences {
  maxRent: MaxRent;
  locationPreferences: Location[];
  //maxPeople: number;
}
