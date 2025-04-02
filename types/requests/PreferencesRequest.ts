import { Gender } from "../enums/GenderEnum";
import { Location } from "../enums/LocationEnum";

export type PreferencesRequest = {
  roomPreference: {
    maxRent: number;
    hasPrivateRoom: boolean;
    maxRoommates: number;
    locationPreferences: Location[];
  };
  roommatePreference: {
    minAgePreference: number;
    maxAgePreference: number;
    genderPreferences: Gender[];
    locationPreferences: Location[];
  };
};
