import { RoommatePreferences } from "./RoommatePreferences";
import { RoomPreferences } from "./RoomPreferences";

export interface Preferences {
  id: number;
  roomPreference: RoomPreferences | null;
  roommatePreference: RoommatePreferences | undefined;
  // userId: number;
}
