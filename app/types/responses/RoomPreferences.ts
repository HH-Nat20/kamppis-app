import { Preferences } from "./Preferences";
import { Location } from "../enums/LocationEnum";

export interface RoomPreferences extends Preferences {
  id: number;
  userId: number;
  hasPrivateRoom: boolean;
  maxRent: number;
  maxRoommates: number;
  locationPreferences: Location[];
  //maxPeople: number;
}
