import { User } from "../responses/User";
import { UserProfile } from "../responses/UserProfile";
import { FlatPreferences } from "../responses/FlatPreferences";
import { RoommatePreferences } from "../responses/RoommatePreferences";
import { Gender } from "../enums/GenderEnum";
import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";
import { Location } from "../enums/LocationEnum";

export type UserProfileForm = {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  maxRent: "LOW" | "MID" | "HIGH";
  cleanliness: Cleanliness;
  lifestyle: Lifestyle[];
  bio: string;
  minAgePreference: number;
  maxAgePreference: number;
  preferredGenders: Gender[];
  preferredLocations: Location[];
};
