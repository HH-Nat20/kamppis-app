import { RoommatePreferences } from "./RoommatePreferences";
import { RoomPreferences } from "./RoomPreferences";

export interface Preferences {
  id: number;
  roomPreference: RoomPreferences;
  roommatePreference: RoommatePreferences;
  // userId: number;
}
